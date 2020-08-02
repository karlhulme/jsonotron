/* eslint-env jest */
const getFilterNames = require('./getFilterNames')

const docType = {
  filters: {
    byPropA: {},
    byPropB: {}
  }
}

const docTypeWithNoFilters = {}

test('Recognise declared filter names.', () => {
  expect(getFilterNames(docType)).toEqual(['byPropA', 'byPropB'])
  expect(getFilterNames(docTypeWithNoFilters)).toEqual([])
})
