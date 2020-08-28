module.exports = {
  title: 'Document Type Schema',
  type: 'object',
  description: 'The definition of a document type.',
  properties: {
    name: { type: 'string', pattern: '^[_a-zA-Z][_a-zA-Z0-9]*$', description: 'The doc type name.' },
    pluralName: { type: 'string', pattern: '^[_a-zA-Z][_a-zA-Z0-9]*$', description: 'The doc type plural name.' },
    title: { type: 'string', description: 'The title (display name) of the doc type.' },
    pluralTitle: { type: 'string', description: 'The plural title when there are more than one document.' },
    summary: { type: 'string', description: 'A plain text summary of the document.' },
    paragraphs: {
      type: 'array',
      description: 'An array of paragraphs that describe the usage of the document.',
      items: { type: 'string' }
    },

    /* The fields that are stored in the database for this doc type. */
    fields: {
      type: 'object',
      description: 'The set of fields for the document type, keyed by name.',
      additionalProperties: {
        type: 'object',
        description: 'Each property defines a field on the document type.',
        properties: {
          type: { type: 'string', description: 'Type of the document field.' },
          default: { type: ['string', 'number', 'boolean', 'object', 'array'], description: 'The value to be returned on a query if a value is not supplied by the store.' },
          isArray: { type: 'boolean', description: 'True if this field is an array.' },
          isRequired: { type: 'boolean', description: 'True if this field must always be populated in a saved document.' },
          isDeprecated: { type: 'boolean', description: 'True if this field is deprecated.' },
          canUpdate: { type: 'boolean', description: 'True if this field can be updated via a merge patch rather than an operation.' },
          paragraphs: { type: 'array', items: { type: 'string' }, description: 'An array of markdown passages.  If the field is deprecated the paragraphs should include which fields to use instead.' }
        },
        required: ['type']
      }
    },

    /* A function (doc) that can perform cleanup adjustments on a document, such as removing
       deprecated fields. */
    preSave: { customTypeOf: 'function', description: 'A function (doc) that can performs cleanup directly on the document.' },

    /* A function (doc) that raises an Error if the given doc does not contain valid field values.
       This function is used to perform validation where fields might depend upon each other. */
    validate: { customTypeOf: 'function', description: 'A function (doc) that raises an Error if the given doc is in an invalid state.' },

    /* Examples that show the content of the documents when populated. */
    examples: {
      type: 'array',
      description: 'An array of examples that show the content of the documents when populated.',
      items: {
        type: 'object',
        properties: {
          value: { type: 'object' },
          paragraphs: { type: 'array', items: { type: 'string' }, description: 'An array of paragraphs that describe the example.' }
        },
        required: ['value']
      }
    },

    /* Examples that show a merge patch. */
    patchExamples: {
      type: 'array',
      description: 'An array of examples that show a merge patch.',
      items: {
        type: 'object',
        properties: {
          value: { type: 'object' },
          paragraphs: { type: 'array', items: { type: 'string' }, description: 'An array of paragraphs that describe the example.' }
        },
        required: ['value']
      }
    },

    /* The fields that are derivable from existing fields. */
    calculatedFields: {
      type: 'object',
      description: 'The set of calculated fields, keyed by name.',
      additionalProperties: {
        type: 'object',
        description: 'Each property defines a calculated field.',
        properties: {
          inputFields: { type: 'array', items: { type: 'string' } },
          type: { type: 'string', description: 'Type of the calculated field.' },
          isArray: { type: 'boolean', description: 'True if this calculated field is an array.' },
          value: { customTypeOf: 'function' },
          paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the calculated field.' }
        },
        required: ['inputFields', 'type', 'value']
      }
    },

    /* A set of functions for retrieving a subset of the docs from the database. */
    filters: {
      type: 'object',
      description: 'The set of filters, keyed by name.',
      additionalProperties: {
        type: 'object',
        description: 'Each property defines a filter',
        properties: {
          title: { type: 'string', description: 'The display name of the filter.' },
          paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the filter.' },
          parameters: {
            type: 'object',
            description: 'The set of filter parameters',
            additionalProperties: {
              type: 'object',
              description: 'Each property defines a filter parameter.',
              properties: {
                type: { type: 'string', description: 'The field type of the filter parameter.' },
                isArray: { type: 'boolean', description: 'True if this filter parameter is an array.' },
                isRequired: { type: 'boolean', description: 'True if the parameter must be supplied.' },
                isDeprecated: { type: 'boolean', description: 'True if this parameter is deprecated.' },
                paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the filter parameter.' }
              },
              required: ['type']
            }
          },
          implementation: { customTypeOf: 'function', description: 'A function that returns an object or value that the document store is able to interpret as a filter.' },
          examples: {
            type: 'array',
            description: 'An array of examples showing the filter in use.',
            items: {
              type: 'object',
              properties: {
                value: { type: 'object' },
                paragraphs: { type: 'array', items: { type: 'string' }, description: 'An array of paragraphs that describe the filter example.' }
              },
              required: ['value']
            }
          },
          isDeprecated: { type: 'boolean', description: 'True if this filter is deprecated.' }
        },
        required: ['implementation']
      }
    },

    /* A function that creates a new instance of this document. */
    ctor: {
      type: 'object',
      description: 'A mechanism for constructing new instances of the document type.',
      properties: {
        title: { type: 'string', description: 'The display name of the constructor.' },
        paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the constructor.' },
        parameters: {
          type: 'object',
          description: 'A set of constructor parameters, keyed by name.',
          additionalProperties: {
            type: 'object',
            description: 'Each property defines a constructor parameter.',
            properties: {
              type: { type: 'string', description: 'Type of the constructor parameter.' },
              isArray: { type: 'boolean', description: 'True if this constructor parameter is an array.' },
              isRequired: { type: 'boolean', description: 'True if this parameter must be provided.' },
              isDeprecated: { type: 'boolean', description: 'True if this parameter is deprecated.' },
              paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the usage or purpose of the constructor parameter.' }
            },
            required: ['type']
          }
        },
        implementation: { customTypeOf: 'function', description: 'A function that returns an initial document.' },
        examples: {
          type: 'array',
          description: 'An array of examples showing the constructor in use.',
          items: {
            type: 'object',
            properties: {
              value: { type: 'object' },
              paragraphs: { type: 'array', items: { type: 'string' }, description: 'An array of paragraphs that describe the constructor example.' }
            },
            required: ['value']
          }
        }
      },
      required: []
    },

    /* A set of functions that are used to operate on the document. */
    operations: {
      type: 'object',
      description: 'A set of operations, keyed by name.',
      additionalProperties: {
        type: 'object',
        description: 'Each property defines an operation.',
        properties: {
          title: { type: 'string', description: 'The display name of the operation.' },
          paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the operation.' },
          parameters: {
            type: 'object',
            description: 'A set of operation parameters, keyed by name.',
            additionalProperties: {
              type: 'object',
              description: 'Each property defines a operation parameter.',
              properties: {
                type: { type: 'string', description: 'Type of the operation parameter.' },
                isArray: { type: 'boolean', description: 'True if this operation parameter is an array.' },
                isRequired: { type: 'boolean', description: 'True if this parameter must be provided.' },
                isDeprecated: { type: 'boolean', description: 'True if this parameter is deprecated.' },
                paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the usage or purpose of the operation parameter.' }
              },
              required: ['type']
            }
          },
          implementation: { customTypeOf: 'function', description: 'A function that returns a merge patch to be applied to the document' },
          examples: {
            type: 'array',
            description: 'An array of examples showing the operation in use.',
            items: {
              type: 'object',
              properties: {
                value: { type: 'object' },
                paragraphs: { type: 'array', items: { type: 'string' }, description: 'An array of paragraphs that describe the operation example.' }
              },
              required: ['value']
            }
          },
          isDeprecated: { type: 'boolean', description: 'True if this operation is deprecated.' }
        },
        required: []
      }
    },

    /* Parameters that determine how the doc type is handled. */
    policy: {
      type: 'object',
      properties: {
        canDeleteDocuments: { type: 'boolean' },
        canFetchWholeCollection: { type: 'boolean' },
        canReplaceDocuments: { type: 'boolean' },
        maxOpsSize: { type: 'number' }
      }
    },

    /* Any options that should be passed to the document store. */
    docStoreOptions: {
      type: 'object'
    }
  },
  required: ['name', 'pluralName']
}
