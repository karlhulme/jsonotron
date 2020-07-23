module.exports = {
  title: 'Category Schema',
  type: 'object',
  description: 'A category.',
  additionalProperties: false,
  properties: {
    name: { type: 'string', description: 'The category name.' },
    order: { type: 'integer', description: 'A value that determines the appearance order of the category.  Lower numbers have higher precedence.' }
  },
  required: ['name', 'order']
}
