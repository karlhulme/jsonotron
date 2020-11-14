export const ipv4 = {
  name: 'ipv4',
  title: 'IP Version 4',
  paragraphs: ['A string of digits that identify a computer on a network in IP v4 format.'],
  examples: [
    { value: '127.0.0.1', paragraphs: ['An example.'] }
  ],
  validTestCases: ['192.168.0.1', '10.25.1.100'],
  invalidTestCases: [123, null, true, {}, [], '270.0.0.1'],
  jsonSchema: {
    type: 'string',
    format: 'ipv4'
  }
}
