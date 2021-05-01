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
   * Indicates which of the properties on this variant are mandatory.
   */
  required?: string[]

  /**
   * Indicates whether the record is used exclusively for input,
   * exclusively for output, or for either.  If not specified, a
   * direction of 'both' is assumed.
   */
  direction?: 'input'|'output'|'both'

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
