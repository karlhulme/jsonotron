/* eslint-env jest */
const { JsonotronFieldTypeResolutionError } = require('jsonotron-errors')
const getReferencedFieldTypeNames = require('./getReferencedFieldTypeNames')

const fieldTypes = [{
  name: 'top',
  referencedFieldTypes: ['middle']
}, {
  name: 'middle',
  referencedFieldTypes: ['bottom']
}, {
  name: 'bottom'
}]

test('Check referenced field types can be identified.', () => {
  expect(getReferencedFieldTypeNames(fieldTypes, ['top'])).toEqual(['top', 'middle', 'bottom'])
  expect(getReferencedFieldTypeNames(fieldTypes, ['middle'])).toEqual(['middle', 'bottom'])
  expect(getReferencedFieldTypeNames(fieldTypes, ['bottom'])).toEqual(['bottom'])
})

test('Check referenced field types are only identified once.', () => {
  expect(getReferencedFieldTypeNames(fieldTypes, ['top', 'bottom'])).toEqual(['top', 'bottom', 'middle'])
  expect(getReferencedFieldTypeNames(fieldTypes, ['top', 'top', 'top'])).toEqual(['top', 'middle', 'bottom'])
})

test('Check unrecognised field types are identified.', () => {
  expect(() => getReferencedFieldTypeNames(fieldTypes, ['madeup'])).toThrow(JsonotronFieldTypeResolutionError)
  expect(() => getReferencedFieldTypeNames(fieldTypes, ['madeup'])).toThrow(/madeup/)
})
