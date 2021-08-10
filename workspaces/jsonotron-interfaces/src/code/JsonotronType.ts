import { Label } from './Label'

/**
 * Represents the properties that every resource must present.
 */
export interface JsonotronType {
  /**
   * The kind of type.
   */
  kind: 'bool'|'enum'|'int'|'float'|'string'|'record'|'object'

  /**
   * The name of the system to which this type belongs.
   */
  system: string

  /**
   * The name of the type, that should be unique within it's owning system.
   */
  name: string

  /**
   * Documents the usage of the type.
   */
  summary: string

  /**
   * If populated, this value explains why the type has been deprecated
   * and/or which type to use instead.
   */
  deprecated?: string

  /**
   * An array of arbitrary tags.
   */
  tags?: string[]

  /**
   * An array of arbitrary labels.
   */
  labels?: Label[]

  /**
   * The JSON schema created for this type.
   */
  jsonSchema: Record<string, unknown>
}

