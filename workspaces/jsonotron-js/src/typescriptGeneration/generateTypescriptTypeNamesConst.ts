import { EnumType, SchemaType } from '../interfaces'

/**
 * Represents a typename with its associated fully qualified name.
 */
interface SystemType {
  /**
   * The short name of a type.
   */
  typeName: string

  /**
   * The fully qualified name of a type.
   */
  fullyQualifiedName: string
}

/**
 * Returns an array of system types that have been associated with
 * a system name.  If an array is not currently in the record then an
 * empty one is added and that new array is returned.
 * @param systems A record of type systems and the types it contains.
 * @param systemName The name of a system.
 */
function getSystemTypesArray (systems: Record<string, SystemType[]|undefined>, systemName: string): SystemType[] {
  const array = systems[systemName]
  
  if (Array.isArray(array)) {
    return array
  }

  const newArray: SystemType[] = []
  systems[systemName] = newArray
  return newArray
}

/**
 * Sorts the enum and schema types into a record of system names
 * and the associated system types.
 * @param enumTypes An array of enum types.
 * @param schemaTypes An array of schema types.
 */
function sortTypesBySystem (enumTypes: EnumType[], schemaTypes: SchemaType[]): Record<string, SystemType[]> {
  const systems: Record<string, SystemType[]|undefined> = {}

  for (const enumType of enumTypes) {
    const systemTypesArray = getSystemTypesArray(systems, enumType.system)

    systemTypesArray.push({
      typeName: enumType.name,
      fullyQualifiedName: `${enumType.domain}/${enumType.system}/${enumType.name}`
    })
  }

  for (const schemaType of schemaTypes) {
    const systemTypesArray = getSystemTypesArray(systems, schemaType.system)

    systemTypesArray.push({
      typeName: schemaType.name,
      fullyQualifiedName: `${schemaType.domain}/${schemaType.system}/${schemaType.name}`
    })
  }

  return systems as Record<string, SystemType[]>
}

/**
 * Convert the given record of systems into a typescript const declaration
 * that provides property-based access to the type names.
 * @param systems A record of system names and the associated types.
 */
function convertSystemsToConstDeclaration (systems: Record<string, SystemType[]>): string {
  const systemTexts = Object.keys(systems).map(systemName => {
    const systemTypeTexts = systems[systemName].map(systemType => `    ${systemType.typeName}: '${systemType.fullyQualifiedName}'`)
    return `  ${systemName}: {\n${systemTypeTexts.join(',\n')}\n  }`
  })

  const docBlock = `/**\n * The names of the enum and schema types sorted by system.\n */\n`
  return `${docBlock}export const JsonotronTypeNames = {\n${systemTexts.join(',\n')}\n}`
}

/**
 * Generates a typescript const declaration for the given
 * enum and schema types.
 * @param enumTypes An array of enum types.
 * @param schemaTypes An array of schema types.
 */
export function generateTypescriptTypeNamesConst (enumTypes: EnumType[], schemaTypes: SchemaType[]): string {
  const systems = sortTypesBySystem(enumTypes, schemaTypes)
  return convertSystemsToConstDeclaration(systems)
}
