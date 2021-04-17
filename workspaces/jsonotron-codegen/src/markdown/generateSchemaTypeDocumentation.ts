import { SchemaType } from 'jsonotron-interfaces'

export function generateSchemaTypeDocumentation (schemaType: SchemaType): string {
  return `
### ${schemaType.name}

**kind**: schema\\
**system**: ${schemaType.system}\\
**name**: ${schemaType.name}

${schemaType.validTestCases
  .filter(testCase => testCase.documentation)
  .map((testCase, index) => {
    return `#### Example ${index + 1}\n\n` +
      testCase.documentation + '\n\n' +
      '```json\n' +
      JSON.stringify(testCase.value, null, 2) + '\n' +
      '```\n'
    })
  .join('\n')
}

${`#### Schema\n\n\n` + '```json\n' + JSON.stringify(schemaType.jsonSchema, null, 2) + '\n```\n'}
`
}
