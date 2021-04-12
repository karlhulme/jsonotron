import { EnumType, SchemaType } from 'jsonotron-interfaces'
import { generateSystemDocumentation } from './generateSystemDocumentation'
import { getUniqueSystems } from './getUniqueSystems'

interface GenerateOptions {
  enumTypes: EnumType[]
  schemaTypes: SchemaType[]
}

export function generateMarkdown (options: GenerateOptions): string {
  const lines: string[] = []

  const enumTypes = options.enumTypes.sort((a, b) => a.name.localeCompare(b.name))
  const schemaTypes = options.schemaTypes.sort((a, b) => a.name.localeCompare(b.name))

  lines.push(`# Type Systems`)

  const uniqueSystems = getUniqueSystems(enumTypes, schemaTypes)

  lines.push(uniqueSystems.map(system => `* ["${system}" System](#"${system}"-System)`).join('\n'))

  for (const system of uniqueSystems) {
    const systemEnumTypes = enumTypes.filter(e => e.system === system)
    const systemSchemaTypes = schemaTypes.filter(s => s.system === system)

    const systemMarkdown = generateSystemDocumentation(system, systemEnumTypes, systemSchemaTypes)

    lines.push(systemMarkdown)
  }

  return lines.join('\n\n')
}






