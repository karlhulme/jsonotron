import { expect, test } from '@jest/globals'
import supertest from 'supertest'
import { createTestableApp } from './shared.test'

test('The jsonoserve returns 404 for unrecognised routes.', async () => {
  const app = createTestableApp()
  const response = await supertest(app)
    .get('/unknown-route')

  expect(response.status).toEqual(404)
})
