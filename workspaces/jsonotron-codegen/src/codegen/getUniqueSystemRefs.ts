import { EnumType, SchemaType } from 'jsonotron-interfaces'

/**
 * Represents a Jsonotron system.
 */
export interface SystemRef {
  domain: string
  system: string
  domainSystem: string
}

/**
 * An array of SystemRefs, one for each uniquely identified Jsonotron system.
 * @param enumTypes An array of enum types.
 * @param schemaTypes An array of schema types.
 */
export function getUniqueSystemRefs (enumTypes: EnumType[], schemaTypes: SchemaType[]): SystemRef[] {
  const systemRefs = [
    ...enumTypes.map(e => ({ domain: e.domain, system: e.system, domainSystem: `${e.domain}/${e.system}` })),
    ...schemaTypes.map(s => ({ domain: s.domain, system: s.system, domainSystem: `${s.domain}/${s.system}` }))
  ]

  const uniqueSystemRefs: SystemRef[] = []

  for (const systemRef of systemRefs) {
    if (uniqueSystemRefs.findIndex(u => u.domainSystem === systemRef.domainSystem) === -1) {
      uniqueSystemRefs.push(systemRef)
    }
  }

  return uniqueSystemRefs
}
