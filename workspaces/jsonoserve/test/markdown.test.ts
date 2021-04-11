import { expect, test } from '@jest/globals'
import supertest from 'supertest'
import { createTestableApp } from './shared.test'

test('The jsonoserve returns markdown for the requested systems.', async () => {
  const app = await createTestableApp()
  const response = await supertest(app)
    .get('/markdown?systems=test,test2')

  expect(response.status).toEqual(200)

  expect(response.body).toHaveProperty('markdown')
  expect(response.body.markdown).toContain('# Type Systems')
  expect(response.body.markdown).toContain('## "test" System')
  expect(response.body.markdown).toContain('### animal')
  expect(response.body.markdown).toContain('### hairColor')
  expect(response.body.markdown).toContain('## "test2" System')
  expect(response.body.markdown).toContain('### trouserStyle')
})

test('The jsonoserve ignores unrecognised systems.', async () => {
  const app = await createTestableApp()
  const response = await supertest(app)
    .get('/markdown?systems=unknown1,unknown2')

  expect(response.status).toEqual(200)

  expect(response.body).toHaveProperty('markdown')
  expect(response.body.markdown).toContain('# Type Systems')
  expect(response.body.markdown.split('\n').length).toBeLessThan(5)
})

test('The jsonoserve fails to return markdown if no systems specified.', async () => {
  const app = await createTestableApp()
  const response = await supertest(app)
    .get('/markdown')

  expect(response.status).toEqual(400)
  expect(response.text).toMatch(/Must supply query parameter 'systems'/)
})
