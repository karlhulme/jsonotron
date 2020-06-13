module.exports = {
  title: 'Field Type Schema',
  type: 'object',
  description: 'The definition of a field type.',
  oneOf: [
    /* Regular Field */
    {
      additionalProperties: false,
      properties: {
        name: { type: 'string', description: 'Internal field name.' },
        title: { type: 'string', description: 'Display field name.' },
        description: { type: 'string', description: 'The description of the field.' },
        examples: {
          type: 'array',
          description: 'An array of valid examples values for the field.'
        },
        invalidExamples: {
          type: 'array',
          description: 'An array of invalid examples values for the field.'
        },
        jsonSchema: {
          customTypeOf: ['object', 'function'],
          additionalProperties: true,
          description: 'A JSON schema that governs values for this field type.'
        },
        referencedFieldTypes: {
          type: 'array',
          items: { type: 'string' },
          description: 'An array of the field types referenced directly or indirectly by this field.'
        }
      },
      required: ['name', 'title', 'description', 'examples', 'invalidExamples', 'jsonSchema']
    },
    /* Enum Field */
    {
      additionalProperties: false,
      properties: {
        name: { type: 'string', description: 'Internal field name.' },
        title: { type: 'string', description: 'Display field name.' },
        description: { type: 'string', description: 'The description of the enum field.' },
        values: {
          type: 'array',
          description: 'An array of all the possible values for the enum field.',
          items: {
            type: 'object',
            properties: {
              value: { type: ['string', 'number', 'boolean'], description: 'A value.' },
              description: { type: 'string', description: 'A description of the enum value.' }
            },
            required: ['value', 'description']
          }
        }
      },
      required: ['name', 'title', 'description', 'values']
    }
  ]
}
