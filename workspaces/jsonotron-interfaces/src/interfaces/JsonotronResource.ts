/**
 * The interface that describes all of the resources used
 * by the Jsonotron engine.  Every Jsonotron resource must
 * define a 'kind' property and this interface exposes that.
 */
export interface JsonotronResource {
  /**
   * The type.
   */
  kind: 'enum'|'schema'|'structure'
}
