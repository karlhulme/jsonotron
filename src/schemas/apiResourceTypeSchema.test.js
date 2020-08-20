/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const apiResourceTypeSchema = require('./apiResourceTypeSchema')

test('Accept valid doc type.', () => {
  const ajv = createCustomisedAjv()

  const validRestResource = {
    urlRoot: '/laptops',
    title: 'Laptop',
    pluralTitle: 'Laptops',
    summary: 'A computer laptop.',
    paragraphs: [
      'Information about a range of laptops.',
      'Some of them are Windows-based, some of them are OSX-based.'
    ],
    fields: {
      manufacturer: { type: 'mediumString', tags: ['required'] },
      os: { type: 'mediumString', tags: ['patchable'] },
      price: { type: 'positiveFloatOrZero' },
      peripherals: { type: 'string', isArray: true }
    }
  }

  expect(ajv.validate(apiResourceTypeSchema, validRestResource)).toEqual(true)
})
