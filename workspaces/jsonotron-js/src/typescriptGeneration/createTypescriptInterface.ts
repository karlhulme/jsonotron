import { EnumType, SchemaType } from '../interfaces';
import { convertJsonotronTypesToTypeMap } from '../typeMap';

interface TypescriptInterfaceGenerationProps {
  enumTypes: EnumType[]
  schemaTypes: SchemaType[]
  // honourRequiredFlag: boolean  
}

// export function determineTypescriptPrimitiveForJsonSchemaType (jsonSchemaObject: Record<string, unknown>): string {
//   if (jsonSchemaType === 'boolean') {
//     return 'boolean'
//   } else if (jsonSchemaType === 'number') {
//     return 'number'
//   } else if (jsonSchemaType === 'integer') {
//     return 'number'
//   } else if (jsonSchemaType === 'string') {
//     return 'string'
//   } else {
//     return 'JSON'
//   }
// }

export function generateTypescriptInterfaces (props: TypescriptInterfaceGenerationProps): string {
  const map = convertJsonotronTypesToTypeMap(props.enumTypes, props.schemaTypes)

  return JSON.stringify(map)
//   return `
// /**
//  * ${schemaType.domain}/${schemaType.system}/${schemaType.name}
//  * ${schemaType.documentation}
//  */
// export interface ${capitalizeInitialLetters(schemaType.name)} {

// }`
}
