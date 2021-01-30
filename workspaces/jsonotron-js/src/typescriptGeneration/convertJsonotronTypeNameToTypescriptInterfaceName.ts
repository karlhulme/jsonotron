import { capitalizeInitialLetters } from '../utils'

/**
 * Returns a typescript interface name suitable for the given Jsonotron type name.
 * This function does not take domain or system into account and therefore may produce
 * the same name for two different types.  This could be handled in future with a
 * mapping object that substitutes in different names where clashes
 * are known to occur.
 * @param fqn A fully qualified Jsonotron type name.
 */
export function convertJsonotronTypeNameToTypescriptInterfaceName (fqn: string): string {
  const slashIndex = fqn.lastIndexOf('/')
  const typescriptInterfaceName = capitalizeInitialLetters(fqn.slice(slashIndex + 1))
  return typescriptInterfaceName
}
