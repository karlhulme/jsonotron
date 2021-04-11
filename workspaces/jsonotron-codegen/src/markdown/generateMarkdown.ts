import { EnumType, SchemaType } from 'jsonotron-interfaces'
import { generateSystemDocumentation } from './generateSystemDocumentation'
import { getUniqueSystems } from './getUniqueSystems'

interface GenerateOptions {
  enumTypes: EnumType[]
  schemaTypes: SchemaType[]
}

export function generateMarkdown (options: GenerateOptions): string {
  const lines: string[] = []

  lines.push(`# Type Systems`)

  const uniqueSystems = getUniqueSystems(options.enumTypes, options.schemaTypes)

  lines.push(uniqueSystems.map(system => `* ["${system}" System](#"${system}"-System)`).join('\n'))

  for (const system of uniqueSystems) {
    const systemEnumTypes = options.enumTypes.filter(e => e.system === system)
    const systemSchemaTypes = options.schemaTypes.filter(s => s.system === system)

    const systemMarkdown = generateSystemDocumentation(system, systemEnumTypes, systemSchemaTypes)

    lines.push(systemMarkdown)
  }

  return lines.join('\n\n')
}






