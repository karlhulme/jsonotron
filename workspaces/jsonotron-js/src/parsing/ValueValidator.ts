import Ajv, { ErrorObject } from 'ajv'
import { TypeLibrary } from 'jsonotron-interfaces'
import { ValueValidationError } from '../errors'
import { createAjvFromTypeLibrary } from '../typeDefValueSchemas'

 /**
  * Provides methods for validating objects against Jsonotron types
  * based on a JSON schema.
  */
export class ValueValidator {
  jsonSchemaValidator: Ajv
  jsonSchemaDomain: string

  /**
   * Constructs a new instance of the class.
   * @param typeLibrary A type library.
   */
  constructor (typeLibrary: TypeLibrary) {
    this.jsonSchemaValidator = createAjvFromTypeLibrary(typeLibrary)
    this.jsonSchemaDomain = typeLibrary.jsonSchemaDomain
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
    const domainQualifiedType = `${this.jsonSchemaDomain}/${systemQualifiedType}`

    const validator = this.jsonSchemaValidator.getSchema(domainQualifiedType)

    if (!validator) {
      throw new ValueValidationError(systemQualifiedType, value, 'No validator found for the givem system qualified type.')
    }

    const result = validator(value)

    if (!result) {
      throw new ValueValidationError(systemQualifiedType, value, this.ajvErrorsToString(validator.errors))
    }
  }
}
