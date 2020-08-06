/* eslint-env jest */
const propFilter = require('./propFilter')

test('Can pull properties from an object.', () => {
  const input = {
    a: { keep: true },
    b: { keep: false },
    c: { keep: true },
    d: { keep: false }
  }

  expect(propFilter(input, prop => prop.keep)).toEqual({
    a: { keep: true },
    c: { keep: true }
  })
})
