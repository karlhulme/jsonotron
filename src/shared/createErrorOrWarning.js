import check from 'check-types'

/**
 * Creates an error or warning object.
 * @param {String} typeName The name of a type.
 * @param {String} message A message.
 * @param {Object} details A details object.
 */
export function createErrorOrWarning (typeName, message, details) {
  // accept anything for type name because this could be the source of the error.
  check.assert.string(message)
  check.assert.object(details)

  return {
    typeName,
    message,
    details
  }
}
