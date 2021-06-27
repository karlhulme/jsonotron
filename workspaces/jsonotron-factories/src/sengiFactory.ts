import { RecordFactory, TestCase } from 'jsonotron-interfaces'

/**
 * Returns the definitions of the 4 standard properties of a sengi document
 * in jsonotron form.
 * @param docTypeName The name of the document type.
 */
function getStandardDocProperties (docTypeName: string) {
  return [
    getIdProperty(),
    { name: 'docType', propertyType: 'std/shortString', constant: docTypeName, summary: 'The id of the document.' },
    { name: 'docOpIds', propertyType: 'std/uuid', isArray: true, summary: 'The id of the document operations.' },
    { name: 'docVersion', propertyType: 'std/mediumString', summary: 'A code that represents this version of the document.' }
  ]
}

/**
 * Returns the definition of an id property.
 */
function getIdProperty () {
  return { name: 'id', propertyType: 'std/uuid', summary: 'The id of the document.' }
}

/**
 * Returns a new test case, based on the given test case,
 * but with the standard properties added.
 * @param docTypeName The name of the document type.
 * @param testCase A valid test case.
 */
function newTestCaseWithStandardProperties (docTypeName: string, testCase: TestCase<unknown>) {
  return {
    ...testCase,
    value: {
      id: '00000000-0000-0000-0000-000000000001',
      docType: docTypeName,
      docOpIds: [],
      docVersion: 'abcd',
      ...(testCase.value as Record<string, unknown>)
    }
  }
}

/**
 * A factory for expanding a record into a set of records that
 * define the common manipulations on a sengi document.
 * Example: For use when fetching the whole document.
 * ExampleRecord: For use when querying part of one or more documents.
 * ExampleTemplate: For use when creating a new document.
 * ExamplePatch: For use when updating a document.
 */
export const sengiFactory: RecordFactory = {
  name: 'sengi',
  implementation: source => [{
    ...source,
    name: source.name,
    properties: [
      ...getStandardDocProperties(source.name),
      ...source.properties,
    ],
    required: ['id', 'docType', ...(source.required || [])],
    tags: ['sengi-doc'],
    validTestCases: source.validTestCases.map(tc => newTestCaseWithStandardProperties(source.name, tc)),
    variantBaseName: source.name,
    direction: 'output'
  }, {
    ...source,
    name: source.name + 'Record',
    properties: [
      ...getStandardDocProperties(source.name),
      ...source.properties,
    ],
    required: [],
    tags: ['sengi-select'],
    validTestCases: source.validTestCases.map(tc => newTestCaseWithStandardProperties(source.name, tc)),
    variantBaseName: source.name,
    direction: 'output'
  }, {
    ...source,
    name: source.name + 'Template',
    properties: [
      getIdProperty(),
      ...source.properties,
    ],
    required: source.required,
    tags: ['sengi-new'],
    variantBaseName: source.name,
    direction: 'input'
  }, {
    ...source,
    name: source.name + 'Patch',
    properties: [
      ...source.properties,
    ],
    required: [],
    tags: ['sengi-patch'],
    variantBaseName: source.name,
    direction: 'input'
  }]
}
