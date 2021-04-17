/**
 * Raised if a schema type variant refers to a field not found on the object type.
 */
 export class SchemaTypeVariantUnrecognisedFieldError extends Error {
  schemaTypeName: string
  variantName: string
  fieldName: string

  /**
   * Constructs a new instance.
   * @param schemaTypeName The name of a schema type.
   * @param variantName The name of a variant;
   * @param fieldName The field name that was not recognised.
   */
  constructor (schemaTypeName: string, variantName: string, fieldName: string) {
    super(`Variant ${variantName} of schema type ${schemaTypeName} references unrecognised field named ${fieldName}.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.schemaTypeName = schemaTypeName
    this.variantName = variantName
    this.fieldName = fieldName
  }
}
