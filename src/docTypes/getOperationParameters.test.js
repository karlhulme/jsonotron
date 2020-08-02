/* eslint-env jest */
const { JsonotronInternalError } = require('jsonotron-errors')
const getOperationParameters = require('./getOperationParameters')

const docType = {
  operations: {
    doSomethingA: {
      parameters: {
        propA: {},
        propB: {}
      }
    },
    doSomethingB: {}
  }
}

test('Retrieve operation parameters by operation name.', () => {
  expect(getOperationParameters(docType, 'doSomethingA')).toEqual(docType.operations.doSomethingA.parameters)
  expect(getOperationParameters(docType, 'doSomethingB')).toEqual({})
})

test('Fail to retrieve operation parameters for invalid names.', () => {
  expect(() => getOperationParameters(docType, 'madeup')).toThrow(JsonotronInternalError)
})
