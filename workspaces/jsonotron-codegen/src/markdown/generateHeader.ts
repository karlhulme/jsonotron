import { TypeMap } from 'jsonotron-interfaces'
import { getUniqueSystems } from '../typeMap'

export function generateHeader (typeMap: TypeMap): string[] {
  const lines: string[] = []
  
  const uniqueSystems = getUniqueSystems(typeMap)  
  lines.push('This type library is based on the following systems:')
  lines.push(uniqueSystems.map(system => `* ${system}`).join('\n'))

  return lines
}
