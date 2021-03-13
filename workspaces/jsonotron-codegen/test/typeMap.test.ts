import { expect, test } from '@jest/globals'
import { convertJsonotronTypesToTypeMap } from '../src'
import { getTestTypes } from './shared.test'

test('Convert jsonotron types into a type map and check the ref types.', () => {
  const testTypes = getTestTypes()
  const typeMap = convertJsonotronTypesToTypeMap(testTypes.enumTypes, testTypes.schemaTypes)

  // output the map - useful when debugging
  // console.log(JSON.stringify(typeMap, null, 2))

  expect(typeMap.refTypes).toEqual(expect.arrayContaining([
    { domain: 'https://jsonotron.org', system: 'test', name: 'color', fullyQualifiedName: 'https://jsonotron.org/test/color', refTypeName: 'string', refTypeArrayCount: 0, isScalarRef: false, isEnumRef: true }
  ]))

  expect(typeMap.refTypes).toEqual(expect.arrayContaining([
    { domain: 'https://jsonotron.org', system: 'test', name: 'size', fullyQualifiedName: 'https://jsonotron.org/test/size', refTypeName: 'string', refTypeArrayCount: 0, isScalarRef: false, isEnumRef: true }
  ]))

  expect(typeMap.refTypes).toEqual(expect.arrayContaining([
    { domain: 'https://jsonotron.org', system: 'alt', name: 'direction', fullyQualifiedName: 'https://jsonotron.org/alt/direction', refTypeName: 'string', refTypeArrayCount: 0, isScalarRef: false, isEnumRef: true }
  ]))

  expect(typeMap.refTypes).toEqual(expect.arrayContaining([
    { domain: 'https://jsonotron.org', system: 'test', name: 'bed_make', fullyQualifiedName: 'https://jsonotron.org/test/bed_make', refTypeName: 'string', refTypeArrayCount: 0, isScalarRef: true, isEnumRef: false }
  ]))

  expect(typeMap.refTypes).toEqual(expect.arrayContaining([
    { domain: 'https://jsonotron.org', system: 'test', name: 'bed_pillow', fullyQualifiedName: 'https://jsonotron.org/test/bed_pillow', refTypeName: 'https://jsonotron.org/test/pillow', refTypeArrayCount: 0, isScalarRef: false, isEnumRef: false }
  ]))

  expect(typeMap.refTypes).toEqual(expect.arrayContaining([
    { domain: 'https://jsonotron.org', system: 'test', name: 'bed_direction', fullyQualifiedName: 'https://jsonotron.org/test/bed_direction', refTypeName: 'https://jsonotron.org/alt/direction', refTypeArrayCount: 0, isScalarRef: false, isEnumRef: false }
  ]))
})

test('Convert jsonotron types into a type map and check the object types.', () => {
  const testTypes = getTestTypes()
  const typeMap = convertJsonotronTypesToTypeMap(testTypes.enumTypes, testTypes.schemaTypes)

  // output the map - useful when debugging
  // console.log(JSON.stringify(typeMap, null, 2))

  expect(typeMap.objectTypes).toEqual(expect.arrayContaining([
    {
      domain: 'https://jsonotron.org',
      system: 'test',
      name: 'bed',
      fullyQualifiedName: 'https://jsonotron.org/test/bed',
      documentation: 'A bed',
      objectTypeArrayCount: 0,
      properties: [
        {
          propertyName: 'make',
          documentation: '',
          refTypeName: 'https://jsonotron.org/test/bed_make',
          isRequired: true
        },
        {
          propertyName: 'thickness',
          documentation: '',
          refTypeName: 'https://jsonotron.org/test/bed_thickness',
          isRequired: false
        },
        {
          propertyName: 'pillow',
          documentation: '',
          refTypeName: 'https://jsonotron.org/test/bed_pillow',
          isRequired: false
        },
        {
          propertyName: 'direction',
          documentation: 'A value from the **direction** enum of the **alt** type system defined by **https://jsonotron.org**.',
          refTypeName: 'https://jsonotron.org/test/bed_direction',
          isRequired: false
        }
      ]
    }
  ]))
})
