import { expect, test } from '@jest/globals'
import supertest from 'supertest'
import { createTestableApp } from './shared.test'

test('The jsonoserve returns a set of enum and schema types.', async () => {
  const app = createTestableApp()
  const response = await supertest(app)
    .get(`/types?n=${encodeURIComponent('https://jsonotron.org/test')},${encodeURIComponent('https://jsonotron.org/extra')}`)

  expect(response.status).toEqual(200)

  expect(response.body).toEqual({
    enumTypes: expect.any(Array),
    schemaTypes: expect.any(Array)
  })
})

test('Cannot return a set of types if n query parameter is missing.', async () => {
  const app = createTestableApp()
  const response = await supertest(app)
    .get('/types')

  expect(response.status).toEqual(400)
  expect(response.text).toMatch(/Must supply query parameter 'n'/)
})
