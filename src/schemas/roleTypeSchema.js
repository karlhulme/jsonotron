module.exports = {
  title: 'Role Type Schema',
  type: 'object',
  description: 'The definition of a role type.',
  properties: {
    name: { type: 'string' },
    docPermissions: {
      oneOf: [{
        enum: [true]
      }, {
        type: 'object',
        additionalProperties: {
          oneOf: [{
            enum: [true]
          }, {
            type: 'object',
            additionalProperties: false,
            properties: {
              query: {
                oneOf: [{
                  type: 'boolean'
                }, {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    fieldsTreatment: { enum: ['whitelist', 'blacklist'] },
                    fields: { type: 'array', items: { type: 'string' } }
                  },
                  required: ['fieldsTreatment', 'fields']
                }]
              },
              update: {
                oneOf: [{
                  type: 'boolean'
                }, {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    patch: { type: 'boolean' },
                    operations: { type: 'array', items: { type: 'string' } }
                  },
                  required: ['patch', 'operations']
                }]
              },
              create: { type: 'boolean', description: 'True if documents can be created.' },
              delete: { type: 'boolean', description: 'True if documents can be deleted.' },
              replace: { type: 'boolean', description: 'True if documents can be replaced.' }
            }
          }]
        }
      }]
    }
  },
  required: ['name', 'docPermissions']
}
