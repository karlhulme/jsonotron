export const money = {
  name: 'money',
  title: 'Money',
  paragraphs: [
    'An amount of money designated in a specific currency.',
    'The `amount` property stores an integral amount of money.  This should include the minor denomination.  For example, in American the currency is dollars and cents.  Typically monetary values should be recorded in cents.',
    'The `scaler` property indicates how many places we need to move the decimal place to convert from the minor to the major currency.  The use of a scaler ensures that monetary amounts are stored as integers rather than floats.  This makes it easier to work with monetary amounts; for example, equality checks on integers are reliable whereas equality checks on floating point numbers are subject to many intracies depending on the platform used.',
    'The `currency` property is a %%currencyCode%% value.'
  ],
  examples: [
    {
      value: {
        amount: 9999,
        scaler: 2,
        currency: 'gbp'
      },
      paragraphs: [
        'In this example the scaler of 2 means that we shift the decimal point 2 places to the left.  So 9999 becomes 99.99 for display.'
      ]
    }
  ],
  validTestCases: [{ amount: 1125, scaler: 2, currency: 'gbp' }],
  invalidTestCases: [
    null, true, 12, 'a string', [], {},
    { amount: 11.25, scaler: 2, currency: 'gbp' },
    { amount: 1125, scaler: 2.5, currency: 'gbp' },
    { amount: 1125, scaler: 2, currency: 'invalid_currency_code' }
  ],
  jsonSchema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      amount: { $ref: '#/definitions/integer' },
      scaler: { $ref: '#/definitions/integer' },
      currency: { $ref: '#/definitions/currencyCode' }
    },
    required: ['amount', 'scaler', 'currency']
  }
}
