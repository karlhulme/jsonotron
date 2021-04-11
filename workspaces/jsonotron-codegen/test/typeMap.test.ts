import { expect, test } from '@jest/globals'
import { convertJsonotronTypesToTypeMap } from '../src'
import { getTestTypes } from './shared.test'

test('Convert jsonotron types into a type map and check the ref types.', () => {
  const testTypes = getTestTypes()
  const typeMap = convertJsonotronTypesToTypeMap(testTypes.enumTypes, testTypes.schemaTypes)

  // output the map - useful when debugging
  // console.log(JSON.stringify(typeMap, null, 2))

  expect(typeMap.refTypes).toEqual(expect.arrayContaining([
    { system: 'test', name: 'color', refTypeName: 'string', refTypeArrayCount: 0, isScalarRef: false, isEnumRef: true }
  ]))

  expect(typeMap.refTypes).toEqual(expect.arrayContaining([
    { system: 'test', name: 'size', refTypeName: 'string', refTypeArrayCount: 0, isScalarRef: false, isEnumRef: true }
  ]))

  expect(typeMap.refTypes).toEqual(expect.arrayContaining([
    { system: 'alt', name: 'direction', refTypeName: 'string', refTypeArrayCount: 0, isScalarRef: false, isEnumRef: true }
  ]))

  expect(typeMap.refTypes).toEqual(expect.arrayContaining([
    { system: 'test', name: 'bed_make', refTypeName: 'string', refTypeArrayCount: 0, isScalarRef: true, isEnumRef: false }
  ]))

  expect(typeMap.refTypes).toEqual(expect.arrayContaining([
    { system: 'test', name: 'bed_pillow', refTypeName: 'test/pillow', refTypeArrayCount: 0, isScalarRef: false, isEnumRef: false }
  ]))

  expect(typeMap.refTypes).toEqual(expect.arrayContaining([
    { system: 'test', name: 'bed_direction', refTypeName: 'alt/direction', refTypeArrayCount: 0, isScalarRef: false, isEnumRef: false }
  ]))
})

test('Convert jsonotron types into a type map and check the object types.', () => {
  const testTypes = getTestTypes()
  const typeMap = convertJsonotronTypesToTypeMap(testTypes.enumTypes, testTypes.schemaTypes)

  // output the map - useful when debugging
  // console.log(JSON.stringify(typeMap, null, 2))

  expect(typeMap.objectTypes).toEqual(expect.arrayContaining([
    {
      system: 'test',
      name: 'bed',
      documentation: 'A bed',
      objectTypeArrayCount: 0,
      properties: [
        {
          propertyName: 'make',
          documentation: 'The make of the bed.',
          refTypeName: 'test/bed_make',
          isRequired: true
        },
        {
          propertyName: 'thickness',
          documentation: 'The thickness of the bed mattress',
          refTypeName: 'test/bed_thickness',
          isRequired: false
        },
        {
          propertyName: 'pillow',
          documentation: 'The type of pillow on the bed',
          refTypeName: 'test/bed_pillow',
          isRequired: false
        },
        {
          propertyName: 'direction',
          documentation: 'The direction the bed is facing.',
          refTypeName: 'test/bed_direction',
          isRequired: false
        }
      ]
    }
  ]))
})
