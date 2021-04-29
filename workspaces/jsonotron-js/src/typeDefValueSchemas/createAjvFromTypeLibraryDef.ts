import { TypeLibraryDef } from 'jsonotron-interfaces'
import Ajv, { AnySchema } from 'ajv'
import { createJsonSchemaForBoolTypeDef } from './createJsonSchemaForBoolTypeDef'
import { createJsonSchemaForEnumTypeDef } from './createJsonSchemaForEnumTypeDef'
import { createJsonSchemaForFloatTypeDef } from './createJsonSchemaForFloatTypeDef'
import { createJsonSchemaForIntTypeDef } from './createJsonSchemaForIntTypeDef'
import { createJsonSchemaForObjectTypeDef } from './createJsonSchemaForObjectTypeDef'
import { createJsonSchemaForRecordTypeDef } from './createJsonSchemaForRecordTypeDef'
import { createJsonSchemaForRecordTypeDefVariant } from './createJsonSchemaForRecordTypeDefVariant'
import { createJsonSchemaForStringTypeDef } from './createJsonSchemaForStringTypeDef'

/**
 * Returns an AJV (JSON validator) for all the types in the given type library.
 * @param domain A domain for the JSON schemas.
 * @param typeLibraryDef A type library definitino.
 */
export function createAjvFromTypeLibraryDef (domain: string, typeLibraryDef: TypeLibraryDef): Ajv {
  const schemas = [
    ...typeLibraryDef.boolTypeDefs.map(boolTypeDef => createJsonSchemaForBoolTypeDef(domain, boolTypeDef)),
    ...typeLibraryDef.enumTypeDefs.map(enumTypeDef => createJsonSchemaForEnumTypeDef(domain, enumTypeDef)),
    ...typeLibraryDef.floatTypeDefs.map(floatTypeDef => createJsonSchemaForFloatTypeDef(domain, floatTypeDef)),
    ...typeLibraryDef.intTypeDefs.map(intTypeDef => createJsonSchemaForIntTypeDef(domain, intTypeDef)),
    ...typeLibraryDef.objectTypeDefs.map(objectTypeDef => createJsonSchemaForObjectTypeDef(domain, objectTypeDef)),
    ...typeLibraryDef.recordTypeDefs.map(recordTypeDef => createJsonSchemaForRecordTypeDef(domain, recordTypeDef)),
    ...typeLibraryDef.recordTypeDefs.reduce((agg, recordTypeDef) => {
      const variants = recordTypeDef.variants || []
      const variantSchemas = variants.map(variant => createJsonSchemaForRecordTypeDefVariant(domain, recordTypeDef, variant))
      agg.push(...variantSchemas)
      return agg
    }, [] as AnySchema[]),
    ...typeLibraryDef.stringTypeDefs.map(stringTypeDef => createJsonSchemaForStringTypeDef(domain, stringTypeDef))
  ]

  return new Ajv({
    ownProperties: true,
    schemas
  })
}
