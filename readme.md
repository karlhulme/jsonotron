# A property type system for Javascript based on JSON schemas.

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonotron.svg)](https://www.npmjs.com/package/jsonotron)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is a library for validating **field blocks**, where each field type is defined by a **JSON schema**.

A field block could define the contents of JSON document that is being saved to a NoSQL database.  Or it could be the parameters to a REST API call.

## Overview

Suppose you wanted to define a field block for an address.

```javascript
const addressFieldBlock = {
  addressLine1: { type: 'mediumString', isRequired: true },
  addressLine2: { type: 'mediumString' },
  town: { type: 'mediumString' },
  postCode: { type: 'ukPostcode', isRequired: true },
  country: { type: 'countryCode', isRequired: true }
}
```

Notice that each field is given a type.  A type can be an enum type or it can be a schema type.

An **enum type** is based around a list of allowed values.  The same concept as an enum in many programming languages.  The allowed values will usually be strings but booleans are also allowed.  When you define it, you can also provide all the documentation for it.

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

A **schema type** is based on a JSON schema.  For schema types you can provide example values for documentation.  You can also provide valid and invalid test cases.  Jsonotron will check that the valid test cases are accepted by the json schema, and similarly that the invalid test cases are rejected by the json schema.

```javascript
{
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
}
```

When defining the JSON schema you can use any of the JSON Schema Draft 7 capabilities as implemented by https://ajv.js.org/.

A schema type can reference external enum types and schema types too using the `{ $ref: '#/definitions/<typeName>' }` expression.

```javascript
  name: 'typeWithExternalRef',
  jsonSchema: {
    type: 'object',
    properties: {
      localField: { type: 'number' },
      externalSchemaTypeField: { $ref: '#/definitions/externalSchemaType' },
      externalEnumTypeField: { $ref: '#/definitions/externalEnumType' }
    }
  },
  referencedSchemaTypes: ['externalSchemaType'],
  referencedEnumTypes: ['externalEnumType']
```

You can check that your enum types and schema types are valid.  The example below shows validating an enum type, but the process is identical for schema types.  Note schema types are only validated for basic form.  To check json schemas are valid and that all external references are resolved, see validateTypeSystem below.

```javascript
import { validateEnumType } from 'jsonotron'
const myEnumType = { ... }

const validationResult = validateEnumType(myEnumType)

if (!validationResult.isSuccessfulWithNoWarnings()) {
  console.log(JSON.stringify(validationResult.toObject(), null, 2))
}
```

You can validate a complete type system.

```javascript
import { validateTypeSystem } from 'jsonotron'
const enumTypes = [{ ... }]
const schemaTypes = [{ ... }]
const formatValidators = [{ ... }]

const validationResult = validateTypeSystem(enumTypes, schemaTypes, formatValidators)

if (!validationResult.isSuccessfulWithNoWarnings()) {
  console.log(JSON.stringify(validationResult.toObject(), null, 2))
}
```
## Installation

```bash
npm install jsonotron
```

There are lots of common enum types, schema types and format validators already defined in `jsonotron-type-library` and `jsonotron-fv-library`.

## Enum Types

The table below describes the properties of an enum type.

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

## Schema Types

The table below describes the properties of a schema type.

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

## Format Validators

A format validator is a function that tests whether a given string adheres to a known format.  For example, a credit card number is a string but it has a specific format.  A JSON schema can use the `format` keyword to reference custom validation and this is how you plug that custom code into Jsonotron.  

The table below describes the properties of a format validator.

Property Name | Description
---|---
name | A name for the format validator.
validate | A function (value) that returns true if the given value is valid, otherwise it returns false.

## Validation Result

When validating types (by calling `validateEnumType` or `validateSchemaType`) you will receive a `ValidationResult` object.

You can call `getErrors` or `getWarnings` on a `ValidationResult` to get an array of `{ typeName, message, details }` objects.

You can call `isSuccessful` and `isSuccessfulWithNoWarnings` to get a boolean result of the validation process.  Warnings refer to missing documentation.

When you validate an enum, the item values will also be checked for uniqueness.

## Design Decisions

I experimented with having a json validator function passed into the library.  This complicated the library and offered little benefit since a json validator is required to make Jsonotron work.  Picking a json validator means the library has no setup which is better for consumers.

Internal dependencies run as shown below.  This is why the createCustomisedAjv and ValidationResult currently sit in the *./src/utils* folder.
```
typeSystem > enumType & schemaType & jsonSchemaGeneration > utils
```

## Development

Code base adheres to the rules chosen by https://standardjs.com/.  Code is formatted with 2 spaces.

Tests are written using Jest with 100% coverage.

```javascript
npm test
```

## Continuous Deployment

Any commits to master will cause the library to be re-published.
