import { SchemaType } from '../interfaces'
import yaml from 'js-yaml'

/**
 * Creates markdown documentation for the given schema type.
 * @param schemaType A schema type.
 */
export function createMarkdownForSchemaType (schemaType: SchemaType): string {
  return `
## ${schemaType.title}

**kind**: schema\\
**name**: ${schemaType.name}\\
**uri**: ${schemaType.domain}/${schemaType.system}/${schemaType.name}

${schemaType.documentation}

${schemaType.examples
  .map((example, index) => {
    return `### Example ${index + 1}\n\n` +
      example.documentation + '\n\n' +
      '```json\n' +
      JSON.stringify(example.value, null, 2) + '\n' +
      '```\n'
    })
  .join('\n')
}

${`### Schema as JSON\n\n\n` + '```json\n' + JSON.stringify(schemaType.jsonSchema, null, 2) + '\n```\n'}

${`### Schema as YAML\n\n\n` + '```yaml\n' + yaml.safeDump(schemaType.jsonSchema, { indent: 2 }) + '\n```\n'}

  `
}
