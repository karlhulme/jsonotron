import check from 'check-types'

/**
 * Creates an object that contains the results of executing a validator.
 * @param {Boolean} compiled True if the resource was compiled successfully.
 * @param {Array|Null} errors An array of error objects or null if no errors were found.
 */
export function createCompilationResult (compiled, errors) {
  check.assert.boolean(compiled)
  check.assert.maybe.array(errors)

  return {
    compiled,
    errors
  }
}
