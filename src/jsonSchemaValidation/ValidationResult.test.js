/* eslint-env jest */
import { ValidationResult } from './ValidationResult'

test('A validation result with no warnings and errors should be considered successful with no warnings.', () => {
  const result = new ValidationResult()
  expect(result.isSuccessful()).toEqual(true)
  expect(result.isSuccessfulWithNoWarnings()).toEqual(true)
  expect(result.getWarnings()).toEqual([])
  expect(result.getErrors()).toEqual([])
})

test('A validation result with warnings should be considered successful but not warning free.', () => {
  const result = new ValidationResult()
  result.addWarning('Type1', 'this is my warning', { foo: 'bar' })
  expect(result.isSuccessful()).toEqual(true)
  expect(result.isSuccessfulWithNoWarnings()).toEqual(false)
  expect(result.getWarnings()).toEqual([{ typeName: 'Type1', message: 'this is my warning', details: { foo: 'bar' } }])
  expect(result.getErrors()).toEqual([])
})

test('A validation result with errors should be considred unsuccessful.', () => {
  const result = new ValidationResult()
  result.addWarning('Type1', 'this is my warning', { foo: 'bar' })
  result.addError('Type1', 'this is my error', { bar: 'foo' })
  expect(result.isSuccessful()).toEqual(false)
  expect(result.isSuccessfulWithNoWarnings()).toEqual(false)
  expect(result.getWarnings()).toEqual([{ typeName: 'Type1', message: 'this is my warning', details: { foo: 'bar' } }])
  expect(result.getErrors()).toEqual([{ typeName: 'Type1', message: 'this is my error', details: { bar: 'foo' } }])
})

test('A validation result can find the presence of existing error using the details.', () => {
  const result = new ValidationResult()

  result.addError('Type1', 'my not found error', { keyword: 'bbb' })
  expect(result.containsError({ keyword: 'aaa' })).toEqual(false)
  expect(result.containsError({ keyword: 'bbb' })).toEqual(true)
})

test('A validation result can be converted to an object.', () => {
  const result = new ValidationResult()

  result.addError('Type1', 'my message', { keyword: 'bbb' })
  expect(result.toString()).toEqual(JSON.stringify({
    errors: [{ typeName: 'Type1', message: 'my message', details: { keyword: 'bbb' } }],
    warnings: []
  }, null, 2))
})
