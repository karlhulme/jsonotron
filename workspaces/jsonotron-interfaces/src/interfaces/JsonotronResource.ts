/**
 * Every Jsonotron resource must define a 'kind' property
 * and this interface exposes that.
 */
export interface JsonotronResource {
  /**
   * The type.
   */
  kind: 'enum'|'schema'
}
