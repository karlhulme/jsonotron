/* eslint-env jest */
const getSystemFields = require('./getSystemFields')

test('System fields are declared correctly.', () => {
  expect(getSystemFields()).toEqual(['id', 'docType', 'docVersion', 'sys'])
})
