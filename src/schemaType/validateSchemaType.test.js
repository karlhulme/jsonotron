/* eslint-env jest */
import { validateSchemaType } from './validateSchemaType'
import { createCustomisedAjv } from '../jsonSchemaValidation'

function createFullSchemaType () {
  return {
    name: 'candidateSchemaType',
    title: 'Candidate Schema Type Here',
    paragraphs: ['A description of the schema', 'appears here.'],
    examples: [{ value: 'an example', paragraphs: ['A description of', 'the example.'] }],
    validTestCases: ['valid', 'also valid'],
    invalidTestCases: [false, { not: 'valid' }],
    jsonSchema: {
      type: 'string'
    }
  }
}

function testBody (mutator, isSuccessful, isSuccessulWithNoWarnings) {
  const ajv = createCustomisedAjv()
  const candidate = createFullSchemaType()
  mutator(candidate)
  const result = validateSchemaType(ajv, candidate)
  expect(result.isSuccessful()).toEqual(isSuccessful)
  expect(result.isSuccessfulWithNoWarnings()).toEqual(isSuccessulWithNoWarnings)
}

test('An invalid schema type is not successfully validated', () => {
  testBody(s => { delete s.name }, false, false)
  testBody(s => { s.name = 123 }, false, false)
  testBody(s => { s.name = '123' }, false, false)
  testBody(s => { s.name = '.abc' }, false, false)
  testBody(s => { s.name = 'abc.' }, false, false)
  testBody(s => { s.name = 'too.many.dots' }, false, false)

  testBody(s => { s.title = 123 }, false, false)

  testBody(s => { s.paragraphs = 123 }, false, false)
  testBody(s => { s.paragraphs = [123] }, false, false)

  testBody(s => { s.examples = 123 }, false, false)
  testBody(s => { delete s.examples[0].value }, false, false)
  testBody(s => { s.examples[0].paragraphs = 123 }, false, false)
  testBody(s => { s.examples[0].paragraphs = [123] }, false, false)

  testBody(s => { s.validTestCases = 123 }, false, false)

  testBody(s => { s.invalidTestCases = 123 }, false, false)

  testBody(s => { delete s.jsonSchema }, false, false)
  testBody(s => { s.jsonSchema = 123 }, false, false)
})

test('An undocumented or untested schema type is successfully validated but not without warnings', () => {
  testBody(s => { delete s.title }, true, false)

  testBody(s => { delete s.paragraphs }, true, false)
  testBody(s => { s.paragraphs = [] }, true, false)

  testBody(s => { delete s.examples }, true, false)
  testBody(s => { s.examples = [] }, true, false)
  testBody(s => { delete s.examples[0].paragraphs }, true, false)
  testBody(s => { s.examples[0].paragraphs = [] }, true, false)

  testBody(s => { delete s.validTestCases }, true, false)
  testBody(s => { s.validTestCases = [] }, true, false)

  testBody(s => { delete s.invalidTestCases }, true, false)
  testBody(s => { s.invalidTestCases = [] }, true, false)
})

test('A fully documented enum type is successfully validated with no warnings', () => {
  testBody(s => s, true, true)
  testBody(s => { s.name = 'namespace.candidateEnumType' }, true, true)
})
