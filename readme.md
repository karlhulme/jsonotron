# Jsonotron

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonotron.svg)](https://www.npmjs.com/package/jsonotron)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is a library for validating a **field block**.

```javascript
{
  planet: 'saturn',
  discovered: '1610-03-21'
}
```

Field blocks are validated against a **field block definition**.

```javascript
{
  planet: { type: 'shortString' },
  discovered: { type: 'date' }
}
```

The `{ type: 'shortString' }` and `{ type: 'date' }` expressions are referencing JSON schemas.  There is a `jsonotron-core-field-types` library that includes lots of these.  The idea is you can then build industry/application specific types on top and re-use them across a wider system whenever you need to validate a block of fields.

A field block could define the contents of a JSON document that is being saved to a NoSQL database, or it could be the parameters to a REST API call.  Anywhere you need to define a set of fields and be able to validate them using a rich type system, Jsonotron can be used.

The library can be used to create a single type system that is used for validation at the database level (e.g. [Sengi](https://github.com/karlhulme/sengi)) all the way to the API layer.  You can produce API documentation and you can use it in the browser too.

When validation fails, you get clear errors about what went wrong, thanks to [Ajv](https://github.com/ajv-validator/ajv).  There are Ajv plugin libraries to improve that further if you wish.  Either way you can return the errors to a consumer and they'll know how to fix their code.

## Motivation

JSON Schema already allows us to validate arbitrary blocks of JSON.  It also allows re-use by referencing external JSON schemas.  However, a system built this way becomes hard to administer because the errors are described in terms of the resultant JSON, and those referenced files.

This is where Jsonotron makes a trade-off.  **Jsonotron considers each top level property of an object to be a field.**  A field can be a primitive (boolean, string, etc) or it can be a complex deeply-nested object, but the validation is always targetted at field level.

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

First you need to instantiate a new Jsonotron and tell it about the types you want to use.

```javascript
import { Jsonotron } from 'jsonotron'
import { allEnumTypes, allSchemaTypes } from 'jsonotron-core-field-types'
import { allFormatValidators } from 'jsonotron-core-format-validators'

const jsonotron = new Jsonotron({
  enumTypes: allEnumTypes,
  schemaTypes: allSchemaTypes,
  formatValidators: allFormatValidators
})
```

Now suppose you have a bunch of API calls that create and read addresses and maybe you store those addresses in a Mongo database too.  You want to be able to validate the fields that make up an address whenever you see them.  You start by defining a Field Block Definition.

```javascript
const addressFieldBlockDefinition = {
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

All the types used above (`mediumString`, `shortString`, `countryCode` and `utcDateTime`) are defined in the `jsonotron-core-field-types` library.  We already told Jsonotron about those in the constructor, along with lots of others.

The `utcDateTime` field uses a format validator.  This means that additional code has to run, beyond the capabilities provided by JSON schema, to determine if a supplied value is valid.  In this case the format validator uses (moment)[https://github.com/moment/moment] to check the date and time is valid.  The one we need is defined in the `jsonotron-core-format-validators` library and was also supplied to the constructor.

We tell Jsonotron to compile our field block definition.

```javascript
jsonotron.compileFieldBlockDefinition(addressFieldDefinition)
```

Now we can validate any address to see if it's valid.

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
const result = jsonotron.validateFieldBlock('examples.address', candidateAddress)

// check the result
if (!result.validated) {
  console.log('Houston we have a problem.')
  console.log(result.errors)
}
```

## Constructor

To create a Jsonotron you tell it about the types you want to support.

* **enumTypes** - An array of (documented) enum type objects.
* **schemaTypes** - An array of (documented) schema type objects.
* **formatValidators** - An array of format validators.
* **validateDocs** - True if missing documentation should cause initialisation to fail.  (Default = false)

All these different types are defined below.

If the supplied types (or format validators) are not valid, then a `JsonotronInitialisationError` will be thrown.  Check the `error` properties for details.

As part of the initialisation process, Jsonotron will patch all the missing fields of the various types.  It can be useful to have access to these because it saves you checking for nulls or undefineds on the optional properties.  You can access these via `getPatchedEnumTypes()` and `getPatchedSchemaTypes()`.

## Validate Field Values

You can then validate individual fields.

`validateFieldValue (fieldTypeName, value) => (recognised, validated, errors)`

The `recognised` value indicates whether a validator was found.  If you specify a fieldTypeName that wasn't supplied to the constructor then this value will be false.

The `validated` value indicates if the value is valid or not.

The `errors` value is an array of errors (or null) supplied by Ajv when the validation or compilation fails.

## Validate Field Blocks

You can compile field blocks definitions.

`compileFieldBlockDefinition (fieldBlockDefinition)`

If the supplied field block definition is not valid, then a `JsonotronFieldBlockDefinitionCompilationError` will be thrown.  Check the `error` properties for details.

You can then validate a field block.

`validateFieldBlock (fieldBlockDefinitionName, value) => (recognised, validated, errors)`

The `recognised` value indicates whether a validator was found.  If you specify a fieldBlockDefinitionName that hasn't previously been supplied to compileFieldBlockDefinition then this value will be false.

The `validated` value indicates if the value is valid or not.

The `errors` value is an array of errors (or null) supplied by Ajv when the validation or compilation fails.

## Field Block Definitions

You define a Field Block Definition by giving it a name and a list of field objects.  Crucially, each field object must be given a type.

```javascript
const addressFieldBlockDefinition = {
  name: 'examples.address',
  fields: {
    addressLine1: { type: 'mediumString', isRequired: true },
    addressLine2: { type: 'mediumString' },
    town: { type: 'mediumString', default: '' },
    postCode: { type: 'shortString', isRequired: true },
    country: { type: 'countryCode', isRequired: true },
    lastPhotographed: { type: 'utcDateTime', }
  }
}
```

Some of the libraries using Jsonotron use a higher level concept and then produce Field Block Definitions from that.  For example, Sengi defines Doc Types and then produces Field Block Definitions for the constructor, filter parameters, operation parameters, etc.

The table below describes the properties of a field block definition.

Property Name | Description
---|---
name | A name for the field block definition.
fields | An array of objects.
fields.type | The name of an enum type or a schema type.
fields.isRequired | An optional boolean that indicates if the field must be supplied. (Works the same is isGuaranteed.)
fields.isNullable | An optional boolean that determines if the field can be null.
fields.isArray | An optional boolean that determines if the field is an array of values rather than a single value.
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

A schema type can reference external enum types and schema types using the `{ $ref: '#/definitions/<typeName>' }` expression.  You don't need to plug in the actual definition because Jsonotron will do that for you.  If you reference a enum type or schema type that is not supplied to the Jsonotron constructor then the initialisation will fail.

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
JsonotronFieldBlockDefinitionCompilationError | An error thrown when the compilation of a field block definition fails.
JsonotronInitialisationError | An error thrown when the initialisation (construction) of a Jsonotron object fails.
createTypeProcError | Creates an object with typeName, message and details properties.
deepClone | Returns a deep cloned copy of the given object.  The clone is performed by converting the given object to a JSON string and back to an object.
JSON_SCHEMA_DECLARATION | The json schema declaration value.
JSON_SCHEMA_DEFINITIONS_PATH | The path where definitions are placed with a JSON schema.
pascalCaseToTitleCase | Returns the given string converted into title case.  For example, "helloWorld" becomes "Hello World".
createCustomisedAjv | Creates an instance of AJV with full format validation, support for the customTypeOf keywords and support for the given formatValidators.

## Design Decisions

Internally, we go through several distinct processes during initialisation:

 * **Validation** is the process of checking that the enumType, schemaType and formatValidators have valid properties.  We're looking at the property names and the property types.  We do NOT check the values (e.g. the schema type example values) at this stage.
 * **Patching** is the process of adding defaults for any of the properties not supplied.  Once done, the library doesn't have to check for nulls or undefineds.
 * **Schema Generation** is the process of generating a new JSON schema from each enumType and schemaType. 
 * **Schema Compilation** is the process of converting a generated JSON schema into a validator method.
 * **Verification** is the process of checking the example values using the validator method.

When a field block definition is compiled the library goes through the same steps.

I experimented with having a json validator function passed into the library.  This complicated the library and offered little benefit.  Picking a json validator makes it easier for the library to aggregate errors and work with errors.

Field Block Definitions cannot contain other Field Block Definitions.  I don't know if this desirable or workable.

The executeXYZValidator functions do not raise Errors because validation is expected to regularly fail.  It's not an exception to the method contract.

The Jsonotron library includes properties that are intended to document the types.  Without this documentation the primitives are not considered to be completely defined.  This only applies to enumTypes and schemaTypes.  It doesn't apply to fieldBlockDefinitions because these are expected to be created from some higher level concept (such as docType or apiResourceType).

## Development

Code base adheres to the rules chosen by https://standardjs.com/.  Code is formatted with 2 spaces.

Tests are written using Jest with 100% coverage.

```javascript
npm test
```

## Continuous Deployment

Any pushes or pull-requests on non-master branches will trigger the test runner.

Any pushes to master will cause the library to be re-published.
