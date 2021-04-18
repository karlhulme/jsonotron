import { TypeMapRef } from 'jsonotron-interfaces'
import { generateExampleDocumentation } from './generateExampleDocumentation'

export function generateScalarTypeDocumentation (scalarType: TypeMapRef): string[] {
  const lines: string[] = []

  lines.push(`### \`${scalarType.name}\``)

  lines.push(scalarType.documentation || `The ${scalarType.name} scalar type.`)
  lines.push(`This type is defined in the ${scalarType.system} system.`)

  scalarType.examples.forEach((example, index) => 
    lines.push(...generateExampleDocumentation(example, index + 1)))

  return lines
}
