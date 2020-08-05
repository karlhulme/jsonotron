const check = require('check-types')
const { JsonotronDocTypeValidationError } = require('jsonotron-errors')
const { docTypeSchema } = require('../schemas')
const {
  createValueValidatorForFieldType,
  createValueValidatorForFieldTypeArray,
  ensureFieldTypes
} = require('../fieldType')
const { ensureEnumType } = require('../enumType')
const { consts, pascalToTitleCase } = require('../utils')
const getFieldOrEnumTypeFromArrays = require('./getFieldOrEnumTypeFromArrays')
const getSystemFieldNames = require('./getSystemFieldNames')

/**
 * Raises an error if the given doc type does not conform
 * to the docTypeSchema.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 */
function validateDocTypeWithSchema (ajv, docType) {
  check.assert.object(ajv)
  check.assert.object(docType)

  const validator = ajv.compile(docTypeSchema)

  if (!validator(docType)) {
    throw new JsonotronDocTypeValidationError(docType.name,
      `Unable to validate against docTypeSchema.\n${JSON.stringify(validator.errors, null, 2)}`)
  }
}

/**
 * Patches any missing/optional fields.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type object to check for validity.
 */
function patchDocType (docType) {
  check.assert.object(docType)

  // top level

  if (typeof docType.pluralName === 'undefined') {
    docType.pluralName = docType.name + 's'
  }

  if (typeof docType.title === 'undefined') {
    docType.title = pascalToTitleCase(docType.name)
  }

  if (typeof docType.pluralTitle === 'undefined') {
    docType.pluralTitle = pascalToTitleCase(docType.pluralName)
  }

  if (typeof docType.paragraphs === 'undefined') {
    docType.paragraphs = []
  }

  // fields

  if (typeof docType.fields === 'undefined') {
    docType.fields = {}
  }

  for (const fieldName in docType.fields) {
    const field = docType.fields[fieldName]

    if (typeof field.isRequired === 'undefined') { field.isRequired = false }
    if (typeof field.isArray === 'undefined') { field.isArray = false }
    if (typeof field.isDeprecated === 'undefined') { field.isDeprecated = false }
    if (typeof field.canUpdate === 'undefined') { field.canUpdate = false }
    if (typeof field.paragraphs === 'undefined') { field.paragraphs = [] }
  }

  // validation

  if (typeof docType.preSave === 'undefined') {
    docType.preSave = () => {}
  }

  if (typeof docType.preSave === 'undefined') {
    docType.validate = () => {}
  }

  // examples

  if (typeof docType.examples === 'undefined') {
    docType.examples = []
  }

  for (const example of docType.examples) {
    if (typeof example.paragraphs === 'undefined') { example.paragraphs = [] }
  }

  // calculated fields

  if (typeof docType.calculatedFields === 'undefined') {
    docType.calculatedFields = {}
  }

  for (const calculatedFieldName in docType.calculatedFields) {
    const calculatedField = docType.calculatedFields[calculatedFieldName]

    if (typeof calculatedField.isArray === 'undefined') { calculatedField.isArray = false }
    if (typeof calculatedField.paragraphs === 'undefined') { calculatedField.paragraphs = [] }
  }

  // filters

  if (typeof docType.filters === 'undefined') {
    docType.filters = {}
  }

  for (const filterName in docType.filters) {
    const filter = docType.filters[filterName]

    if (typeof filter.title === 'undefined') { filter.title = pascalToTitleCase(filterName) }
    if (typeof filter.paragraphs === 'undefined') { filter.paragraphs = [] }
    if (typeof filter.parameters === 'undefined') { filter.parameters = {} }

    for (const filterParameterName in filter.parameters) {
      const filterParameter = filter.parameters[filterParameterName]

      if (typeof filterParameter.isArray === 'undefined') { filterParameter.isArray = false }
      if (typeof filterParameter.isRequired === 'undefined') { filterParameter.isRequired = false }
      if (typeof filterParameter.paragraphs === 'undefined') { filterParameter.paragraphs = [] }
    }

    if (typeof filter.examples === 'undefined') { filter.examples = [] }

    for (const example of filter.examples) {
      if (typeof example.paragraphs === 'undefined') { example.paragraphs = [] }
    }
  }

  // constructor

  if (typeof docType.ctor === 'undefined') {
    docType.ctor = {}
  }

  if (typeof docType.ctor.paragraphs === 'undefined') {
    docType.ctor.paragraphs = []
  }

  if (typeof docType.ctor.parameters === 'undefined') {
    docType.ctor.parameters = {}
  }

  for (const ctorParameterName in docType.ctor.parameters) {
    const ctorParameter = docType.ctor.parameters[ctorParameterName]

    if (typeof ctorParameter.isArray === 'undefined') { ctorParameter.isArray = false }
    if (typeof ctorParameter.isRequired === 'undefined') { ctorParameter.isRequired = false }
    if (typeof ctorParameter.paragraphs === 'undefined') { ctorParameter.paragraphs = [] }
  }

  if (typeof docType.ctor.implementation === 'undefined') {
    docType.ctor.implementation = () => ({})
  }

  if (typeof docType.ctor.examples === 'undefined') {
    docType.ctor.examples = []
  }

  for (const example of docType.ctor.examples) {
    if (typeof example.paragraphs === 'undefined') { example.paragraphs = [] }
  }

  // operations

  if (typeof docType.operations === 'undefined') {
    docType.ctor.operations = {}
  }

  for (const operationName in docType.operations) {
    const operation = docType.operations[operationName]

    if (typeof operation.title === 'undefined') { operation.title = pascalToTitleCase(operationName) }
    if (typeof operation.paragraphs === 'undefined') { operation.paragraphs = [] }

    for (const operationParameterName in operation.parameters) {
      const operationParameter = operation.parameters[operationParameterName]

      if (typeof operationParameter.isArray === 'undefined') { operationParameter.isArray = false }
      if (typeof operationParameter.isRequired === 'undefined') { operationParameter.isRequired = false }
      if (typeof operationParameter.paragraphs === 'undefined') { operationParameter.paragraphs = [] }
    }

    if (typeof operation.implementation === 'undefined') { operation.implementation = () => ({}) }

    if (typeof operation.examples === 'undefined') { operation.examples = [] }

    for (const example of operation.examples) {
      if (typeof example.paragraphs === 'undefined') { example.paragraphs = [] }
    }
  }

  // policy

  if (typeof docType.policy === 'undefined') {
    docType.policy = {}
  }

  if (typeof docType.policy.canDeleteDocuments === 'undefined') { docType.canDeleteDocuments = false }
  if (typeof docType.policy.canFetchWholeCollection === 'undefined') { docType.canFetchWholeCollection = false }
  if (typeof docType.policy.canReplaceDocuments === 'undefined') { docType.canReplaceDocuments = false }
  if (typeof docType.policy.maxOpsSize === 'undefined') { docType.maxOpsSize = consts.DEFAULT_MAX_OPS_SIZE }

  // docStore options

  if (typeof docType.docStoreOptions === 'undefined') {
    docType.docStoreOptions = {}
  }
}

