/**
 * Creates a JSON Schema for validating field block definitions.
 * @param {Object} options An options object.
 * @param {Boolean} options.includeDocs True if the documentation fields should be mandatory.
 */
export function createFieldBlockDefinitionSchema () {
  return {
    title: 'Field Block Type Schema',
    type: 'object',
    description: 'The definition of a field block.',
    properties: {
      name: { type: 'string', description: 'The name of the field block.', minLength: 1 },
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
            isArray: { type: 'boolean', description: 'True if the field is an array of values.' }
          },
          required: ['type']
        }
      }
    },
    required: ['name', 'fields']
  }
}
