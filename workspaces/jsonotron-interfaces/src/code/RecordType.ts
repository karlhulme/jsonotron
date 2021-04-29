import { JsonotronType } from './JsonotronType'
import { RecordTypeProperty } from './RecordTypeProperty'

export interface RecordType extends JsonotronType {
  /**
   * An array of properties that can appear in this record.
   */
  properties: RecordTypeProperty[]
}
