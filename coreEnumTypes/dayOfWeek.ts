import { EnumType } from '../interfaces'

export const dayOfWeek: EnumType = {
  name: 'dayOfWeek',
  title: 'Day of Week',
  paragraphs: [
    'A day of the week.'
  ],
  items: [
    { value: 'su', text: 'Sunday' },
    { value: 'mo', text: 'Monday' },
    { value: 'tu', text: 'Tuesday' },
    { value: 'we', text: 'Wednesday' },
    { value: 'th', text: 'Thursday' },
    { value: 'fr', text: 'Friday' },
    { value: 'sa', text: 'Saturday' }
  ]
}
