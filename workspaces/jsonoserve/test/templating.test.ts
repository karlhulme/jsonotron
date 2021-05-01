import { expect, test } from '@jest/globals'
import express, { Express } from 'express'
import supertest from 'supertest'
import { readFile } from 'fs/promises'
import { createJsonoserveExpress } from '../src'

async function createTestableApp (): Promise<Express> {
  const miniIntType = await readFile('./test/testTypeLibrary/miniInt.yaml', 'utf-8')
  const tinyIntType = await readFile('./test/testTypeLibrary/tinyInt.yaml', 'utf-8')
  const testLangTemplate = await readFile('./test/testLangTemplate/index.hbs', 'utf-8')

  const app = express()

  app.use('/templates', createJsonoserveExpress({
    resourceStrings: [miniIntType, tinyIntType],
    domain: 'https://testing.org',
    templates: [{
      name: 'testLang',
      content: testLangTemplate
    }]
  }))

  return app
}

test('The jsonoserve returns requested code for one system.', async () => {
  const app = await createTestableApp()
  const response = await supertest(app)
    .get('/templates/testLang?systems=test')

  expect(response.status).toEqual(200)
  expect(response.text).toContain('A test language\n\nType names:\nTestMiniInt')
})

test('The jsonoserve returns requested code for two systems.', async () => {
  const app = await createTestableApp()
  const response = await supertest(app)
    .get('/templates/testLang?systems=test,test2')

  expect(response.status).toEqual(200)
  expect(response.text).toContain('A test language\n\nType names:\nTestMiniInt\nTest2TinyInt')
})

test('The jsonoserve returns 405 for non-GET methods.', async () => {
  const app = await createTestableApp()
  const response = await supertest(app)
    .post('/templates/whatever')

  expect(response.status).toEqual(405)
})

test('The jsonoserve returns 404 for root route.', async () => {
  const app = await createTestableApp()
  const response = await supertest(app)
    .get('/templates')

  expect(response.status).toEqual(404)
})

test('The jsonoserve returns 404 for root + initial slash route.', async () => {
  const app = await createTestableApp()
  const response = await supertest(app)
    .get('/templates/')

  expect(response.status).toEqual(404)
})

test('The jsonoserve returns 400 for unknown templates.', async () => {
  const app = await createTestableApp()
  const response = await supertest(app)
    .get('/templates/unknown-template')

  expect(response.status).toEqual(400)
  expect(response.text).toContain('unknown-template')
})

test('The jsonoserve returns 400 for missing systems params.', async () => {
  const app = await createTestableApp()
  const response = await supertest(app)
    .get('/templates/testLang')

  expect(response.status).toEqual(400)
  expect(response.text).toContain('systems query parameter')
})
