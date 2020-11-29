import { EnumType } from '../interfaces'

export const yesNo: EnumType = {
  name: 'yesNo',
  title: 'Yes or No',
  paragraphs: [
    'A binary choice between yes or no.',
    'This type can be used where if a third option may be introduced in the future.  In that scenario a boolean field would be limiting, but a yesNo field could be replaced by a new enum without having to migrate existing data.'
  ],
  items: [
    { value: 'yes', text: 'Yes' },
    { value: 'no', text: 'No' }
  ]
}
