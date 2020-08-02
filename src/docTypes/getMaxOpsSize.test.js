/* eslint-env jest */
const getMaxOpsSize = require('./getMaxOpsSize')

const docTypeWithPolicy = {
  policy: {
    maxOpsSize: 5
  }
}

const docTypeWithPolicyButNoMaxOpsValue = {
  policy: {}
}

const docTypeWithNoPolicy = {}

test('Get the maximum ops size from the doc type.', () => {
  expect(getMaxOpsSize(docTypeWithPolicy)).toEqual(5)
})

test('Get the default max ops size if not specified for doc type.', () => {
  expect(getMaxOpsSize(docTypeWithPolicyButNoMaxOpsValue)).toEqual(10)
  expect(getMaxOpsSize(docTypeWithNoPolicy)).toEqual(10)
})
