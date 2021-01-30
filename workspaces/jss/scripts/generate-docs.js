const { Jsonotron } = require('jsonotron-js')
const { readdirSync, readFileSync, writeFileSync } = require('fs')

const enumTypeFileNames = readdirSync('./enumTypes')
const enumTypes = enumTypeFileNames.map(f => readFileSync('./enumTypes/' + f, 'utf8'))

const schemaTypeFileNames = readdirSync('./schemaTypes')
const schemaTypes = schemaTypeFileNames.map(f => readFileSync('./schemaTypes/' + f, 'utf8'))

const jsonotron = new Jsonotron({ types: enumTypes.concat(schemaTypes) })

const markdown = jsonotron.getMarkdownForTypeSystem({ title: 'Jsonotron Standard System', domain: 'https://jsonotron.org', system: 'jss', referencedTypeSystems: [] })

writeFileSync('./readme.md', markdown)
