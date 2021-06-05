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
   * The name of the original record from which this is a variant.
   */
  variantBaseName?: string
}
