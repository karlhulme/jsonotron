/* eslint-env jest */
const propMap = require('./propMap')

test('Can map properties from an object.', () => {
  const input = {
    a: { keep: true },
    b: { keep: false },
    c: { keep: true },
    d: { keep: false }
  }

  expect(propMap(input, prop => ({ retain: prop.keep.toString() }))).toEqual({
    a: { retain: 'true' },
    b: { retain: 'false' },
    c: { retain: 'true' },
    d: { retain: 'false' }
  })
})
