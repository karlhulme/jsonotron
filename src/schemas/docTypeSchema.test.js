/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const docTypeSchema = require('./docTypeSchema')

test('Accept valid doc type.', () => {
  const ajv = createCustomisedAjv()

  const validDocType = {
    name: 'car',
    pluralName: 'cars',
    policy: {
      canFetchWholeCollection: false
    },
    fields: {
      manufacturer: { type: 'mediumString', isRequired: true, canUpdate: true },
      model: { type: 'mediumString', isRequired: true, canUpdate: true },
      registration: { type: 'shortString', isRequired: true, canUpdate: true }
    }
  }

  expect(ajv.validate(docTypeSchema, validDocType)).toEqual(true)
})
