import { RecordTypeDef } from '../definitions';

/**
 * A factory that converts a record into an array of replacement records.
 */
export interface RecordFactory {
  /**
   * The name of the record.
   */
  name: string

  /**
   * A function that converts a given record type definition into an array
   * of record type definitions.
   */
  implementation: (source: RecordTypeDef) => RecordTypeDef[]
}
