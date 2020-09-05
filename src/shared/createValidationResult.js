import check from 'check-types'

/**
 * Creates an object that contains the results of executing a validator.
 * @param {Boolean} recognised True if a validator was found.
 * @param {Boolean} validated True if the validator returned true for the value tested.
 * @param {Array|Null} errors An array of error objects or null if no errors were found.
 */
export function createValidationResult (recognised, validated, errors) {
  check.assert.boolean(recognised)
  check.assert.boolean(validated)
  check.assert.maybe.array(errors)

  return {
    recognised,
    validated,
    errors
  }
}
