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
    labels: [{ name: 'label1', value: 'value1' }],
    factories: ['sengi'],
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
  expect(records).toHaveLength(1)

  expect(records[0]).toEqual({
    system: 'test',
    kind: 'record',
    name: 'subject',
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
      name: 'docCreatedByUserId',
      propertyType: 'std/longString',
      summary: expect.any(String)
    }, {
      name: 'docCreatedMillisecondsSinceEpoch',
      propertyType: 'std/timestamp',
      summary: expect.any(String)
    }, {
      name: 'docLastUpdatedByUserId',
      propertyType: 'std/longString',
      summary: expect.any(String)
    }, {
      name: 'docLastUpdatedMillisecondsSinceEpoch',
      propertyType: 'std/timestamp',
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
    required: [
      'id', 'docType', 'docOpIds',
      'docCreatedByUserId', 'docCreatedMillisecondsSinceEpoch',
      'docLastUpdatedByUserId', 'docLastUpdatedMillisecondsSinceEpoch',
      'apple'
    ],
    tags: ['original', 'sengi'],
    labels: [{ name: 'label1', value: 'value1' }],
    factories: ['sengi'],
    validTestCases: [{
      value: {
        id: '00000000-0000-0000-0000-000000000001',
        docType: 'subject',
        docOpIds: [],
        docVersion: 'abcd',
        docCreatedByUserId: 'aUser',
        docCreatedMillisecondsSinceEpoch: 1630133364000,
        docLastUpdatedByUserId: 'aUser',
        docLastUpdatedMillisecondsSinceEpoch: 1630133364000,
        apple: ['hello', 'world'],
        banana: 'foo'
      }
    }]
  })
})

test('A sengi doc type with no required fields can be expanded.', async () => {
  const subject = createTestSubject()
  delete subject.required
  const records = sengiFactory.implementation(subject)
  expect(records).toHaveLength(1)
})

test('A sengi doc type with no tags can be expanded.', async () => {
  const subject = createTestSubject()
  delete subject.tags
  const records = sengiFactory.implementation(subject)
  expect(records).toHaveLength(1)
})
