import { SchemaType } from '../interfaces'

/**
 * Returns the GraphQL primitive most suited to storing a value
 * of the given schemaType.
 * @param schemaType A schema type.
 */
export function determineGraphQLPrimitiveForSchemaType (schemaType: SchemaType): string {
  if (schemaType.jsonSchema.type === 'boolean') {
    return 'Boolean'
  } else if (schemaType.jsonSchema.type === 'number') {
    return 'Float'
  } else if (schemaType.jsonSchema.type === 'integer') {
    return 'Int'
  } else if (schemaType.jsonSchema.type === 'string') {
    return 'String'
  } else {
    return 'JSON'
  }
}