/**
 * The structure type schema, pulled from https://github.com/karlhulme/jsonotron/schemas, and converted to JSON
 */
export const structureSchema = {
  "$id": "structureSchema",
  "title": "Structure Schema",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "pattern": "^([_a-zA-Z][_a-zA-Z0-9]*[.])?[_a-zA-Z][_a-zA-Z0-9]*$"
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "documentation": {
      "type": "string"
    },
    "fields": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "pattern": "^https?://[_a-zA-Z][_a-zA-Z0-9.]*/[_a-zA-Z][_a-zA-Z0-9]*/[_a-zA-Z][_a-zA-Z0-9]*$"
          },
          "isRequired": {
            "type": "boolean"
          },
          "isNullable": {
            "type": "boolean"
          },
          "isArray": {
            "type": "boolean"
          },
          "documentation": {
            "type": "string"
          }
        },
        "required": [
          "type"
        ]
      }
    }
  },
  "required": [
    "name",
    "fields"
  ]
}
