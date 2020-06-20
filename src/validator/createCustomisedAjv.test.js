/* eslint-env jest */
const createCustomisedAjv = require('./createCustomisedAjv')

test('Can create a customised Ajv with bespoke keywords.', () => {
  const ajv = createCustomisedAjv()
  expect(ajv).toBeDefined()
  expect(ajv.getKeyword('customTypeOf')).toBeTruthy()
})

test('Can create a customised Ajv with bespoke format validators.', () => {
  const ajv = createCustomisedAjv([
    { name: 'format-one', validate: v => v === '1' },
    { name: 'format-two', validate: v => v === 'two' }
  ])

  const json = {
    value1: '1',
    value2: 'two'
  }

  const schema = {
    properties: {
      value1: { type: 'string', format: 'custom-format-one' },
      value2: { type: 'string', format: 'custom-format-two' }
    }
  }
  const result = ajv.validate(schema, json)
  expect(result).toEqual(true)
})
