/**
 * Raised if a structure defines a field with an unrecognised type.
 */
 export class StructureFieldsValidationError extends Error {
  structureName: string
  fieldName: string
  fieldType: string

  /**
   * Constructs a new instance.
   * @param structureName The name of a structure.
   * @param fieldName The name of a field.
   * @param fieldType A field type.
   */
  constructor (structureName: string, fieldName: string, fieldType: string) {
    super(`Structure ${structureName} failed to validate because field ${fieldName} declares unrecognised type ${fieldType}.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.structureName = structureName
    this.fieldName = fieldName
    this.fieldType = fieldType
  }
}
