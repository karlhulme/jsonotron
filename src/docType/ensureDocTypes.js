const check = require('check-types')
const { JsonotronDocTypesDocumentationMissingError, JsonotronDocTypeValidationError } = require('jsonotron-errors')
const { docTypeSchema } = require('../schemas')
const { ensureFieldTypes } = require('../fieldType')
const { consts, pascalToTitleCase } = require('../utils')
const getFieldOrEnumTypeFromArrays = require('./getFieldOrEnumTypeFromArrays')
const getSystemFieldNames = require('./getSystemFieldNames')
const createValueValidatorForFieldOrEnumType = require('./createValueValidatorForFieldOrEnumType')
const createJsonSchemaForConstructorParameters = require('./createJsonSchemaForConstructorParameters')
const createJsonSchemaForFilterParameters = require('./createJsonSchemaForFilterParameters')
const createJsonSchemaForMergePatch = require('./createJsonSchemaForMergePatch')
const createJsonSchemaForOperationParameters = require('./createJsonSchemaForOperationParameters')

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

  const missingDocumentationProperties = []

  // top level

  if (typeof docType.title === 'undefined') {
    docType.title = pascalToTitleCase(docType.name)
    missingDocumentationProperties.push('title')
  }

  if (typeof docType.pluralTitle === 'undefined') {
    docType.pluralTitle = pascalToTitleCase(docType.pluralName)
    missingDocumentationProperties.push('pluralTitle')
  }

  if (typeof docType.summary === 'undefined') {
    docType.summary = ''
    missingDocumentationProperties.push('summary')
  }

  if (typeof docType.paragraphs === 'undefined') {
    docType.paragraphs = []
    missingDocumentationProperties.push('paragraphs')
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

    if (typeof field.paragraphs === 'undefined') {
      field.paragraphs = []
      missingDocumentationProperties.push(`fields['${fieldName}'].paragraphs`)
    }
  }

  // validation

  if (typeof docType.preSave === 'undefined') {
    docType.preSave = () => {}
  }

  if (typeof docType.validate === 'undefined') {
    docType.validate = () => {}
  }

  // examples

  if (typeof docType.examples === 'undefined') {
    docType.examples = []
  }

  docType.examples.forEach((example, index) => {
    if (typeof example.paragraphs === 'undefined') {
      example.paragraphs = []
      missingDocumentationProperties.push(`examples[${index}].paragraphs`)
    }
  })

  // patchExamples

  if (typeof docType.patchExamples === 'undefined') {
    docType.patchExamples = []
  }

  docType.patchExamples.forEach((example, index) => {
    if (typeof example.paragraphs === 'undefined') {
      example.paragraphs = []
      missingDocumentationProperties.push(`patchExamples[${index}].paragraphs`)
    }
  })

  // calculated fields

  if (typeof docType.calculatedFields === 'undefined') {
    docType.calculatedFields = {}
  }

  for (const calculatedFieldName in docType.calculatedFields) {
    const calculatedField = docType.calculatedFields[calculatedFieldName]

    if (typeof calculatedField.isArray === 'undefined') { calculatedField.isArray = false }

    if (typeof calculatedField.paragraphs === 'undefined') {
      calculatedField.paragraphs = []
      missingDocumentationProperties.push(`patchExamples['${calculatedFieldName}'].paragraphs`)
    }
  }

  // filters

  if (typeof docType.filters === 'undefined') {
    docType.filters = {}
  }

  for (const filterName in docType.filters) {
    const filter = docType.filters[filterName]

    if (typeof filter.parameters === 'undefined') { filter.parameters = {} }

    if (typeof filter.title === 'undefined') {
      filter.title = pascalToTitleCase(filterName)
      missingDocumentationProperties.push(`filters['${filterName}'].title`)
    }

    if (typeof filter.paragraphs === 'undefined') {
      filter.paragraphs = []
      missingDocumentationProperties.push(`filters['${filterName}'].paragraphs`)
    }

    for (const filterParameterName in filter.parameters) {
      const filterParameter = filter.parameters[filterParameterName]

      if (typeof filterParameter.isArray === 'undefined') { filterParameter.isArray = false }
      if (typeof filterParameter.isRequired === 'undefined') { filterParameter.isRequired = false }
      if (typeof filterParameter.isDeprecated === 'undefined') { filterParameter.isDeprecated = false }

      if (typeof filterParameter.paragraphs === 'undefined') {
        filterParameter.paragraphs = []
        missingDocumentationProperties.push(`filters['${filterName}'].parameters['${filterParameterName}'].paragraphs`)
      }
    }

    if (typeof filter.examples === 'undefined') { filter.examples = [] }

    filter.examples.forEach((example, index) => {
      if (typeof example.paragraphs === 'undefined') {
        example.paragraphs = []
        missingDocumentationProperties.push(`filters['${filterName}'].examples[${index}].paragraphs`)
      }
    })

    if (typeof filter.isDeprecated === 'undefined') { filter.isDeprecated = false }
  }

  // constructor

  if (typeof docType.ctor === 'undefined') {
    docType.ctor = {}
  }

  if (typeof docType.ctor.paragraphs === 'undefined') {
    docType.ctor.paragraphs = []
    missingDocumentationProperties.push('ctor.paragraphs')
  }

  if (typeof docType.ctor.parameters === 'undefined') {
    docType.ctor.parameters = {}
  }

  for (const ctorParameterName in docType.ctor.parameters) {
    const ctorParameter = docType.ctor.parameters[ctorParameterName]

    if (typeof ctorParameter.isArray === 'undefined') { ctorParameter.isArray = false }
    if (typeof ctorParameter.isRequired === 'undefined') { ctorParameter.isRequired = false }
    if (typeof ctorParameter.isDeprecated === 'undefined') { ctorParameter.isDeprecated = false }

    if (typeof ctorParameter.paragraphs === 'undefined') {
      ctorParameter.paragraphs = []
      missingDocumentationProperties.push(`ctor.parameters['${ctorParameterName}'].paragraphs`)
    }
  }

  if (typeof docType.ctor.implementation === 'undefined') {
    docType.ctor.implementation = () => ({})
  }

  if (typeof docType.ctor.examples === 'undefined') {
    docType.ctor.examples = []
  }

  docType.ctor.examples.forEach((example, index) => {
    if (typeof example.paragraphs === 'undefined') {
      example.paragraphs = []
      missingDocumentationProperties.push(`ctor.examples[${index}].paragraphs`)
    }
  })

  // operations

  if (typeof docType.operations === 'undefined') {
    docType.ctor.operations = {}
  }

  for (const operationName in docType.operations) {
    const operation = docType.operations[operationName]

    if (typeof operation.parameters === 'undefined') { operation.parameters = {} }

    if (typeof operation.title === 'undefined') {
      operation.title = pascalToTitleCase(operationName)
      missingDocumentationProperties.push(`operations['${operationName}'].title`)
    }

    if (typeof operation.paragraphs === 'undefined') {
      operation.paragraphs = []
      missingDocumentationProperties.push(`operations['${operationName}'].paragraphs`)
    }

    for (const operationParameterName in operation.parameters) {
      const operationParameter = operation.parameters[operationParameterName]

      if (typeof operationParameter.isArray === 'undefined') { operationParameter.isArray = false }
      if (typeof operationParameter.isRequired === 'undefined') { operationParameter.isRequired = false }
      if (typeof operationParameter.isDeprecated === 'undefined') { operationParameter.isDeprecated = false }

      if (typeof operationParameter.paragraphs === 'undefined') {
        operationParameter.paragraphs = []
        missingDocumentationProperties.push(`operations['${operationName}'].parameters['${operationParameterName}'].paragraphs`)
      }
    }

    if (typeof operation.implementation === 'undefined') { operation.implementation = () => ({}) }

    if (typeof operation.examples === 'undefined') { operation.examples = [] }

    operation.examples.forEach((example, index) => {
      if (typeof example.paragraphs === 'undefined') {
        example.paragraphs = []
        missingDocumentationProperties.push(`operations['${operationName}'].examples[${index}].paragraphs`)
      }
    })

    if (typeof operation.isDeprecated === 'undefined') { operation.isDeprecated = false }
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

  return missingDocumentationProperties
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
      const fieldOrEnumType = getFieldOrEnumTypeFromArrays(field.type, fieldTypes, enumTypes)

      const validator = createValueValidatorForFieldOrEnumType(ajv, fieldOrEnumType, field.isArray, fieldTypes, enumTypes)

      if (!validator(field.default)) {
        throw new JsonotronDocTypeValidationError(docType.name,
          `Field name '${fieldName}' declares a default value '${JSON.stringify(field.default)}' ` +
          `that does not conform to the '${field.type}' type schema.\n${JSON.stringify(validator.errors, null, 2)}`)
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
  check.assert.object(docType.fields)
  check.assert.object(docType.calculatedFields)

  const reservedNames = getSystemFieldNames().concat(Object.keys(docType.fields))

  for (const calculatedFieldName in docType.calculatedFields) {
    const calculatedField = docType.calculatedFields[calculatedFieldName]

    for (const inputFieldName of calculatedField.inputFields) {
      if (!reservedNames.includes(inputFieldName)) {
        throw new JsonotronDocTypeValidationError(docType.name,
          `Calculated field '${calculatedFieldName}' requires unrecognised input field '${inputFieldName}'.`)
      }
    }
  }
}

/**
 * Raises an error if any of the constructor parameter names
 * clash with an existing field.
 * @param {Object} docType A doc type.
 */
function ensureConstructorParameterNamesAreValid (docType) {
  check.assert.object(docType)
  check.assert.object(docType.fields)
  check.assert.object(docType.calculatedFields)
  check.assert.object(docType.ctor)
  check.assert.object(docType.ctor.parameters)

  const reservedNames = getSystemFieldNames().concat(Object.keys(docType.fields)).concat(Object.keys(docType.calculatedFields))

  for (const ctorParameterName in docType.ctor.parameters) {
    if (reservedNames.includes(ctorParameterName)) {
      throw new JsonotronDocTypeValidationError(docType.name,
        `Constructor parameter '${ctorParameterName}' clashes with system field, document field or document calculated field.`)
    }
  }
}

/**
 * Raises an error if any examples do not conform to the schema.
 * @param {Object} ajv A json validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function ensureExamplesAreValid (ajv, docType, fieldTypes, enumTypes) {
  const schema = createJsonSchemaForMergePatch(docType, fieldTypes, enumTypes)
  const validator = ajv.compile(schema)

  docType.examples.forEach((example, index) => {
    if (!validator(example.value)) {
      throw new JsonotronDocTypeValidationError(docType.name,
        `Example at index ${index} does not match the schema.\n${JSON.stringify(validator.errors, null, 2)}`)
    }
  })
}

/**
 * Raises an error if any patch examples do not conform to the schema.
 * @param {Object} ajv A json validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function ensurePatchExamplesAreValid (ajv, docType, fieldTypes, enumTypes) {
  const schema = createJsonSchemaForMergePatch(docType, fieldTypes, enumTypes)
  const validator = ajv.compile(schema)

  docType.patchExamples.forEach((example, index) => {
    if (!validator(example.value)) {
      throw new JsonotronDocTypeValidationError(docType.name,
        `Patch example at index ${index} does not match the schema.\n${JSON.stringify(validator.errors, null, 2)}`)
    }
  })
}

/**
 * Raises an error if any filter examples do not conform to the schema.
 * @param {Object} ajv A json validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function ensureFilterExamplesAreValid (ajv, docType, fieldTypes, enumTypes) {
  for (const filterName in docType.filters) {
    const filter = docType.filters[filterName]

    const schema = createJsonSchemaForFilterParameters(docType, filterName, fieldTypes, enumTypes)
    const validator = ajv.compile(schema)

    filter.examples.forEach((example, index) => {
      if (!validator(example.value)) {
        throw new JsonotronDocTypeValidationError(docType.name,
          `Example for filter "${filterName}" at index ${index} does not match the schema.\n${JSON.stringify(validator.errors, null, 2)}`)
      }
    })
  }
}

/**
 * Raises an error if any constructor examples do not conform to the schema.
 * @param {Object} ajv A json validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function ensureConstructorExamplesAreValid (ajv, docType, fieldTypes, enumTypes) {
  const schema = createJsonSchemaForConstructorParameters(docType, fieldTypes, enumTypes)
  const validator = ajv.compile(schema)

  docType.ctor.examples.forEach((example, index) => {
    if (!validator(example.value)) {
      throw new JsonotronDocTypeValidationError(docType.name,
        `Constructor example at index ${index} does not match the schema.\n${JSON.stringify(validator.errors, null, 2)}`)
    }
  })
}

/**
 * Raises an error if any operation examples do not conform to the schema.
 * @param {Object} ajv A json validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function ensureOperationExamplesAreValid (ajv, docType, fieldTypes, enumTypes) {
  for (const operationName in docType.operations) {
    const operation = docType.operations[operationName]

    const schema = createJsonSchemaForOperationParameters(docType, operationName, fieldTypes, enumTypes)
    const validator = ajv.compile(schema)

    operation.examples.forEach((example, index) => {
      if (!validator(example.value)) {
        throw new JsonotronDocTypeValidationError(docType.name,
          `Example for operation "${operationName}" at index ${index} does not match the schema.\n${JSON.stringify(validator.errors, null, 2)}`)
      }
    })
  }
}

/**
 * Raises an error if the given doc type is not valid.
 * In order to validate a docType, we must first validate the field types
 * and the enum types.  Due to avoid incurring this burden repeatedly,
 * this method allows multiple docTypes to be validated together.
 * @param {Object} ajv A JSON schema validator.
 * @param {Array} docTypes An array of doc types.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 * @param {Boolean} includeDocumentation True if missing documentation should
 * cause the validation to fail.
 */
function ensureDocTypes (ajv, docTypes, fieldTypes, enumTypes, includeDocumentation) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.array.of.object(docTypes)
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.object(enumTypes)

  const missingDocumentationBlocks = []

  // check field types are valid (which implicitly checks the enumTypes too)
  ensureFieldTypes(ajv, fieldTypes, enumTypes, includeDocumentation)

  docTypes.forEach(docType => {
    // check schema
    validateDocTypeWithSchema(ajv, docType)

    // fill in the missing/optional parts
    const missingDocumentationProperties = patchDocType(docType)

    if (missingDocumentationProperties.length > 0) {
      missingDocumentationBlocks.push({ docTypeName: docType.name, propertyPaths: missingDocumentationProperties })
    }

    // check declared fields
    ensureDeclaredFieldNamesAreValid(docType)
    ensureDeclaredFieldDefaultsAreValid(ajv, docType, fieldTypes, enumTypes)

    // check calculated fields
    ensureCalculatedFieldNamesAreValid(docType)
    ensureCalculatedFieldInputsAreValid(docType)

    // check constructor parameters
    ensureConstructorParameterNamesAreValid(docType)

    // check examples
    ensureExamplesAreValid(ajv, docType, fieldTypes, enumTypes)
    ensurePatchExamplesAreValid(ajv, docType, fieldTypes, enumTypes)
    ensureFilterExamplesAreValid(ajv, docType, fieldTypes, enumTypes)
    ensureConstructorExamplesAreValid(ajv, docType, fieldTypes, enumTypes)
    ensureOperationExamplesAreValid(ajv, docType, fieldTypes, enumTypes)
  })

  if (includeDocumentation && missingDocumentationBlocks.length > 0) {
    throw new JsonotronDocTypesDocumentationMissingError(missingDocumentationBlocks)
  }
}

module.exports = ensureDocTypes
