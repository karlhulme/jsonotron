export const address = {
  name: 'address',
  title: 'Address',
  paragraphs: [
    'An object that captures an address.',
    'The `addressLines` property records the lines that make up the address.',
    'The `postalCode` property records the post code or zip code of the address.',
    'The `countryCode` property records %%countryCode%% value.'
  ],
  examples: [
    {
      value: { addressLines: '1 Acacia Avenue\nPortsmouth', postalCode: 'PO125LP', countryCode: 'gb' },
      paragraphs: [
        'This example is an address in England so it uses a UK post code.'
      ]
    }, {
      value: { addressLines: '1 Mansion Street\nBeverley Hills\nLos Angeles', postalCode: '90210', countryCode: 'us' },
      paragraphs: [
        'This example is an address in the United States so it uses a zip code.'
      ]
    }
  ],
  validTestCases: [
    { addressLines: '1 Acacia Avenue\nPortsmouth', postalCode: 'PO125LP', countryCode: 'gb' },
    { addressLines: '1 Mansion Street\nBeverley Hills\nLos Angeles', postalCode: '90210', countryCode: 'us' }
  ],
  invalidTestCases: [
    -1, 0, 999999, null, true, 'a house', {}, [],
    { addressLines: 123, postalCode: 'PO125LP', countryCode: 'gb' },
    { addressLines: '1 Acacia Avenue\nPortsmouth', postalCode: 234, countryCode: 'gb' },
    { addressLines: '1 Acacia Avenue\nPortsmouth', postalCode: 'PO125LP', countryCode: '--' }
  ],
  jsonSchema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      addressLines: { $ref: '#/definitions/hugeString' },
      postalCode: { $ref: '#/definitions/shortString' },
      countryCode: { $ref: '#/definitions/countryCode' }
    },
    required: ['addressLines', 'postalCode', 'countryCode']
  }
}
