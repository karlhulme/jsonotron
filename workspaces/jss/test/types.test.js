const { expect, test } = require('@jest/globals')
const { Jsonotron } = require('jsonotron-js')
const { readdirSync, readFileSync } = require('fs')

test('The enum and schema types of the jsonotron standard library are valid.', () => {
  const enumTypeFileNames = readdirSync('./enumTypes')
  const enumTypes = enumTypeFileNames.map(f => readFileSync('./enumTypes/' + f, 'utf8'))

  const schemaTypeFileNames = readdirSync('./schemaTypes')
  const schemaTypes = schemaTypeFileNames.map(f => readFileSync('./schemaTypes/' + f, 'utf8'))

  expect(() => { new Jsonotron({ types: enumTypes.concat(schemaTypes) }) }).not.toThrow()
})
