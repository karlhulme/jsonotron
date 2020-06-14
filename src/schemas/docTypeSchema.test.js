/* eslint-env jest */
const { createAjv } = require('./shared.test')
const docTypeSchema = require('./docTypeSchema')

test('Accept valid doc type.', () => {
  const ajv = createAjv()

  const validDocType = {
    name: 'car',
    pluralName: 'cars',
    title: 'Car',
    pluralTitle: 'Cars',
    policy: {
      canFetchWholeCollection: false
    },
    fields: {
      manufacturer: { type: 'mediumString', isRequired: true, canUpdate: true, description: 'The name of a car manufacturer.', example: 'Ford' },
      model: { type: 'mediumString', isRequired: true, canUpdate: true, description: 'The model of a car.', example: 'Fiesta' },
      registration: { type: 'shortString', isRequired: true, canUpdate: true, description: 'A registration number that begins with HG.', example: 'HG52 8HK' }
    }
  }

  expect(ajv.validate(docTypeSchema, validDocType)).toEqual(true)
})
