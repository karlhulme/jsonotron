const check = require('check-types')
const { JsonotronDocTypeValidationError } = require('jsonotron-errors')
const { docTypeSchema } = require('../schemas')
const {
  createFieldTypeArrayValueValidator,
  createFieldTypeValueValidator
} = require('../fieldTypes')
const getSystemFields = require('./getSystemFields')

/**
 * Raises an error if the given doc type does not conform
 * to the docTypeSchema.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 */
function ensureDocTypeAgainstDocTypeSchema (ajv, docType) {
  check.assert.object(ajv)
  check.assert.object(docType)

  const docTypeSchemaValidator = ajv.compile(docTypeSchema)

  if (!docTypeSchemaValidator(docType)) {
    throw new JsonotronDocTypeValidationError(docType.name,
      `Unable to validate against docTypeSchema.\n${JSON.stringify(docTypeSchemaValidator.errors, null, 2)}`)
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

  return getSystemFields().concat(Object.keys(docType.fields))
}

/**
 * Raises an error if any of the declared fields use
 * a reserved system name.
 * @param {Object} docType A doc type.
 */
function ensureDeclaredFieldNamesDontClashWithSystemFieldNames (docType) {
  check.assert.object(docType)
  check.assert.object(docType.fields)

  for (const fieldName in docType.fields) {
    if (getSystemFields().includes(fieldName)) {
      throw new JsonotronDocTypeValidationError(docType.name,
        `Field name '${fieldName}' cannot clash with a reserved system field name.`)
    }
  }
}

/**
 * Raises an error if the given doc type fields have any invalid field types.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureDeclaredFieldTypesAreValid (ajv, docType, fieldTypes) {
  check.assert.object(ajv)
  check.assert.object(docType)
  check.assert.array(fieldTypes)

  // check fields
  for (const fieldName in docType.fields) {
    const field = docType.fields[fieldName]

    if (fieldTypes.findIndex(ft => ft.name === field.type) === -1) {
      throw new JsonotronDocTypeValidationError(docType.name,
        `Field name '${fieldName}' declares an unrecognised type of '${field.type}'.`)
    }
  }
}

/**
 * Raises an error if the given doc type has any invalid default values.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureDeclaredFieldDefaultsAreValid (ajv, docType, fieldTypes) {
  check.assert.object(ajv)
  check.assert.object(docType)
  check.assert.array(fieldTypes)

  for (const fieldName in docType.fields) {
    const field = docType.fields[fieldName]

    if (field.default) {
      const validator = createFieldTypeValueValidator(ajv, fieldTypes, field.type)

      if (!validator(field.default)) {
        throw new JsonotronDocTypeValidationError(docType.name,
          `Field name '${fieldName}' declares a default value '${JSON.stringify(field.default)}' ` +
          `that does not conform to the ${field.type} type schema.\n${JSON.stringify(validator.errors, null, 2)}`)
      }
    }
  }
}

/**
 * Raises an error if the given doc type has any fields
 * with invalid example values.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureDeclaredFieldExamplesAreValid (ajv, docType, fieldTypes) {
  check.assert.object(ajv)
  check.assert.object(docType)
  check.assert.array(fieldTypes)

  for (const fieldName in docType.fields) {
    const field = docType.fields[fieldName]

    const validator = field.isArray === true
      ? createFieldTypeArrayValueValidator(ajv, fieldTypes, field.type)
      : createFieldTypeValueValidator(ajv, fieldTypes, field.type)

    if (!validator(field.example)) {
      throw new JsonotronDocTypeValidationError(docType.name,
        `Field name '${fieldName}' declares an example value '${JSON.stringify(field.example)}' ` +
        `that does not conform to the ${field.type} type schema.\n${JSON.stringify(validator.errors, null, 2)}`)
    }
  }
}

/**
 * Raises an error if the given doc type calculated fields have any invalid field types.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureCalculatedFieldTypesAreValid (ajv, docType, fieldTypes) {
  check.assert.object(ajv)
  check.assert.object(docType)
  check.assert.array(fieldTypes)

  if (docType.calculatedFields) {
    for (const calcFieldName in docType.calculatedFields) {
      const calcField = docType.calculatedFields[calcFieldName]

      if (fieldTypes.findIndex(ft => ft.name === calcField.type) === -1) {
        throw new JsonotronDocTypeValidationError(docType.name,
          `Calculated field '${calcFieldName}' declares an unrecognised type of '${calcField.type}'.`)
      }
    }
  }
}

/**
 * Raises an error if the given doc type has any calculated fields
 * with invalid example values.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureCalculatedFieldExamplesAreValid (ajv, docType, fieldTypes) {
  check.assert.object(ajv)
  check.assert.object(docType)
  check.assert.array(fieldTypes)

  for (const fieldName in docType.calculatedFields) {
    const calcField = docType.calculatedFields[fieldName]

    const validator = calcField.isArray === true
      ? createFieldTypeArrayValueValidator(ajv, fieldTypes, calcField.type)
      : createFieldTypeValueValidator(ajv, fieldTypes, calcField.type)

    if (!validator(calcField.example)) {
      throw new JsonotronDocTypeValidationError(docType.name,
        `Calculated field '${fieldName}' declares an example value '${JSON.stringify(calcField.example)}' ` +
        `that does not conform to the '${calcField.type}' type schema.\n${JSON.stringify(validator.errors, null, 2)}`)
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

  const systemAndDeclaredFieldNames = getSystemAndDeclaredFields(docType)

  if (typeof docType.calculatedFields === 'object') {
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
}

/**
 * Raises an error if the given doc type filter parameters have any invalid field types.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureFilterParameterTypesAreValid (ajv, docType, fieldTypes) {
  check.assert.object(ajv)
  check.assert.object(docType)
  check.assert.array(fieldTypes)

  if (docType.filters) {
    for (const filterName in docType.filters) {
      const filter = docType.filters[filterName]

      for (const parameterName in filter.parameters) {
        const parameter = filter.parameters[parameterName]

        if (fieldTypes.findIndex(ft => ft.name === parameter.type) === -1) {
          throw new JsonotronDocTypeValidationError(docType.name,
            `Filter '${filterName}' parameter '${parameterName}' declares an unrecognised type of '${parameter.type}'.`)
        }
      }
    }
  }
}

/**
 * Raises an error if the given doc type filter parameters have any invalid example values.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureFilterParameterExamplesAreValid (ajv, docType, fieldTypes) {
  check.assert.object(ajv)
  check.assert.object(docType)
  check.assert.array(fieldTypes)

  if (docType.filters) {
    for (const filterName in docType.filters) {
      const filter = docType.filters[filterName]

      for (const parameterName in filter.parameters) {
        const parameter = filter.parameters[parameterName]

        const validator = parameter.isArray === true
          ? createFieldTypeArrayValueValidator(ajv, fieldTypes, parameter.type)
          : createFieldTypeValueValidator(ajv, fieldTypes, parameter.type)

        if (!validator(parameter.example)) {
          throw new JsonotronDocTypeValidationError(docType.name,
            `Filter '${filterName}' parameter '${parameterName}' declares an example value '${JSON.stringify(parameter.example)}' ` +
            `that does not conform to the '${parameter.type}' type schema.\n${JSON.stringify(validator.errors, null, 2)}`)
        }
      }
    }
  }
}

/**
 * Raises an error if the given doc type constructor parameters have any invalid field types.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureConstructorParameterTypesAreValid (ajv, docType, fieldTypes) {
  check.assert.object(ajv)
  check.assert.object(docType)
  check.assert.array(fieldTypes)

  if (docType.ctor) {
    for (const parameterName in docType.ctor.parameters) {
      const parameter = docType.ctor.parameters[parameterName]

      if (parameter.type) {
        if (fieldTypes.findIndex(ft => ft.name === parameter.type) === -1) {
          throw new JsonotronDocTypeValidationError(docType.name,
            `Constructor parameter '${parameterName}' declares an unrecognised type of '${parameter.type}'.`)
        }
      }
    }
  }
}

/**
 * Raises an error if the given doc type constructor parameters have any invalid example values.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureConstructorParameterExamplesAreValid (ajv, docType, fieldTypes) {
  check.assert.object(ajv)
  check.assert.object(docType)
  check.assert.array(fieldTypes)

  if (docType.ctor) {
    for (const parameterName in docType.ctor.parameters) {
      const parameter = docType.ctor.parameters[parameterName]

      if (parameter.type) {
        const validator = parameter.isArray === true
          ? createFieldTypeArrayValueValidator(ajv, fieldTypes, parameter.type)
          : createFieldTypeValueValidator(ajv, fieldTypes, parameter.type)

        if (!validator(parameter.example)) {
          throw new JsonotronDocTypeValidationError(docType.name,
            `Constructor parameter '${parameterName}' declares an example value '${JSON.stringify(parameter.example)}' ` +
            `that does not conform to the '${parameter.type}' type schema.\n${JSON.stringify(validator.errors, null, 2)}`)
        }
      }
    }
  }
}

/**
 * Raises an error if any of the constructor parameters
 * that are designated as a lookup are not declared on the doc type.
 * @param {Object} docType A doc type.
 */
function ensureConstructorParameterLookupsAreValid (docType) {
  check.assert.object(docType)

  const systemAndDeclaredFieldNames = getSystemAndDeclaredFields(docType)

  if (typeof docType.ctor === 'object' && typeof docType.ctor.parameters === 'object') {
    for (const ctorParameterName in docType.ctor.parameters) {
      const ctorParameter = docType.ctor.parameters[ctorParameterName]

      if (ctorParameter.lookup === 'field') {
        if (!systemAndDeclaredFieldNames.includes(ctorParameterName)) {
          throw new JsonotronDocTypeValidationError(docType.name,
            `Constructor parameter '${ctorParameterName}' is a lookup field but a matching declared field is missing.`)
        }
      }
    }
  }
}

/**
 * Raises an error if the given doc type operation parameters have any invalid field types.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureOperationParameterTypesAreValid (ajv, docType, fieldTypes) {
  check.assert.object(ajv)
  check.assert.object(docType)
  check.assert.array(fieldTypes)

  if (docType.operations) {
    for (const operationName in docType.operations) {
      const operation = docType.operations[operationName]

      for (const parameterName in operation.parameters) {
        const parameter = operation.parameters[parameterName]

        if (parameter.type) {
          if (fieldTypes.findIndex(ft => ft.name === parameter.type) === -1) {
            throw new JsonotronDocTypeValidationError(docType.name,
              `Operation '${operationName}' parameter '${parameterName}' declares an unrecognised type of '${parameter.type}'.`)
          }
        }
      }
    }
  }
}

/**
 * Raises an error if the given doc type opertion parameters have any invalid example values.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureOperationParameterExamplesAreValid (ajv, docType, fieldTypes) {
  check.assert.object(ajv)
  check.assert.object(docType)
  check.assert.array(fieldTypes)

  if (docType.operations) {
    for (const operationName in docType.operations) {
      const operation = docType.operations[operationName]

      for (const parameterName in operation.parameters) {
        const parameter = operation.parameters[parameterName]

        if (parameter.type) {
          const validator = parameter.isArray === true
            ? createFieldTypeArrayValueValidator(ajv, fieldTypes, parameter.type)
            : createFieldTypeValueValidator(ajv, fieldTypes, parameter.type)

          if (!validator(parameter.example)) {
            throw new JsonotronDocTypeValidationError(docType.name,
              `Operation '${operationName}' parameter '${parameterName}' declares an example value '${JSON.stringify(parameter.example)}' ` +
              `that does not conform to the '${parameter.type}' type schema.\n${JSON.stringify(validator.errors, null, 2)}`)
          }
        }
      }
    }
  }
}

/**
 * Raises an error if any of the operation parameters
 * (across all the defined operations)
 * that are designated as a lookup are not declared on the doc type.
 * @param {Object} docType A doc type.
 */
function ensureOperationParameterLookupsAreValid (docType) {
  check.assert.object(docType)

  const systemAndDeclaredFieldNames = getSystemAndDeclaredFields(docType)

  if (docType.operations) {
    for (const operationName in docType.operations) {
      const operation = docType.operations[operationName]

      for (const operationParameterName in operation.parameters) {
        const operationParameter = operation.parameters[operationParameterName]

        if (operationParameter.lookup === 'field') {
          if (!systemAndDeclaredFieldNames.includes(operationParameterName)) {
            throw new JsonotronDocTypeValidationError(docType.name,
              `Operation '${operationName}' states parameter '${operationParameterName}' is a lookup field but a matching declared field is missing.`)
          }
        }
      }
    }
  }
}

/**
 * Raises an error if the given doc type is not valid.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureDocTypeIsValid (ajv, docType, fieldTypes) {
  ensureDocTypeAgainstDocTypeSchema(ajv, docType)
  ensureDeclaredFieldNamesDontClashWithSystemFieldNames(docType)
  ensureDeclaredFieldTypesAreValid(ajv, docType, fieldTypes)
  ensureDeclaredFieldDefaultsAreValid(ajv, docType, fieldTypes)
  ensureDeclaredFieldExamplesAreValid(ajv, docType, fieldTypes)
  ensureCalculatedFieldTypesAreValid(ajv, docType, fieldTypes)
  ensureCalculatedFieldInputsAreValid(docType)
  ensureCalculatedFieldExamplesAreValid(ajv, docType, fieldTypes)
  ensureFilterParameterTypesAreValid(ajv, docType, fieldTypes)
  ensureFilterParameterExamplesAreValid(ajv, docType, fieldTypes)
  ensureConstructorParameterTypesAreValid(ajv, docType, fieldTypes)
  ensureConstructorParameterExamplesAreValid(ajv, docType, fieldTypes)
  ensureConstructorParameterLookupsAreValid(docType)
  ensureOperationParameterTypesAreValid(ajv, docType, fieldTypes)
  ensureOperationParameterExamplesAreValid(ajv, docType, fieldTypes)
  ensureOperationParameterLookupsAreValid(docType)
}

/**
 * Raises an error if any of the given doc types are not valid.
 * @param {Object} ajv A JSON schema validator.
 * @param {Array} docTypes An array of doc types.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureDocTypesAreValid (ajv, docTypes, fieldTypes) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.array.of.object(docTypes)
  check.assert.array.of.object(fieldTypes)

  for (let i = 0; i < docTypes.length; i++) {
    ensureDocTypeIsValid(ajv, docTypes[i], fieldTypes)
  }
}

module.exports = ensureDocTypesAreValid
