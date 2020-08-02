/* eslint-env jest */
const getCalculatedFieldNames = require('./getCalculatedFieldNames')

const docType = {
  calculatedFields: {
    propA: {},
    propB: {}
  }
}

const docTypeWithNoCalculatedFields = {}

test('Recognise declared calculated field names.', () => {
  expect(getCalculatedFieldNames(docType)).toEqual(['propA', 'propB'])
  expect(getCalculatedFieldNames(docTypeWithNoCalculatedFields)).toEqual([])
})
