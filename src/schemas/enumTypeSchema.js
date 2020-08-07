module.exports = {
  title: 'Enum Type Schema',
  type: 'object',
  description: 'The definition of an enum type.',
  properties: {
    name: { type: 'string', pattern: '^[_a-zA-Z][_a-zA-Z0-9]*$', description: 'The enum type name.' },
    type: { enum: ['enum'], description: 'Indicates this field type is based on an enum when stored alongside other field types.' },
    title: { type: 'string', description: 'The title (display name) of the enum type.' },
    paragraphs: {
      type: 'array',
      description: 'An array of paragraphs that describe the usage of the field.',
      items: { type: 'string' }
    },
    items: {
      type: 'array',
      minItems: 1,
      description: 'An array of all the possible values for the enum field.',
      items: {
        type: 'object',
        properties: {
          value: { type: ['string', 'integer', 'boolean'], description: 'A value.' },
          symbol: { type: 'string', description: 'A symbol that represents the enum value.' },
          deprecated: { type: 'boolean', description: 'True if the value is no longer in use.' },
          paragraphs: { type: 'array', items: { type: 'string' }, description: 'The English display text of the value.' }
        },
        required: ['value']
      }
    }
  },
  required: ['name', 'items']
}
