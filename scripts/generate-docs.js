const { Jsonotron } = require('jsonotron-js')
const { readdirSync, readFileSync, writeFileSync } = require('fs')

const enumTypeFileNames = readdirSync('./systems/jsl/enumTypes/')
const enumTypes = enumTypeFileNames.map(f => readFileSync('./systems/jsl/enumTypes/' + f, 'utf8'))

const schemaTypeFileNames = readdirSync('./systems/jsl/schemaTypes/')
const schemaTypes = schemaTypeFileNames.map(f => readFileSync('./systems/jsl/schemaTypes/' + f, 'utf8'))

const jsonotron = new Jsonotron({ types: enumTypes.concat(schemaTypes) })

const markdown = jsonotron.getMarkdownForTypeSystem({ title: 'Jsonotron Standard Library', domain: 'https://jsonotron.org', system: 'jsl', referencedTypeSystems: [] })

writeFileSync('./systems/jsl/docs.autogen.md', markdown)
