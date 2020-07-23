module.exports = {
  title: 'Field Type Docs Schema',
  type: 'object',
  description: 'The documentation of a field type.',
  additionalProperties: false,
  properties: {
    name: { type: 'string', description: 'The field name.' },
    lang: { type: 'string', description: 'The language.', pattern: '^[a-z]{2}$' },
    title: { type: 'string', description: 'The title (display name) of the field.' },
    paragraphs: {
      type: 'array',
      minItems: 1,
      description: 'An array of paragraphs that describe the usage of the field.',
      items: { type: 'string' }
    },
    examples: {
      type: 'array',
      minItems: 1,
      description: 'An array of examples showing the field in use.',
      items: {
        type: 'object',
        additionalProperties: false,
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
    }
  },
  required: ['name', 'lang', 'title', 'paragraphs', 'examples']
}
