import { expect, test } from '@jest/globals'
import { getDomainQualifiedTypeReference } from '../src'

test('Get a domain qualified reference from a system-less type.', () => {
  expect(getDomainQualifiedTypeReference('https://some-domain.com', 'sys', 'theType')).toEqual('https://some-domain.com/sys/theType')
})

test('Get a domain qualified reference from a type with a system.', () => {
  expect(getDomainQualifiedTypeReference('https://some-domain.com', 'sys', 'sys2/theType')).toEqual('https://some-domain.com/sys2/theType')
})
