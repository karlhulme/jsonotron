import check from 'check-types'
import { createCustomisedAjv } from '../jsonSchemaValidation'
import { createJsonSchemaForEnumType, createJsonSchemaForSchemaType, createJsonSchemaForFieldBlock } from '../jsonSchemaGeneration'
import { patchEnumType, validateEnumType } from '../enumType'
import { validateSchemaType, patchSchemaType } from '../schemaType'
import { createErrorOrWarning, createValidationResult, createCompilationResult } from '../shared'
import { validateFieldBlockDefinition, patchFieldBlockDefinition } from '../fieldBlockDefinition'

/**
 * Generate a json schema for the given schemaType using the other arrays
 * if they are referenced.
 * If the schema generation fails then the error will be recorded in the result.
 * @param {Object} schemaType A schema type to generate a schema for.
 * @param {Array} schemaTypes An array of schema types.
 * @param {Array} enumTypes An array of enum types.
 * @param {Function} recordErrorFunc A function for recording an error.
 */
function generateJsonSchemaForSchemaType (schemaType, schemaTypes, enumTypes, recordErrorFunc) {
  try {
    return createJsonSchemaForSchemaType(schemaType, schemaTypes, enumTypes)
  } catch (err) {
    recordErrorFunc(createErrorOrWarning(schemaType.name, 'Schema Type JSON Schema generation failed.', { message: err.toString() }))
    return null
  }
}

/**
 * Returns a function (value) that returns true if the given value conforms to the given json schema.
 * If the compilation fails then the error will be recorded in the result.
 * @param {Ajv} ajv A json validator.
 * @param {String} schemaTypeName The name of the schema type used to generate the JSON schema.
 * @param {Object} jsonSchema A json schema.
 * @param {Function} recordErrorFunc A function for recording an error.
 */
function compileJsonSchemaForSchemaType (ajv, schemaTypeName, jsonSchema, recordErrorFunc) {
  try {
    return ajv.compile(jsonSchema)
  } catch (err) {
    recordErrorFunc(createErrorOrWarning(schemaTypeName, 'Schema Type JSON Schema compilation failed.', { message: err.toString() }))
    return null
  }
}

/**
 * Generate a json schema for the given fieldBlockDefinition.
 * If the schema generation fails then the error will be recorded in the result.
 * @param {Object} fieldBlockDefinition A field block definition to generate a schema for.
 * @param {Array} schemaTypes An array of schema types.
 * @param {Array} enumTypes An array of enum types.
 */
function generateJsonSchemaForFieldBlockDefinition (fieldBlockDefinition, schemaTypes, enumTypes, recordErrorFunc) {
  try {
    return createJsonSchemaForFieldBlock(fieldBlockDefinition, schemaTypes, enumTypes)
  } catch (err) {
    recordErrorFunc(createErrorOrWarning(fieldBlockDefinition.name, 'Field Block Definition JSON Schema generation failed.', { message: err.toString() }))
    return null
  }
}

/**
 * Add an error or warning object to an array.
 * @param {Object} errorOrWarning An object that has typeName, message and details properties.
 * @param {Array} array An array.
 */
function addErrorOrWarningObjectToArray (errorOrWarning, array) {
  check.assert.object(errorOrWarning)
  check.assert.string(errorOrWarning.typeName)
  check.assert.string(errorOrWarning.message)
  check.assert.object(errorOrWarning.details)

  array.push(errorOrWarning)
}

/**
 * Checks that the examples on the schema type conform to the json schema.
 * If not, errors are recorded.
 * @param {Function} validator A function that returns true if the sole parameter conforms to a pre-set json schema.
 * @param {Object} schemaType A schema type.
 * @param {Function} recordErrorFunc A function for recording an error.
 */
function verifySchemaTypeExamples (validator, schemaType, recordErrorFunc) {
  schemaType.examples.forEach((example, index) => {
    if (!validator(example.value)) {
      validator.errors.forEach(error => {
        // include the error message in the templated string so that each error has a unique message.
        recordErrorFunc(createErrorOrWarning(schemaType.name, `Verification failed for examples[${index}]: ${error.message}`, error))
      })
    }
  })
}

