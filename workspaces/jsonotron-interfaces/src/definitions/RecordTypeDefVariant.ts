/**
 * Represents a variation on a record type definition.
 */
export interface RecordTypeDefVariant {
  /**
   * The name of this variant.
   */
  name: string

  /**
   * Documents the usage of the variant.
   */
  summary: string

  /**
   * Indicates which of the properties on this variant are mandatory.
   */
  required?: string[]

  /**
   * If present, it lists the only properties that are included in this
   * variant of the record.
   */
  includeProperties?: string[]

  /**
   * If present, and if includeProperties is not present, the variant will
   * include all the properties except the ones specified.
   */
  excludeProperties?: string[]

  /**
   * If populated, this value explains why the variant was deprecated
   * and/or which variant to use instead.
   */
  deprecated?: string

  /**
   * An array of tags that can be used by the code generator
   * to discriminate between the types.
   */
  tags?: string[]
}
