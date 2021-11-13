import { RecordFactory, TestCase } from 'jsonotron-interfaces'

/**
 * Returns the definitions of the standard properties of a sengi document
 * in jsonotron form.
 */
function getStandardDocProperties () {
  return [
    { name: 'id', propertyType: 'std/uuid', summary: 'The id of the document.' },
    { name: 'docType', propertyType: 'std/mediumString', summary: 'The type of the document.' },
    { name: 'docOpIds', propertyType: 'std/uuid', isArray: true, summary: 'The array of document operation ids that were recently applied.' },
    { name: 'docVersion', propertyType: 'std/mediumString', summary: 'A code that represents this version of the document.' },
    { name: 'docCreatedByUserId', propertyType: 'std/longString', summary: 'The id of the user that created the document.' },
    { name: 'docCreatedMillisecondsSinceEpoch', propertyType: 'std/timestamp', summary: 'The number of milliseconds since the unix epoch when the document was created.' },
    { name: 'docLastUpdatedByUserId', propertyType: 'std/longString', summary: 'The id of the user that last updated the document.' },
    { name: 'docLastUpdatedMillisecondsSinceEpoch', propertyType: 'std/timestamp', summary: 'The number of milliseconds since the unix epoch when the document was last updated.' }
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
      docCreatedByUserId: 'aUser',
      docCreatedMillisecondsSinceEpoch: 1630133364000,
      docLastUpdatedByUserId: 'aUser',
      docLastUpdatedMillisecondsSinceEpoch: 1630133364000,
      ...(testCase.value as Record<string, unknown>)
    }
  }
}

/**
 * A factory for adding the sengi common fields to a record.
 * This factory also appends a Sengi tag, since the factories originally used to
 * generate a record type will not be available to the code generator.
 */
export const sengiFactory: RecordFactory = {
  name: 'sengi',
  implementation: source => [{
    ...source,
    properties: [
      ...getStandardDocProperties(),
      ...source.properties,
    ],
    required: [
      'id',
      'docType',
      'docOpIds',
      'docCreatedByUserId',
      'docCreatedMillisecondsSinceEpoch',
      'docLastUpdatedByUserId',
      'docLastUpdatedMillisecondsSinceEpoch',
      ...(source.required || [])
    ],
    tags: [...(source.tags || []), 'sengi'],
    validTestCases: source.validTestCases.map(tc => newTestCaseWithStandardProperties(source.name, tc))
  }]
}
