module.exports = {
  title: 'Field Type Schema',
  type: 'object',
  description: 'The definition of a field type.',
  oneOf: [
    /* Schema-based Field */
    {
      additionalProperties: false,
      properties: {
        name: { type: 'string', description: 'The field name.' },
        type: { const: 'schema', description: 'The field is backed by a schema.' },
        category: { type: 'string', description: 'The category name.' },
        validTestCases: {
          type: 'array',
          description: 'An array of valid values used for testing the field that does not form part of the documentation.'
        },
        invalidTestCases: {
          type: 'array',
          description: 'An array of invalid values for the field.'
        },
        jsonSchema: {
          customTypeOf: ['object', 'function'],
          additionalProperties: true,
          description: 'A JSON schema that governs values for this field type.  A function can be defined that is given the path to shared definitions as the sole parameter.'
        },
        referencedFieldTypes: {
          type: 'array',
          description: 'An array of the field types referenced directly or indirectly by this field.',
          items: { type: 'string' }
        }
      },
      required: ['name', 'type', 'category', 'validTestCases', 'invalidTestCases', 'jsonSchema']
    },
    /* Enum Field */
    {
      additionalProperties: false,
      properties: {
        name: { type: 'string', description: 'The field name.' },
        type: { const: 'enum', description: 'The field is an enumeration.' },
        category: { type: 'string', description: 'The category name.' },
        values: {
          type: 'array',
          description: 'An array of all the possible values for the enum field.',
          items: {
            type: 'object',
            properties: {
              value: { type: ['string', 'number', 'boolean'], description: 'A value.' },
              symbol: { type: 'string', description: 'A symbol that represents the enum value.' }
            },
            required: ['value']
          }
        }
      },
      required: ['name', 'type', 'category', 'values']
    }
  ]
}
