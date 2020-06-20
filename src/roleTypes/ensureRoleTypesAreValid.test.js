/* eslint-env jest */
const { JsonotronRoleTypeValidationError } = require('jsonotron-errors')
const { createCustomisedAjv } = require('../validator')
const ensureRoleTypesAreValid = require('./ensureRoleTypesAreValid')

const createValidRoleType = () => ({
  name: 'candidateRole',
  docPermissions: {
    place: {
      query: {
        fieldsTreatment: 'whitelist',
        fields: [
          'id', 'shortName', 'fullName', 'dateOfBirth', 'addressLines',
          'postCode', 'favouriteColors', 'allowMarketing', 'fullAddress'
        ]
      },
      update: { patch: true, operations: ['addLocation', 'addRoute'] },
      create: true,
      delete: true,
      replace: true
    },
    location: true
  }
})

test('A valid role type will validate.', () => {
  const ajv = createCustomisedAjv()
  const candidateRole = createValidRoleType()
  expect(() => ensureRoleTypesAreValid(ajv, [candidateRole])).not.toThrow()
})

test('A role type with invalid additional properties will fail validate.', () => {
  const ajv = createCustomisedAjv()
  const candidateRole = createValidRoleType()
  candidateRole.docPermissions.place.invalidProperty = true
  expect(() => ensureRoleTypesAreValid(ajv, [candidateRole])).toThrow(JsonotronRoleTypeValidationError)
  expect(() => ensureRoleTypesAreValid(ajv, [candidateRole])).toThrow(/Unable to validate against roleTypeSchema/)
})
