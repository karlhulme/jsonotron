import { SchemaType } from 'jsonotron-interfaces'
import { capitaliseInitialLetters } from '../utils'

export function generateSchemaTypeValidators (domain: string, schemaTypes: SchemaType[]): string[] {
  const result: string[] = []

  schemaTypes.forEach(schemaType => {
    // only create validators for object types
    if (schemaType.jsonSchema.type === 'object') {
      // type name is the same for full and partial types
      const typeName = capitaliseInitialLetters(schemaType.name)

      // build a validator for the full type
      const functionDeclaration = `export function validate${typeName} (value: unknown): ${typeName} {`
      const validateLine = `validateValue(value, '${domain}/${schemaType.system}/${schemaType.name}')`
      const returnLine = `return value as ${typeName}`

      result.push(`${functionDeclaration}\n  ${validateLine}\n  ${returnLine}\n}`)

      // build a validator for the partial type (useful for patching)
      const functionDeclarationPartial = `export function validatePartial${typeName} (value: unknown): Partial<${typeName}> {`
      const validateLinePartial = `validateValue(value, '${domain}/${schemaType.system}/${schemaType.name}Partial')`
      const returnLinePartial = `return value as Partial<${typeName}>`

      result.push(`${functionDeclarationPartial}\n  ${validateLinePartial}\n  ${returnLinePartial}\n}`)
    }
  })

  return result
}
