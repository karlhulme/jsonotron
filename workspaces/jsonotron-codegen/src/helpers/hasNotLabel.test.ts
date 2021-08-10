import { expect, test } from '@jest/globals'
import { HelperOptions } from 'handlebars'
import { hasNotLabel } from './hasNotLabel'

test('Return content if named label is not found.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      name: 'a'
    }
  }

  expect(hasNotLabel({ labels: [{ name: 'c', value: 'ccc' }] }, helperOptions)).toEqual('content')
  expect(hasNotLabel({}, helperOptions)).toEqual('content')
})

test('Return inverse content if named label is found.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      name: 'a'
    }
  }

  expect(hasNotLabel({ labels: [{ name: 'a', value: 'aaa' }] }, helperOptions)).toEqual('notContent')
})
