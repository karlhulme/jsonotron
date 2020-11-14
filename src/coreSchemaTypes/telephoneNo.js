export const telephoneNo = {
  name: 'telephoneNo',
  title: 'Telephone Number',
  paragraphs: [
    'A telephone number that comprises of a dialling code and a number.',
    'The `isd` property is a %%callingCode%%.',
    'The `number` property is a %%shortString%%.'],
  examples: [
    { value: { isd: '44', number: '7834111222' }, paragraphs: ['In this example we have a UK mobile number.'] },
    { value: { isd: '1', number: '5550172', ext: '2209' }, paragraphs: ['In this example we have a US landline number with an extension.'] }
  ],
  validTestCases: [{ isd: '44', number: '1202111222', ext: '237' }],
  invalidTestCases: [
    null, true, 12, 'a string', [], {},
    { isd: '044', number: '1234567' },
    { isd: 44, number: '1234567' },
    { isd: '44', number: 1234567 }
  ],
  jsonSchema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      isd: { $ref: '#/definitions/callingCode' },
      number: { $ref: '#/definitions/shortString' },
      ext: { $ref: '#/definitions/shortString' }
    },
    required: ['isd', 'number']
  }
}
