/**
 * Represents a variation of the schema type;
 */
export interface SchemaTypeVariant {
  /**
   * The name of this variant.
   * This will generally be appended to the schema type name as a suffix.
   */
  name: string

  /**
   * Indicates if all the fields should be treated as optional.
   */
  partial: boolean

  /**
   * If present, it lists the only fields that are included in this variant.
   */
  includeFields?: string[]

  /**
   * If present, and if includeFields is not present, the variant will
   * include all the fields except the ones specified in this property.
   */
  excludeFields?: string[]
}
