/**
 * The enum type schema, pulled from https://github.com/karlhulme/jsonotron/schemas, and converted to JSON
 */
export const enumTypeSchema = {
  "$id": "enumTypeSchema",
  "title": "Enum Type Schema",
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
    "dataJsonSchema": {
      "type": "object"
    },
    "items": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "properties": {
          "value": {
            "type": "string"
          },
          "text": {
            "type": "string"
          },
          "symbol": {
            "type": "string"
          },
          "deprecated": {
            "type": "string"
          },
          "documentation": {
            "type": "string"
          },
          "data": {
            "type": "object"
          }
        },
        "required": [
          "value",
          "text"
        ]
      }
    }
  },
  "required": [
    "domain",
    "system",
    "name",
    "items",
    "title",
    "documentation"
  ]
}