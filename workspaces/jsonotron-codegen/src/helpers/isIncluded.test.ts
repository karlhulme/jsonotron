import { expect, test } from '@jest/globals'
import { HelperOptions } from 'handlebars'
import { isIncluded } from './isIncluded'

test('Return content if value is found in the list.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      in: 'one,two'
    }
  }

  expect(isIncluded('two', helperOptions)).toEqual('content')
})

test('Return inverse content if value is not found in the list.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      in: 'one,two'
    }
  }

  expect(isIncluded('three', helperOptions)).toEqual('notContent')
})
