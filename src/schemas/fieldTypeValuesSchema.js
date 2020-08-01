module.exports = {
  title: 'Field Type Values Schema',
  type: 'object',
  description: 'The values of a field type.',
  additionalProperties: false,
  properties: {
    name: { type: 'string', description: 'The field name.' },
    lang: { type: 'string', description: 'The language.', pattern: '^[a-z]{2}(-[a-z]{2})?$' },
    values: {
      type: 'array',
      minItems: 1,
      description: 'An array of values and the translations.',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          value: { type: ['string', 'integer', 'boolean'] },
          text: { type: 'string' }
        },
        required: ['value', 'text']
      }
    }
  },
  required: ['name', 'lang', 'values']
}
