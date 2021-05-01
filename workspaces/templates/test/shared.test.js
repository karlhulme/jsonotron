const { expect, test } = require('@jest/globals')

test('Prevent warnings about empty test library.', () => {
  expect(1 + 1).toEqual(2)
})

function createSampleTypeLibrary () {
  return {
    arrayTypes: [],
    boolTypes: [],
    enumTypes: [{
      kind: 'record',
      system: 'test',
      name: 'colors',
      summary: 'A set of colors.',
      items: [{
        value: 'red',
        text: 'Red',
        summary: 'The color red.'
      }, {
        value: 'blue',
        text: 'Blue',
        summary: 'The color blue.',
        symbol: 'BLU',
        deprecated: 'Use green instead of blue.'
      }]
    }],
    floatTypes: [],
    objectTypes: [],
    intTypes: [{
      kind: 'int',
      system: 'test',
      name: 'positiveInteger',
      summary: 'A positive integer.',
      minimum: 1,
      maximum: 10000
    }],
    recordTypes: [{
      kind: 'record',
      system: 'test',
      name: 'room',
      summary: 'A room.',
      properties: [{
        name: 'tables',
        propertyType: 'test/table',
        propertyTypeSystem: 'test',
        propertyTypeName: 'table',
        summary: 'The tables in the room.',
        isOptional: true,
        isArray: true,
        isRecord: true
      }, {
        name: 'color',
        propertyType: 'test/colors',
        propertyTypeSystem: 'test',
        propertyTypeName: 'colors',
        summary: 'The color of the room.',
        isOptional: true,
        isEnum: true,
      }]
    }, {
      kind: 'record',
      system: 'test',
      name: 'table',
      summary: 'A table.',
      properties: [{
        name: 'numberOfLegs',
        propertyType: 'test/positiveInteger',
        propertyTypeSystem: 'test',
        propertyTypeName: 'positiveInteger',
        summary: 'The number of legs under the table.',
        isRequired: true,
        isInt: true
      }],
      tags: ['special']
    }],
    stringTypes: []
  }
}

module.exports = {
  createSampleTypeLibrary
}
