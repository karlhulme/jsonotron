export const webAddress = {
  name: 'webAddress',
  title: 'Web Address',
  paragraphs: [
    'A url that is prefixed with either https or https.'
  ],
  examples: [
    { value: 'https://www.bbc.co.uk', paragraphs: ['A link to a site using HTTPS.'] },
    { value: 'http://www.simple.com', paragraphs: ['A link to an secured site using HTTP.'] }
  ],
  validTestCases: ['https://www.bbc.co.uk', 'http://www.unsecured.com'],
  invalidTestCases: [-1, 0, 999999, null, true, 'a house', {}, [], 'ftp://download.server.com', 'mailto:person@place.com'],
  jsonSchema: {
    type: 'string',
    pattern: '^http[s]?://[a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$'
  }
}
