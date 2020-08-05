/* eslint-env jest */
const { JsonotronRoleTypeValidationError } = require('jsonotron-errors')
const { createCustomisedAjv } = require('../validator')
const ensureRoleType = require('./ensureRoleType')

function createValidRoleType () {
  return {
    name: 'candidateRole',
    title: 'The Role',
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
  }
}

test('A role type with global document permissions will validate.', () => {
  const ajv = createCustomisedAjv()
  const candidateRole = { name: 'super', docPermissions: true }
  expect(() => ensureRoleType(ajv, candidateRole)).not.toThrow()
  expect(candidateRole.title).toEqual('Super')
  expect(candidateRole.docPermissions).toEqual(true)
})

test('A valid role type will validate.', () => {
  const ajv = createCustomisedAjv()
  const candidateRole = createValidRoleType()
  expect(() => ensureRoleType(ajv, candidateRole)).not.toThrow()
  expect(candidateRole.title).toEqual('The Role')
})

test('A valid role type will full query permissions will validate.', () => {
  const ajv = createCustomisedAjv()
  const candidateRole = createValidRoleType()
  candidateRole.docPermissions.place.query = true
  expect(() => ensureRoleType(ajv, candidateRole)).not.toThrow()
  expect(candidateRole.docPermissions.place.query).toEqual(true)
})

test('A valid role type will full update permissions will validate.', () => {
  const ajv = createCustomisedAjv()
  const candidateRole = createValidRoleType()
  candidateRole.docPermissions.place.update = true
  expect(() => ensureRoleType(ajv, candidateRole)).not.toThrow()
  expect(candidateRole.docPermissions.place.update).toEqual(true)
})

test('A role type with invalid properties will fail validate.', () => {
  const ajv = createCustomisedAjv()
  const candidateRole = createValidRoleType()
  candidateRole.docPermissions.place.query = 123
  expect(() => ensureRoleType(ajv, candidateRole)).toThrow(JsonotronRoleTypeValidationError)
  expect(() => ensureRoleType(ajv, candidateRole)).toThrow(/Unable to validate against roleTypeSchema/)
})

test('A role type without title or docPermissions will be patched.', () => {
  const ajv = createCustomisedAjv()
  const candidateRole = createValidRoleType()
  delete candidateRole.title
  delete candidateRole.docPermissions
  expect(() => ensureRoleType(ajv, candidateRole)).not.toThrow()
  expect(candidateRole.title).toEqual('Candidate Role')
  expect(candidateRole.docPermissions).toEqual({})
})

test('A role type with doc type specs with missing permissions will be patched.', () => {
  const ajv = createCustomisedAjv()
  const candidateRole = createValidRoleType()
  candidateRole.docPermissions.place = {}
  expect(() => ensureRoleType(ajv, candidateRole)).not.toThrow()
  expect(candidateRole.docPermissions.place).toEqual({ query: false, update: false, create: false, delete: false, replace: false })
})

test('A role type without query spec fieldsTreatment or fields will be patched.', () => {
  const ajv = createCustomisedAjv()
  const candidateRole = createValidRoleType()
  delete candidateRole.docPermissions.place.query.fieldsTreatment
  delete candidateRole.docPermissions.place.query.fields
  expect(() => ensureRoleType(ajv, candidateRole)).not.toThrow()
  expect(candidateRole.docPermissions.place.query.fieldsTreatment).toEqual('whitelist')
  expect(candidateRole.docPermissions.place.query.fields).toEqual([])
})

test('A role type without update spec patch or operations will be patched.', () => {
  const ajv = createCustomisedAjv()
  const candidateRole = createValidRoleType()
  delete candidateRole.docPermissions.place.update.patch
  delete candidateRole.docPermissions.place.update.operations
  expect(() => ensureRoleType(ajv, candidateRole)).not.toThrow()
  expect(candidateRole.docPermissions.place.update.patch).toEqual(false)
  expect(candidateRole.docPermissions.place.update.operations).toEqual([])
})
