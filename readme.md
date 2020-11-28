# Jsonotron

Jsonotron is a language-independent type system used for **documenting** and **validating** a set of fields - a structure.

For users trying to supply valid data, validation can become annoying if the requirements are not clear before hand.  Therefore Jsonotron demands that documentation is written at the same time as the types.

It's based on [JSON schema](https://json-schema.org/), which is a super expressive way to control the shape of JSON snippets

We can validate YAML files too, because YAML is a superset of JSON.

## Example

This is an example **structure**:

```json
{
  "name": "planet",
  "fields": {
    "planetName": { "type": "shortString", "isRequired": true, "documentation": "The name of a planet in our solar system." },
    "discovered": { "type": "date", "isRequired": true, "documentation": "The date the planet was discovered." }
  }
}
```

And this is a value that would validate successfully against the above definition:

```json
{
  "planetName": "saturn",
  "discovered": "1610-03-21"
}
```

## Motivation

A language-independent type system for validating structures is useful in the following circumstances:

* It works great for messages being sent to a RESTful API.  The use of JSON schema means that it fits into Swagger/OpenAPI definitions.

* It works great for document-based storage systems like MS Azure, AWS DynamoDB and Mongo.  You can use Jsonotron to ensure your documents have a valid shape before persisting them.

* It works great for producing documentation because the documentation is tied directly to the types where they are used.

## Getting Started

You will need a library that is capable of loading both the jsonotron standard types and your bespoke types and then using them to validate structures.

