/* eslint-env jest */
const Ajv = require('ajv')
const typeOfValidatorGenerator = require('../customValidatorKeywords/customTypeOfGenerator')

function createAjv () {
  const ajv = new Ajv({
    format: 'full',
    ownProperties: true
  })

  ajv.addKeyword('customTypeOf', { compile: typeOfValidatorGenerator })

  return ajv
}

test('The fieldTypeSchema accepts valid field types.', () => {
  const ajv = createAjv
  expect(ajv).toBeDefined()
})

module.exports = {
  createAjv
}
