import { expect, test } from '@jest/globals'
import { HelperOptions } from 'handlebars'
import { usesFactory } from './usesFactory'

test('Return content if factory is found.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      name: 'two'
    }
  }

  expect(usesFactory({ factories: ['one', 'two', 'three'] }, helperOptions)).toEqual('content')
})

test('Return inverse content if factory is not found.', async () => {
  const helperOptions: HelperOptions = {
    fn: () => 'content',
    inverse: () => 'notContent',
    hash: {
      name: 'four'
    }
  }

  expect(usesFactory({ factories: ['one', 'two', 'three'] }, helperOptions)).toEqual('notContent')
  expect(usesFactory({}, helperOptions)).toEqual('notContent')
})
