import { expect, test } from '@jest/globals'
import { loadTemplatesFromFolder } from '../src'

test('Load templates and partials from a folder tree.', async () => {
  const result = await loadTemplatesFromFolder('./test/templates')

  expect(result).toHaveLength(2)

  expect(result[0]).toEqual({
    name: 'lang1',
    content: 'lang1-index',
    partials: [{
      name: 'partial_a',
      content: 'lang1-partial_a'
    }, {
      name: 'partial_b',
      content: 'lang1-partial_b'
    }]
  })

  expect(result[1]).toEqual({
    name: 'lang2',
    content: 'lang2-index',
    partials: []
  })
})

test('Load templates and partials from a folder tree with trailing slash.', async () => {
  const result = await loadTemplatesFromFolder('./test/templates/')

  expect(result).toHaveLength(2)
})

