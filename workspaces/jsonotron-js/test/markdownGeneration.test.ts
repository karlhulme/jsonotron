import { expect, test } from '@jest/globals'
import fs from 'fs'
import { Jsonotron } from '../src'

test('A jsonotron can produce markdown documentation.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const directionType = fs.readFileSync('./test/testTypes/direction.yaml', 'utf-8')
  const householdType = fs.readFileSync('./test/testTypes/household.yaml', 'utf-8')
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const stringType = fs.readFileSync('./test/testTypes/string.yaml', 'utf-8')

  const jsonotron = new Jsonotron({
    types: [colorType, directionType, householdType, positiveIntegerType, stringType],
    jsonSchemaFormatValidators: {
      testFormatFunc: v => v.length > 5
    }
  })

  const markdown = jsonotron.getMarkdownForTypeSystem({
    title: 'Test Markdown',
    domain: 'https://jsonotron.org',
    system: 'test',
    referencedTypeSystems: [{
      domain: 'https://external.org',
      system: 'core',
      href: 'https://example.com'
    }]
  })

  expect(markdown).toContain('Test Markdown')
  expect(markdown).toContain('## Color')
  expect(markdown).toContain('## Direction')
  expect(markdown).toContain('## Household')
  expect(markdown).toContain('## Positive Integer')
})

