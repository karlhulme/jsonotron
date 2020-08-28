/* eslint-env jest */
const { JsonotronDocTypesDocumentationMissingError, JsonotronDocTypeValidationError } = require('jsonotron-errors')
const { createCustomisedAjv } = require('../validator')
const ensureDocTypes = require('./ensureDocTypes')

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
  pluralName: 'simpleDocs',
  fields: {
    propA: { type: 'integer', isRequired: true, canUpdate: true },
    propB: { type: 'float', default: 1.2 },
    propQ: { type: 'string', isArray: true }
  }
})

const createSimpleYetFullyDocumentedDocType = () => ({
  name: 'simpleDoc',
  pluralName: 'simpleDocs',
  title: 'Simple Doc',
  pluralTitle: 'Simple Docs',
  summary: 'A simple document.',
  paragraphs: ['A simple yet fully documented doc type.'],
  fields: {
    propA: { type: 'integer', isRequired: true, canUpdate: true, paragraphs: ['A field.'] }
  },
  ctor: {
    title: 'Create New Document',
    paragraphs: ['Create a new document.']
  }
})

const createComplexValidDocType = () => ({
  name: 'candidateDoc',
  pluralName: 'candidateDocs',
  title: 'Candidate',
  pluralTitle: 'Candidates',
  summary: 'A candidate document',
  paragraphs: ['This is an introduction.'],
  fields: {
    propA: { type: 'string', isRequired: true, canUpdate: true, paragraphs: ['this is my description'] },
    propB: { type: 'string', isDeprecated: true }
  },
  examples: [
    { value: { propA: 'a', propB: 'b' } },
    { value: { propA: 'c', propB: 'd' }, paragraphs: ['some notes'] }
  ],
  patchExamples: [
    { value: { propA: 'a' } },
    { value: { propA: 'b' }, paragraphs: ['patch notes'] }
  ],
  preSave: (doc) => {},
  validate: (doc) => {},
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
      paragraphs: ['described', 'fully', 'here'],
      value: doc => [doc.propA, doc.propB]
    }
  },
  filters: {
    byDateOfBirth: {
      title: 'by Date of Birth',
      paragraphs: ['how this filter works'],
      parameters: {
        x: { type: 'string', isRequired: true, paragraphs: ['parameter info'] },
        y: { type: 'string', isArray: true, isDeprecated: true }
      },
      implementation: input => `some_col = "${input.x}"`,
      examples: [
        { value: { x: 'xx', y: ['yy'] } },
        { value: { x: 'xx', y: ['yy'] }, paragraphs: ['filter information'] }
      ]
    },
    byFixedValue: {
      isDeprecated: true,
      implementation: input => 'some_col = "fixed"'
    }
  },
  ctor: {
    parameters: {
      c: { type: 'boolean', isDeprecated: true },
      d: { type: 'boolean', isArray: true, isRequired: true, paragraphs: ['a required parameter'] }
    },
    paragraphs: ['what the constructor', 'does'],
    implementation: input => {
      return {
        a: input.a,
        b: input.c ? 'hello' : 'world'
      }
    },
    examples: [
      { value: { c: true, d: [false, false] } },
      { value: { c: false, d: [true, true] }, paragraphs: ['ctor information'] }
    ]
  },
  operations: {
    changePropB: {
      title: 'Change Property B',
      paragraphs: ['this is what the operation does.'],
      parameters: {
        c: { type: 'string', isRequired: true, isDeprecated: true },
        propQ: { type: 'string', isArray: true, paragraphs: ['an array operation parameter.'] }
      },
      implementation: (doc, input) => {
        return {
          b: input.c && doc.b ? 'hello' : 'world'
        }
      },
      examples: [
        { value: { c: 'opValue', propQ: ['great', 'run'] } },
        { value: { c: 'opText', propQ: ['marathon'] }, paragraphs: ['operation information'] }
      ]
    },
    doNothing: {
      isDeprecated: true
    }
  },
  policy: {
    canDeleteDocuments: false,
    canFetchWholeCollection: false,
    canReplaceDocuments: false,
    maxOpsSize: 10
  },
  docStoreOptions: {
    someValueA: 'a',
    someValueB: 123
  }
})

test('A minimal doc type can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(() => ensureDocTypes(ajv, [createSimpleValidDocType()], testFieldTypes, testEnumTypes)).not.toThrow()
})

