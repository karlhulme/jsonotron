/**
 * Returns a typescript type suitable for the given Jsonotron scalar.
 * @param scalarName A jsonotron scalar name.
 */
export function convertJsonotronScalarNameToTypescriptScalarName (scalarName: string): string {
  if (scalarName === 'Boolean') {
    return 'boolean'
  } else if (scalarName === 'Float' || scalarName === 'Int') {
    return 'number'
  } else if (scalarName === 'String') {
    return 'string'
  } else {
    return 'Record<string, unknown>'
  }
}
