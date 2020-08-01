module.exports = {
  title: 'Document Type Documentation Schema',
  type: 'object',
  description: 'The definition of a document type documentation file.',
  additionalProperties: false,
  properties: {
    name: { type: 'string', description: 'Internal singular name.' },
    lang: { type: 'string', description: 'The language.', pattern: '^[a-z]{2}(-[a-z]{2})?$' },
    title: { type: 'string', description: 'Display singular name.' },
    pluralTitle: { type: 'string', description: 'Display plural name.' },
    paragraphs: { type: 'array', items: { type: 'string' } },

    /* The fields that are stored in the database for this doc type. */
    fields: {
      type: 'object',
      description: 'The set of fields for the document type, keyed by name.',
      additionalProperties: {
        type: 'object',
        description: 'Each property describes a field on the document type.',
        additionalProperties: false,
        properties: {
          paragraphs: { type: 'array', items: { type: 'string' }, description: 'An array of markdown passages.' },
          deprecationParagraphs: { type: 'array', items: { type: 'string' }, description: 'An array of markdown passages that indicate which fields to use instead of the deprecated one.' }
        },
        required: ['paragraphs']
      }
    },

    /* The fields that are derivable from existing fields. */
    calculatedFields: {
      type: 'object',
      description: 'The set of calculated fields, keyed by name.',
      additionalProperties: {
        type: 'object',
        description: 'Each property describes a calculated field.',
        additionalProperties: false,
        properties: {
          paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the calculated field.' }
        },
        required: ['paragraphs']
      }
    },

    /* The example documents. */
    examples: {
      type: 'array',
      minItems: 1,
      description: 'An array of examples showing the document type in use.',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          value: {
            type: 'object',
            additionalProperties: true
          },
          paragraphs: {
            type: 'array',
            items: { type: 'string' },
            description: 'An array of paragraphs that describe the example.'
          }
        },
        required: ['value']
      }
    },

    /* A set of functions for retrieving a subset of the docs from the database. */
    filters: {
      type: 'object',
      description: 'The description of the filters, keyed by name.',
      additionalProperties: {
        type: 'object',
        description: 'Each property defines a filter',
        additionalProperties: false,
        properties: {
          description: { type: 'array', items: { type: 'string' }, description: 'The description of the filter.' },
          parameters: {
            type: 'object',
            description: 'The set of filter parameters',
            additionalProperties: {
              type: 'object',
              description: 'Each property defines a filter parameter.',
              additionalProperties: false,
              properties: {
                paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the usage or purpose of the filter parameter.' }
              },
              required: ['paragraphs']
            }
          },
          examples: {
            type: 'array',
            minItems: 1,
            description: 'An array of examples showing the document type in use.',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                value: {
                  type: 'object',
                  additionalProperties: true
                },
                paragraphs: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'An array of paragraphs that describe the example.'
                }
              },
              required: ['value']
            }
          }
        },
        required: ['parameters', 'examples']
      }
    },

    /* A function that creates a new instance of this document. */
    ctor: {
      type: 'object',
      description: 'A mechanism for constructing new instances of the document type.',
      additionalProperties: false,
      properties: {
        parameters: {
          type: 'object',
          description: 'A set of constructor parameters, keyed by name.',
          additionalProperties: {
            type: 'object',
            description: 'Each property defines a constructor parameter.',
            additionalProperties: false,
            properties: {
              paragraphs: { type: 'string', items: { type: 'string' }, description: 'The description of the constructor parameter.' }
            },
            required: ['paragraphs']
          }
        },
        examples: {
          type: 'array',
          minItems: 1,
          description: 'An array of examples showing the document type in use.',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              value: {
                type: 'object',
                additionalProperties: true
              },
              paragraphs: {
                type: 'array',
                items: { type: 'string' },
                description: 'An array of paragraphs that describe the example.'
              }
            },
            required: ['value']
          }
        }
      },
      required: ['parameters', 'examples']
    },

    /* A set of functions that are used to operate on the document. */
    operations: {
      type: 'object',
      description: 'A set of operations, keyed by name.',
      additionalProperties: {
        type: 'object',
        description: 'Each property defines an operation.',
        additionalProperties: false,
        properties: {
          title: { type: 'string', description: 'The display name of the operation.' },
          paragraphs: { type: 'array', items: { type: 'string' }, description: 'A description of the operation.' },
          parameters: {
            type: 'object',
            description: 'A set of operation parameters, keyed by name.',
            additionalProperties: {
              type: 'object',
              description: 'Each property defines a operation parameter.',
              properties: {
                paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the operation parameter.' }
              },
              required: ['paragraphs']
            }
          },
          examples: {
            type: 'array',
            minItems: 1,
            description: 'An array of examples showing the document type in use.',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                value: {
                  type: 'object',
                  additionalProperties: true
                },
                paragraphs: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'An array of paragraphs that describe the example.'
                }
              },
              required: ['value']
            }
          }
        },
        required: ['title', 'paragraphs', 'parameters', 'examples']
      }
    }
  },
  required: [
    'name', 'lang', 'title', 'pluralTitle', 'paragraphs', 'fields'
  ]
}
