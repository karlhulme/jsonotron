export function createSchemaTypeSchema ({ includeDocs, includeTests } = {}) {
  return {
    title: 'Schema Type Schema',
    type: 'object',
    description: 'The definition of a schema type.',
    properties: {
      name: { type: 'string', description: 'The schema type name.', pattern: '^([_a-zA-Z][_a-zA-Z0-9]*[.])?[_a-zA-Z][_a-zA-Z0-9]*$' },
      title: { type: 'string', description: 'The title (display name) of the schema type.' },
      paragraphs: {
        type: 'array',
        description: 'An array of paragraphs that describe the usage of the schema type.',
        minItems: includeDocs ? 1 : 0,
        items: { type: 'string' }
      },
      examples: {
        type: 'array',
        minItems: includeDocs ? 1 : 0,
        items: {
          type: 'object',
          properties: {
            value: {},
            paragraphs: {
              type: 'array',
              description: 'An array of paragraphs that describe the example.',
              minItems: includeDocs ? 1 : 0,
              items: { type: 'string' }
            }
          },
          required: ['value'].concat(includeDocs ? ['paragraphs'] : [])
        },
        description: 'An array of examples showing the schema type in use.'
      },
      validTestCases: {
        type: 'array',
        minItems: includeTests ? 1 : 0,
        description: 'An array of valid values used for testing the json schema of the schema type that does not form part of the documentation.'
      },
      invalidTestCases: {
        type: 'array',
        minItems: includeTests ? 1 : 0,
        description: 'An array of invalid values for the schema type.'
      },
      jsonSchema: {
        type: 'object',
        description: 'A JSON schema that governs values for this schema type.'
      },
      referencedSchemaTypes: {
        type: 'array',
        description: 'An array of the schema types referenced directly by this schema type.',
        items: { type: 'string' }
      },
      referencedEnumTypes: {
        type: 'array',
        description: 'An array of the enum types referenced directly by this schema type.',
        items: { type: 'string' }
      }
    },
    required: ['name', 'jsonSchema'].concat(includeDocs ? ['title', 'paragraphs', 'examples'] : []).concat(includeTests ? ['validTestCases', 'invalidTestCases'] : [])
  }
}
