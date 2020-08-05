module.exports = {
  title: 'Field Type Schema',
  type: 'object',
  description: 'The definition of a field type.',
  properties: {
    name: { type: 'string', pattern: '^[_a-zA-Z][_a-zA-Z0-9]*$', description: 'The field type name.' },
    type: { enum: ['field'], description: 'Indicates this field type is based on a JSON schema when stored alongside other field types.' },
    title: { type: 'string', description: 'The title (display name) of the field type.' },
    category: { type: 'string', description: 'The category name.' },
    paragraphs: {
      type: 'array',
      description: 'An array of paragraphs that describe the usage of the field.',
      items: { type: 'string' }
    },
    examples: {
      type: 'array',
      description: 'An array of examples showing the field in use.',
      items: {
        type: 'object',
        properties: {
          value: {},
          paragraphs: {
            type: 'array',
            description: 'An array of paragraphs that describe the example.',
            items: { type: 'string' }
          }
        },
        required: ['value']
      }
    },
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
      description: 'A JSON schema that governs values for this field type.  A function can be defined that is given the path to shared definitions as the sole parameter.'
    },
    referencedFieldTypes: {
      type: 'array',
      description: 'An array of the field types referenced directly by this field type.',
      items: { type: 'string' }
    },
    referencedEnumTypes: {
      type: 'array',
      description: 'An array of the enum types referenced directly by this field type.',
      items: { type: 'string' }
    }
  },
  required: ['name', 'jsonSchema']
}
