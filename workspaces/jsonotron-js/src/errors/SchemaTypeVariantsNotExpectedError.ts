/**
 * Raised if a schema type contains variants but is not based on the object type.
 */
 export class SchemaTypeVariantsNotExpectedError extends Error {
  schemaTypeName: string
  jsonSchemaType: string

  /**
   * Constructs a new instance.
   * @param schemaTypeName The name of a schema type.
   * @param jsonSchemaType The top level type of the json schema.
   */
  constructor (schemaTypeName: string, jsonSchemaType: string) {
    super(`Variants not expected for schema type ${schemaTypeName} because the top level type of the JSON was ${jsonSchemaType} instead of object.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.schemaTypeName = schemaTypeName
    this.jsonSchemaType = jsonSchemaType
  }
}
