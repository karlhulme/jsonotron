/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const { JsonotronDocTypeDocsValidationError } = require('jsonotron-errors')
const ensureDocTypeDocsAreValid = require('./ensureDocTypeDocsAreValid')

const fieldTypes = [{
  name: 'string',
  jsonSchema: { type: 'string' }
}, {
  name: 'dateTimeUtc',
  jsonSchema: { type: 'string' }
}, {
  name: 'sysDateTime',
  jsonSchema: { type: 'string' }
}, {
  name: 'sysId',
  jsonSchema: { type: 'string' }
}, {
  name: 'sysUserIdentity',
  jsonSchema: { type: 'string' }
}, {
  name: 'sysVersion',
  jsonSchema: { type: 'string' }
}, {
  name: 'sysOpId',
  jsonSchema: { type: 'string' }
}]

const docTypes = [{
  name: 'simpleDocType',
  fields: {
    fieldA: { type: 'string' },
    fieldB: { type: 'string' }
  }
}, {
  name: 'candidateDocType',
  fields: {
    fieldA: { type: 'string', canUpdate: true },
    fieldB: { type: 'string' }
  },
  calculatedFields: {
    theTotal: {
      inputFields: ['fieldA', 'fieldB'],
      type: 'string',
      value: () => 3
    }
  },
  filters: {
    byFieldB: {
      parameters: {
        fieldB: { type: 'string' }
      }
    }
  },
  ctor: {
    parameters: {
      fieldC: { type: 'dateTimeUtc', isRequired: true }
    },
    implementation: () => ({})
  },
  operations: {
    doSomething: {
      parameters: {
        fieldX: { type: 'string', isRequired: true },
        fieldY: { type: 'string', isRequired: true }
      }
    }
  }
}]

const createSimpleDocTypeDocs = () => ({
  name: 'simpleDocType',
  lang: 'en',
  title: 'Simple',
  pluralTitle: 'Simples',
  paragraphs: ['line one', 'line two'],
  fields: {
    fieldA: { paragraphs: ['line 1'] },
    fieldB: { paragraphs: ['line 2'] }
  }
})

const createValidDocTypeDocs = () => ({
  name: 'candidateDocType',
  lang: 'en',
  title: 'Candidate',
  pluralTitle: 'Candidates',
  paragraphs: ['line one', 'line two'],
  fields: {
    fieldA: { paragraphs: ['line 1'] },
    fieldB: { paragraphs: ['line 2'] }
  },
  calculatedFields: {
    theTotal: {
      paragraphs: ['It returns 3.']
    }
  },
  examples: [{
    value: {
      id: 'example_id',
      docType: 'candidateDocType',
      fieldA: 'first',
      fieldB: 'second'
    }
  }],
  filters: {
    byFieldB: {
      title: 'By Field B',
      paragraphs: [],
      parameters: {
        fieldB: { paragraphs: ['my notes on field B.'] }
      },
      examples: [{
        paragraphs: [],
        value: {
          fieldB: 'my-search-value'
        }
      }]
    }
  },
  ctor: {
    parameters: {
      fieldC: { paragraphs: ['Documenting the specialist constructor parameters.'] }
    },
    examples: [{
      paragraphs: ['An example of a constructor.'],
      value: {
        fieldA: 'a field with canUpdate set',
        fieldC: 'a constructor param'
      }
    }]
  },
  operations: {
    doSomething: {
      title: 'Do Something',
      paragraphs: [],
      parameters: {
        fieldX: { paragraphs: ['This is the first param.'] },
        fieldY: { paragraphs: ['This is the second param.'] }
      },
      examples: [{
        paragraphs: ['An explanation of this operation.'],
        value: {
          fieldX: 'xx',
          fieldY: 'yy'
        }
      }]
    }
  }
})

test('Valid doc type docs can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(() => ensureDocTypeDocsAreValid(ajv, [createValidDocTypeDocs(), createSimpleDocTypeDocs()], docTypes, fieldTypes)).not.toThrow()
})

test('Doc type docs with missing title fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.title
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/required property 'title'/)
})

test('Doc type docs with invalid lang fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  candidate.lang = 'XX'
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/properties\/lang\/pattern/)
})

test('Doc type docs based on missing underlying doc type fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  candidate.name = 'unknownDocType'
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/unknown doc type/)
})

test('Doc type docs with zero examples passes verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.examples
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).not.toThrow()
})

test('Doc type docs with invalid example fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  candidate.examples[0].value.fieldA = 101
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/fieldA/)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/should be string/)
})

test('Doc type docs with missing calculated fields section when underlying doc type declares a calculated field fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.calculatedFields
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/'calculatedFields' property is not defined/)
})

test('Doc type docs with missing calculated field for underlying doc type calculated field fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.calculatedFields.theTotal
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/Calculated field 'theTotal' is not defined/)
})

test('Doc type docs with missing filters section when underlying doc type declares a filter fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.filters
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/'filters' property is not defined/)
})

test('Doc type docs with missing filter for underlying doc type filter fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.filters.byFieldB
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/Filter 'byFieldB' is not defined/)
})

test('Doc type docs with missing filter parameter fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.filters.byFieldB.parameters.fieldB
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/'fieldB' that is not defined/)
})

test('Doc type docs with surplus filter parameter fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  candidate.filters.byFieldB.parameters.fieldC = { paragraphs: ['this is an extra parameter.'] }
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/'fieldC' but it is defined in the docs/)
})

test('Doc type docs with invalid filter example fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  candidate.filters.byFieldB.examples.push({ value: { fieldB: 123 }, paragraphs: ['this will not work'] })
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/Unable to validate filter example at index 1/)
})

test('Doc type docs with missing ctor section when underlying doc type declares a ctor fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.ctor
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/'ctor' property is not defined/)
})

test('Doc type docs with missing ctor parameter fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.ctor.parameters.fieldC
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/'fieldC' that is not defined/)
})

test('Doc type docs with surplus ctor parameter fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  candidate.ctor.parameters.fieldD = { paragraphs: ['this is an extra parameter.'] }
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/'fieldD' but it is defined in the docs/)
})

test('Doc type docs with invalid filter example fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  candidate.ctor.examples.push({ value: { fieldA: 'but missing the required fieldC' }, paragraphs: ['this will not work'] })
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/Unable to validate constructor example at index 1/)
})

test('Doc type docs with missing operations section when underlying doc type declares a operation fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.operations
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/'operations' property is not defined/)
})

test('Doc type docs with missing operation for underlying doc type operation fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.operations.doSomething
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/Operation 'doSomething' is not defined/)
})

test('Doc type docs with missing operation parameter fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.operations.doSomething.parameters.fieldX
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/'fieldX' that is not defined/)
})

test('Doc type docs with surplus operation parameter fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  candidate.operations.doSomething.parameters.fieldZ = { paragraphs: ['this is an extra parameter.'] }
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/'fieldZ' but it is defined in the docs/)
})

test('Doc type docs with invalid operation example fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  candidate.operations.doSomething.examples.push({ value: { fieldX: 'only-one-param' }, paragraphs: ['this will not work'] })
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/Unable to validate operation example at index 1/)
})
