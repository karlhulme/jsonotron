import Ajv, { ErrorObject } from 'ajv'
import { TypeLibrary } from 'jsonotron-interfaces'
import { UnrecognisedTypeError, ValueValidationError } from '../errors'
import { createJsonSchemaValidator } from './createJsonSchemaValidator'

/**
 * The domain used for the JSON schemas that are generated for
 * the purpose of validation.
 */
 const INTERNAL_DOMAIN = 'https://jsonotron.org'

 /**
  * Provides methods for validating objects against Jsonotron types
  * based on a JSON schema.
  */
export class ValueValidator {
  jsonSchemaValidator: Ajv
  domain: string

  /**
   * Constructs a new instance of the class.
   * @param typeLibrary A type library.
   * @param domain A domain to use for the JSON schemas.
   */
  constructor (typeLibrary: TypeLibrary, domain: string) {
    /* istanbul ignore next */
    this.domain = domain || INTERNAL_DOMAIN
    this.jsonSchemaValidator = createJsonSchemaValidator(this.domain, typeLibrary)
  }

  /**
   * Convert validator errors to a string.
   * @param errors An array of error objects.
   */
  private ajvErrorsToString (errors?: ErrorObject[]|null) {
    /* istanbul ignore next - errors will never be null/undefined */
    return JSON.stringify(errors || [], null, 2)
  }

  /**
   * Raises an error if the value cannot be validated because (a) the systemQualifiedType
   * was not recognised, or (b) the given value did not conform to the type definition.
   * @param systemQualifiedType A system qualified type name, such as jss/shortString.
   * @param value Any object.
   */
  validateValue (systemQualifiedType: string, value: unknown): void {
    const domainQualifiedType = `${this.domain}/${systemQualifiedType}`

    const validator = this.jsonSchemaValidator.getSchema(domainQualifiedType)

    if (!validator) {
      throw new UnrecognisedTypeError(systemQualifiedType)
    }

    const result = validator(value)

    if (!result) {
      throw new ValueValidationError(systemQualifiedType, value, this.ajvErrorsToString(validator.errors))
    }
  }
}
