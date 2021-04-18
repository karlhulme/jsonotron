import { TypeMapObject, TypeMapRef } from 'jsonotron-interfaces'

export function generateContents (scalarTypes: TypeMapRef[], rootObjectTypes: TypeMapObject[], enumTypes: TypeMapRef[]): string[] {
  const lines: string[] = []

  if (scalarTypes.length > 0) {
    lines.push('**Scalar Types:**')

    scalarTypes.forEach(scalarType => lines.push(`* [${scalarType.name} *[${scalarType.system}]*](#${scalarType.name})`))
  }

  if (rootObjectTypes.length > 0) {
    lines.push('**Root Object Types:**')

    rootObjectTypes.forEach(rootObjectType => lines.push(`* [${rootObjectType.name} *[${rootObjectType.system}]*](#${rootObjectType.name})`))
  }

  if (enumTypes.length > 0) {
    lines.push('**Enum Types:**')

    enumTypes.forEach(enumType => lines.push(`* [${enumType.name} *[${enumType.system}]*](#${enumType.name})`))
  }

  return lines
}
