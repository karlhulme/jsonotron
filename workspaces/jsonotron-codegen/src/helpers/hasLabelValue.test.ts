import { expect, test } from '@jest/globals'
import { HelperOptions } from 'handlebars'
import { hasLabelValue } from './hasLabelValue'

test('Return content if label with value is found.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      name: 'a',
      value: 'aaa'
    }
  }

  expect(hasLabelValue({ labels: [{ name: 'a', value: 'aaa' }] }, helperOptions)).toEqual('content')
})

test('Return inverse content if label is not found.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      name: 'c',
      value: 'ccc'
    }
  }

  expect(hasLabelValue({ labels: [{ name: 'a', value: 'aaa' }] }, helperOptions)).toEqual('notContent')
  expect(hasLabelValue({}, helperOptions)).toEqual('notContent')
})
