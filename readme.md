# A property type system for Javascript based on JSON schemas.

![](https://github.com/karlhulme/jsonotron-validation/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonotron-validation.svg)](https://www.npmjs.com/package/jsonotron-validation)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

The library is useful if you want to validate an object as a set of properties, where each property has a specific type and associated syntax.

The point is that the the top level properties are given greater significance than sub-properties.  This allows you to have multiple properties of the same 'type' without redefining the fields.

## Installation

```bash
npm install jsonotron
```

## Defining Types

The library can validate enum and schema types.

An **enum type** is based around a list of allowed values.  The same concept as an enum in many programming languages.  The allowed values will usually be strings but booleans are also allowed.

```javascript
{
  name: 'directions',
  title: 'Directions',
  paragraphs: ['My commonmark describing the purpose or usage of the enum.'],
  items: [
    { value: 'up', symbol: '/\\', paragraphs: ['More documentation.'] },
    { value: 'down', symbol: '\\/', isDeprecated: true, paragraphs: ['Last bit of documentation.'] }
  ]
}
```

Property Name | Description
---|---
name | A name for the enum type.
title | An optional display name for the enum type, typically prefixed with a capital letter.
paragraphs | An optional array of commonmark strings.
items | An array of objects.
items.value | A string or boolean value that is unique within the array.
items.symbol | An optional string that represents the value.
items.isDeprecated | An optional boolean that indicates if the value is no longer in usage.
items.paragraphs | An optional array of commonmark strings.

A **schema type** is based on a JSON schema.  For schema types you can provide example values (for documentation) as well as valid and invalid test cases that are used to check the json schema is performing as expected.

```javascript
  name: 'coordinate',
  title: 'Co-ordinate',
  paragraphs: ['My commonmark describing the purpose or usage of the schema type.'],
  examples: [
    { coordX: 3, coordY: 4 }
  ],
  validTestCases: [{ coordX: 5, coordY: 6 }],
  invalidTestCases: [0, 'invalid', false, [], {}],
  jsonSchema: {
    type: 'object',
    properties: {
      coordX: { type: 'number' },
      coordY: { type: 'number' }
    }
  },
  referencedSchemaTypes: [],
  referencedEnumTypes: []
```

Property Name | Description
---|---
name | A name for the schema type.
title | An optional display name for the schema type, typically prefixed with a capital letter.
paragraphs | An array of commonmark strings.
examples | An optional array of example values that conform to the json schema and demonstrate how the schema type should typically be used.
validTestCases | An optional array of values that should be accepted as valid.
invalidTestCases | An optional array of values that should be rejected as invalid.
jsonSchema | A json schema object.
referencedSchemaTypes | An optional string array naming the schema types that are referenced by the jsonSchema.
referencedEnumTypes | An optional string array naming the enum types that are referenced by the jsonSchema.

You can reference other schema types and enum types if needed.

```javascript
example of referencing schema types and enum types.
```

## Validation / Patching

When validating types, you will receive a `ValidationResult`.

You can call `getErrors` or `getWarnings` on a `ValidationResult` to get an array of `{ propertyPath, message }` objects.  The propertyPath will be a dotted path to the specific property that is the subject of the warning or error.

You can call `isSuccessful` and `isSuccessfulWithNoWarnings` to get a boolean result of the validation process.

When you validate an enum, the item values will also be checked for uniqueness.

```javascript
const { validateEnumType } from 'jsonotron'

const myEnumType = { name: 'myEnum', items: [{ value: 'apples' }, { value: 'bananas' }]}

const result = validateEnumType(myEnumType)
console.log(isSuccessful()) // true
console.log(isSuccessfulWithNoWarnings()) // false - due to missing paragraphs properties
```

## Design Decisions

I experimented with having a json validator function passed into the library.  This complicated the library and offered little benefit since a json validator is required to make Jsonotron work.  Picking a json validator means the library has no setup which is better for consumers.

## Development

Code base adheres to the rules chosen by https://standardjs.com/.  Code is formatted with 2 spaces.

Tests are written using Jest with 100% coverage.

```javascript
npm test
```

## Continuous Deployment

Any commits to master will cause the library to be re-published.
