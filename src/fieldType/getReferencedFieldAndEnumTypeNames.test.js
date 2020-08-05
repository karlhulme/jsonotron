/* eslint-env jest */
const { JsonotronFieldTypeResolutionError } = require('jsonotron-errors')
const getReferencedFieldAndEnumTypeNames = require('./getReferencedFieldAndEnumTypeNames')

const enumTypes = [{
  name: 'choice'
}]

const fieldTypes = [{
  name: 'top',
  referencedFieldTypes: ['middle'],
  referencedEnumTypes: []
}, {
  name: 'middle',
  referencedFieldTypes: ['bottom'],
  referencedEnumTypes: ['choice']
}, {
  name: 'bottom'
}]

test('Check referenced field types can be identified.', () => {
  expect(getReferencedFieldAndEnumTypeNames(['top'], fieldTypes, enumTypes)).toEqual(['top', 'middle', 'bottom', 'choice'])
  expect(getReferencedFieldAndEnumTypeNames(['middle'], fieldTypes, enumTypes)).toEqual(['middle', 'bottom', 'choice'])
  expect(getReferencedFieldAndEnumTypeNames(['bottom'], fieldTypes, enumTypes)).toEqual(['bottom'])
})

test('Check referenced field types are only identified once.', () => {
  expect(getReferencedFieldAndEnumTypeNames(['top', 'bottom'], fieldTypes, enumTypes)).toEqual(['top', 'bottom', 'middle', 'choice'])
  expect(getReferencedFieldAndEnumTypeNames(['top', 'top', 'top', 'choice', 'choice'], fieldTypes, enumTypes)).toEqual(['top', 'choice', 'middle', 'bottom'])
})

test('Check unrecognised field types are identified.', () => {
  expect(() => getReferencedFieldAndEnumTypeNames(['madeup'], fieldTypes, enumTypes)).toThrow(JsonotronFieldTypeResolutionError)
  expect(() => getReferencedFieldAndEnumTypeNames(['madeup'], fieldTypes, enumTypes)).toThrow(/madeup/)
})
