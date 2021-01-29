const { Jsonotron } = require('jsonotron-js')
const { readdirSync, readFileSync, writeFileSync } = require('fs')

const enumTypeFileNames = readdirSync('./systems/jss/enumTypes/')
const enumTypes = enumTypeFileNames.map(f => readFileSync('./systems/jss/enumTypes/' + f, 'utf8'))

const schemaTypeFileNames = readdirSync('./systems/jss/schemaTypes/')
const schemaTypes = schemaTypeFileNames.map(f => readFileSync('./systems/jss/schemaTypes/' + f, 'utf8'))

const jsonotron = new Jsonotron({ types: enumTypes.concat(schemaTypes) })

const markdown = jsonotron.getMarkdownForTypeSystem({ title: 'Jsonotron Standard System', domain: 'https://jsonotron.org', system: 'jss', referencedTypeSystems: [] })

writeFileSync('./systems/jss/docs.autogen.md', markdown)
