const check = require('check-types')
const { JsonotronFieldTypeValuesValidationError } = require('jsonotron-errors')
const { fieldTypeValuesSchema } = require('../schemas')

/**
 * Raises an error if the fieldTypeValues object does not conform to
 * the fieldTypeValuesSchema.
 * @param {Object} ajv A json validator.
 * @param {Object} fieldTypeValues A field type values object.
 */
function ensureFieldTypeValuesSatisfiesSchema (ajv, fieldTypeValues) {
  const validator = ajv.compile(fieldTypeValuesSchema)

  if (!validator(fieldTypeValues)) {
    throw new JsonotronFieldTypeValuesValidationError(fieldTypeValues.name, fieldTypeValues.lang,
      `Unable to validate against fieldTypeValuesSchema.\n${JSON.stringify(validator.errors, null, 2)}`)
  }
}

/**
 * Raises an error if the fieldTypeValues object contains values which
 * are not unique.
 * @param {Object} fieldTypeValues A field type values object.
 */
function ensureFieldTypeValuesAreUnique (fieldTypeValues) {
  const seen = []

  fieldTypeValues.values.forEach(v => {
    if (seen.includes(v.value)) {
      throw new JsonotronFieldTypeValuesValidationError(fieldTypeValues.name, fieldTypeValues.lang,
        `Value '${v.value}' is not unique.`)
    } else {
      seen.push(v.value)
    }
  })
}

/**
 * Raises an error if the values defined in the fieldTypeValues object
 * fails to cover the values defined in the underlying field type.
 * @param {Object} fieldTypeValues A field type values object.
 * @param {Array} fieldTypes An array of field types/
 */
function ensureFieldTypeValuesMatchesUnderlyingFieldTypeValues (fieldTypeValues, fieldTypes) {
  const fieldType = fieldTypes.find(ft => ft.name === fieldTypeValues.name)

  if (!fieldType) {
    throw new JsonotronFieldTypeValuesValidationError(fieldTypeValues.name, fieldTypeValues.lang,
      'Values supplied for unknown field type.')
  }

  fieldType.values.forEach(v => {
    if (fieldTypeValues.values.findIndex(ftv => ftv.value === v.value) === -1) {
      throw new JsonotronFieldTypeValuesValidationError(fieldTypeValues.name, fieldTypeValues.lang,
        `Field type value '${v.value}' not defined in field type values.`)
    }
  })

  fieldTypeValues.values.forEach(v => {
    if (fieldType.values.findIndex(ftv => ftv.value === v.value) === -1) {
      throw new JsonotronFieldTypeValuesValidationError(fieldTypeValues.name, fieldTypeValues.lang,
        `Documented value '${v.value}' is not defined in field type.`)
    }
  })
}

/**
 * Raises an error if the given field type values object is not valid.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} fieldTypeValues A field type values object to check for validatity.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureFieldTypeValuesObjectIsValid (ajv, fieldTypeValues, fieldTypes) {
  ensureFieldTypeValuesSatisfiesSchema(ajv, fieldTypeValues)
  ensureFieldTypeValuesAreUnique(fieldTypeValues)
  ensureFieldTypeValuesMatchesUnderlyingFieldTypeValues(fieldTypeValues, fieldTypes)
}

/**
 * Raises an error if any of the given field type values are not valid.
 * A valid field type doc will conform to the fieldTypeValuesSchema.
 * @param {Object} ajv A json validator.
 * @param {Array} fieldTypeValueObjects An array of field type value objects.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureFieldTypeValuesAreValid (ajv, fieldTypeValueObjects, fieldTypes) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.array.of.object(fieldTypeValueObjects)
  check.assert.array.of.object(fieldTypes)

  fieldTypeValueObjects.forEach(ftv => ensureFieldTypeValuesObjectIsValid(ajv, ftv, fieldTypes))
}

module.exports = ensureFieldTypeValuesAreValid
