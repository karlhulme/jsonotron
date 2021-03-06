import { EnumType, SchemaType } from '../interfaces'

/**
 * Generates a typescript const declaration for the given
 * enum and schema types.
 * @param enumTypes An array of enum types.
 * @param schemaTypes An array of schema types.
 */
export function generateTypescriptTypeNamesConst (enumTypes: EnumType[], schemaTypes: SchemaType[]): string {
  const typeNames = [
    ...enumTypes.map(e => `  ${e.name}: '${e.domain}/${e.system}/${e.name}'`),
    ...schemaTypes.map(s => `  ${s.name}: '${s.domain}/${s.system}/${s.name}'`)
  ]

  const docBlock = `/**\n * The names of the enum and schema types.\n */\n`
  return `${docBlock}export const JTYPES = {\n${typeNames.join(',\n')}\n}`
}
