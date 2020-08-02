const check = require('check-types')
const { JsonotronDocTypeDocsValidationError } = require('jsonotron-errors')
const { docTypeDocsSchema } = require('../schemas')
const createJsonSchemaForDocTypeInstance = require('./createJsonSchemaForDocTypeInstance')
const createJsonSchemaForDocTypeFilterParameters = require('./createJsonSchemaForDocTypeFilterParameters')

/**
 * Raises an error if the given doc type docs object does
 * not conform to the docTypeDocsSchema.
 * @param {Object} ajv A json validator.
 * @param {Object} docTypeDocs A doc type docs object.
 */
function ensureDocTypeDocsSatisfiesSchema (ajv, docTypeDocs) {
  const validator = ajv.compile(docTypeDocsSchema)

  if (!validator(docTypeDocs)) {
    throw new JsonotronDocTypeDocsValidationError(docTypeDocs.name, docTypeDocs.lang,
      `Unable to validate against docTypeDocsSchema.\n${JSON.stringify(validator.errors, null, 2)}`)
  }
}

/**
 * Raises an error if any of the general examples fail to conform
 * to the schema established by the underlying doc type.
 * @param {Object} ajv A json validator.
 * @param {Object} docTypeDocs A doc type docs object.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureDocTypeDocsGeneralExamplesAreValid (ajv, docTypeDocs, docType, fieldTypes) {
  const schema = createJsonSchemaForDocTypeInstance(docType, fieldTypes)
  const validator = ajv.compile(schema)

  if (Array.isArray(docTypeDocs.examples)) {
    docTypeDocs.examples.forEach((e, index) => {
      if (!validator(e.value)) {
        throw new JsonotronDocTypeDocsValidationError(docTypeDocs.name, docTypeDocs.lang,
          `Unable to validate document example at index ${index}.\n${JSON.stringify(validator.errors, null, 2)}`)
      }
    })
  }
}

/**
 * Raises an error if the docs fail to cover the filters
 * specified in the underlying doc type.
 * @param {Object} ajv A json validator.
 * @param {Object} docTypeDocs A doc type docs object.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureDocTypeDocsFiltersAreValid (ajv, docTypeDocs, docType, fieldTypes) {
  if (docType.filters) {
    if (!docTypeDocs.filters) {
      throw new JsonotronDocTypeDocsValidationError(docTypeDocs.name, docTypeDocs.lang,
        'There are filters defined on the document type but the \'filters\' property is not defined in the docs.')
    }

    for (const filterName in docType.filters) {
      const filter = docType.filters[filterName]
      const filterDoc = docTypeDocs.filters[filterName]

      if (!filterDoc) {
        throw new JsonotronDocTypeDocsValidationError(docTypeDocs.name, docTypeDocs.lang,
          `Filter '${filterName}' is not defined in the docs.`)
      }

      Object.keys(filter.parameters).forEach(p => {
        if (!filterDoc.parameters[p]) {
          throw new JsonotronDocTypeDocsValidationError(docTypeDocs.name, docTypeDocs.lang,
            `Filter '${filterName}' has parameter '${p}' that is not defined in the docs.`)
        }
      })

      Object.keys(filterDoc.parameters).forEach(p => {
        if (!filter.parameters[p]) {
          throw new JsonotronDocTypeDocsValidationError(docTypeDocs.name, docTypeDocs.lang,
            `Filter '${filterName}' does not declare parameter '${p}' but it is defined in the docs.`)
        }
      })

      const schema = createJsonSchemaForDocTypeFilterParameters(docType, filterName, fieldTypes)
      const validator = ajv.compile(schema)

      filterDoc.examples.forEach((e, index) => {
        if (!validator(e.value)) {
          throw new JsonotronDocTypeDocsValidationError(docTypeDocs.name, docTypeDocs.lang,
            `Unable to validate filter example at index ${index}.\n${JSON.stringify(validator.errors, null, 2)}`)
        }
      })
    }
  }
}

/**
 * Raises an error if the examples on the given doc type docs
 * object fail to conform to the underlying doc type.
 * @param {Object} ajv A json validator.
 * @param {Object} docTypeValues A doc type docs object.
 * @param {Array} docTypes An array of doc types.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureDocTypeDocsMatchesUnderlyingDocType (ajv, docTypeDocs, docTypes, fieldTypes) {
  const docType = docTypes.find(dt => dt.name === docTypeDocs.name)

  if (!docType) {
    throw new JsonotronDocTypeDocsValidationError(docTypeDocs.name, docTypeDocs.lang,
      'Docs supplied for unknown doc type.')
  }

  ensureDocTypeDocsGeneralExamplesAreValid(ajv, docTypeDocs, docType, fieldTypes)
  ensureDocTypeDocsFiltersAreValid(ajv, docTypeDocs, docType, fieldTypes)

  // constructor parameters
  // constructor examples

  // operation names
  // operation parameters
}

/**
 * Raises an error if the given doc type docs object is not valid.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docTypeDocs A doc type docs object to check for validatity.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureDocTypeDocsObjectIsValid (ajv, docTypeDocs, docTypes, fieldTypes) {
  ensureDocTypeDocsSatisfiesSchema(ajv, docTypeDocs)
  ensureDocTypeDocsMatchesUnderlyingDocType(ajv, docTypeDocs, docTypes, fieldTypes)
}

/**
 * Raises an error if any of the given doc type docs are not valid.
 * A valid doc type doc will conform to the docTypeDocsSchema.
 * @param {Object} ajv A json validator.
 * @param {Array} docTypeDocObjects An array of field types docs.
 * @param {Array} docTypes An array of doc types.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureDocTypeDocsAreValid (ajv, docTypeDocObjects, docTypes, fieldTypes) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.array.of.object(docTypeDocObjects)
  check.assert.array.of.object(docTypes)
  check.assert.array.of.object(fieldTypes)

  docTypeDocObjects.forEach(dtd => ensureDocTypeDocsObjectIsValid(ajv, dtd, docTypes, fieldTypes))
}

module.exports = ensureDocTypeDocsAreValid
