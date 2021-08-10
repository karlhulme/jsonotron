import { expect, test } from '@jest/globals'
import { HelperOptions } from 'handlebars'
import { isTagged } from './isTagged'

test('Return content if tag is found.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      with: 'two'
    }
  }

  expect(isTagged({ tags: ['one', 'two', 'three'] }, helperOptions)).toEqual('content')
})

test('Return inverse content if tag is not found.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      with: 'four'
    }
  }

  expect(isTagged({ tags: ['one', 'two', 'three'] }, helperOptions)).toEqual('notContent')
  expect(isTagged({}, helperOptions)).toEqual('notContent')
})
