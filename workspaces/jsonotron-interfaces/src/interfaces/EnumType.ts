import { EnumTypeItem } from './EnumTypeItem'

/**
 * Represents an enumerated type.
 */
export interface EnumType {
  /**
   * The domain of the owning type system.
   */
  domain: string

  /**
   * The name of the type system.
   */
  system: string

  /**
   * The system name of the type.
   */
  name: string

  /**
   * The display name of the type.
   */
  title: string

  /**
   * The documentation for the enum type.
   */
  documentation: string

  /**
   * An array of items.
   */
  items: EnumTypeItem[]
}