* **NodeJS**: [jsonotron-js](https://github.com/karlhulme/jsonotron-js)

## Types

Each field in a structure has a designated type, either an **Enum** type or a **Schema** type.

* An **Enum** type is a set of string values. Most languages have an enum construct of some kind.  For example, `dayOfWeek` defines `monday`, `tuesday`, `wednesday` etc.

* A **Schema** type is a JSON schema definition.  The definition can utilise enum types and other schema types.  For example,  `money` references the `integer` schema type and the `currencyCode` enum type.

Typically you'll need to define your own types for your specific use cases.  However, there are some common types (like currency and date time) that many domains need.  For this, Jsonotron supplies a standard type library.

### Jsonotron Standard Type Library

Jsonotron defines a library of standard types.

Category | Types
--- | ---
Enum Types | callingCode, countryCode, currencyCode, dayOfWeek, monthOfYear, yesNo
Schema Types | address, boolean, date, dateTimeLocal, dateTimeUtc, emailAddress, float, geoJsonPoint, geoJsonPolygon, hugeString, integer, ipv4, ipv6, jsonPointer, longString, mediumString, money, negativeFloat, negativeFloatOrZero, negativeInteger, negativeIntegerOrZero, object, paymentCardNo, positiveFloat, positiveFloatOrZero, shortString, string, telephoneNo, time, timestamp, uuid, webAddress, what3words

The following rules apply to making changes to these core types to avoid breaking code:

* Enum and schema type names cannot be changed.
* Enum items can be deprecated but never removed or renamed.
* New enum items can be added.
* An optional field can be added to a schema type.
* A required fields cannot be added to a schema type.  Evolve a new type, e.g. `address` becomes `address2`.

## Folders

This repo is organised as follows:

Folder Name | Description
--- | ---
schemas | The JSON schemas that can be used to ensure validity of the enum and schema types.  There is also a json schema for validating a struct.
types > enumTypes | One file for each enum type.
types > schemaTypes | One file for each schema type.

Implementations of Jsonotron will typically need a pre-build step that pulls the types and schemas from the folder in this repo.

## Why not just use JSON schema

JSON Schema already allows us to validate arbitrary blocks of JSON.  It also allows re-use by referencing external JSON schemas.  However, a system built this way becomes hard to administer because the errors are described in terms of the resultant JSON, and those referenced files.

This is where Jsonotron makes a trade-off.  **Jsonotron considers each top level property of an object to be a field.**  A field can be a primitive (boolean, string, etc) or it can be a complex deeply-nested object, but the validation is always targetted at field level.

It's analogous to validating arguments passed to a method call.  You could define every method as accepting an object and then validate it using JSON Schema but you'd lose something by doing that.  Jsonotron brings this concept of individual arguments to JSON as it moves through a system.

## Defining a Structure

You define a Structure by giving it a name and a list of fields.  

Property Name | Description
---|---
name | A name for the field block definition.
fields | An array of objects.
fields.type | The name of an enum type or a schema type.
fields.const | If present, this field will be a constant string and the type will not be used.
fields.isRequired | An optional boolean that indicates if the field must be supplied.
fields.isNullable | An optional boolean that determines if the field can be null.
fields.isArray | An optional boolean that determines if the field is an array of values rather than a single value.

Here as an example Structure that describes an offer for a piece of real estate:

```json
{
  "name": "examples.propertyOffer",
  "fields": {
    "location": { "type": "address", "isRequired": true, "documentation": "The address of a property." },
    "valuation": { "type": "money", "documentation": "The amount offered for the property." },
    "userId": { "type": "uuid", "documentation": "The id of the user that made the offer." },
    "lastPhotographed": { "type": "utcDateTime", "documentation": "The date and time that the address was last photographed." }
  }
}
```

Notice that we're leveraging the standard fields to reduce a lot of clutter.  The `address` and `money` schema types handle the complexity of pin-pointing an address and describing an amount of money in a specific currency.  The `utcDateTime` denotes a particular point in time in a timezone independent way.

Some of the libraries using Jsonotron use a higher level concept and then produce Structures from that.  For example, Sengi defines a Doc Type and then produces a Structure for the constructor, filter parameters, operation parameters, etc.

## Defining an Enum Type

An Enum is really just a set of strings.

Property Name | Description
---|---
name | A name for the enum type.
title | An optional display name for the enum type, typically prefixed with a capital letter.
documentation | A commonmark description of the enum.
items | An array of objects.
items.value | A string value that is unique within the array.
items.text | A string to be used as the display text.
items.symbol | An optional string that represents the value.
items.deprecated | If populated, this enum item has been deprecated and this property provides additional information such as which enum item to use instead.
items.documentation | An optional commonmark description of the enum value.

Here's an example:

```json
{
  "name": "examples.directions",
  "title": "Directions",
  "documentation": "My commonmark describing the purpose or usage of the enum.",
  "items": [
    { "value": "up", "text": "Up", "symbol": "/\\", "documentation": "The up direction." },
    { "value": "down", "text": "Down", "symbol": "\\/", "documentation": "The down direction." }
  ]
}
```

## Defining a Schema Type

A schema type is primarily based on a JSON schema.

Property Name | Description
---|---
name | A name for the schema type.
title | An optional display name for the schema type, typically prefixed with a capital letter.
documentation | A commonmark description of the schema type.
examples | An optional array of example values that conform to the json schema and demonstrate how the schema type should typically be used.
examples.value | An example value
examples.documentation | A commonmark description of the example.
validTestCases | An optional array of values that should be accepted as valid.
invalidTestCases | An optional array of values that should be rejected as invalid.
jsonSchema | A json schema object.

```json
{
  "name": "examples.coordinate",
  "title": "Co-ordinate",
  "documentation": "My commonmark describing the purpose or usage of the schema type.",
  "examples": [
    { "value": { "coordX": 3, "coordY": 4 }, "documentation": "This example shows..." }
  ],
  "validTestCases": [{ "coordX": 5, "coordY": 6 }],
  "invalidTestCases": [0, "invalid", false, [], {}],
  "jsonSchema": {
    "type": "object",
    "properties": {
      "coordX": { "type": "number" },
      "coordY": { "type": "number" }
    }
  }
}
```

When defining the JSON schema you can use any of the JSON Schema capabilities.  Implementations of Jsontron will use different json schema engines and so support may vary.

A schema type can reference external enum types and schema types using the `{ $ref: '#/definitions/<typeName>' }` expression.  You don't need to plug in the actual definition because Jsonotron will do that for you.

```json
{
  "name": "examples.typeWithExternalRef",
  "jsonSchema": {
    "type": "object",
    "properties": {
      "localField": { "type": "number" },
      "externalSchemaTypeField": { "$ref": "#/definitions/externalSchemaType" },
      "externalEnumTypeField": { "$ref": "#/definitions/externalEnumType" }
    }
  }
}
```

## Format Validators

A format validator is a function that tests whether a given string adheres to a known format and returns either true of false, e.g. `(s: string) => boolean`.

For example, a credit card number is a string but it has a specific format known as Luhn.  A JSON schema can use the `format` keyword to reference custom validation.

Jsonotron assumes the presence of the following bespoke formatters:

Formatter Name | Implementation
--- | ---
jsonotron-dateTimeUtc | Expect valid date time in this format `2010-01-01T12:00:00Z`.  The value should always end in a Z and should not include a time zone offset. Leading zeroes are required if any values are less than 10.
jsonotron-dateTimeLocal | Expect valid date time in this format `2010-01-01T12:00:00+01:00`  The value should always end in a timezone offset which is +HH:mm. Leading zeroes are required if any values are less than 10.
jsonotron-luhn | Implementation of the luhn alrogithm.

## Design Decisions

Jsonotron does not dictate the API of a Jsonotron validating engine.  This frees each implementation to conform to the best practices of the language.

The definitions are stored as YAML (rather than JSON) for two reasons:

  1. Comments are supported in YAML with a `#` prefix.
  2. Strings can be spread over multiple lines using `|-` prefix.

## Development

A NodeJS project exists to check that the types stored in the repo conform to the JSON schemas in the `schemas` folder.

To run the tests:

```bash
npm install
npm test
```

## Continuous Deployment

Any pushes or pull-requests on non-master branches will trigger the test runner.

Any pushes to master will cause a release to be created on Github.
