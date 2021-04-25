/**
 * Represents a variation on a record type.
 */
export interface RecordTypeVariant {
  /**
   * The name of this variant.
   */
  name: string

  /**
   * Indicates if all the properties should be treated as optional.
   */
  partial: boolean

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
}
