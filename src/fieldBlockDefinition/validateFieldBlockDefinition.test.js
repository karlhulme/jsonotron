import { expect, test } from '@jest/globals'
import { createCustomisedAjv } from '../jsonSchemaValidation/index.js'
import { validateFieldBlockDefinition } from './validateFieldBlockDefinition.js'

function createFullFieldBlockDefinition () {
  return {
    name: 'candidateFieldBlock',
    fields: {
      fieldA: { type: 'string' },
      fieldB: { type: 'string' }
    }
  }
}

function testBody (mutator, pass) {
  const errorFunc = () => {}
  const ajv = createCustomisedAjv()
  const candidate = createFullFieldBlockDefinition()
  mutator(candidate)
  expect(validateFieldBlockDefinition(ajv, candidate, errorFunc)).toEqual(pass)
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
