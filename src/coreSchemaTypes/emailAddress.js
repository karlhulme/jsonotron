export const emailAddress = {
  name: 'emailAddress',
  title: 'Email Address',
  paragraphs: ['An email address.'],
  examples: [
    { value: 'anon@gmail.com', paragraphs: ['An example.'] }
  ],
  validTestCases: ['a.person@hostname.top.com', 'short_@hi.org'],
  invalidTestCases: [123, null, true, {}, [], 'bloke@place.', 'person@here.co@'],
  jsonSchema: {
    type: 'string',
    format: 'email'
  }
}
