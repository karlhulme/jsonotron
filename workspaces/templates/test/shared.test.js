const { expect, test } = require('@jest/globals')

test('Prevent warnings about empty test library.', () => {
  expect(1 + 1).toEqual(2)
})

function createSampleTypeLibrary () {
  return {
    arrayTypes: [],
    boolTypes: [],
    enumTypes: [],
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
      name: 'table',
      summary: 'A table.',
      properties: [{
        name: 'numberOfLegs',
        propertyType: 'jss/positiveInteger',
        summary: 'The number of legs under the table.',
        isRequired: true
      }],
      validTestCases: [{
        value: {
          numberOfLegs: 5
        }
      }]
    }],
    stringTypes: []
  }
}

module.exports = {
  createSampleTypeLibrary
}
