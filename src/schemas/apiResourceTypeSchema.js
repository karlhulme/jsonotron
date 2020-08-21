module.exports = {
  title: 'API Resource Type Schema',
  type: 'object',
  description: 'The definition of a REST resource.',
  properties: {
    urlRoot: { type: 'string', pattern: '^[/].*[^/]$', description: 'The path to the root of the REST resource. e.g. /example.  It must begin with a forward slash and cannot end with one.' },
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
          url: { type: 'string', description: 'The path to be appended to the urlRoot. It can include parameters prefixed with a colon, e.g. :id.  If specified it must begin with a forward slash and cannot end with one.' },
          paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the end-point.' },
          requestParameters: {
            type: 'object',
            description: 'The set of request parameters',
            additionalProperties: {
              type: 'object',
              description: 'Each property defines a request parameter.',
              properties: {
                parameterType: { enum: ['httpHeader', 'urlPathParam', 'urlQueryParam'], description: 'How this parameter is specified.' },
                tags: { type: 'array', items: { enum: ['required', 'deprecated'] }, description: 'Tags that describe these parameters.' },
                paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the parameter.' }
              },
              required: ['parameterType']
            }
          },
          requestPayload: {
            location: { enum: ['httpBody', 'httpQueryParam'] },
            httpQueryParamName: { type: 'string' },
            fields: {
              type: 'object',
              description: 'The fields that can be specified in the request.',
              additionalProperties: {
                type: 'object',
                description: 'Each property defines a field in the request payload.',
                properties: {
                  type: { type: 'string', description: 'The type of the field.' },
                  isArray: { type: 'boolean', description: 'True if this field is an array.' },
                  tags: { type: 'array', items: { enum: ['required', 'deprecated'] }, description: 'Tags that describe this field.' },
                  paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the field.' }
                },
                required: ['type']
              }
            }
          },
          responseParameters: {
            type: 'object',
            description: 'The set of response parameters',
            additionalProperties: {
              type: 'object',
              description: 'Each property defines a response parameter.',
              properties: {
                parameterType: { enum: ['httpHeader'], description: 'Where this parameter appears in the response.' },
                tags: { type: 'array', items: { enum: ['deprecated'] }, description: 'Tags that describe this parameter.' },
                paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the parameter.' }
              },
              required: ['parameterType']
            }
          },
          responsePayload: {
            fields: {
              type: 'object',
              description: 'The fields that can be specified in the response.',
              additionalProperties: {
                type: 'object',
                description: 'Each property defines a field in the response payload.',
                properties: {
                  type: { type: 'string', description: 'The type of the field.' },
                  isArray: { type: 'boolean', description: 'True if this field is an array.' },
                  tags: { type: 'array', items: { enum: ['guaranteed', 'deprecated'] }, description: 'Tags that describe this field.' },
                  paragraphs: { type: 'array', items: { type: 'string' }, description: 'The description of the field.' }
                },
                required: ['type']
              }
            }
          },
          examples: {
            type: 'array',
            description: 'An array of examples showing the end-point in use.',
            items: {
              type: 'object',
              properties: {
                requestCommand: { type: 'array', items: { type: 'string' }, description: 'An array of command line statements to issue a request.' },
                requestBody: { type: 'object' },
                responseCode: { type: 'integer', description: 'An HTTP response code.' },
                responseBody: { type: 'object' },
                paragraphs: { type: 'array', items: { type: 'string' }, description: 'An array of paragraphs that describe this usage example.' }
              },
              required: ['requestCommand', 'requestBody', 'responseBody']
            }
          },
          tags: { type: 'array', items: { enum: ['deprecated'] }, description: 'An array of tags for this end-point.' },
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
        required: ['title', 'httpVerb']
      }
    }
  },
  required: ['urlRoot', 'title']
}
