/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const ensureDocType = require('./ensureDocType')

const testEnumTypes = [
  {
    name: 'boolean',
    items: [
      { value: true },
      { value: false }
    ]
  }
]

const testFieldTypes = [
  {
    name: 'integer',
    jsonSchema: {
      type: 'integer'
    }
  }, {
    name: 'float',
    jsonSchema: {
      type: 'number'
    }
  }, {
    name: 'string',
    jsonSchema: {
      type: 'string'
    }
  }
]

const createSimpleValidDocType = () => ({
  name: 'simpleDoc',
  fields: {
    propA: { type: 'integer', isRequired: true, canUpdate: true },
    propB: { type: 'float', default: 1.2 },
    propQ: { type: 'string', isArray: true }
  }
})

const createComplexValidDocType = () => ({
  name: 'candidateDoc',
  pluralName: 'candidateDocs',
  policy: {
    canFetchWholeCollection: true
  },
  fields: {
    propA: { type: 'string', isRequired: true, canUpdate: true },
    propB: { type: 'string' }
  },
  calculatedFields: {
    propAandB: {
      inputFields: ['propA', 'propB'],
      type: 'string',
      value: doc => `${doc.propA || ''}${doc.propB || ''}`
    },
    propAwithB: {
      inputFields: ['propA', 'propB'],
      type: 'string',
      isArray: true,
      value: doc => [doc.propA, doc.propB]
    }
  },
  filters: {
    byDateOfBirth: {
      parameters: {
        x: { type: 'string', isRequired: true },
        y: { type: 'string', isArray: true }
      },
      implementation: input => `some_col = "${input.x}"`
    }
  },
  validate: doc => null,
  ctor: {
    parameters: {
      c: { type: 'boolean' },
      d: { type: 'boolean', isArray: true }
    },
    implementation: input => {
      return {
        a: input.a,
        b: input.c ? 'hello' : 'world'
      }
    }
  },
  operations: {
    changePropB: {
      parameters: {
        c: { type: 'string', isRequired: true },
        propQ: { type: 'string', isArray: true }
      },
      implementation: (doc, input) => {
        return {
          b: input.c && doc.b ? 'hello' : 'world'
        }
      }
    }
  }
})

test('A simple doc type can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(() => ensureDocType(ajv, createSimpleValidDocType(), testFieldTypes, testEnumTypes)).not.toThrow()
})

test('A complex doc type can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(() => ensureDocType(ajv, createComplexValidDocType(), testFieldTypes, testEnumTypes)).not.toThrow()
})

// test('Doc type with unrecognised constructor parameter field type fails validation.', () => {
//   const ajv = createCustomisedAjv()
//   const candidate = createComplexValidDocType()
//   candidate.ctor.parameters.propD = { type: 'invalid' }
//   expect(() => ensureDocType(ajv, candidate, testFieldTypes, testEnumTypes)).toThrow(/Constructor parameter 'propD' declares an unrecognised type of 'invalid'./)
// })

test('Doc type with invalid default fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createSimpleValidDocType()
  candidate.fields.propB.default = 'invalid'
  expect(() => ensureDocType(ajv, candidate, testFieldTypes, testEnumTypes)).toThrow(/Field name 'propB' declares a default value '"invalid"'/)
})

test('Doc type with calculated field input that refers to unrecognised field fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.calculatedFields.propAandB.inputFields = ['a', 'madeup', 'b']
  expect(() => ensureDocType(ajv, candidate, testFieldTypes, testEnumTypes)).toThrow(/Calculated field 'propAandB' requires unrecognised input field/)
})

test('Doc type with a field name that clashes with a system property name fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.fields.id = { type: 'string' }
  expect(() => ensureDocType(ajv, candidate, testFieldTypes, testEnumTypes)).toThrow(/Field name 'id' clashes with a reserved system field name/)
})

test('Doc type with a calculated field name that clashes with a system property name fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.calculatedFields.id = { inputFields: [], type: 'string', value: () => 'hi' }
  expect(() => ensureDocType(ajv, candidate, testFieldTypes, testEnumTypes)).toThrow(/Calculated field name 'id' clashes with a reserved system field name/)
})

test('Doc type with a calculated field name that clashes with a declared field name fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.calculatedFields.propA = { inputFields: [], type: 'string', value: () => 'hi' }
  expect(() => ensureDocType(ajv, candidate, testFieldTypes, testEnumTypes)).toThrow(/Calculated field name 'propA' clashes with a declared field name/)
})
