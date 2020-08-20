module.exports = {
  title: 'API Resource Type Schema',
  type: 'object',
  description: 'The definition of a REST resource.',
  properties: {
    urlRoot: { type: 'string', description: 'The path to the root of the REST resource. e.g. /example' },
    title: { type: 'string', description: 'The title (display name) of the doc type.' },
    pluralTitle: { type: 'string', description: 'The plural title when there are more than one document.' },
    summary: { type: 'string', description: 'A plain text summary of the document.' },
    paragraphs: { type: 'array', items: { type: 'string' }, description: 'An array of paragraphs that describe the usage of the document.' },

    /* The fields for this resource type. */
    fields: {
      type: 'object',
      description: 'The set of fields for the document type, keyed by name.',
      additionalProperties: {
        type: 'object',
        description: 'Each property defines a field on the resource.',
        properties: {
          type: { type: 'string', description: 'Type of the document field.' },
          isArray: { type: 'boolean', description: 'True if this field is an array.' },
          tags: { type: 'array', items: { enum: ['required', 'deprecated', 'patchable', 'calculated'] } },
          paragraphs: { type: 'array', items: { type: 'string' }, description: 'An array of markdown passages.  If the field is deprecated the paragraphs should include which fields to use instead.' }
        },
        required: ['type']
      }
    },

    /* Examples that show the content of the resource when populated. */
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

    /* A set of end-points that can be accessed to manipulate the resource. */
    endPoints: {
      type: 'array',
      description: 'The array of end-points offered by the resource.',
      items: {
        type: 'object',
        description: 'Each object defines an end-point',
        properties: {
          title: { type: 'string', description: 'The display name of the end-point.' },
          httpVerb: { enum: ['get', 'post', 'put', 'patch', 'delete'] },
          url: { type: 'string', description: 'The path to be appended to the urlRoot.  It can be an empty string.  It can include parameters prefixed with a colon, e.g. :id.' },
          paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the end-point.' },
          parameters: {
            type: 'object',
            description: 'The set of filter parameters',
            additionalProperties: {
              type: 'object',
              description: 'Each property defines a filter parameter.',
              properties: {
                parameterType: { enum: ['httpHeader', 'urlPathParam', 'urlQueryParam'], description: 'How this parameter is specified.' },
                tags: { enum: ['required', 'deprecated'], description: 'Tags that describe these parameters.' },
                paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the filter parameter.' }
              },
              required: ['parameterType']
            }
          },
          payloadLocation: { enum: ['httpBody', 'serialisedHttpQueryParam'] },
          payloadHttpQueryParamName: { type: 'string' },
          payload: {
            type: 'object',
            description: 'The set of filter parameters',
            additionalProperties: {
              type: 'object',
              description: 'Each property defines a filter parameter.',
              properties: {
                type: { type: 'string', description: 'The field type of the filter parameter.' },
                isArray: { type: 'boolean', description: 'True if this filter parameter is an array.' },
                tags: { enum: ['required', 'deprecated'], description: 'Tags that describe these parameters.' },
                paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the filter parameter.' }
              },
              required: ['type']
            }
          },
          examples: {
            type: 'array',
            description: 'An array of examples showing the filter in use.',
            items: {
              type: 'object',
              properties: {
                requestCommand: { type: 'array', items: { type: 'string' }, description: 'An array of command line statements to issue a request.' },
                requestBody: { type: 'object' },
                response: { type: 'object' },
                paragraphs: { type: 'array', items: { type: 'string' }, description: 'An array of paragraphs that describe this usage example.' }
              },
              required: ['requestCommand', 'requestBody', 'response']
            }
          },
          tags: { type: 'array', items: { type: 'string' }, description: 'An array of tags for this end-point.' },
          responseCodes: {
            type: 'array',
            description: 'An array of possible HTTP response codes.',
            items: {
              type: 'object',
              description: 'The meaning of an HTTP response code.',
              properties: {
                httpCode: { type: 'integer', description: 'An HTTP response code.' },
                paragraphs: { type: 'array', items: { type: 'string' }, description: 'The usage of the response code.' }
              },
              required: ['httpCode']
            }
          }
        },
        required: ['title', 'httpVerb', 'url']
      }
    }
  },
  required: ['urlRoot', 'title']
}
