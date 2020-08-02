/* eslint-env jest */
const getConstructorParameters = require('./getConstructorParameters')

const docType = {
  ctor: {
    parameters: {
      propA: {},
      propB: {}
    }
  }
}

const docTypeWithNoConstructorParams = { ctor: {} }

const docTypeWithNoConstructor = {}

test('Retrieve constructor parameters.', () => {
  expect(getConstructorParameters(docType)).toEqual(docType.ctor.parameters)
  expect(getConstructorParameters(docTypeWithNoConstructorParams)).toEqual({})
  expect(getConstructorParameters(docTypeWithNoConstructor)).toEqual({})
})
