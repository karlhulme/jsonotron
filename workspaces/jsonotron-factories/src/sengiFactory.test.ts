import { expect, test } from '@jest/globals'
import { RecordTypeDef } from 'jsonotron-interfaces'
import { sengiFactory } from './sengiFactory'

function createTestSubject (): RecordTypeDef {
  return {
    system: 'test',
    kind: 'record',
    name: 'subject',
    summary: 'A test record',
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
  expect(records).toHaveLength(4)

  expect(records[0]).toEqual({
    system: 'test',
    kind: 'record',
    name: 'subject',
    summary: 'A test record',
    properties: [{
      name: 'id',
      propertyType: 'std/uuid',
      summary: expect.any(String)
    }, {
      name: 'docType',
      propertyType: 'std/shortString',
      constant: 'subject',
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
    required: ['id', 'docType', 'apple'],
    tags: ['sengi-doc'],
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

  expect(records[1].name).toEqual('subjectRecord')
  expect(records[1].tags).toEqual(['sengi-select'])
  expect(records[1].required).toEqual([])
  expect(records[1].properties.findIndex(p => p.name === 'id')).toBeGreaterThan(-1)

  expect(records[2].name).toEqual('subjectTemplate')
  expect(records[2].tags).toEqual(['sengi-new'])

  expect(records[3].name).toEqual('subjectPatch')
  expect(records[3].tags).toEqual(['sengi-patch'])
  expect(records[3].required).toEqual([])
  expect(records[3].properties.findIndex(p => p.name === 'id')).toEqual(-1)
})

test('A sengi doc type with no required fields can be expanded.', async () => {
  const subject = createTestSubject()
  delete subject.required
  const records = sengiFactory.implementation(subject)
  expect(records).toHaveLength(4)
})
