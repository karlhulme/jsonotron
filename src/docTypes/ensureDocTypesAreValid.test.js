/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const ensureDocTypesAreValid = require('./ensureDocTypesAreValid')

const testFieldTypes = [
  {
    name: 'boolean',
    title: 'Boolean',
    description: 'A value of either true of false.',
    values: [
      { value: true, description: 'A value of true.' },
      { value: false, description: 'A value of false.' }
    ]
  }, {
    name: 'integer',
    title: 'Integer',
    description: 'A whole number.',
    examples: [-25, 0, 25],
    invalidExamples: ['a string', '', null, true, {}, []],
    jsonSchema: {
      type: 'integer'
    }
  }, {
    name: 'float',
    title: 'Floating Point Number',
    description: 'A number with an integral and decimal part.',
    examples: [-34.56, -1, 0, 1, 1456.24],
    invalidExamples: ['a string', '', null, true, {}, []],
    jsonSchema: {
      type: 'number'
    }
  }, {
    name: 'string',
    title: 'String',
    description: 'A string of zero or more characters.',
    examples: ['any string', '', ' '],
    invalidExamples: [123, null, true, {}, []],
    jsonSchema: {
      type: 'string'
    }
  }
]

const createSimpleValidDocType = () => ({
  name: 'simpleDoc',
  pluralName: 'simpleDocs',
  title: 'Simple Doc',
  pluralTitle: 'Simple Docs',
  fields: {
    propA: { type: 'integer', isRequired: true, canUpdate: true, description: 'Property A.', example: 10 },
    propB: { type: 'float', description: 'Property B.', default: 1.2, example: 2.8 },
    propQ: { type: 'string', description: 'Property Q', isArray: true, example: ['string one', 'string two'] }
  }
})

const createComplexValidDocType = () => ({
  name: 'candidateDoc',
  pluralName: 'candidateDocs',
  title: 'Candidate Doc',
  pluralTitle: 'Candidate Docs',
  policy: {
    canFetchWholeCollection: true
  },
  fields: {
    propA: { type: 'string', isRequired: true, canUpdate: true, description: 'Property A.', example: 'foo' },
    propB: { type: 'string', description: 'Property B.', example: 'bar' }
  },
  calculatedFields: {
    propAandB: {
      description: 'The combination of prop a and b.',
      inputFields: ['propA', 'propB'],
      type: 'string',
      example: 'foobar',
      value: doc => `${doc.propA || ''}${doc.propB || ''}`
    },
    propAwithB: {
      description: 'An array of prop a and b.',
      inputFields: ['propA', 'propB'],
      type: 'string',
      isArray: true,
      example: ['foo', 'bar'],
      value: doc => [doc.propA, doc.propB]
    }
  },
  filters: {
    byDateOfBirth: {
      description: 'Fetch records where propA is equal to \'x\'.',
      parameters: {
        x: { type: 'string', isRequired: true, description: 'The value to match.', example: 'aValue' },
        y: { type: 'string', isArray: true, description: 'An array of values.', example: ['first', 'second'] }
      },
      implementation: input => `some_col = "${input.x}"`
    }
  },
  validate: doc => null,
  ctor: {
    parameters: {
      propA: { lookup: 'field', isRequired: true },
      c: { type: 'boolean', description: 'Additional prop used only for construction.', example: true },
      d: { type: 'boolean', isArray: true, description: 'array of booleans.', example: [true, false] }
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
      title: 'Change Property B',
      description: 'Makes a change to property B.',
      parameters: {
        c: { type: 'string', isRequired: true, description: 'A value that affects the operation.', example: 'hello' },
        propB: { lookup: 'field' },
        propQ: { type: 'string', description: 'Property Q', isArray: true, example: ['string one', 'string two'] }
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
  candidate.fields.propC = { type: 'invalid', description: 'Property C.', default: 1.2, example: 2.8 }
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

test('Doc type with invalid filter parameter example fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.filters.byDateOfBirth.parameters.x.example = 1234
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Filter 'byDateOfBirth' parameter 'x' declares an example value '1234'./)
})

test('Doc type with unrecognised constructor parameter field type fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.ctor.parameters.propD = { type: 'invalid', description: 'desc', example: 'abc' }
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Constructor parameter 'propD' declares an unrecognised type of 'invalid'./)
})

test('Doc type with invalid constructor parameter example fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.ctor.parameters.propD = { type: 'string', description: 'desc', example: 123 }
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Constructor parameter 'propD' declares an example value '123'./)
})

test('Doc type with unrecognised operation parameter field type fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.operations.changePropB.parameters.propE = { type: 'invalid', description: 'desc', example: 'abc' }
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Operation 'changePropB' parameter 'propE' declares an unrecognised type of 'invalid'./)
})

test('Doc type with invalid operation parameter example fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.operations.changePropB.parameters.propE = { type: 'integer', description: 'desc', example: true }
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Operation 'changePropB' parameter 'propE' declares an example value 'true'./)
})

test('Doc type with invalid default fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createSimpleValidDocType()
  candidate.fields.propB.default = 'invalid'
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Field name 'propB' declares a default value '"invalid"'/)
})

test('Doc type with invalid field example fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createSimpleValidDocType()
  candidate.fields.propA.example = 'invalid'
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Field name 'propA' declares an example value '"invalid"'/)
})

test('Doc type with invalid calculated field example fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.calculatedFields.propAandB.example = 123
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Calculated field 'propAandB' declares an example value '123'/)
})

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

test('Doc type with unresolvable lookup constructor parameters fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.ctor.parameters.invalidParam = { lookup: 'field' }
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Constructor parameter 'invalidParam' is a lookup field but/)
})

test('Doc type with a property that clashes with a system property name fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.fields.id = { type: 'string', description: 'A field that clashes with a system field.', example: '1234' }
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/clash with a reserved system field name/)
})

test('Doc type with unresolvable lookup operation parameters fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.operations.changePropB.parameters.invalidParam = { lookup: 'field' }
  expect(() => ensureDocTypesAreValid(ajv, [candidate], testFieldTypes)).toThrow(/Operation 'changePropB' states parameter 'invalidParam' is a lookup field but/)
})
