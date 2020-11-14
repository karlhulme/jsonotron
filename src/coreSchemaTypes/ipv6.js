export const ipv6 = {
  name: 'ipv6',
  title: 'IP Version 6',
  paragraphs: ['A string of digits that identify a computer on a network in IP v6 format.'],
  examples: [
    { value: '2001:0DB8:85A3:0000:0000:8A2E:0370:7334', paragraphs: ['An example.'] },
    { value: '::1', paragraphs: ['The shorthand loopback address is also supported.'] }
  ],
  validTestCases: ['::1', 'FE80:CD00:0000:0CDE:1257:0000:211E:729C'],
  invalidTestCases: [123, null, true, {}, [], 'ZZZZ:CD00:0000:0CDE:1257:0000:211E:729C'],
  jsonSchema: {
    type: 'string',
    format: 'ipv6'
  }
}
