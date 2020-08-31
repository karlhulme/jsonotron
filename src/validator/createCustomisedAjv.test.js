/* eslint-env jest */
import { createCustomisedAjv } from './createCustomisedAjv'

test('Can create a customised Ajv with bespoke keywords.', () => {
  const ajv = createCustomisedAjv()
  expect(ajv).toBeDefined()
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
      value1: { type: 'string', format: 'format-one' },
      value2: { type: 'string', format: 'format-two' }
    }
  }
  const result = ajv.validate(schema, json)
  expect(result).toEqual(true)
})
