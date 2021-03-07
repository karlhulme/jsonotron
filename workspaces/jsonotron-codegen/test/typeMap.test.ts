import { expect, test } from '@jest/globals'
import { convertJsonotronTypesToTypeMap } from '../src'
import { getTestTypes } from './shared.test'

test('Convert jsonotron types into a type map.', () => {
  const testTypes = getTestTypes()
  const typeMap = convertJsonotronTypesToTypeMap(testTypes.enumTypes, testTypes.schemaTypes)

  // output the map - useful when debugging
  // console.log(JSON.stringify(typeMap, null, 2))

  expect(typeMap.refTypes).toEqual(expect.arrayContaining([
    { name: 'https://jsonotron.org/test/color', refTypeName: 'string', refTypeArrayCount: 0, isScalarRef: true },
    { name: 'https://jsonotron.org/test/size', refTypeName: 'string', refTypeArrayCount: 0, isScalarRef: true },
    { name: 'https://jsonotron.org/alt/direction', refTypeName: 'string', refTypeArrayCount: 0, isScalarRef: true },
    { name: 'https://jsonotron.org/test/bed_make', refTypeName: 'string', refTypeArrayCount: 0, isScalarRef: true },
    { name: 'https://jsonotron.org/test/bed_pillow', refTypeName: 'https://jsonotron.org/test/pillow', refTypeArrayCount: 0, isScalarRef: false },
    { name: 'https://jsonotron.org/test/bed_direction', refTypeName: 'https://jsonotron.org/alt/direction', refTypeArrayCount: 0, isScalarRef: false }
  ]))

  expect(typeMap.objectTypes).toEqual(expect.arrayContaining([
    {
      name: 'https://jsonotron.org/test/bed',
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
