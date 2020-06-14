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
          description: 'A JSON schema that governs values for this field type.  A function can be defined that is given the path to shared definitions as the sole parameter.'
        },
        referencedFieldTypes: {
          type: 'array',
          description: 'An array of the field types referenced directly or indirectly by this field.',
          items: { type: 'string' }
        },
        customFormatValidators: {
          type: 'object',
          description: 'A set of format validators that can be referenced in the JSON schema to provide additional validation of strings.',
          additionalProperties: {
            customTypeOf: 'function',
            description: 'A function that returns true if the given value has a valid format.'
          }
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
