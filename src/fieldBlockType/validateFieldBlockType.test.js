/* eslint-env jest */
import { createCustomisedAjv } from '../jsonSchemaValidation'
import { validateFieldBlockType } from './validateFieldBlockType'

function createFullFieldBlockType () {
  return {
    name: 'candidateFieldBlock',
    title: 'Candidate Field Block Type',
    paragraphs: ['The documentation'],
    isNullable: false,
    fields: {
      fieldA: { type: 'string', flags: { updateable: true, guaranteed: false, deprecated: false }, paragraphs: ['This field is the first field.'] },
      fieldB: { type: 'string', flags: { updateable: false, guaranteed: true, deprecated: 'Use fieldA instead.' }, paragraphs: ['This field is the second field.'] }
    },
    examples: [
      { value: 'foo', paragraphs: ['An example.'] }
    ]
  }
}

function testBody (mutator, isSuccessful, isSuccessulWithNoWarnings) {
  const ajv = createCustomisedAjv()
  const candidate = createFullFieldBlockType()
  mutator(candidate)
  const result = validateFieldBlockType(ajv, candidate)
  expect(result.isSuccessful()).toEqual(isSuccessful)
  expect(result.isSuccessfulWithNoWarnings()).toEqual(isSuccessulWithNoWarnings)
}

test('An invalid field block is not successfully validated', () => {
  testBody(fb => { delete fb.name }, false, false)
  testBody(fb => { fb.name = 123 }, false, false)

  testBody(fb => { fb.title = 123 }, false, false)

  testBody(fb => { fb.paragraphs = 123 }, false, false)
  testBody(fb => { fb.paragraphs = [123] }, false, false)

  testBody(fb => { fb.examples = 123 }, false, false)
  testBody(fb => { fb.examples = [123] }, false, false)
  testBody(fb => { delete fb.examples[0].value }, false, false)
  testBody(fb => { fb.examples[0].paragraphs = 123 }, false, false)
  testBody(fb => { fb.examples[0].paragraphs = [123] }, false, false)

  testBody(fb => { delete fb.fields }, false, false)

  testBody(fb => { fb.fields.fieldA = 123 }, false, false)

  testBody(fb => { delete fb.fields.fieldA.type }, false, false)
  testBody(fb => { fb.fields.fieldA.type = 123 }, false, false)

  testBody(fb => { fb.fields.fieldA.const = 123 }, false, false)

  testBody(fb => { fb.fields.fieldA.default = null }, false, false)

  testBody(fb => { fb.fields.fieldA.isRequired = 123 }, false, false)

  testBody(fb => { fb.fields.fieldA.isNullable = 123 }, false, false)

  testBody(fb => { fb.fields.fieldA.isArray = 123 }, false, false)

  testBody(fb => { fb.fields.fieldA.flags = 123 }, false, false)
  testBody(fb => { fb.fields.fieldA.flags.updateable = 123 }, false, false)
  testBody(fb => { fb.fields.fieldA.flags.guaranteed = 123 }, false, false)
  testBody(fb => { fb.fields.fieldA.flags.deprecated = 123 }, false, false)

  testBody(fb => { fb.fields.fieldA.paragraphs = 123 }, false, false)
  testBody(fb => { fb.fields.fieldA.paragraphs = [123] }, false, false)
})

test('An undocumented field block is successfully validated but not without warnings', () => {
  testBody(fb => { delete fb.title }, true, false)
  testBody(fb => { delete fb.paragraphs }, true, false)
  testBody(fb => { fb.paragraphs = [] }, true, false)
  testBody(fb => { delete fb.fields.fieldA.paragraphs }, true, false)
  testBody(fb => { fb.fields.fieldA.paragraphs = [] }, true, false)
  testBody(fb => { delete fb.examples[0].paragraphs }, true, false)
  testBody(fb => { fb.examples[0].paragraphs = [] }, true, false)
})

test('A fully documented field block is successfully validated with no warnings', () => {
  testBody(fb => fb, true, true)
})
