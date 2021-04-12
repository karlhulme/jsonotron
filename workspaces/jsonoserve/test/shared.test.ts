import { expect, test } from '@jest/globals'
import express, { Express } from 'express'
import { readFile } from 'fs/promises'
import { createJsonoserveExpress } from '../src'

export async function createTestableApp (): Promise<Express> {
  const animalType = await readFile('./test/testTypes/animal.yaml', 'utf-8')
  const hairColorType = await readFile('./test/testTypes/hairColor.yaml', 'utf-8')
  const trouserStyle = await readFile('./test/testTypes/trouserStyle.yaml', 'utf-8')

  const app = express()

  app.use('/', createJsonoserveExpress({
    resourceStrings: [
      animalType,
      hairColorType,
      trouserStyle
    ],
    domain: 'https://testing.org'
  }))

  return app
}

test('Testable app can be created.', async () => {
  const app = await createTestableApp()
  expect(app).toBeDefined()
  expect(app.listen).toBeDefined()
})
