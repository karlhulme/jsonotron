/* eslint-env jest */
import * as consts from './consts.js'

test('All expected consts have been exported', () => {
  expect(consts.JSON_SCHEMA_DECLARATION).toBeDefined()
  expect(consts.JSON_SCHEMA_DEFINITIONS_PATH).toBeDefined()
})
