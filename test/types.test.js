const { expect, test } = require('@jest/globals')
const { Jsonotron } = require('jsonotron-js')
const { readdirSync, readFileSync } = require('fs')

test('The enum and schema types are valid.', () => {
  const enumTypeFileNames = readdirSync('./types/enumTypes/')
  const enumTypes = enumTypeFileNames.map(f => readFileSync('./types/enumTypes/' + f, 'utf8'))

  const schemaTypeFileNames = readdirSync('./types/schemaTypes/')
  const schemaTypes = schemaTypeFileNames.map(f => readFileSync('./types/schemaTypes/' + f, 'utf8'))

  expect(() => new Jsonotron({ enumTypes, schemaTypes })).not.toThrow()
})


