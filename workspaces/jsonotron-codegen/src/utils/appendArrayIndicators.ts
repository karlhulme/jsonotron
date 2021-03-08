/**
 * Appends the given referenced type in a number of array indicators.
 * @param arrayCount The number of arrays to append to the type.
 * @param typeName The name of the referenced type. 
 */
export function appendArrayIndicators (arrayCount: number, typeName: string): string {
  return `${typeName}${'[]'.repeat(arrayCount)}`
}
