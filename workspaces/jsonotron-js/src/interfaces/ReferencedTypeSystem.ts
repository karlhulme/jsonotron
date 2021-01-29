/**
 * Represents a type system that is referenced by a schema type.
 */
export interface ReferencedTypeSystem {
  /**
   * The domain of the owning type system.
   */
  domain: string

  /**
   * The name of the type system.
   */
  system: string

  /**
   * The url of documentation for the referenced type system. 
   */
  href: string
}
