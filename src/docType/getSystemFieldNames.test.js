/* eslint-env jest */
const getSystemFieldNames = require('./getSystemFieldNames')

test('System fields are declared correctly.', () => {
  expect(getSystemFieldNames()).toEqual(['id', 'docType', 'docVersion', 'sys'])
})
