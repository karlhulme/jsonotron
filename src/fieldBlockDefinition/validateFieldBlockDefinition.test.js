import { jest, test, expect } from '@jest/globals'
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

function testBody (mutator, isSuccessful) {
  const errorFunc = jest.fn()

  const ajv = createCustomisedAjv()
  const candidate = createFullFieldBlockDefinition()
  mutator(candidate)
  expect(validateFieldBlockDefinition(ajv, candidate, errorFunc)).toEqual(isSuccessful)

  if (isSuccessful) {
    expect(errorFunc.mock.calls.length).toEqual(0)
  } else {
    expect(errorFunc.mock.calls.length).toBeGreaterThan(0)
  }
}

test('An invalid field block is not successfully validated.', () => {
  testBody(fb => { delete fb.name }, false)
  testBody(fb => { fb.name = 123 }, false)

  testBody(fb => { delete fb.fields }, false)

  testBody(fb => { fb.fields.fieldA = 123 }, false)

  testBody(fb => { delete fb.fields.fieldA.type }, false)
  testBody(fb => { fb.fields.fieldA.type = 123 }, false)

  testBody(fb => { fb.fields.fieldA.const = 123 }, false)

  testBody(fb => { fb.fields.fieldA.isRequired = 123 }, false)

  testBody(fb => { fb.fields.fieldA.isNullable = 123 }, false)

  testBody(fb => { fb.fields.fieldA.isArray = 123 }, false)
})

test('A fully documented field block is successfully validated.', () => {
  testBody(fb => fb, true)
})