test('A minimal doc type will yield documentation errors.', () => {
  const ajv = createCustomisedAjv()
  const dt1 = createSimpleValidDocType()
  expect(() => ensureDocTypes(ajv, [dt1], testFieldTypes, testEnumTypes, true)).toThrow(JsonotronDocTypesDocumentationMissingError)
  const dt2 = createSimpleValidDocType()
  expect(() => ensureDocTypes(ajv, [dt2], testFieldTypes, testEnumTypes, true)).toThrow(/simpleDoc/)
})

test('A minimal yet fully documented doc type will not yield documentation errors.', () => {
  const ajv = createCustomisedAjv()
  const documentedDocType = createSimpleYetFullyDocumentedDocType()
  expect(() => ensureDocTypes(ajv, [documentedDocType], testFieldTypes, testEnumTypes, true)).not.toThrow()
})

test('The functions added to a doc type by default can be executed.', () => {
  const ajv = createCustomisedAjv()
  const simpleDocType = createSimpleValidDocType()
  ensureDocTypes(ajv, [simpleDocType], testFieldTypes, testEnumTypes)
  expect(() => simpleDocType.preSave()).not.toThrow()
  expect(() => simpleDocType.validate()).not.toThrow()
  expect(simpleDocType.ctor.implementation()).toEqual({})

  const complexDocType = createComplexValidDocType()
  ensureDocTypes(ajv, [complexDocType], testFieldTypes, testEnumTypes)
  expect(complexDocType.operations.doNothing.implementation()).toEqual({})
})

test('A doc type without any fields can be verified.', () => {
  const ajv = createCustomisedAjv()
  const docType = createSimpleValidDocType()
  delete docType.fields
  expect(() => ensureDocTypes(ajv, [docType], testFieldTypes, testEnumTypes)).not.toThrow()
})

test('A complex doc type can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(() => ensureDocTypes(ajv, [createComplexValidDocType()], testFieldTypes, testEnumTypes)).not.toThrow()
})

test('An invalid doc type cannot be verified.', () => {
  const ajv = createCustomisedAjv()
  const docType = createSimpleValidDocType()
  delete docType.name
  expect(() => ensureDocTypes(ajv, [docType], testFieldTypes, testEnumTypes)).toThrow(JsonotronDocTypeValidationError)
})

test('Doc type with invalid default fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.fields.propB.default = 999
  expect(() => ensureDocTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/Field name 'propB' declares a default value '999'/)
})

test('Doc type with calculated field input that refers to unrecognised field fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.calculatedFields.propAandB.inputFields = ['a', 'madeup', 'b']
  expect(() => ensureDocTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/Calculated field 'propAandB' requires unrecognised input field/)
})

test('Doc type with a field name that clashes with a system property name fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.fields.id = { type: 'string' }
  expect(() => ensureDocTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/Field name 'id' clashes with a reserved system field name/)
})

test('Doc type with a calculated field name that clashes with a system property name fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.calculatedFields.id = { inputFields: [], type: 'string', value: () => 'hi' }
  expect(() => ensureDocTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/Calculated field name 'id' clashes with a reserved system field name/)
})

test('Doc type with a calculated field name that clashes with a declared field name fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.calculatedFields.propA = { inputFields: [], type: 'string', value: () => 'hi' }
  expect(() => ensureDocTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/Calculated field name 'propA' clashes with a declared field name/)
})

test('Doc type with a constructor parameter name that clashes with a declared field name fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.ctor.parameters.propB = { type: 'string' }
  expect(() => ensureDocTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/Constructor parameter 'propB' clashes/)
})

test('Doc type with a invalid example fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.examples[0].value.propA = false
  expect(() => ensureDocTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/Example at index 0 does not match the schema/)
})

test('Doc type with a invalid patch example fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.patchExamples[1].value.propA = 123
  expect(() => ensureDocTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/Patch example at index 1 does not match the schema/)
})

test('Doc type with a invalid filter example fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  delete candidate.filters.byDateOfBirth.examples[0].value.x
  expect(() => ensureDocTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/Example for filter "byDateOfBirth" at index 0 does not match the schema/)
})

test('Doc type with a invalid constructor example fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.ctor.examples[1].value.c = 'not-a-boolean'
  expect(() => ensureDocTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/Constructor example at index 1 does not match the schema/)
})

test('Doc type with a invalid operation example fails validation.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createComplexValidDocType()
  candidate.operations.changePropB.examples[0].value.propQ = 'not-an-array'
  expect(() => ensureDocTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/Example for operation "changePropB" at index 0 does not match the schema/)
})
