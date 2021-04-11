import { JsonotronResource } from './JsonotronResource'

/**
 * Defines the fields that must be present on an object for it to
 * be a type within the jsonotron system.
 */
export interface JsonotronBaseType extends JsonotronResource {
  /**
  * The name of the type system.
  */
  system: string

  /**
  * The system name of the type.
  */
  name: string
}