/**
 * Returns an array containing all the declared field names
 * and system field names.  This is the complete list of fields
 * that can be retrieved from the database.
 * @param {Object} docType A doc type.
 */
function getSystemAndDeclaredFields (docType) {
  check.assert.object(docType)
  check.assert.object(docType.fields)

  return getSystemFieldNames().concat(Object.keys(docType.fields))
}

/**
 * Raises an error if any of the declared fields use
 * a reserved system name.
 * @param {Object} docType A doc type.
 */
function ensureDeclaredFieldNamesAreValid (docType) {
  check.assert.object(docType)
  check.assert.object(docType.fields)

  for (const fieldName in docType.fields) {
    if (getSystemFieldNames().includes(fieldName)) {
      throw new JsonotronDocTypeValidationError(docType.name,
        `Field name '${fieldName}' clashes with a reserved system field name.`)
    }
  }
}

/**
 * Raises an error if any of the calculated fields use
 * a reserved system name or match a declared field name.
 * @param {Object} docType A doc type.
 */
function ensureCalculatedFieldNamesAreValid (docType) {
  check.assert.object(docType)
  check.assert.object(docType.fields)
  check.assert.object(docType.calculatedFields)

  const fieldNames = Object.keys(docType.fields)

  for (const calculatedFieldName in docType.calculatedFields) {
    if (getSystemFieldNames().includes(calculatedFieldName)) {
      throw new JsonotronDocTypeValidationError(docType.name,
        `Calculated field name '${calculatedFieldName}' clashes with a reserved system field name.`)
    }

    if (fieldNames.includes(calculatedFieldName)) {
      throw new JsonotronDocTypeValidationError(docType.name,
        `Calculated field name '${calculatedFieldName}' clashes with a declared field name.`)
    }
  }
}

