import { expect, test } from '@jest/globals'
import { RecordTypeDef } from 'jsonotron-interfaces'
import { sengiFactory } from './sengiFactory'

function createTestSubject (): RecordTypeDef {
  return {
    system: 'test',
    kind: 'record',
    name: 'subject',
    summary: 'A test record',
    tags: ['original'],
    properties: [{
      name: 'apple',
      propertyType: 'std/shortString',
      summary: 'An apple.',
      isArray: true
    }, {
      name: 'banana',
      propertyType: 'std/shortString',
      summary: 'A banana.'
    }],
    required: ['apple'],
    direction: 'output',
    validTestCases: [{
      value: {
        apple: ['hello', 'world'],
        banana: 'foo'
      }
    }]
  }
}

test('A sengi doc type can be expanded.', async () => {
  const subject = createTestSubject()
  const records = sengiFactory.implementation(subject)
  expect(records).toHaveLength(2)

  expect(records[0]).toEqual({
    system: 'test',
    kind: 'record',
    name: 'subjectDb',
    summary: 'A test record',
    direction: 'output',
    properties: [{
      name: 'id',
      propertyType: 'std/uuid',
      summary: expect.any(String)
    }, {
      name: 'docType',
      propertyType: 'std/mediumString',
      summary: expect.any(String)
    }, {
      name: 'docOpIds',
      propertyType: 'std/uuid',
      summary: expect.any(String),
      isArray: true
    }, {
      name: 'docVersion',
      propertyType: 'std/mediumString',
      summary: expect.any(String)
    }, {
      name: 'apple',
      propertyType: 'std/shortString',
      summary: 'An apple.',
      isArray: true
    }, {
      name: 'banana',
      propertyType: 'std/shortString',
      summary: 'A banana.'
    }],
    required: ['id', 'docType', 'docOpIds', 'docVersion', 'apple'],
    tags: ['db-only'],
    validTestCases: [{
      value: {
        id: '00000000-0000-0000-0000-000000000001',
        docType: 'subject',
        docOpIds: [],
        docVersion: 'abcd',
        apple: ['hello', 'world'],
        banana: 'foo'
      }
    }],
    variantBaseName: 'subject'
  })

  expect(records[1].name).toEqual('subject')
  expect(records[1].tags).toEqual(['original', 'sengi-client'])
  expect(records[1].required).toEqual([])
  expect(records[1].properties.findIndex(p => p.name === 'id')).toBeGreaterThan(-1)
})

test('A sengi doc type with no required fields can be expanded.', async () => {
  const subject = createTestSubject()
  delete subject.required
  const records = sengiFactory.implementation(subject)
  expect(records).toHaveLength(2)
})

test('A sengi doc type with no tags can be expanded.', async () => {
  const subject = createTestSubject()
  delete subject.tags
  const records = sengiFactory.implementation(subject)
  expect(records).toHaveLength(2)
})
