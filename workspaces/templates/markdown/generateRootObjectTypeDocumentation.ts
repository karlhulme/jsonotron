import { TypeMap, TypeMapObject } from 'jsonotron-interfaces'
import { resolveTypeAssignment } from '../typeMap'
import { appendArrayIndicators } from '../utils'
import { generateExampleDocumentation } from './generateExampleDocumentation'

export function generateRootObjectTypeDocumentation (rootObjectType: TypeMapObject, typeMap: TypeMap): string[] {
  const lines: string[] = []

  lines.push(`### \`${rootObjectType.name}\``)

  /* istanbul ignore next - there will always be documentation for a root object type. */
  lines.push(rootObjectType.documentation || `The ${rootObjectType.name} object type.`)
  lines.push(`This type is defined in the ${rootObjectType.system} system.`)

  rootObjectType.examples.forEach((example, index) => 
    lines.push(...generateExampleDocumentation(example, index + 1)))

  lines.push(`
Property name | Type | Req | Description
--- | --- | --- | ---
${rootObjectType.properties.map(prop => `${prop.propertyName} | ${refTypeToString(prop.refTypeName, typeMap)} | ${prop.isRequired ? 'Y' : '-'} | ${prop.documentation}`)
.join('\n')
}
  `)

  return lines
}

function refTypeToString (fqn: string, typeMap: TypeMap) {
  const resolved = resolveTypeAssignment(fqn, 0, typeMap, true)

  switch (resolved.resolutionType) {
    case 'jsonotronType': return appendArrayIndicators(resolved.arrayCount, `${resolved.system}/${resolved.name}`)
    case 'jsonSchemaType': return appendArrayIndicators(resolved.arrayCount, resolved.name)
    /* istanbul ignore next */
    default:
    /* istanbul ignore next */
    case 'unknown': return 'Unresolved'
  }
}
