import { RecordFactory, TestCase } from 'jsonotron-interfaces'

/**
 * Returns the definitions of the 4 standard properties of a sengi document
 * in jsonotron form.
 */
function getStandardDocProperties () {
  return [
    { name: 'id', propertyType: 'std/uuid', summary: 'The id of the document.' },
    { name: 'docType', propertyType: 'std/mediumString', summary: 'The type of the document.' },
    { name: 'docOpIds', propertyType: 'std/uuid', isArray: true, summary: 'The array of document operation ids that were recently applied.' },
    { name: 'docVersion', propertyType: 'std/mediumString', summary: 'A code that represents this version of the document.' }
  ]
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
 * A factory for automaticalling expanding a sengi-compatible record into a client
 * and database version.
 */
export const sengiFactory: RecordFactory = {
  name: 'sengi',
  implementation: source => [
    // This version is used in the data service, where required fields are enforced and included in the JSON schema.
    // Note that docVersion is not a required field because it is populated the doc store engine.
    // A tag is added to skip the generation of normal typescript output.
  {
    ...source,
    name: source.name + 'Db',
    properties: [
      ...getStandardDocProperties(),
      ...source.properties,
    ],
    required: ['id', 'docType', 'docOpIds', ...source.required || []],
    tags: ['db-only'],
    validTestCases: source.validTestCases.map(tc => newTestCaseWithStandardProperties(source.name, tc)),
    variantBaseName: source.name,
  }, 
    // This version is used in other services, via the sengi client, where required fields are always optional.
    // A sengi-client tag is also added so that it's included in the SengiClient wrapper.
  {
    ...source,
    properties: [
      ...getStandardDocProperties(),
      ...source.properties,
    ],
    required: [],
    tags: [...source.tags || [], 'sengi-client'],
    validTestCases: source.validTestCases.map(tc => newTestCaseWithStandardProperties(source.name, tc)),
    variantBaseName: source.name,
  }]
}
