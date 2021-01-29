import { EnumType, MarkdownGenerationProps, SchemaType } from '../interfaces'
import { createMarkdownContentsForTypes } from './createMarkdownContentsForTypes'
import { createMarkdownForEnumType } from './createMarkdownForEnumType'
import { createMarkdownForSchemaType } from './createMarkdownForSchemaType'

/**
 * Represents a reference to a type.
 */
interface TypeReference {
  /**
   * The name of a type.
   */
  name: string

  /**
   * An enum type.
   */
  enumType?: EnumType

  /**
   * A schema type.
   */
  schemaType?: SchemaType
}

/**
 * Creates a markdown contents section for the given types.
 * @param props The properties that describe the markdown to be generated.
 */
export function createMarkdownForTypeSystem (props: MarkdownGenerationProps, enumTypes: EnumType[], schemaTypes: SchemaType[]): string {
  const allTypes: TypeReference[] = []

  enumTypes
    .filter(e => e.domain === props.domain && e.system === props.system)
    .forEach(e => allTypes.push({ name: e.name, enumType: e }))

  schemaTypes
    .filter(s => s.domain === props.domain && s.system === props.system)
    .forEach(s => allTypes.push({ name: s.name, schemaType: s }))

  return `
# ${props.title}

This document describes the types of the \`${props.domain}/${props.system}\` system.

${createMarkdownContentsForTypes(
  enumTypes.filter(e => e.domain === props.domain && e.system === props.system),
  schemaTypes.filter(s => s.domain === props.domain && s.system === props.system),
  props.referencedTypeSystems
)}

${allTypes
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(t => t.enumType
    ? createMarkdownForEnumType(t.enumType)
    : t.schemaType
      ? createMarkdownForSchemaType(t.schemaType)
      /* istanbul ignore next - either enum or schema will be provided  */
      : '')
  .join('\n')
}
  `
}
