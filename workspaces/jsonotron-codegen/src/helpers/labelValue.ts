/**
 * Extracts a label value from the given jsonotron type.
 * @param value Any context value.
 * @param labelName The name of a label.
 */
export function labelValue (value: unknown, labelName: unknown): string {
  if (typeof value === 'object' && Array.isArray((value as Record<string, unknown>).labels) && typeof labelName === 'string') {
    const label = ((value as Record<string, unknown>).labels as { name: string, value: string }[]).find(l => l.name === labelName)

    if (label && typeof label.value === 'string') {
      return label.value
    } else {
      return ''
    }
  } else {
    return ''
  }
}
