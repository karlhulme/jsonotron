import { TypeLibrary } from './TypeLibrary'
import {
  createJsonSchemaForArrayType, createJsonSchemaForBoolScalarType, createJsonSchemaForEnumScalarType,
  createJsonSchemaForFloatScalarType, createJsonSchemaForIntScalarType, createJsonSchemaForObjectType,
  createJsonSchemaForRecordType, createJsonSchemaForRecordTypeVariant, createJsonSchemaForStringScalarType,
} from '../jsonSchemaGeneration'
import Ajv, { AnySchema } from 'ajv'

/**
 * Returns an AJV (JSON validator) for all the types in the given type library.
 * @param domain A domain for the JSON schemas.
 * @param typeLibrary A type library.
 */
export function createJsonSchemaValidator (domain: string, typeLibrary: TypeLibrary): Ajv {
  const schemas = [
    ...typeLibrary.arrayTypes.map(arrayType => createJsonSchemaForArrayType(domain, arrayType)),
    ...typeLibrary.boolScalarTypes.map(boolScalarType => createJsonSchemaForBoolScalarType(domain, boolScalarType)),
    ...typeLibrary.enumScalarTypes.map(enumScalarType => createJsonSchemaForEnumScalarType(domain, enumScalarType)),
    ...typeLibrary.floatScalarTypes.map(floatScalarType => createJsonSchemaForFloatScalarType(domain, floatScalarType)),
    ...typeLibrary.intScalarTypes.map(intScalarType => createJsonSchemaForIntScalarType(domain, intScalarType)),
    ...typeLibrary.objectTypes.map(objectType => createJsonSchemaForObjectType(domain, objectType)),
    ...typeLibrary.recordTypes.map(recordType => createJsonSchemaForRecordType(domain, recordType)),
    ...typeLibrary.recordTypes.reduce((agg, recordType) => {
      const variants = recordType.variants || []
      const variantSchemas = variants.map(variant => createJsonSchemaForRecordTypeVariant(domain, recordType, variant))
      agg.push(...variantSchemas)
      return agg
    }, [] as AnySchema[]),
    ...typeLibrary.stringScalarTypes.map(stringScalarType => createJsonSchemaForStringScalarType(domain, stringScalarType))
  ]

  return new Ajv({
    ownProperties: true,
    schemas
  })
}
