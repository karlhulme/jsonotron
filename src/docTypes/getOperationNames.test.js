/* eslint-env jest */
const getOperationNames = require('./getOperationNames')

const docType = {
  operations: {
    doSomethingA: {},
    doSomethingB: {}
  }
}

const docTypeWithNoOperations = {}

test('Recognise declared operation names.', () => {
  expect(getOperationNames(docType)).toEqual(['doSomethingA', 'doSomethingB'])
  expect(getOperationNames(docTypeWithNoOperations)).toEqual([])
})
