module.exports = {
  title: 'Category Type Schema',
  type: 'object',
  description: 'The definition of a category type.',
  properties: {
    name: { type: 'string', pattern: '^[_a-zA-Z][_a-zA-Z0-9]*$', description: 'The category name.' },
    title: { type: 'string', description: 'The title (display name) of the category.' },
    order: { type: 'integer', description: 'A value that determines the appearance order of the category.  Lower numbers have higher precedence.' }
  },
  required: ['name']
}