/**
 * Checks that the valid test cases on the schema type conform to the json schema.
 * If not, errors are recorded.
 * @param {Function} validator A function that returns true if the sole parameter conforms to a pre-set json schema.
 * @param {Object} schemaType A schema type.
 * @param {Function} recordErrorFunc A function for recording an error.
 */
function verifySchemaTypeValidTestCases (validator, schemaType, recordErrorFunc) {
  schemaType.validTestCases.forEach((validTestCase, index) => {
    if (!validator(validTestCase)) {
      validator.errors.forEach(error => {
        // include the error message in the templated string so that each error has a unique message.
        recordErrorFunc(createErrorOrWarning(schemaType.name, `Verification failed for validTestCases[${index}]: ${error.message}`, error))
      })
    }
  })
}

/**
 * Checks that the invalid test cases on the schema type do not conform to the json schema.
 * If they unexpectedly pass, then errors are added recorded.
 * @param {Function} validator A function that returns true if the sole parameter conforms to a pre-set json schema.
 * @param {Object} schemaType A schema type.
 * @param {Function} recordErrorFunc A function for recording an error.
 */
function verifySchemaTypeInvalidTestCases (validator, schemaType, recordErrorFunc) {
  schemaType.invalidTestCases.forEach((invalidTestCase, index) => {
    if (validator(invalidTestCase)) {
      recordErrorFunc(createErrorOrWarning(schemaType.name, `Verification passed (but should have failed) for invalidTestCases[${index}].`, { message: 'Validation was expected to fail but passed.' }))
    }
  })
}

/**
 * Provides methods for validating field blocks.
 */
export class Jsonotron {
  constructor ({ enumTypes = [], schemaTypes = [], formatValidators = [] } = {}) {
    check.assert.array.of.object(enumTypes)
    check.assert.array.of.object(schemaTypes)
    check.assert.array.of.object(formatValidators)

    // error and warning arrays
    this.errors = []
    this.warnings = []

    // patched types
    this.patchedEnumTypes = []
    this.patchedSchemaTypes = []
    this.patchedFieldBlockDefinitions = []

    // validators
    this.enumTypeValidators = {}
    this.schemaTypeValidators = {}
    this.fieldBlockDefinitionValidators = {}

    // initialise the ajv
    this.ajv = createCustomisedAjv(formatValidators)

    // create functions for recording errors and warnings
    const recordErrorFunc = error => addErrorOrWarningObjectToArray(error, this.errors)
    const recordWarningFunc = warning => addErrorOrWarningObjectToArray(warning, this.warnings)

    // validate and patch enum types
    enumTypes.forEach(enumType => {
      if (validateEnumType(this.ajv, enumType, recordErrorFunc, recordWarningFunc)) {
        this.patchedEnumTypes.push(patchEnumType(enumType))
      }
    })

    // validate and patch schema types
    schemaTypes.forEach(schemaType => {
      if (validateSchemaType(this.ajv, schemaType, recordErrorFunc, recordWarningFunc)) {
        this.patchedSchemaTypes.push(patchSchemaType(schemaType))
      }
    })

    // compile the enum types
    this.patchedEnumTypes.forEach(enumType => {
      const jsonSchema = createJsonSchemaForEnumType(enumType)
      const enumTypeValidator = this.ajv.compile(jsonSchema)
      this.enumTypeValidators[enumType.name] = enumTypeValidator
    })

    // compile the schema types
    this.patchedSchemaTypes.forEach(schemaType => {
      const jsonSchema = generateJsonSchemaForSchemaType(schemaType, schemaTypes, enumTypes, recordErrorFunc)

      if (jsonSchema) {
        const schemaTypeValidator = compileJsonSchemaForSchemaType(this.ajv, schemaType.name, jsonSchema, recordErrorFunc)

        if (schemaTypeValidator) {
          verifySchemaTypeExamples(schemaTypeValidator, schemaType, recordErrorFunc)
          verifySchemaTypeValidTestCases(schemaTypeValidator, schemaType, recordErrorFunc)
          verifySchemaTypeInvalidTestCases(schemaTypeValidator, schemaType, recordErrorFunc)
          this.schemaTypeValidators[schemaType.name] = schemaTypeValidator
        }
      }
    })
  }

