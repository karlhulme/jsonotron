import { expect, test } from '@jest/globals'
import { HelperOptions } from 'handlebars'
import { isNotTagged } from './isNotTagged'

test('Return content if tag is not found.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      with: 'two'
    }
  }

  expect(isNotTagged(['three', 'four', 'five'], helperOptions)).toEqual('content')
})

test('Return inverse content if tag is found.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      with: 'four'
    }
  }

  expect(isNotTagged(['three', 'four', 'five'], helperOptions)).toEqual('notContent')
})
