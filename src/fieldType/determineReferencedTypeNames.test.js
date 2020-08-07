/* eslint-env jest */
const { JsonotronEnumTypeResolutionError, JsonotronFieldTypeResolutionError } = require('jsonotron-errors')
const determineReferencedTypeNames = require('./determineReferencedTypeNames')

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
  expect(determineReferencedTypeNames(['top'], [], fieldTypes, enumTypes)).toEqual({ fieldTypeNames: ['top', 'middle', 'bottom'], enumTypeNames: ['choice'] })
  expect(determineReferencedTypeNames(['middle'], [], fieldTypes, enumTypes)).toEqual({ fieldTypeNames: ['middle', 'bottom'], enumTypeNames: ['choice'] })
  expect(determineReferencedTypeNames(['bottom'], [], fieldTypes, enumTypes)).toEqual({ fieldTypeNames: ['bottom'], enumTypeNames: [] })
})

test('Check referenced field types and enum types are only identified once.', () => {
  expect(determineReferencedTypeNames(['top', 'bottom'], [], fieldTypes, enumTypes)).toEqual({ fieldTypeNames: ['top', 'bottom', 'middle'], enumTypeNames: ['choice'] })
  expect(determineReferencedTypeNames(['top', 'top', 'top'], ['choice', 'choice'], fieldTypes, enumTypes)).toEqual({ fieldTypeNames: ['top', 'middle', 'bottom'], enumTypeNames: ['choice'] })
})

test('Check unrecognised field types are identified.', () => {
  expect(() => determineReferencedTypeNames(['madeup'], [], fieldTypes, enumTypes)).toThrow(JsonotronFieldTypeResolutionError)
  expect(() => determineReferencedTypeNames(['madeup'], [], fieldTypes, enumTypes)).toThrow(/madeup/)
})

test('Check unrecognised enum types are identified.', () => {
  expect(() => determineReferencedTypeNames([], ['madeup'], fieldTypes, enumTypes)).toThrow(JsonotronEnumTypeResolutionError)
  expect(() => determineReferencedTypeNames([], ['madeup'], fieldTypes, enumTypes)).toThrow(/madeup/)
})
