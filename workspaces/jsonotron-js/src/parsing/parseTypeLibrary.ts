import { TypeLibrary } from 'jsonotron-interfaces'
import { parseTypeLibraryDef } from './parseTypeLibraryDef'
import { promoteDefsToTypeLibrary } from './promoteDefsToTypeLibrary'

const DEFAULT_DOMAIN = 'https://jsonotron.org'

/**
 * The options used when parsing a set of Jsonotron resources.
 */
 export interface ParseOptions {
  /**
   * An array of YAML or JSON strings.
   * Each string represents a Jsonotron type.
   */
  resourceStrings?: string[]

  /**
   * The domain to use for JSON schema generation.
   */
  domain?: string
}

/**
 * Returns a type library ready for code generation.
 * @param options A set of options for the parsing process.
 */
export function parseTypeLibrary (options?: ParseOptions): TypeLibrary {
  const resourceStrings = options?.resourceStrings || []
  const domain = options?.domain || DEFAULT_DOMAIN

  const typeLibraryDef = parseTypeLibraryDef(resourceStrings)
  return promoteDefsToTypeLibrary(domain, typeLibraryDef)
}
