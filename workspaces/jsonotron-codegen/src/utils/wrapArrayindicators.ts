/**
 * Wraps the given referenced type in a number of array indicators.
 * @param arrayCount The number of arrays to wrap the type in.
 * @param typeName The name of the referenced type. 
 */
 export function wrapArrayIndicators (arrayCount: number, typeName: string): string {
  return `${'['.repeat(arrayCount)}${typeName}${']'.repeat(arrayCount)}`
}
