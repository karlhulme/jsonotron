# Jsonotron

Jsonotron is a way of describing your own type system for JSON data.

Jsonotron takes [JSON schema](https://json-schema.org/) and adds documentation, test cases and enumerations.

  * Documentation provides a mechanism to capture detailed information on a type's usage.  This includes examples which make it quick to see how a type should be used.  This can be built into a documentation website too.
  * The test cases provide values of the type that should be considered valid and samples that should not.  A Jsonotron runtime will check that your type is enforcing the constraints as you expect.
  * Enumerations are defined in a dedicated JSON format (rather than JSON schema) so that we can pair an underlying value with additional properties like display text, symbol and deprecation information.

## JSL

This repo includes a set of commonly required types called the `Jsonotron Standard Library` or `JSL` for short.

There are numbers and strings of various lengths.  There are dates and times in a fixed-length format.  There is a money type that incorporates currency and ensures any figures are stored as integers and not floats.

You can define your own but the JSL is a good starting point and all the types are [documented here](https://github.com/karlhulme/jsonotron/blob/master/systems/jsl/docs.autogen.md)

## Motivation

Non-trivial applications will need to process JSON data at some point.  Either on the wire in the form of REST API calls or perhaps in storage via a document-based database such as Mongo, Cosmos or DynamoDB.

Jsonotron provides a language independent way to specify the types that you want to use in a specific microservice.

We then have various components in the ecosystem:

  * [Sengi](https://github.com/karlhulme/sengi) is the foundation of a document-based data service where the table/document definitions are entirely based within code.  Sengi uses the types to define table structures and update messages, to produce documentation and generate downstream formats like GraphQL schema for client library generation.
  * [---] can be used define REST API messages.  --- uses the types to produce API documentation and validate inbound messages before processing.

## Implementations

* **NodeJS**: [Jsonotron-JS](https://github.com/karlhulme/jsonotron-js)

## Types

Each field in a structure has a designated kind, either an **Enum** type or a **Schema** type.

* An **Enum** type is a set of string values.  Most languages have an enum construct of some kind.  For example, `dayOfWeek` defines `monday`, `tuesday`, `wednesday` etc.

* A **Schema** type is a JSON schema definition.  The definition can utilise enum types and other schema types.  For example,  `money` references the `integer` schema type and the `currencyCode` enum type.

Typically you'll need to define your own types for your specific use cases.  However, there are some common types (like currency and date time) that many domains need.  For this, Jsonotron supplies a standard type library.

## Defining an Enum Type

An Enum is really just a set of strings.

Property Name | Description
---|---
kind | Must be the value 'enum'.
domain | The domain that represents the owner of the type.
system | The name of the type system that this type belongs to.
name | A name for the enum type.
title | A display name for the enum type.
documentation | A commonmark description of the enum.
items | An array of objects.
items.value | A string value that is unique within the array.
items.text | A string to be used as the display text.
items.symbol | An optional string that represents the value.
items.deprecated | If populated, this enum item has been deprecated and this property provides additional information such as which enum item to use instead.
items.documentation | An optional commonmark description of the enum value.

Here's an example:

```yaml
---
kind: enum
domain: https://yourdomain.com
system: system
name: directions
title: Directions
documentation: My commonmark describing the purpose or usage of the enum.
items:
- value: up
  text: Up
  symbol: "/\\"
  documentation: The up direction.
- value: down
  text: Down
  symbol: "\\/"
  documentation: The down direction.
```

## Defining a Schema Type

A schema type is primarily based on a JSON schema.

Property Name | Description
---|---
kind | Must be the value 'schema'.
domain | The domain that represents the owner of the type.
system | The name of the type system that this type belongs to.
name | A name for the schema type.
title | A display name for the schema type.
documentation | A commonmark description of the schema type.
examples | An array of example values that conform to the json schema and demonstrate how the schema type should typically be used.  At least one example must be provided.
examples.value | An example value
examples.documentation | A commonmark description of the example.
validTestCases | An array of values that should be accepted as valid.
invalidTestCases | An array of values that should be rejected as invalid.
jsonSchema | A JSON schema object following the JSON schema specification.

```yaml
---
kind: enum
domain: https://yourdomain.com
system: system
name: coordinate
title: Co-ordinate
documentation: My commonmark describing the purpose or usage of the schema type.
examples:
- value:
    coordX: 3
    coordY: 4
  documentation: This example shows...
validTestCases:
- coordX: 5
  coordY: 6
invalidTestCases:
- 0
- invalid
- false
- []
- {}
jsonSchema:
  type: object
  properties:
    coordX:
      type: number
    coordY:
      type: number
```

When defining the JSON schema you can use any of the JSON Schema capabilities.  Implementations of Jsontron will use different json schema engines and so support may vary.

A schema type can reference external enum types and schema types using the `{ $ref: '<typeName>' }` expression.  You can use the fully qualified name such as `http://yourdomain.com/system/<typeName>` or the short name if they are both part of the same system.

```yaml
---
kind: enum
domain: https://yourdomain.com
system: system
name: typeWithExternalRef
jsonSchema:
  type: object
  properties:
    localField:
      type: number
    externalSchemaTypeField:
      "$ref": https://yourdomain/system/exteralSchemaType
    externalEnumTypeField:
      "$ref": externalEnumType
```

## Format Validators

A format validator is a function that tests whether a given string adheres to a known format and returns either true of false, e.g. `(s: string) => boolean`.

For example, a credit card number is a string but it has a specific format known as Luhn.  A JSON schema can use the `format` keyword to reference custom validation.

Jsonotron assumes the presence of the following bespoke formatters and a compliant Jsonotron runtime should provide them.

Formatter Name | Implementation
--- | ---
jsonotron-dateTimeUtc | Expect valid date time in this format `2010-01-01T12:00:00Z`.  The value should always end in a Z and should not include a time zone offset. Leading zeroes are required if any values are less than 10.
jsonotron-dateTimeLocal | Expect valid date time in this format `2010-01-01T12:00:00+01:00`  The value should always end in a timezone offset which is +HH:mm. Leading zeroes are required if any values are less than 10.
jsonotron-luhn | Implementation of the luhn alrogithm.

In addition, a Jsonotron runtime should allow you to provide custom formatters of your own which you can then reference in your own schema types.

## Sharing a Type System

The `./scripts/jsl-download.sh` script downloads a release JSL from a github repo and extracts the enum and schema types into a folder.  You can take the same approach and then abuse this script to achieve the same thing with your own type systems.  Typically you'll want to set this up as a command line you can run when you want to bring in the types.  Those downloaded types should be committed to your repo.

By creating a type system, typically in a separate repo, it becomes easier to share those types across multiple services within your organisation.  This can lead to time saving when documenting those types and ensures consistency when those services communicate.  This approach works well for small granular types (like those found in the JSL) and small common types that are used repeatedly throughout your services.

Be wary of trying to share every type though.  This will typically lead to services being bound together by types where contextually they should be able to evolve independently.  Assume that you will probably end up with multiple type systems representing different bounded contexts.  Remember a single service can pull types from multiple services.

## JSL Change Process

To avoid breaking code, The following rules are applied to proposed changes to the core types:

* Enum and schema type names cannot be changed.
* Enum items can be deprecated but never removed or renamed.
* New enum items can be added.
* An optional field can be added to a schema type.
* A required field cannot be added to a schema type.  Evolve a new type, e.g. `address` becomes `address2`.

Any change will always result in a new release.

## Why not just use JSON schema?

JSON Schema already allows us to validate arbitrary blocks of JSON.  It also allows re-use by referencing external JSON schemas.  However, a system built this way becomes hard to administer because the errors are described in terms of the resultant JSON, and those referenced files.

This is where Jsonotron makes a trade-off.  **Jsonotron considers each top level property of an object to be a field.**  A field can be a primitive (boolean, string, etc) or it can be a complex deeply-nested object, but the validation is always targetted at field level.

It's analogous to validating arguments passed to a method call.  You could define every method as accepting an object and then validate it using JSON Schema but you'd lose something by doing that.  Jsonotron brings this concept of individual arguments to JSON as it moves through a system.

## Why not use GraphQL?

Use this is as downstream format via tools, converting from JSON schema to GQL.

## Design Decisions

Jsonotron does not dictate the API of a Jsonotron validating engine.  This frees each implementation to conform to the best practices of the language.

The definitions are stored as YAML (rather than JSON) for two reasons:

  1. Comments are supported in YAML with a `#` prefix.
  2. Strings can be spread over multiple lines making the documentation easier to read and write.

Jsonotron enforces seperate fields for `domain`, `system` and `name` on each type.  This allows documentation to be built with appropriate headers for the key components of the system.  A single URI could not unambiguously unpicked. 

## Development

A NodeJS project exists to check that the types stored in the `./systems/jsl` folder can be processed by the [Jsonotron-JS](https://github.com/karlhulme/jsonotron-js) engine.

To run the tests:

```bash
npm install
npm test
```

## Continuous Deployment

Any pushes or pull-requests on non-master branches will trigger the test runner.

Any pushes to master will cause a release to be created on Github.
