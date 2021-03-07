const { Jsonotron } = require('jsonotron-js')
const { MarkdownGenerator } = require('jsonotron-codegen')
const { readdirSync, readFileSync, writeFileSync } = require('fs')

const enumTypeFileNames = readdirSync('./enumTypes')
const enumTypes = enumTypeFileNames.map(f => readFileSync('./enumTypes/' + f, 'utf8'))

const schemaTypeFileNames = readdirSync('./schemaTypes')
const schemaTypes = schemaTypeFileNames.map(f => readFileSync('./schemaTypes/' + f, 'utf8'))

const jsonotron = new Jsonotron({ types: enumTypes.concat(schemaTypes) })

const systems = [
  'https://jsonotron.org/jss'
]

const markdownGenerator = new MarkdownGenerator()
const markdown = markdownGenerator.generate({
  enumTypes: jsonotron.getEnumTypes(systems),
  schemaTypes: jsonotron.getSchemaTypes(systems)
})

writeFileSync('./readme.md', markdown)
