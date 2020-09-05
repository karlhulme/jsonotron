# Jsonotron

A library for managing a JSON schema based type system.

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonotron.svg)](https://www.npmjs.com/package/jsonotron)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is a library for validating a **field block**:

```javascript
{
  planet: 'saturn',
  discovered: '1610-03-21'
}
```

Against a **field block definition**:

```javascript
{
  planet: { type: 'shortString' },
  discovered: { type: 'date' }
}
```

The `{ type: 'shortString' }` and `{ type: 'date' }` expressions are referencing JSON schemas.  There is a `jsonotron-core-field-types` library that includes lots of these.  The idea is you can then build industry/application specific types on top and re-use them across a wider system whenever you need to validate a block of fields.

A field block could define the contents of a JSON document that is being saved to a NoSQL database, or it could be the parameters to a REST API call.  Anywhere you need to define a set of fields and be able to validate them using a rich type system, Jsonotron can be used.

The library can be used to create a single type system that is used for validation at the database level (e.g. [Sengi](https://github.com/karlhulme/sengi)) all the way to the API layer.  You can produce API documentation and you can use it in the browser too.

When validation fails, you get clear errors about what went wrong, thanks to [Ajv](https://github.com/ajv-validator/ajv).  There are  Ajv plugin libraries to improve that further if you wish.  Either way you can return the errors to a consumer and they'll know how to fix their code.

## Motivation

JSON Schema already allows us to validate arbitrary blocks of JSON.  It also allows re-use by referencing external JSON schemas.  However, a system built this way becomes hard to administer because the errors are described in terms of the resultant JSON, not in terms of what you were trying to achieve by combining them.

This is where Jsonotron makes a trade-off.  **It considers each top level property of an object to be a field.**  A field can be a primitive (boolean, string, etc) or it can be a complex deeply-nested object, but the validation is always targetted at field level.

It's analogous to validating arguments passed to a method call.  You could define every method as accepting an object and then validate it using JSON Schema but you'd lose something by doing that.  Jsonotron brings this concept of individual arguments to JSON as it moves through a system.

## Installation

You can install jsonotron in the usual way.

```bash
npm install jsonotron
```

It's likely you'll want the (core field types)[https://github.com/karlhulme/jsonotron-core-field-types] and (core format validators)[https://github.com/karlhulme/jsonotron-core-format-validators].  These libraries define a bunch of core types for numbers, strings, date/times and currencies.

```bash
npm install jsonotron-core-field-types
npm install jsonotron-core-format-validators
```

## Getting Started

Suppose you have a bunch of API calls that create and read addresses and maybe you store that address in a Mongo database too.  You want to be able to validate the fields that make up an address whenever you see them.  You start by defining a Field Block Type.

```javascript
const addressFieldBlockType = {
  name: 'examples.address',
  fields: {
    addressLine1: { type: 'mediumString', isRequired: true },
    addressLine2: { type: 'mediumString' },
    town: { type: 'mediumString' },
    postCode: { type: 'shortString', isRequired: true },
    country: { type: 'countryCode', isRequired: true },
    lastPhotographed: { type: 'utcDateTime', }
  }
}
```

All the types used above (`mediumString`, `shortString`, `countryCode` and `utcDateTime`) are defined in the `jsonotron-core-field-types` library.

The `utcDateTime` field uses a format validator.  This means that additional code has to run, beyond the capabilities provided by JSON schema, to determine if a supplied value is valid.  In this case the format validator uses (moment)[https://github.com/moment/moment] to check the date and time is valid.  The one we need is defined in the `jsonotron-core-format-validators` library.

That's enough to compile our type system.

```javascript
import { compile } from 'jsonotron'
import { allEnumTypes, allSchemaTypes } from 'jsonotron-core-field-types'
import { allFormatValidators } from 'jsonotron-core-format-validators'
import { compile } from 'jsonotron'

const addressFieldBlockType { ... }

// compile the type system (typically do this on startup and save the result)
const typeSystem = compile({
  enumTypes = allEnumTypes,
  schemaTypes = allSchemaTypes,
  formatValidators = allFormatValidators,
  fieldBlockTypes = [addressFieldBlockType]
})
```

Then we can validate any address to see if it's valid.

```javascript
// here's the address we're going to validate
const candidateAddress = {
  addressLine1: '115 Acacia Avenue',
  town: 'London',
  postCode: 'W1 3AS',
  country: 'en',
  lastPhotographed: '2020-09-02T15:31:00'
}

// perform the validation
const result = typeSystem.executeFieldBlockTypeValidator('examples.address', candidateAddress)

// check the result
if (!result.validated) {
  console.log('Houston we have a problem.')
  console.log(result.errors)
}
```

## Type System

The only entry point is the `compile (resources)` method.  It expects a resources object with the properties described below.  It checks the types are valid and then builds functions that can be used for validation. 

* **enumTypes** - An array of (documented) enum type objects.
* **schemaTypes** - An array of (documented) schema type objects.
* **formatValidators** - An array of format validators.
* **fieldBlockDefinitions** - An array of field block definitions.

All these different types are defined below.

To determine if the compilation process was successful call `isSuccessful()` or `isSuccessfulWithNoErrors()`.  Both these methods return a boolean.

To convert warnings and errors into a formatted string call `toString()`.

As part of the compilation process, Jsonotron will patch all the missing fields of the various types.  It can be useful to have access to these because it saves you checking for nulls or undefineds on the optional properties.  You can access these via `getPatchedEnumTypes()`, `getPatchedSchemaTypes()` and `getPatchedFieldBlockTypes()`.

Finally, once the type system has been produced, you can execute the validator functions by calling `executeFieldTypeValidator (fieldTypeName, fieldValue)` or `executeFieldBlockTypeValidator (fieldBlockTypeName, fieldBlockValue)`.  Note that the executeFieldTypeValidator will find enum types first and then schema types second.

## Checking for Errors ##

Afer you've compiled your resources you'll get a `TypeSystem` object.

Typically, if the compilation failed you would want to stop processing.  You can call `getErrors()` and `getWarnings()` to retrieve those as an array of `{ typeName, message, details }` objects.  The structure of the `details` object varies depending on the type of error information available.

There is a convenience method `toString()` which formats the errors into a printable string.

```javascript
import { compile } from 'jsonotron'

const typeSystem = compile({ enumTypes = ['invalid!'] })

if (!typeSystem.isSuccessful()) {
  throw new Error('Compilation failed: ' + typeSystem.toString())
}
```

The code above can be used as the basis for the automated tests of your enum types, schema types and field block definitions.  You can be really strict and ensure that all types are fully documented as well.

```javascript
if (!typeSystem.isSuccessfulWithNoWarnings()) {
  throw new Error('Compilation failed: ' + typeSystem.toString())
}
```

## Defining Field Block Types

You define a Field Block Type by giving it a name and a list of field objects.  Crucially, each field object is given a type.

```javascript
const addressFieldBlockType = {
  name: 'examples.address',
  title: 'Address',
  isNullable: false,
  fields: {
    addressLine1: { type: 'mediumString', isRequired: true },
    addressLine2: { type: 'mediumString' },
    town: { type: 'mediumString', default: '' },
    postCode: { type: 'shortString', isRequired: true },
    country: { type: 'countryCode', isRequired: true },
    lastPhotographed: { type: 'utcDateTime', }
  },
  examples: [{
    value: { addressLine1: '1 Rabbit Hole', town: 'Forest', postCode: '12341' country: 'fr', lastPhotographed: '2020-09-02T16:07:00Z' },
    paragraphs: ['An example.']
  }]
}
```

Some of the libraries using Jsonotron use a higher level concept and then produce Field Block Types from that.  For example, Sengi defines Doc Types and then produces Field Block Types for the constructor, filter parameters, operation parameters, etc.

The table below describes the properties of a field block definition.

Property Name | Description
---|---
name | A name for the field block definition.
fields | An array of objects.
fields.type | The name of an enum type or a schema type.
fields.isRequired | An optional boolean that indicates if the field must be supplied. (Works the same is isGuaranteed.)
fields.isGuaranteed | An optional boolean that indicates if the field will be supplied. (Works the same is isRequired.)
fields.isNullable | An optional boolean that determines if the field can be null.
fields.isNullable | An optional boolean that determines if the field is an array of values rather than a single value.
fields.default | Any value that can be used in place of a missing field.
fields.const | If present, this field will be a constant string and the type will not be used.

## Defining Enum Types and Schema Types

The `jsonotron-core-field-types` library provides lots of useful enum types and schema types but of course you will want to provide your own.

I recommend giving your types a namespace, e.g. `examples.myType` when you name them.  This ensures they will never clash with the core types. 

A type can be an **enum type** or it can be a **schema type**.

## Enum Types

An enum type is based around a list of allowed values.  The same concept as an enum in many programming languages.  The allowed values will usually be strings but booleans are also allowed.

```javascript
const myEnumType = {
  name: 'examples.directions',
  title: 'Directions',
  paragraphs: ['My commonmark describing the purpose or usage of the enum.'],
  items: [
    { value: 'up', text: 'Up', symbol: '/\\', paragraphs: ['More documentation.'] },
    { value: 'down', text: 'Down', symbol: '\\/', isDeprecated: true, paragraphs: ['Last bit of documentation.'] }
  ]
}
```

The table below describes the properties of an enum type.

Property Name | Description
---|---
name | A name for the enum type.
title | An optional display name for the enum type, typically prefixed with a capital letter.
paragraphs | An optional array of commonmark strings.
items | An array of objects.
items.value | A string or boolean value that is unique within the array.
items.text | A string to be used as the display text.
items.symbol | An optional string that represents the value.
items.isDeprecated | An optional boolean that indicates if the value is no longer in usage.
items.paragraphs | An optional array of commonmark strings.

## Schema Types ##

A schema type is based on a JSON schema.  For schema types you can provide example values for documentation.  You can also provide valid and invalid test cases.  Jsonotron will check that the valid test cases are accepted by the json schema, and similarly that the invalid test cases are rejected by the json schema.

```javascript
const mySchemaType = {
  name: 'examples.coordinate',
  title: 'Co-ordinate',
  paragraphs: ['My commonmark describing the purpose or usage of the schema type.'],
  examples: [
    { value: { coordX: 3, coordY: 4 }, paragraphs: ['This example shows...'] }
  ],
  validTestCases: [{ coordX: 5, coordY: 6 }],
  invalidTestCases: [0, 'invalid', false, [], {}],
  jsonSchema: {
    type: 'object',
    properties: {
      coordX: { type: 'number' },
      coordY: { type: 'number' }
    }
  }
}
```

When defining the JSON schema you can use any of the JSON Schema Draft 7 capabilities as implemented by Ajv.

A schema type can reference external enum types and schema types too using the `{ $ref: '#/definitions/<typeName>' }` expression.  You don't need to plug in the actual definition because Jsonotron will do that for you.

```javascript
const mySchemaTypeWithExternalRefs = {
  name: 'examples.typeWithExternalRef',
  jsonSchema: {
    type: 'object',
    properties: {
      localField: { type: 'number' },
      externalSchemaTypeField: { $ref: '#/definitions/externalSchemaType' },
      externalEnumTypeField: { $ref: '#/definitions/externalEnumType' }
    }
  }
}
```
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

You can reference other schema types and enum types as needed.

## Format Validators

A format validator is a function that tests whether a given string adheres to a known format.  For example, a credit card number is a string but it has a specific format.  A JSON schema can use the `format` keyword to reference custom validation and this is how you plug that custom code into Jsonotron.  

The example below shows the format validator that uses the moment library to ensure a utc date time is formatted correctly.

```javascript
export const localDateTime = {
  name: 'jsonotron-local-date-time',

  validate: function (v) {
    return moment(v, 'YYYY-MM-DD[T]HH:mm:ssZZ', true).isValid() && !v.toLowerCase().endsWith('z')
  }
}
```

To reference the above formatter from a Schema Type, you include the format validator name as the name property.  The example below is a cut down version of the utcDateTime type.

```javascript
export const dateTimeUtc = {
  name: 'dateTimeUtc',
  jsonSchema: {
    type: 'string',
    format: 'jsonotron-utc-date-time' // notice this is the same 'name' property used when defining the format validator.
  }
}
```

The format validators shipped with Jsonotron are prefixed with `jsonotron-`.

I recommend you prefix your format validators with a company name or similar.

The table below describes the properties of a format validator.

Property Name | Description
---|---
name | A name for the format validator.
validate | A function (value) that returns true if the given value is valid, otherwise it returns false.

## Additional Exports

The following functions are also exported from the library as a convenience for libraries that are using Jsonotron as a base for further validation.

Export Name | Description
---|---
deepClone | Returns a deep cloned copy of the given object.  The clone is performed by converting the given object to a JSON string and back to an object.
pascalCaseToTitleCase | Returns the given string converted into title case.  For example, "helloWorld" becomes "Hello World".
createCustomisedAjv | Creates an instance of AJV with full format validation, support for the customTypeOf keywords and support for the given formatValidators.
ValidationResult | Represents the result of a validation attempt.  This object has methods for adding warnings and errors and then helper methods for determining if the validation process was successful or not.

## Design Decisions

Externally you use the `compile` function and this returns a `TypeSystem` which includes all the artefacts and errors/warnings.  Internally, we go through several distinct processes:

 * **Validation** is the process of checking that the enumType, schemaType, formatValidators and fieldBlockDefinitions have valid properties.  We're looking at the property names and the property types.  We do NOT check the values (e.g. the schema type example values) at this stage.
 * **Patching** is the process of adding defaults for any of the properties not supplied.  Once done, the library doesn't have to check for nulls or undefineds.
 * **Schema Generation** is the process of generating a new JSON schema from a enumType, schemaType or fieldBlockDefinition. 
 * **Schema Compilation** is the process of converting a generated JSON schema into a validator method.
 * **Verification** is the process of checking the example values using the validator method.

I experimented with having a json validator function passed into the library.  This complicated the library and offered little benefit since a json validator is required to make Jsonotron work.  Picking a json validator means the library has no setup which is better for consumers.

Field Block Definitions cannot contain other Field Block Definitions.  I don't know if this desirable or workable.

The executeXYZValidator functions do not raise Errors because validation is expected to regularly fail.  It's not an exception to the method contract.

The Jsonotron library includes properties that are intended to document the types.  Without this documentation the primitives are not considered to be completely defined.  This only applies to enumTypes and schemaTypes.  It doesn't apply to fieldBlockDefinitions because these should be created from some higher level concept (such as docType or apiResourceType).  This is because recording an error for a FieldBlockDefinition will be hard to understand since the FieldBlockDefinition.name is probably produced in code.

## Development

Code base adheres to the rules chosen by https://standardjs.com/.  Code is formatted with 2 spaces.

Tests are written using Jest with 100% coverage.

```javascript
npm test
```

## Continuous Deployment

Any pushes or pull-requests on non-master branches will trigger the test runner.

Any pushes to master will cause the library to be re-published.
