function buildFields (src) {
  const fields = {}

  for (const fieldName in src.fields) {
    const field = src.fields[fieldName]

    fields[fieldName] = {
      type: field.type,
      isArray: field.isArray,
      isGuaranteed: field.isRequired,
      isDeprecated: field.isDeprecated,
      paragraphs: field.paragraphs
    }
  }

  for (const fieldName in src.calculatedFields) {
    const field = src.calculatedFields[fieldName]

    fields[fieldName] = {
      type: field.type,
      isArray: field.isArray,
      isGuaranteed: false,
      isDeprecated: field.isDeprecated,
      paragraphs: field.paragraphs.concat(
        ['The value of this field is calculated automatically based on the following input fields: ' +
        `${field.inputFields.map(f => `\`${f}\``).join(', ')}.`])
    }
  }

  return fields
}

function buildExamples (src) {
  return src.examples.map(e => ({
    value: e.value,
    paragraphs: e.paragraphs
  }))
}

function buildConstructorEndPoint (src) {
  return {
    title: src.ctor.title,
    httpVerb: 'post',
    url: '',
    paragraphs: src.ctor.paragraphs,
    requestParameters: {},
    requestPayload: {
      mechanism: 'httpBody',
      httpQueryParamName: '',
      fields: {
        // the constructor parameters
        // and the canUpdate fields
      }
    },
    responseParameters: {},
    responsePayload: {
      fields: {}
    },
    examples: [],
    responseCodes: []
  }
}

function buildEndPoints (src) {
  const endPoints = []

  endPoints.push(buildConstructorEndPoint(src))

  return endPoints
}

function createApiResourceTypeFromDocType (docType) {
  const src = JSON.parse(JSON.stringify(docType))

  return {
    urlRoot: '/' + src.pluralName,
    title: src.title,
    pluralTitle: src.pluralTitle,
    summary: src.summary,
    paragraphs: src.paragraphs,
    fields: buildFields(src),
    examples: buildExamples(src),
    endPoints: buildEndPoints(src)
  }
}

module.exports = createApiResourceTypeFromDocType
