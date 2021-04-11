import { expect, test } from '@jest/globals'
import supertest from 'supertest'
import { createTestableApp } from './shared.test'

test('The jsonoserve returns typescript for the requested systems and given domain.', async () => {
  const app = await createTestableApp()
  const response = await supertest(app)
    .get(`/typescript?systems=test,test2&domain=${encodeURIComponent('https://testing.org')}`)

  expect(response.status).toEqual(200)

  expect(response.body).toHaveProperty('typescript')
  expect(response.body.typescript).toContain('export function validateAnimal')
  expect(response.body.typescript).toContain('validateValue(value, \'https://testing.org/test/animal\')')
})

test('The jsonoserve returns typescript for the requested systems and the default domain.', async () => {
  const app = await createTestableApp()
  const response = await supertest(app)
    .get('/typescript?systems=test,test2')

  expect(response.status).toEqual(200)

  expect(response.body).toHaveProperty('typescript')
  expect(response.body.typescript).toContain('export function validateAnimal')
  expect(response.body.typescript).toContain('validateValue(value, \'https://jsonotron.org/test/animal\')')
})

test('The jsonoserve ignores unrecognised systems.', async () => {
  const app = await createTestableApp()
  const response = await supertest(app)
    .get('/typescript?systems=unknown1,unknown2')

  expect(response.status).toEqual(200)
  expect(response.body).toHaveProperty('typescript')
  expect(response.body.typescript).toContain('export interface EnumTypeItem {')
})

test('The jsonoserve fails to return typescript if no systems specified.', async () => {
  const app = await createTestableApp()
  const response = await supertest(app)
    .get('/typescript')

  expect(response.status).toEqual(400)
  expect(response.text).toMatch(/Must supply query parameter 'systems'/)
})
