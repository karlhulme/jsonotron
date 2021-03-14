import { JsonotronResource } from './JsonotronResource'

/**
 * Defines the fields that must be present on an object for it to
 * be a type within the jsonotron system.
 */
export interface JsonotronBaseType extends JsonotronResource {
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
}
