/**
 * Returns a domain qualified type reference that handles 
 * whether the type reference is system qualified or not.
 * @param domain A domain name that must not end in a trailing slash.
 * @param system The name of a system.
 * @param typeRef A system-qualified or direct type reference.
 */
export function getDomainQualifiedTypeReference (domain: string, system: string, typeRef: string): string {
  return typeRef.includes('/')
    ? `${domain}/${typeRef}`
    : `${domain}/${system}/${typeRef}`
}