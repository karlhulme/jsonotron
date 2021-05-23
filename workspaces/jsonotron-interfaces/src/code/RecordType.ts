import { Example } from './Example'
import { JsonotronType } from './JsonotronType'
import { RecordTypeProperty } from './RecordTypeProperty'

export interface RecordType extends JsonotronType {
  /**
   * An array of properties that can appear in this record.
   */
  properties: RecordTypeProperty[]

  /**
   * Indicates if the record serves as an input type.
   */
  isInput: boolean

  /**
   * Indicates if the record serves as an output type.
   */
  isOutput: boolean

  /**
   * An array of examples.
   */
  examples: Example<unknown>[]

  /**
   * If this record was defined as a variant, then this property
   * indicates the name of the original record.  They will belong
   * to the same system.
   */
  variantBaseName?: string
}
