module.exports = {
  title: 'Role Type Schema',
  type: 'object',
  description: 'The definition of a role type.',
  properties: {
    name: { type: 'string', pattern: '^[_a-zA-Z][_a-zA-Z0-9]*$', description: 'The role type name.' },
    title: { type: 'string', description: 'The title (display name) of the role type.' },
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
            properties: {
              query: {
                oneOf: [{
                  type: 'boolean'
                }, {
                  type: 'object',
                  properties: {
                    fieldsTreatment: { enum: ['whitelist', 'blacklist'] },
                    fields: { type: 'array', items: { type: 'string' } }
                  }
                }]
              },
              update: {
                oneOf: [{
                  type: 'boolean'
                }, {
                  type: 'object',
                  properties: {
                    patch: { type: 'boolean' },
                    operations: { type: 'array', items: { type: 'string' } }
                  }
                }]
              },
              create: { type: 'boolean', description: 'True if documents can be created using the constructor.' },
              delete: { type: 'boolean', description: 'True if documents can be deleted.' },
              replace: { type: 'boolean', description: 'True if documents can be replaced.' }
            }
          }]
        }
      }]
    }
  },
  required: ['name']
}
