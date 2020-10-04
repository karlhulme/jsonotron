import check from 'check-types'
import Ajv from 'ajv'
import { customTypeOfGenerator } from './customTypeOfGenerator.js'

/**
 * Creates an instance of AJV with full format validation, support for the customTypeOf keywords
 * and support for the given formatValidators.
 * @param {Array} [formatValidators] An array of objects { name, validator }.
 * @param {String} formatValidators.name The name of the format validator.
 * @param {Function} formatValidators.validate A function (value) that returns true if the sole parameter is valid.
 */
export function createCustomisedAjv (formatValidators = []) {
  check.assert.array.of.object(formatValidators)

  const ajv = new Ajv({
    format: 'full', // 'full' mode supports format validators
    ownProperties: true // only iterate over objects found directly on the object
  })

  // add the format validators
  for (const formatValidator of formatValidators) {
    ajv.addFormat(formatValidator.name, { validate: formatValidator.validate })
  }

  // add the customTypeOf keyword used by schemas that support functions
  ajv.addKeyword('customTypeOf', { compile: customTypeOfGenerator })

  return ajv
}
