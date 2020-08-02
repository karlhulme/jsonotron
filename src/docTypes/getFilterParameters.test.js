/* eslint-env jest */
const { JsonotronInternalError } = require('jsonotron-errors')
const getFilterParameters = require('./getFilterParameters')

const docType = {
  filters: {
    byPropA: {
      parameters: {
        propA: {},
        propB: {}
      }
    },
    byPropB: {}
  }
}

test('Retrieve filter parameters by filter name.', () => {
  expect(getFilterParameters(docType, 'byPropA')).toEqual(docType.filters.byPropA.parameters)
  expect(getFilterParameters(docType, 'byPropB')).toEqual({})
})

test('Fail to retrieve filter parameters for invalid names.', () => {
  expect(() => getFilterParameters(docType, 'madeup')).toThrow(JsonotronInternalError)
})
