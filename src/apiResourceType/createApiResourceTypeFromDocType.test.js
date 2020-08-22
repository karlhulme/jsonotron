/* eslint-env jest */
const createApiResourceTypeFromDocType = require('./createApiResourceTypeFromDocType')

function createDocType () {
  return {
    name: 'testDocType'
  }
}

test('A doc type can be converted to an api resource.', () => {
  const candidate = createDocType()
  const apiResourceType = createApiResourceTypeFromDocType(candidate)
  expect(apiResourceType).toBeDefined()
})
