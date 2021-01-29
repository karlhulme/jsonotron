import { EnumType, ReferencedTypeSystem, SchemaType } from '../interfaces'

/**
 * Creates a markdown contents section for the given types.
 * @param enumTypes An array of enum types.
 * @param schemaTypes An array of schema types.
 * @param referencedTypeSystems An array of referenced type systems.
 */
export function createMarkdownContentsForTypes (enumTypes: EnumType[], schemaTypes: SchemaType[], referencedTypeSystems: ReferencedTypeSystem[]): string {
  return `
## Contents

### Enum Types

${enumTypes
  .sort((a, b) => a.title.localeCompare(b.title))
  .map(enumType => `* [${enumType.title}](#${enumType.title.toLocaleLowerCase().replace(/ /g, '-')})`)
  .join('\n')
}

### Schema Types

${schemaTypes
  .sort((a, b) => a.title.localeCompare(b.title))
  .map(schemaType => `* [${schemaType.title}](#${schemaType.title.toLocaleLowerCase().replace(/ /g, '-')})`)
  .join('\n')
}

### Referenced Type Systems

${referencedTypeSystems
  .map(refTypeSystem => `* [${refTypeSystem.domain}/${refTypeSystem.system}](${refTypeSystem.href})`)
  .join('\n')
}

  `
}
