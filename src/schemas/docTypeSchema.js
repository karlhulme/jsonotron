module.exports = {
  title: 'Document Type Schema',
  type: 'object',
  description: 'The definition of a document type.',
  additionalProperties: false,
  properties: {
    name: { type: 'string', description: 'Internal singular name.' },
    pluralName: { type: 'string', description: 'Internal plural name.' },

    /* The fields that are stored in the database for this doc type. */
    fields: {
      type: 'object',
      description: 'The set of fields for the document type, keyed by name.',
      additionalProperties: {
        type: 'object',
        description: 'Each property defines a field on the document type.',
        properties: {
          type: { type: 'string', description: 'Type of the document field.' },
          isRequired: { type: 'boolean', description: 'True if this field must always be populated.' },
          isArray: { type: 'boolean', description: 'True if this field is an array.' },
          deprecation: { type: 'string', description: 'A description of the field(s) that should be used in place of this deprecated one.' },
          default: { type: ['string', 'number', 'boolean', 'object', 'array'], description: 'The value to be returned on a query if a value is not supplied by the store.' },
          canUpdate: { type: 'boolean', description: 'True if this field can be updated via a merge patch rather than an operation.' }
        },
        required: ['type']
      }
    },

    /* A function (doc) that can perform cleanup adjustments on a document, such as removing
       deprecated fields. */
    preSave: { customTypeOf: 'function' },

    /* A function (doc) that raises an Error if the given doc does not contain valid field values.
       This function is used to perform validation where fields might depend upon each other. */
    validate: { customTypeOf: 'function' },

    /* The fields that are derivable from existing fields. */
    calculatedFields: {
      type: 'object',
      description: 'The set of calculated fields, keyed by name.',
      additionalProperties: {
        type: 'object',
        description: 'Each property defines a calculated field.',
        additionalProperties: false,
        properties: {
          inputFields: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          type: { type: 'string', description: 'Type of the calculated field.' },
          isArray: { type: 'boolean', description: 'True if this calculated field is an array.' },
          value: { customTypeOf: 'function' }
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
        additionalProperties: false,
        properties: {
          parameters: {
            type: 'object',
            description: 'The set of filter parameters',
            additionalProperties: {
              type: 'object',
              description: 'Each property defines a filter parameter.',
              additionalProperties: false,
              properties: {
                type: { type: 'string', description: 'The field type of the filter parameter.' },
                isArray: { type: 'boolean', description: 'True if this filter parameter is an array.' },
                isRequired: { type: 'boolean', description: 'True if the parameter must be supplied.' }
              },
              required: ['type']
            }
          },
          implementation: { customTypeOf: 'function' }
        },
        required: ['parameters', 'implementation']
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
            oneOf: [{
              additionalProperties: false,
              properties: {
                type: { type: 'string', description: 'Type of the constructor parameter.' },
                isArray: { type: 'boolean', description: 'True if this constructor parameter is an array.' },
                isRequired: { type: 'boolean', description: 'True if this parameter must be provided.' }
              },
              required: ['type']
            }, {
              additionalProperties: false,
              properties: {
                lookup: { enum: ['field'], description: 'Indicates the definition of this parameter should be taken from the document fields.' },
                isRequired: { type: 'boolean', description: 'True if this parameter must be provided.' }
              },
              required: ['lookup']
            }]
          }
        },
        implementation: { customTypeOf: 'function' }
      },
      required: ['parameters', 'implementation']
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
          parameters: {
            type: 'object',
            description: 'A set of operation parameters, keyed by name.',
            additionalProperties: {
              type: 'object',
              oneOf: [{
                additionalProperties: false,
                properties: {
                  type: { type: 'string', description: 'Type of the operation parameter.' },
                  isArray: { type: 'boolean', description: 'True if this operation parameter is an array.' },
                  isRequired: { type: 'boolean', description: 'True if this parameter must be provided.' }
                },
                required: ['type']
              }, {
                additionalProperties: false,
                properties: {
                  lookup: { enum: ['field'], description: 'Indicates the definition of this parameter should be taken from the document fields.' },
                  isRequired: { type: 'boolean', description: 'True if this parameter must be provided.' }
                },
                required: ['lookup']
              }],
              description: 'Each property defines a operation parameter.'
            }
          },
          implementation: { customTypeOf: 'function' }
        },
        required: ['parameters', 'implementation']
      }
    },

    /* Parameters that determine how the doc type is handled. */
    policy: {
      type: 'object',
      additionalProperties: false,
      properties: {
        canDeleteDocuments: { type: 'boolean' },
        canFetchWholeCollection: { type: 'boolean' },
        canReplaceDocuments: { type: 'boolean' },
        maxOpsSize: { type: 'number' }
      }
    },

    /* Any options that should be passed to the document store. */
    docStoreOptions: {
      type: 'object',
      additionalProperties: true
    }
  },
  required: [
    'name', 'pluralName', 'fields'
  ]
}
