/* eslint-env jest */
import { TypeSystem } from './TypeSystem'

function fooValidator (v) {
  if (v === 'foo') {
    return true
  } else {
    fooValidator.errors = [{ msg: 'here' }]
    return false
  }
}

test('An error can be added to a compilation result.', () => {
  const result = new TypeSystem()

  result.addError('myType', 'myMessage', { foo: 'bar' })
  result.addErrorObject({ typeName: 'myExtraType', message: 'myExtraMessage', details: { hello: 'world' } })

  expect(result.getErrors()).toEqual([
    { typeName: 'myType', message: 'myMessage', details: { foo: 'bar' } },
    { typeName: 'myExtraType', message: 'myExtraMessage', details: { hello: 'world' } }
  ])
})

test('A warning can be added to a compilation result.', () => {
  const result = new TypeSystem()

  result.addWarning('myType', 'myMessage', { foo: 'bar' })
  result.addWarningObject({ typeName: 'myExtraType', message: 'myExtraMessage', details: { hello: 'world' } })

  expect(result.getWarnings()).toEqual([
    { typeName: 'myType', message: 'myMessage', details: { foo: 'bar' } },
    { typeName: 'myExtraType', message: 'myExtraMessage', details: { hello: 'world' } }
  ])
})

test('A compilation result with no warnings and errors should be considered successful with no warnings.', () => {
  const result = new TypeSystem()
  expect(result.isSuccessful()).toEqual(true)
  expect(result.isSuccessfulWithNoWarnings()).toEqual(true)
  expect(result.getWarnings()).toEqual([])
  expect(result.getErrors()).toEqual([])
})

test('A compilation result with warnings should be considered successful but not warning free.', () => {
  const result = new TypeSystem()
  result.addWarning('Type1', 'this is my warning', { foo: 'bar' })
  expect(result.isSuccessful()).toEqual(true)
  expect(result.isSuccessfulWithNoWarnings()).toEqual(false)
  expect(result.getWarnings()).toEqual([{ typeName: 'Type1', message: 'this is my warning', details: { foo: 'bar' } }])
  expect(result.getErrors()).toEqual([])
})

test('A compilation result with errors should be considred unsuccessful.', () => {
  const result = new TypeSystem()
  result.addWarning('Type1', 'this is my warning', { foo: 'bar' })
  result.addError('Type1', 'this is my error', { bar: 'foo' })
  expect(result.isSuccessful()).toEqual(false)
  expect(result.isSuccessfulWithNoWarnings()).toEqual(false)
  expect(result.getWarnings()).toEqual([{ typeName: 'Type1', message: 'this is my warning', details: { foo: 'bar' } }])
  expect(result.getErrors()).toEqual([{ typeName: 'Type1', message: 'this is my error', details: { bar: 'foo' } }])
})

test('Patched enumTypes, schemaTypes and fieldBlockTypes can be added to a compilation result.', () => {
  const result = new TypeSystem()
  result.addPatchedEnumType({ name: 'theEnum' })
  result.addPatchedSchemaType({ name: 'theSchema' })
  result.addPatchedFieldBlockType({ name: 'theFieldBlock' })

  expect(result.getPatchedEnumTypes()).toEqual([{ name: 'theEnum' }])
  expect(result.getPatchedSchemaTypes()).toEqual([{ name: 'theSchema' }])
  expect(result.getPatchedFieldBlockTypes()).toEqual([{ name: 'theFieldBlock' }])
})

test('A compilation result can be converted to a string.', () => {
  const result = new TypeSystem()

  result.addError('Type1', 'an error', { keyword: 'aaa' })
  result.addWarning('Type1', 'a warning', { keyword: 'bbb' })

  const expectedString = JSON.stringify({
    errors: [{ typeName: 'Type1', message: 'an error', details: { keyword: 'aaa' } }],
    warnings: [{ typeName: 'Type1', message: 'a warning', details: { keyword: 'bbb' } }]
  }, null, 2)

  expect(result.toString()).toEqual(expectedString)
})

test('A field type validator can be executed based on enum or schema types.', () => {
  const result = new TypeSystem()

  result.addEnumTypeValidator('enumVal', fooValidator)
  result.addSchemaTypeValidator('schemaVal', fooValidator)

  expect(result.executeFieldTypeValidator('enumVal', 'foo')).toEqual({ found: true, validated: true, errors: null })
  expect(result.executeFieldTypeValidator('enumVal', 'bar')).toEqual({ found: true, validated: false, errors: [{ msg: 'here' }] })

  expect(result.executeFieldTypeValidator('schemaVal', 'foo')).toEqual({ found: true, validated: true, errors: null })
  expect(result.executeFieldTypeValidator('schemaVal', 'bar')).toEqual({ found: true, validated: false, errors: [{ msg: 'here' }] })

  expect(result.executeFieldTypeValidator('madeup', 'foo')).toEqual({ found: false, validated: false, errors: null })
})

test('A field block type validator can be executed.', () => {
  const result = new TypeSystem()

  result.addFieldBlockTypeValidator('fieldBlockVal', fooValidator)

  expect(result.executeFieldBlockTypeValidator('fieldBlockVal', 'foo')).toEqual({ found: true, validated: true, errors: null })
  expect(result.executeFieldBlockTypeValidator('fieldBlockVal', 'bar')).toEqual({ found: true, validated: false, errors: [{ msg: 'here' }] })
  expect(result.executeFieldBlockTypeValidator('madeup', 'foo')).toEqual({ found: false, validated: false, errors: null })
})
