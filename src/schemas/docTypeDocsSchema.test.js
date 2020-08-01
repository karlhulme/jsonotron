/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const docTypeDocsSchema = require('./docTypeDocsSchema')

test('Accept valid doc type documentation object.', () => {
  const ajv = createCustomisedAjv()

  const validDocTypeDocs = {
    name: 'car',
    lang: 'en',
    title: 'Car',
    pluralTitle: 'Cars',
    paragraphs: ['This document represents a car within the system.'],
    fields: {
      manufacturer: { paragraphs: ['The name of a car manufacturer.'] },
      model: { paragraphs: ['The model of a car.'] },
      registration: { paragraphs: ['A registration number that begins with HG.'], deprecationParagraphs: ['We are not using this anymore.'] }
    },
    examples: [{
      paragraphs: ['A simple example'],
      value: {
        manufacturer: 'Ford',
        model: 'Fiesta',
        registration: 'HG52 8HK'
      }
    }]
  }

  const result = ajv.validate(docTypeDocsSchema, validDocTypeDocs)
  if (!result) { console.log(JSON.stringify(ajv.errors, null, 2)) }
  expect(result).toEqual(true)
})
