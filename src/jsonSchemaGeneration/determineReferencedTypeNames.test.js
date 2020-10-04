import { expect, test } from '@jest/globals'
import { determineReferencedTypeNames } from './determineReferencedTypeNames.js'

const enumTypes = [{
  name: 'ns.choice'
}]

const schemaTypes = [{
  name: 'top',
  jsonSchema: {
    propA: { $ref: '#/definitions/middle' }
  }
}, {
  name: 'middle',
  jsonSchema: {
    propB: { $ref: '#/definitions/bottom' },
    propC: { $ref: '#/definitions/ns.choice' },
    propD: { $ref: '#/definitions/basement' }
  }
}, {
  name: 'bottom',
  jsonSchema: {
    propE: { $ref: '#/definitions/basement' },
    propF: { $ref: '#/definitions/ns.choice' }
  }
}, {
  name: 'basement',
  jsonSchema: {
    propG: {}
  }
}]

test('Check referenced schema types can be identified.', () => {
  expect(determineReferencedTypeNames(['top'], schemaTypes, enumTypes)).toEqual({ schemaTypeNames: ['basement', 'bottom', 'middle', 'top'], enumTypeNames: ['ns.choice'] })
  expect(determineReferencedTypeNames(['middle'], schemaTypes, enumTypes)).toEqual({ schemaTypeNames: ['basement', 'bottom', 'middle'], enumTypeNames: ['ns.choice'] })
  expect(determineReferencedTypeNames(['bottom'], schemaTypes, enumTypes)).toEqual({ schemaTypeNames: ['basement', 'bottom'], enumTypeNames: ['ns.choice'] })
})

test('Check referenced schema types and enum types are only identified once.', () => {
  expect(determineReferencedTypeNames(['top', 'bottom'], schemaTypes, enumTypes))
    .toEqual({ schemaTypeNames: ['basement', 'bottom', 'middle', 'top'], enumTypeNames: ['ns.choice'] })

  expect(determineReferencedTypeNames(['top', 'top', 'top', 'ns.choice', 'ns.choice', 'ns.choice'], schemaTypes, enumTypes))
    .toEqual({ schemaTypeNames: ['basement', 'bottom', 'middle', 'top'], enumTypeNames: ['ns.choice'] })
})

test('Unrecognised type names cause an error to the be thrown.', () => {
  expect(() => determineReferencedTypeNames(['madeup'], schemaTypes, enumTypes)).toThrow(/madeup/)
})
