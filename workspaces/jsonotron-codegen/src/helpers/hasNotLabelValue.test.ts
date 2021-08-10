import { expect, test } from '@jest/globals'
import { HelperOptions } from 'handlebars'
import { hasNotLabelValue } from './hasNotLabelValue'

test('Return content if named label and value is not found.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      name: 'a',
      value: 'aaa'
    }
  }

  expect(hasNotLabelValue({ labels: [{ name: 'c', value: 'ccc' }] }, helperOptions)).toEqual('content')
  expect(hasNotLabelValue({ labels: [{ name: 'a', value: 'ccc' }] }, helperOptions)).toEqual('content')
  expect(hasNotLabelValue({}, helperOptions)).toEqual('content')
})

test('Return inverse content if named label is found.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      name: 'a',
      value: 'aaa'
    }
  }

  expect(hasNotLabelValue({ labels: [{ name: 'a', value: 'aaa' }] }, helperOptions)).toEqual('notContent')
})
