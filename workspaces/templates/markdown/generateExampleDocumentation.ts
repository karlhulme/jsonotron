import { TypeMapExample } from 'jsonotron-interfaces'

export function generateExampleDocumentation (example: TypeMapExample, ordinal: number): string[] {
  const lines: string[] = []

  lines.push(`#### Example ${ordinal}`)

  lines.push(example.documentation)

  lines.push(`\`\`\`json\n${JSON.stringify(example.value, null, 2)}\n\`\`\``)

  return lines
}
