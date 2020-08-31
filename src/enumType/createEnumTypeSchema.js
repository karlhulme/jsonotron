export function createEnumTypeSchema ({ includeDocs } = {}) {
  return {
    title: includeDocs ? 'Enum Type (with Documentation) Schema' : 'Enum Type Schema',
    type: 'object',
    description: includeDocs ? 'The definition of an enum type including documentation.' : 'The definition of an enum type.',
    properties: {
      name: { type: 'string', description: 'The enum type name.', pattern: '^[_a-zA-Z][_a-zA-Z0-9]*$' },
      title: { type: 'string', description: 'The title (display name) of the enum type.' },
      paragraphs: {
        type: 'array',
        description: 'An array of paragraphs that describe the usage of the field.',
        minItems: includeDocs ? 1 : 0,
        items: { type: 'string' }
      },
      items: {
        type: 'array',
        description: 'An array of all the possible values for the enum field.',
        minItems: 1,
        items: {
          type: 'object',
          properties: {
            value: { type: ['string', 'boolean'], description: 'A value.' },
            symbol: { type: 'string', description: 'A symbol that represents the enum value.' },
            isDeprecated: { type: 'boolean', description: 'True if the value is no longer in use.' },
            paragraphs: {
              type: 'array',
              description: 'The English display text of the value.',
              minItems: includeDocs ? 1 : 0,
              items: { type: 'string' }
            }
          },
          required: ['value'].concat(includeDocs ? ['paragraphs'] : [])
        }
      }
    },
    required: ['name', 'items'].concat(includeDocs ? ['title', 'paragraphs'] : [])
  }
}
