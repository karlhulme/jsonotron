import { expect, test } from '@jest/globals'
import express, { Express } from 'express'
import fs from 'fs'
import { createJsonoserveExpress } from '../src'

export function createTestableApp (): Express {
  const animalType = fs.readFileSync('./test/testTypes/animal.yaml', 'utf-8')
  const hairColorType = fs.readFileSync('./test/testTypes/hairColor.yaml', 'utf-8')
  const trouserStyle = fs.readFileSync('./test/testTypes/trouserStyle.yaml', 'utf-8')

  const app = express()

  app.use('/', createJsonoserveExpress({
    types: [
      animalType,
      hairColorType,
      trouserStyle
    ]
  }))

  return app
}

test('Testable app can be created.', () => {
  const app = createTestableApp()
  expect(app).toBeDefined()
})
