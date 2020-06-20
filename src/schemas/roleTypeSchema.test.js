/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const roleTypeSchema = require('./roleTypeSchema')

test('Accept valid super admin role types.', () => {
  const ajv = createCustomisedAjv()

  const validAdminRoleType = {
    name: 'admin',
    docPermissions: true
  }

  expect(ajv.validate(roleTypeSchema, validAdminRoleType)).toEqual(true)
})

test('Accept valid role types.', () => {
  const ajv = createCustomisedAjv()

  const validRoleType = {
    name: 'myRole',
    docPermissions: {
      recordOne: true,
      recordTwo: true,
      recordThree: {
        query: true,
        update: true,
        create: true,
        delete: true,
        replace: true
      },
      recordFour: {
        query: {
          fieldsTreatment: 'whitelist',
          fields: ['fieldOne', 'fieldTwo', 'fieldThree']
        }
      }
    }
  }

  expect(ajv.validate(roleTypeSchema, validRoleType)).toEqual(true)
})

test('Reject role types without docPermissions.', () => {
  const ajv = createCustomisedAjv()

  const invalidRoleType = {
    name: 'myRole'
  }
  expect(ajv.validate(roleTypeSchema, invalidRoleType)).toEqual(false)
  expect(ajv.errors).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        keyword: 'required',
        params: {
          missingProperty: 'docPermissions'
        }
      })
    ])
  )
})

test('Reject role types with invalid query fieldsTreatment value.', () => {
  const ajv = createCustomisedAjv()

  const invalidRoleType = {
    name: 'myRole',
    docPermissions: {
      recordOne: {
        query: {
          fieldsTreatment: 'invalid',
          fields: ['fieldOne', 'fieldTwo', 'fieldThree']
        },
        replace: true
      }
    }
  }
  expect(ajv.validate(roleTypeSchema, invalidRoleType)).toEqual(false)
  expect(ajv.errors).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        keyword: 'enum',
        dataPath: '.docPermissions[\'recordOne\'].query.fieldsTreatment'
      })
    ])
  )
})

test('Reject role types with invalid query fields value.', () => {
  const ajv = createCustomisedAjv()

  const invalidRoleType = {
    name: 'myRole',
    docPermissions: {
      recordOne: {
        query: {
          fieldsTreatment: 'blacklist',
          fields: 'incorrect_format_1, incorrect_format_2'
        },
        replace: true
      }
    }
  }
  expect(ajv.validate(roleTypeSchema, invalidRoleType)).toEqual(false)
  expect(ajv.errors).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        keyword: 'type',
        dataPath: '.docPermissions[\'recordOne\'].query.fields'
      })
    ])
  )
})

test('Reject role types with invalid delete value.', () => {
  const ajv = createCustomisedAjv()

  const invalidRoleType = {
    name: 'myRole',
    docPermissions: {
      recordOne: {
        query: true,
        delete: 1
      }
    }
  }
  expect(ajv.validate(roleTypeSchema, invalidRoleType)).toEqual(false)
  expect(ajv.errors).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        keyword: 'type',
        dataPath: '.docPermissions[\'recordOne\'].delete'
      })
    ])
  )
})
