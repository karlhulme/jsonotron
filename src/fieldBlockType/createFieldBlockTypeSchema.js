/**
 * Creates a JSON Schema for validating field block types.
 * @param {Object} options An options object.
 * @param {Boolean} options.includeDocs True if the documentation fields should be mandatory.
 */
export function createFieldBlockTypeSchema ({ includeDocs } = {}) {
  return {
    title: includeDocs ? 'Field Block Type (with Documentation) Schema' : 'Field Block Type Schema',
    type: 'object',
    description: includeDocs ? 'The definition of a field block including documentation.' : 'The definition of a field block.',
    properties: {
      name: { type: 'string', description: 'The name of the field block.', minLength: 1 },
      title: { type: 'string', description: 'The title (display name) of the field block type.' },
      paragraphs: {
        type: 'array',
        description: 'An array of paragraphs that describe the usage of the schema type.',
        minItems: includeDocs ? 1 : 0,
        items: { type: 'string' }
      },
      fields: {
        type: 'object',
        additionalProperties: {
          type: 'object',
          properties: {
            type: { type: 'string', description: 'The enum or schema type.  This value can be namespaced.', pattern: '^([_a-zA-Z][_a-zA-Z0-9]*[.])?[_a-zA-Z][_a-zA-Z0-9]*$' },
            const: { type: 'string', description: 'The only value that can appear in the field.  Set the type to string.' },
            default: { type: ['string', 'boolean', 'number', 'object', 'array'] },
            isRequired: { type: 'boolean', description: 'True if the field must be supplied.' },
            isNullable: { type: 'boolean', description: 'True if the field can be null.' },
            isArray: { type: 'boolean', description: 'True if the field is an array of values.' },
            flags: {
              type: 'object',
              description: 'A set of documentation flags.',
              properties: {
                updateable: { type: 'boolean', description: 'Indicates the field can be updated by a client.' },
                guaranteed: { type: 'boolean', description: 'Indicates the field value will always be populated.  This phrasing makes more sense than isRequired when passing data from a server to a client.' },
                deprecated: { type: ['string', 'boolean'], description: 'Indicates the field is no longer in active use.  If a string is supplied, it should indicate the field(s) to use instead.' }
              }
            },
            paragraphs: {
              type: 'array',
              description: 'An array of paragraphs that describe the usage of the field.',
              minItems: includeDocs ? 1 : 0,
              items: { type: 'string' }
            }
          },
          required: ['type'].concat(includeDocs ? ['paragraphs'] : [])
        }
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
        description: 'An array of examples showing the field block type in use.'
      }
    },
    required: ['name', 'fields'].concat(includeDocs ? ['title', 'paragraphs', 'examples'] : [])
  }
}
