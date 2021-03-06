import { expect, test } from '@jest/globals'
import supertest from 'supertest'
import { createTestableApp } from './shared.test'

test('The jsonoserve returns a map for the given system names.', async () => {
  const app = createTestableApp()
  const response = await supertest(app)
    .get(`/map?n=${encodeURIComponent('https://jsonotron.org/test')},${encodeURIComponent('https://jsonotron.org/extra')}`)

  expect(response.status).toEqual(200)

  expect(response.body).toEqual({
    typeMap: {
      objectTypes: expect.any(Array),
      refTypes: expect.any(Array)
    }
  })
})

test('The jsonoserve returns an empty map for an unrecognised system.', async () => {
  const app = createTestableApp()
  const response = await supertest(app)
    .get(`/map?n=${encodeURIComponent('https://jsonotron.org/extra')}`)

  expect(response.status).toEqual(200)

  expect(response.body).toEqual({
    typeMap: {
      objectTypes: [],
      refTypes: []
    }
  })
})

test('Cannot return a map if n query parameter is missing.', async () => {
  const app = createTestableApp()
  const response = await supertest(app)
    .get('/map')

  expect(response.status).toEqual(400)
  expect(response.text).toMatch(/Must supply query parameter 'n'/)
})
