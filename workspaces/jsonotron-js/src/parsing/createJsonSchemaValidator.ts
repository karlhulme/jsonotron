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
    ...typeLibrary.boolTypes.map(boolType => createJsonSchemaForBoolScalarType(domain, boolType)),
    ...typeLibrary.enumTypes.map(enumType => createJsonSchemaForEnumScalarType(domain, enumType)),
    ...typeLibrary.floatTypes.map(floatType => createJsonSchemaForFloatScalarType(domain, floatType)),
    ...typeLibrary.intTypes.map(intType => createJsonSchemaForIntScalarType(domain, intType)),
    ...typeLibrary.objectTypes.map(objectType => createJsonSchemaForObjectType(domain, objectType)),
    ...typeLibrary.recordTypes.map(recordType => createJsonSchemaForRecordType(domain, recordType)),
    ...typeLibrary.recordTypes.reduce((agg, recordType) => {
      const variants = recordType.variants || []
      const variantSchemas = variants.map(variant => createJsonSchemaForRecordTypeVariant(domain, recordType, variant))
      agg.push(...variantSchemas)
      return agg
    }, [] as AnySchema[]),
    ...typeLibrary.stringTypes.map(stringType => createJsonSchemaForStringScalarType(domain, stringType))
  ]

  return new Ajv({
    ownProperties: true,
    schemas
  })
}
