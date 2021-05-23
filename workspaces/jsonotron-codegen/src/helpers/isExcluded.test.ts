import { expect, test } from '@jest/globals'
import { HelperOptions } from 'handlebars'
import { isExcluded } from './isExcluded'

test('Return content if value is not found in the list.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      from: 'one,two'
    }
  }

  expect(isExcluded('three', helperOptions)).toEqual('content')
})

test('Return inverse content if value is found in the list.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      from: 'one,two'
    }
  }

  expect(isExcluded('two', helperOptions)).toEqual('notContent')
})