  /**
   * Returns the errors as an array of (message, details) elements.
   */
  getErrors () {
    return [...this.errors]
  }

  /**
   * Returns the warnings as an array of (message, details) elements.
   */
  getWarnings () {
    return [...this.warnings]
  }

  /**
   * Returns the patched enum types that passed the validation process.
   * The enum types here may have subsequently failed the schema generation,
   * schema compilation or verification steps.
   */
  getPatchedEnumTypes () {
    return [...this.patchedEnumTypes]
  }

  /**
   * Returns the patched schema types that passed the validation process.
   * The schema types here may have subsequently failed the schema generation,
   * schema compilation or verification steps.
   */
  getPatchedSchemaTypes () {
    return [...this.patchedSchemaTypes]
  }

  /**
   * Executes an enum type validator or schema type validator to see if
   * the given value is valid.
   * @param {String} fieldTypeName The name of an enum type or schema type.
   * @param {Object} value Any value.
   */
  validateFieldValue (fieldTypeName, value) {
    check.assert.string(fieldTypeName)

    const validator = this.enumTypeValidators[fieldTypeName] || this.schemaTypeValidators[fieldTypeName]

    if (validator) {
      if (validator(value)) {
        return createValidationResult(true, true, null)
      } else {
        return createValidationResult(true, false, [...validator.errors])
      }
    } else {
      return createValidationResult(false, false, null)
    }
  }

  /**
   * Compiles the given field block definition so that it field blocks can be
   * validated with it.
   * @param {Object} fieldBlockDefinition A field block definition.
   */
  compileFieldBlockDefinition (fieldBlockDefinition) {
    check.assert.object(fieldBlockDefinition)
    check.assert.string(fieldBlockDefinition.name)

    const compileErrors = []
    const recordErrorFunc = error => addErrorOrWarningObjectToArray(error, compileErrors)

    if (validateFieldBlockDefinition(this.ajv, fieldBlockDefinition, recordErrorFunc)) {
      const patchedFieldBlockDefinition = patchFieldBlockDefinition(fieldBlockDefinition)
      this.patchedFieldBlockDefinitions.push(patchedFieldBlockDefinition)

      const jsonSchema = generateJsonSchemaForFieldBlockDefinition(patchedFieldBlockDefinition, this.patchedSchemaTypes, this.patchedEnumTypes, recordErrorFunc)

      if (jsonSchema) {
        const validator = this.ajv.compile(jsonSchema)
        this.fieldBlockDefinitionValidators[patchedFieldBlockDefinition.name] = validator
        return createCompilationResult(true, null)
      }
    }

    return createCompilationResult(false, compileErrors)
  }

  /**
   * Executes a field block definition validator or schema type validator to see if
   * the given value is valid.
   * @param {String} fieldBlockDefinitionName The name of a previously compiled field block definition name.
   * @param {Object} value Any value.
   */
  validateFieldBlock (fieldBlockDefinitionName, value) {
    check.assert.string(fieldBlockDefinitionName)

    const validator = this.fieldBlockDefinitionValidators[fieldBlockDefinitionName]

    if (validator) {
      if (validator(value)) {
        return createValidationResult(true, true, null)
      } else {
        return createValidationResult(true, false, [...validator.errors])
      }
    } else {
      return createValidationResult(false, false, null)
    }
  }

  /**
   * Returns true if the compilation result contains no errors.
   */
  isSuccessful () {
    return this.errors.length === 0
  }

  /**
   * Returns true if the compilation result contains no errors and no warnings.
   */
  isSuccessfulWithNoWarnings () {
    return this.errors.length === 0 && this.warnings.length === 0
  }

  /**
   * Returns a formatted string containing the errors and warnings.
   */
  toString () {
    return JSON.stringify({
      errors: this.getErrors(),
      warnings: this.getWarnings()
    }, null, 2)
  }
}
