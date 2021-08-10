import { expect, test } from '@jest/globals'
import { HelperOptions } from 'handlebars'
import { hasLabel } from './hasLabel'

test('Return content if label is found.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      name: 'a'
    }
  }

  expect(hasLabel({ labels: [{ name: 'a', value: 'aaa' }] }, helperOptions)).toEqual('content')
})

test('Return inverse content if label is not found.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      name: 'c'
    }
  }

  expect(hasLabel({ labels: [{ name: 'a', value: 'aaa' }] }, helperOptions)).toEqual('notContent')
  expect(hasLabel({}, helperOptions)).toEqual('notContent')
})
