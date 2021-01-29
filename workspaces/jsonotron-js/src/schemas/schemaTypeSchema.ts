/**
 * The schema type schema, pulled from https://github.com/karlhulme/jsonotron/schemas, and converted to JSON
 */
export const schemaTypeSchema = {
  "$id": "schemaTypeSchema",
  "title": "Schema Type Schema",
  "type": "object",
  "properties": {
    "domain": {
      "type": "string",
      "pattern": "^https?://[_a-zA-Z][_a-zA-Z0-9.]*$"
    },
    "system": {
      "type": "string",
      "pattern": "^[_a-zA-Z][_a-zA-Z0-9]*$"
    },
    "name": {
      "type": "string",
      "pattern": "^[_a-zA-Z][_a-zA-Z0-9]*$"
    },
    "title": {
      "type": "string"
    },
    "documentation": {
      "type": "string"
    },
    "examples": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "properties": {
          "value": {
          },
          "documentation": {
            "type": "string"
          }
        },
        "required": [
          "value",
          "documentation"
        ]
      }
    },
    "validTestCases": {
      "type": "array"
    },
    "invalidTestCases": {
      "type": "array"
    },
    "jsonSchema": {
      "type": "object"
    }
  },
  "required": [
    "domain",
    "system",
    "name",
    "jsonSchema",
    "title",
    "documentation",
    "examples",
    "validTestCases",
    "invalidTestCases"
  ]
}