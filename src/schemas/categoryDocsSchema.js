module.exports = {
  title: 'Category Docs Schema',
  type: 'object',
  description: 'The documentation of a category.',
  additionalProperties: false,
  properties: {
    name: { type: 'string', description: 'The category name.' },
    lang: { type: 'string', description: 'The language.', pattern: '^[a-z]{2}$' },
    title: { type: 'string', description: 'The title (display name) of the category.' }
  },
  required: ['name', 'lang', 'title']
}
