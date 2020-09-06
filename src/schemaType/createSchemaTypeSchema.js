/**
 * Creates a JSON Schema for validating schema types.
 * @param {Object} options An options object.
 * @param {Boolean} options.includeDocs True if the documentation fields should be mandatory.
 */
export function createSchemaTypeSchema ({ includeDocs } = {}) {
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
        description: 'An array of valid values used for testing the json schema of the schema type that does not form part of the documentation.'
      },
      invalidTestCases: {
        type: 'array',
        description: 'An array of invalid values for the schema type.'
      },
      jsonSchema: {
        type: 'object',
        description: 'A JSON schema that governs values for this schema type.'
      }
    },
    required: ['name', 'jsonSchema'].concat(includeDocs ? ['title', 'paragraphs', 'examples'] : [])
  }
}
