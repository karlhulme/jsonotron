import { expect, test } from '@jest/globals'
import supertest from 'supertest'
import { createTestableApp } from './shared.test'

test('The jsonoserve returns a list of systems.', async () => {
  const app = createTestableApp()
  const response = await supertest(app)
    .get('/systems')

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    systems: [
      { domain: 'https://jsonotron.org', system: 'test' },
      { domain: 'https://jsonotron.org', system: 'test2' }
    ]
  })
})

test('The jsonoserve supplies the requested types.', async () => {
  const app = createTestableApp()
  const response = await supertest(app)
    .get('/systems/https%3A%2F%2Fjsonotron.org%2Ftest')

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    types: [
      { domain: 'https://jsonotron.org', system: 'test', name: 'animal', kind: 'schema', definition: expect.any(String) },
      { domain: 'https://jsonotron.org', system: 'test', name: 'hairColor', kind: 'enum', definition: expect.any(String) },
    ]
  })
})

test('The jsonoserve returns 404 for unrecognised routes.', async () => {
  const app = createTestableApp()
  const response = await supertest(app)
    .get('/unknown-route')

  expect(response.status).toEqual(404)
})
