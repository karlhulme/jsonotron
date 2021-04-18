export interface ResolvedPropertyType {
  /**
   * Indicates the type of resolved property.
   */
  resolutionType: 'jsonotronType'|'jsonSchemaType'|'unknown'

  /**
   * The system that the type belongs to.
   */
  system: string

  /**
   * The name of the type.
   */
  name: string

  /**
   * The number of array references.
   */
  arrayCount: number
}
