import {
  EnumType, EnumTypeDef, JsonotronTypeDef, RecordType, RecordTypeDef,
  StringType, StringTypeDef, TypeLibrary, TypeLibraryDef
} from 'jsonotron-interfaces'
import {
  createJsonSchemaForBoolTypeDef, createJsonSchemaForEnumTypeDef,
  createJsonSchemaForFloatTypeDef, createJsonSchemaForIntTypeDef,
  createJsonSchemaForObjectTypeDef, createJsonSchemaForRecordTypeDef,
  createJsonSchemaForStringTypeDef
} from '../typeDefValueSchemas'

/**
 * Promotes the given type library definition to a type library by
 * supplying additional properties and expanding out the record type variants.
 * @param domain A domain for JSON schemas.
 * @param typeLibraryDef A type library definition.
 */
export function promoteDefsToTypeLibrary (domain: string, typeLibraryDef: TypeLibraryDef): TypeLibrary {
  const typeLibrary: TypeLibrary = {
    jsonSchemaDomain: domain,
    boolTypes: typeLibraryDef.boolTypeDefs.map(t => ({ ...t, jsonSchema: createJsonSchemaForBoolTypeDef(domain, t) as Record<string, unknown> })),
    enumTypes: typeLibraryDef.enumTypeDefs.map(t => convertEnumTypeDefToEnumType(domain, t)), 
    floatTypes: typeLibraryDef.floatTypeDefs.map(t => ({ ...t, jsonSchema: createJsonSchemaForFloatTypeDef(domain, t) as Record<string, unknown> })),
    intTypes: typeLibraryDef.intTypeDefs.map(t => ({ ...t, jsonSchema: createJsonSchemaForIntTypeDef(domain, t) as Record<string, unknown> })),
    objectTypes: typeLibraryDef.objectTypeDefs.map(t => ({ ...t, jsonSchema: createJsonSchemaForObjectTypeDef(domain, t) as Record<string, unknown> })),
    recordTypes: typeLibraryDef.recordTypeDefs.map(t => convertRecordTypeDefToRecordType(domain, t, typeLibraryDef)),
    stringTypes: typeLibraryDef.stringTypeDefs.map(t => convertStringTypeDefToStringType(domain, t)) 
  }

  return typeLibrary
}

/**
 * Returns an EnumType based on the given EnumTypeDef.
 * @param domain A domain for JSON schemas.
 * @param enumTypeDef An enum type definition.
 */
function convertEnumTypeDefToEnumType (domain: string, enumTypeDef: EnumTypeDef): EnumType {
  return {
    kind: enumTypeDef.kind,
    system: enumTypeDef.system,
    name: enumTypeDef.name,
    summary: enumTypeDef.summary,
    deprecated: enumTypeDef.deprecated,
    tags: enumTypeDef.tags,
    labels: enumTypeDef.labels,
    dataType: enumTypeDef.dataType,
    jsonSchema: createJsonSchemaForEnumTypeDef(domain, enumTypeDef) as Record<string, unknown>,
    items: enumTypeDef.items.map(itemDef => ({
      value: itemDef.value,
      text: itemDef.text,
      summary: itemDef.summary,
      symbol: itemDef.symbol,
      deprecated: itemDef.deprecated,
      data: itemDef.data
    }))
  }
}

/**
 * Returns an EnumType based on the given EnumTypeDef.
 * @param domain A domain for JSON schemas.
 * @param enumTypeDef An enum type definition.
 */
function convertRecordTypeDefToRecordType (domain: string, recordTypeDef: RecordTypeDef, typeLibraryDef: TypeLibraryDef): RecordType {
  const isTypeInArray = function (array: JsonotronTypeDef[], system: string, name: string) {
    return array.findIndex(type => type.system === system && type.name === name) > -1
  }

  return {
    kind: recordTypeDef.kind,
    system: recordTypeDef.system,
    name: recordTypeDef.name,
    summary: recordTypeDef.summary,
    deprecated: recordTypeDef.deprecated,
    tags: recordTypeDef.tags,
    labels: recordTypeDef.labels,
    jsonSchema: createJsonSchemaForRecordTypeDef(domain, recordTypeDef) as Record<string, unknown>,
    properties: recordTypeDef.properties.map(property => {
      const propertyTypeSystem = getSystemPartOfSystemQualifiedType(property.propertyType)
      const propertyTypeName = getNamePartOfSystemQualifiedType(property.propertyType)
      const isRequired = recordTypeDef.required?.includes(property.name)

      return {
        name: property.name,
        summary: property.summary,
        deprecated: property.deprecated,
        isRequired,
        isOptional: !isRequired,
        isArray: property.isArray,
        propertyType: property.propertyType,
        propertyTypeSystem,
        propertyTypeName,
        isBool: isTypeInArray(typeLibraryDef.boolTypeDefs, propertyTypeSystem, propertyTypeName),
        isEnum: isTypeInArray(typeLibraryDef.enumTypeDefs, propertyTypeSystem, propertyTypeName),
        isFloat: isTypeInArray(typeLibraryDef.floatTypeDefs, propertyTypeSystem, propertyTypeName),
        isInt: isTypeInArray(typeLibraryDef.intTypeDefs, propertyTypeSystem, propertyTypeName),
        isObject: isTypeInArray(typeLibraryDef.objectTypeDefs, propertyTypeSystem, propertyTypeName),
        isRecord: isTypeInArray(typeLibraryDef.recordTypeDefs, propertyTypeSystem, propertyTypeName),
        isString: isTypeInArray(typeLibraryDef.stringTypeDefs, propertyTypeSystem, propertyTypeName)
      }
    }),
    variantBaseName: recordTypeDef.variantBaseName,
    examples: recordTypeDef.validTestCases.filter(tc => tc.summary),
    isInput: recordTypeDef.direction === 'input' || recordTypeDef.direction === 'both' || !recordTypeDef.direction,
    isOutput: recordTypeDef.direction === 'output' || recordTypeDef.direction === 'both' || !recordTypeDef.direction
  }
}

/**
 * Returns the system part of the given system qualified type.
 * @param systemQualifiedType A system qualified type in the form sys/name.
 */
function getSystemPartOfSystemQualifiedType (systemQualifiedType: string) {
  return systemQualifiedType.substring(0, systemQualifiedType.indexOf('/'))
}

/**
 * Returns the name part of the given system qualified type.
 * @param systemQualifiedType A system qualified type in the form sys/name.
 */
function getNamePartOfSystemQualifiedType (systemQualifiedType: string) {
  return systemQualifiedType.substring(systemQualifiedType.indexOf('/') + 1)
}

/**
 * Returns a StringType based on the given StringTypeDef.
 * @param domain A domain for JSON schemas.
 * @param stringTypeDef A string type definition.
 */
function convertStringTypeDefToStringType (domain: string, stringTypeDef: StringTypeDef): StringType {
  return {
    kind: stringTypeDef.kind,
    system: stringTypeDef.system,
    name: stringTypeDef.name,
    summary: stringTypeDef.summary,
    deprecated: stringTypeDef.deprecated,
    maximumLength: stringTypeDef.maximumLength,
    minimumLength: stringTypeDef.minimumLength,
    regex: stringTypeDef.regex,
    tags: stringTypeDef.tags,
    labels: stringTypeDef.labels,
    jsonSchema: createJsonSchemaForStringTypeDef(domain, stringTypeDef) as Record<string, unknown>,
    examples: stringTypeDef.validTestCases?.filter(tc => tc.summary) || []
  }
}
