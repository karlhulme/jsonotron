/* eslint-env jest */
const getFieldOrEnumTypeFromArrays = require('./getFieldOrEnumTypeFromArrays')
const { JsonotronFieldTypeResolutionError } = require('jsonotron-errors')

const fieldTypes = [{
  name: 'found'
}, {
  name: 'present'
}]

const enumTypes = [{
  name: 'extra'
}]

test('A named field type can be found from the arrays.', () => {
  expect(getFieldOrEnumTypeFromArrays('found', fieldTypes, enumTypes)).toEqual({ name: 'found' })
})

test('A named enum type can be found from the arrays.', () => {
  expect(getFieldOrEnumTypeFromArrays('extra', fieldTypes, enumTypes)).toEqual({ name: 'extra' })
})

test('An unrecognised field type cannot be found from an array.', () => {
  expect(() => getFieldOrEnumTypeFromArrays('missing', fieldTypes, enumTypes)).toThrow(JsonotronFieldTypeResolutionError)
  expect(() => getFieldOrEnumTypeFromArrays('missing', fieldTypes, enumTypes)).toThrow(/missing/)
})
