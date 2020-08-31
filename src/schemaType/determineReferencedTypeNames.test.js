/* eslint-env jest */
import { determineReferencedTypeNames } from './determineReferencedTypeNames'

const enumTypes = [{
  name: 'choice'
}]

const schemaTypes = [{
  name: 'top',
  referencedSchemaTypes: ['middle'],
  referencedEnumTypes: []
}, {
  name: 'middle',
  referencedSchemaTypes: ['bottom'],
  referencedEnumTypes: ['choice']
}, {
  name: 'bottom'
}]

test('Check referenced schema types can be identified.', () => {
  expect(determineReferencedTypeNames(['top'], [], schemaTypes, enumTypes)).toEqual({ schemaTypeNames: ['top', 'middle', 'bottom'], enumTypeNames: ['choice'] })
  expect(determineReferencedTypeNames(['middle'], [], schemaTypes, enumTypes)).toEqual({ schemaTypeNames: ['middle', 'bottom'], enumTypeNames: ['choice'] })
  expect(determineReferencedTypeNames(['bottom'], [], schemaTypes, enumTypes)).toEqual({ schemaTypeNames: ['bottom'], enumTypeNames: [] })
})

test('Check referenced schema types and enum types are only identified once.', () => {
  expect(determineReferencedTypeNames(['top', 'bottom'], [], schemaTypes, enumTypes)).toEqual({ schemaTypeNames: ['top', 'bottom', 'middle'], enumTypeNames: ['choice'] })
  expect(determineReferencedTypeNames(['top', 'top', 'top'], ['choice', 'choice'], schemaTypes, enumTypes)).toEqual({ schemaTypeNames: ['top', 'middle', 'bottom'], enumTypeNames: ['choice'] })
})

test('Check unrecognised schema types are identified.', () => {
  expect(() => determineReferencedTypeNames(['madeup'], [], schemaTypes, enumTypes)).toThrow(/madeup/)
})

test('Check unrecognised enum types are identified.', () => {
  expect(() => determineReferencedTypeNames([], ['madeup'], schemaTypes, enumTypes)).toThrow(/madeup/)
})
