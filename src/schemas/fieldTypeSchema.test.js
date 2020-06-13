/* eslint-env jest */
const Ajv = require('ajv')
const fieldTypeSchema = require('./fieldTypeSchema')
const typeOfValidatorGenerator = require('../customValidatorKeywords/customTypeOfGenerator')

const integerFieldDef = {
  name: 'integer',
  title: 'Integer',
  description: 'A whole number.',
  examples: [-25, 0, 25],
  invalidExamples: ['a string', '', null, true, {}, []],
  jsonSchema: {
    type: 'integer'
  }
}

test('The fieldTypeSchema accepts valid field types.', () => {
  const ajv = new Ajv({
    format: 'full',
    ownProperties: true
  })

  ajv.addKeyword('customTypeOf', { compile: typeOfValidatorGenerator })

  const result = ajv.validate(fieldTypeSchema, integerFieldDef)

  expect(result).toEqual(true)
})