/**
 * Raises an error if the given doc type has any invalid default values.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of field types.
 */
function ensureDeclaredFieldDefaultsAreValid (ajv, docType, fieldTypes, enumTypes) {
  check.assert.object(ajv)
  check.assert.object(docType)
  check.assert.array(fieldTypes)
  check.assert.array(enumTypes)

  for (const fieldName in docType.fields) {
    const field = docType.fields[fieldName]

    if (field.default) {
      const fieldType = getFieldOrEnumTypeFromArrays(field.type, fieldTypes, enumTypes)

      // don't do this!
      if (fieldType.type === 'schema') {
        const validator = field.isArray
          ? createValueValidatorForFieldTypeArray(ajv, fieldType, fieldTypes, enumTypes)
          : createValueValidatorForFieldType(ajv, fieldType, fieldTypes, enumTypes)

        if (!validator(field.default)) {
          throw new JsonotronDocTypeValidationError(docType.name,
            `Field name '${fieldName}' declares a default value '${JSON.stringify(field.default)}' ` +
            `that does not conform to the '${field.type}' type schema.\n${JSON.stringify(validator.errors, null, 2)}`)
        }
      }
    }
  }
}

/**
 * Raises an error if any of the calculated fields reference
 * a field that is not declared on the doc type.
 * @param {Object} docType A doc type.
 */
function ensureCalculatedFieldInputsAreValid (docType) {
  check.assert.object(docType)
  check.assert.object(docType.calculatedFields)

  const systemAndDeclaredFieldNames = getSystemAndDeclaredFields(docType)

  for (const calculatedFieldName in docType.calculatedFields) {
    const calculatedField = docType.calculatedFields[calculatedFieldName]

    for (const inputFieldName of calculatedField.inputFields) {
      if (!systemAndDeclaredFieldNames.includes(inputFieldName)) {
        throw new JsonotronDocTypeValidationError(docType.name,
          `Calculated field '${calculatedFieldName}' requires unrecognised input field '${inputFieldName}'.`)
      }
    }
  }
}

/**
 * Raises an error if the given doc type is not valid.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function ensureDocType (ajv, docType, fieldTypes, enumTypes) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.object(docType)
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.object(enumTypes)

  // check field types are valid (which implicitly checks the enumTypes too)
  ensureFieldTypes(ajv, fieldTypes, enumTypes)

  // check schema
  validateDocTypeWithSchema(ajv, docType)

  // fill in the missing/optional parts
  patchDocType(docType)

  // declard field checks
  ensureDeclaredFieldNamesAreValid(docType)
  ensureDeclaredFieldDefaultsAreValid(ajv, docType, fieldTypes, enumTypes)

  // calculated field checks
  ensureCalculatedFieldNamesAreValid(docType)
  ensureCalculatedFieldInputsAreValid(docType)

  // all field types and example checks
}

// ensure doc types - which just validates the fields and enums once, before checking all the doc types

module.exports = ensureDocType
