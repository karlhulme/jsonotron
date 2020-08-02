/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const ensureDocTypesAreValid = require('./ensureDocTypesAreValid')

const testFieldTypes = [
  {
    name: 'boolean',
    category: 'candidate',
    values: [
      { value: true, description: 'A value of true.' },
      { value: false, description: 'A value of false.' }
    ]
  }, {
    name: 'integer',
    category: 'candidate',
    jsonSchema: {
      type: 'integer'
    }
  }, {
    name: 'float',
    category: 'Candidate',
    jsonSchema: {
      type: 'number'
    }
  }, {
    name: 'string',
    category: 'Candidate',
    jsonSchema: {
      type: 'string'
    }
  }
]

const createSimpleValidDocType = () => ({
  name: 'simpleDoc',
  pluralName: 'simpleDocs',
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

test('Valid doc types can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(() => ensureDocTypesAreValid(ajv, [createSimpleValidDocType(), createComplexValidDocType()], testFieldTypes)).not.toThrow()
})

test('Valid doc type does not require a constructor to be verified.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  delete candidate.ctor
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).not.toThrow()
})

test('Valid doc type does not require operations to be verified.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  delete candidate.operations
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).not.toThrow()
})

test('Doc type with unrecognised field type fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createSimpleValidDocType()
  candidate.fields.propC = { type: 'invalid', default: 1.2 }
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Field name 'propC' declares an unrecognised type of 'invalid'./)
})

test('Doc type with unrecognised calculated field type fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.calculatedFields.propAandB.type = 'invalid'
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Calculated field 'propAandB' declares an unrecognised type of 'invalid'./)
})

test('Doc type with unrecognised filter parameter field type fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.filters.byDateOfBirth.parameters.x.type = 'invalid'
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Filter 'byDateOfBirth' parameter 'x' declares an unrecognised type of 'invalid'./)
})

// test('Doc type with invalid filter parameter example fails validation.', () => {
//   const ajv = createCustomisedAjv()
//   const candidate = createComplexValidDocType()
//   candidate.filters.byDateOfBirth.parameters.x.example = 1234
//   expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Filter 'byDateOfBirth' parameter 'x' declares an example value '1234'./)
// })

test('Doc type with unrecognised constructor parameter field type fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.ctor.parameters.propD = { type: 'invalid' }
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Constructor parameter 'propD' declares an unrecognised type of 'invalid'./)
})

// test('Doc type with invalid constructor parameter example fails validation.', () => {
//   const ajv = createCustomisedAjv()
//   const candidate = createComplexValidDocType()
//   candidate.ctor.parameters.propD = { type: 'string' }
//   expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Constructor parameter 'propD' declares an example value '123'./)
// })

test('Doc type with unrecognised operation parameter field type fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.operations.changePropB.parameters.propE = { type: 'invalid' }
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Operation 'changePropB' parameter 'propE' declares an unrecognised type of 'invalid'./)
})

// test('Doc type with invalid operation parameter example fails validation.', () => {
//   const ajv = createCustomisedAjv()
//   const candidate = createComplexValidDocType()
//   candidate.operations.changePropB.parameters.propE = { type: 'integer', description: 'desc', example: true }
//   expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Operation 'changePropB' parameter 'propE' declares an example value 'true'./)
// })

test('Doc type with invalid default fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createSimpleValidDocType()
  candidate.fields.propB.default = 'invalid'
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Field name 'propB' declares a default value '"invalid"'/)
})

// test('Doc type with invalid field example fails validation.', () => {
//   const ajv = createCustomisedAjv()
//   const candidate = createSimpleValidDocType()
//   candidate.fields.propA.example = 'invalid'
//   expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Field name 'propA' declares an example value '"invalid"'/)
// })

// test('Doc type with invalid calculated field example fails validation.', () => {
//   const ajv = createCustomisedAjv()
//   const candidate = createComplexValidDocType()
//   candidate.calculatedFields.propAandB.example = 123
//   expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Calculated field 'propAandB' declares an example value '123'/)
// })

test('Doc type with missing fields section fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  delete candidate.fields
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Unable to validate against docTypeSchema/)
})

test('Doc type with calculated field that refers to erroneous field fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.calculatedFields.propAandB.inputFields = ['a', 'madeup', 'b']
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Calculated field 'propAandB' requires unrecognised input field/)
})

test('Doc type with a property that clashes with a system property name fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.fields.id = { type: 'string' }
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/clash with a reserved system field name/)
})
