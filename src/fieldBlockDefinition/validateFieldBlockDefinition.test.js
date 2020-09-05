/* eslint-env jest */
import { createCustomisedAjv } from '../jsonSchemaValidation'
import { validateFieldBlockDefinition } from './validateFieldBlockDefinition'

function createFullFieldBlockDefinition () {
  return {
    name: 'candidateFieldBlock',
    fields: {
      fieldA: { type: 'string' },
      fieldB: { type: 'string' }
    }
  }
}

function testBody (mutator, isSuccessful, isSuccessulWithNoWarnings) {
  const ajv = createCustomisedAjv()
  const candidate = createFullFieldBlockDefinition()
  mutator(candidate)
  const result = validateFieldBlockDefinition(ajv, candidate)
  expect(result.isSuccessful()).toEqual(isSuccessful)
  expect(result.isSuccessfulWithNoWarnings()).toEqual(isSuccessulWithNoWarnings)
}

test('An invalid field block is not successfully validated', () => {
  testBody(fb => { delete fb.name }, false, false)
  testBody(fb => { fb.name = 123 }, false, false)

  testBody(fb => { delete fb.fields }, false, false)

  testBody(fb => { fb.fields.fieldA = 123 }, false, false)

  testBody(fb => { delete fb.fields.fieldA.type }, false, false)
  testBody(fb => { fb.fields.fieldA.type = 123 }, false, false)

  testBody(fb => { fb.fields.fieldA.const = 123 }, false, false)

  testBody(fb => { fb.fields.fieldA.default = null }, false, false)

  testBody(fb => { fb.fields.fieldA.isRequired = 123 }, false, false)

  testBody(fb => { fb.fields.fieldA.isNullable = 123 }, false, false)

  testBody(fb => { fb.fields.fieldA.isArray = 123 }, false, false)
})

test('A fully documented field block is successfully validated with no warnings', () => {
  testBody(fb => fb, true, true)
})
