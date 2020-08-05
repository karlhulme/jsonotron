/* eslint-env jest */
const pascalToTitleCase = require('./pascalToTitleCase')

test('Can convert pascal names to title case.', () => {
  expect(pascalToTitleCase('helloWorld')).toEqual('Hello World')
  expect(pascalToTitleCase('HelloWorld')).toEqual('Hello World')
})
