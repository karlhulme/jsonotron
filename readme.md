# Jsonotron

A NodeJS service implementation for verifying JSON schemas and converting and distributing language-specific wrappers to be used by other micro-services.

Jsonotron is most useful when you have non-trivial data structures that are used by multiple back-end services and you want to avoid duplicating and maintaining the same definitions (and their accompanying validators and deserialisers) in multiple places.

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
![npm type definitions](https://img.shields.io/npm/types/typescript)

With Jsonotron, you define and host the schemas for your API messages, your NoSQL documents or any other JSON-based structure in one place, in a language independent manner.  Micro-services then import strongly typed validators and deserialisers, along with base data (enums) that needs to be available at compile-time, in the desired programming language.


## Examples

A micro-service that needs to process inbound API messages can import language-specific validators and deserialises to check the incoming payloads.

A micro-service that wraps a NoSQL database can import the JSON schemas to verify objects prior to saving them.

A GraphQL service can populate the query and input types that define the graph.

A website can import base data to use for conditional checks with a decent development experience or it can use the data to populate drop-downs.


## Benefits

By storing the schemas in one place you avoid a lot of duplication.

A dedicated "type service" offers the following benefits:


### Authoring Experience (verified on service startup)

* Check all JSON schemas for validity.
* Check all JSON schemas adhere to valid and invalid test cases.
* Check all JSON schemas have examples and documentation.
* Check all base data (enums) for validity.
* Check all base data meta-data conforms to a defined shape.


### Distribution

* All the code generation is kept in one place.  (Otherwise, multiple micro-services using the same programming language would have to implement the same duplicated code generation tool chain.)
* Micro-service developers can selectively import "systems" of JSON schemas, rather than having to import everything.  (In future we may need to be able to rename types on request where name clashes are occurring.)
* Micro-service developers can import language-specific validators and strongly-typed deserialisers.
* Micro-service developers can import base data so it's available at compile time.
* Micro-service developers can view detailed interactive schema documentation. (future)


## Defining Schemas

Jsonotron manages a set of Jsonotron types.  These types are either **schema types** or **enum types**.

### Schema Types

A schema type is a thin wrapper around a JSON schema that you can define directly.  This gives us the benefit of a wide range of validation checks, including the use of regular expressions.

A schema type can be used to define new primitives like shortString or longString, whereby you assign a specific maximum length that is then well known (and can be enforced) across the system.  

A schema type can be used to implement a JSON schema for complex types, such as GeoJsonPoint, which supports an array with specific constraints applied to each element.  

In addition to the JSON schema, a Jsonotron schema type defines valid and invalid samples, so you can be confident your type is constraining data as expected.  The addition of examples and documentation can be used to produce great help documentation.

The `j-documentation` keyword can be used on JSON schema nodes with a `type:` property to document the intended usage.  This is used to populate help documentation.

The definition can utilise other schema types and other enum types.  For example, in the `jss` the `money` schema type references the `integer` schema type and the `currencyCode` enum type.

JSON schema validation is provided by 3rd party libraries and support for the ever-changing JSON schema specification will vary.  These are libraries currently used:

Language | Library
---|---
js | [ajv by Evgeny Poberezkin](https://github.com/ajv-validator/ajv)
cs | [Json.NET Schema by Newtonsoft](https://www.newtonsoft.com/jsonschema)


### Enum Types

An **enum type** represents data that should be available at compile time rather than stored in a database. For example, `dayOfWeek` defines `monday`, `tuesday`, `wednesday` etc.

An enum type is converted to a JSON schema by Jsonotron at run-time.

These are the values that are used for conditional branching in code or for populating drop-downs on a web-page.  An enum defines a set of values (or keys) which are stable and can be referenced by schema types, and then each enum value defines additional data that can be used as the application requires.

As standard, all enum items support a `text`, `symbol`, `deprecated` and `documentation` property.  If desired, you can also define a JSON schema for meta-data that you want associated with each value of an enumeration.  For example, each value of the `currency` enumeration defines the difference in magnitude between the major and minor denomination.  Jsonotron will check that the required meta-data is supplied for each enumeration value.


## Repositories


### jss

This repo includes a set of commonly required types called the `Jsonotron Standard System` or `jss` for short.

There are numbers and strings of various lengths.  There are dates and times in a fixed-length format.  There is a money type that incorporates currency and ensures any figures are stored as integers and not floats.

You can define your own but the JSS is a good starting point and all the types are [documented here](https://github.com/karlhulme/jsonotron/blob/master/workspaces/jss/typedocs.autogen.md)


### jsonotron-interfaces

The interfaces used by the rest of the workspaces, most importantly `EnumType` and `SchemaType`.


### jsonotron-js

Functions for validating and parsing schema and enum type strings.


### jsonotron-codegen

Functions for generating a `TypeMap` from a set of `EnumType`'s and `SchemaType`'s.  Additional functions then convert this type map into language-specific validators and deserialisers.


### jsonoserve

An express handler for distributing JSON schemas.  `npm install` this library into an express-based service to add jsonotron functionality to it. 


### jsonocli

A command-line tool for requesting JSON schemas and wrappers from a jsonoserve service.  Intended for use with scripting so you can import JSON schemas to micro-services on demand.


## Defining a Schema Type

A schema type is primarily based on a JSON schema.

Property Name | Description
---|---
kind | Must be the value 'schema'.
system | The name of the type system that this type belongs to.
name | A name for the schema type.
validTestCases | An array of values that conform to the json schema and demonstrate how the schema type should typically be used.  At least one valid test case must be provided and it should be documented.
validTestCases.value | An example value
validTestCases.documentation | A commonmark description of the example.
invalidTestCases | An optional array of values that should be rejected as invalid.
jsonSchema | An optional JSON schema object following the JSON schema specification.
variants | An optional array of variations of this schema type, which is only applicable for schema types based on 'object'.
variants.name | The name of this variant which will be used as a suffix to the schema type name.
variants.partial | Indicates if the fields should all be treated as optional, thus ignoring the 'required' property.
variants.includeFields | An array of strings that represent the names of the only fields (object properties in the jsonSchema) that should be included in the variant.  This takes priority over the excludeFields property.
variants.excludeFields | An array of strings that represent the name of the fields that should be excluded from the variant, whereas all others will be included.

```yaml
---
kind: schema
domain: https://yourdomain.com
system: system
name: coordinate
title: Co-ordinate
validTestCases:
- value:
    coordX: 3
    coordY: 4
  documentation: This example shows...
invalidTestCases:
- 0
- invalid
- false
- []
- {}
jsonSchema:
  type: object
  j-documentation: My commonmark describing the purpose or usage of the co-ordinate type.
  properties:
    coordX:
      type: number
      j-documentation: This is the x co-ordinate.
    coordY:
      type: number
      j-documentation: This is the y co-ordinate.
variants:
- name: oneDimensional
  partial: false
  includeFields:
  - coordX
```

When defining the JSON schema you can use any of the JSON Schema capabilities although be aware that language specific validators will have varying degrees of support.

Note that you can use the `j-documentation` property to add documentation to any JSON schema nodes that include a `type:` property.

A schema type can reference external enum types and schema types using the `{ $ref: '<typeName>' }` expression.  You should always use a relative uri so that the domain can be dictated by clients at the point of download.  If `targetType` is in the same system use `{ $ref: 'targetType' }`.  If `targetType` is another system use `{ $ref: '../anotherSystem/TargetType' }`.  See the example snippet below.

```yaml
---
jsonSchema:
  type: object
  properties:
    localField:
      type: number
    externalSchemaTypeField:
      "$ref": ../otherSystem/exteralSchemaType
    externalEnumTypeField:
      "$ref": externalEnumType
```


## Defining an Enum Type

An Enum is really just a set of strings.

Property Name | Description
---|---
kind | Must be the value 'enum'.
system | The name of the type system that this type belongs to.
name | A name for the enum type.
documentation | A commonmark description of the enum.
dataJsonSchema | A JSON schema that defines the shape of the data property of each item.  If this property is defined, then each item must declare a data property that conforms to it.
items | An array of objects.
items.value | A string value that is unique within the array.
items.text | A string to be used as the display text.
items.symbol | An optional string that represents the value.
items.deprecated | If populated, this enum item has been deprecated and this property provides additional information such as which enum item to use instead.
items.documentation | An optional commonmark description of the enum value.
items.data | Additional data attached the enum item.  This is required if a dataJsonSchema has been declared.

Here's an example:

```yaml
---
kind: enum
domain: https://yourdomain.com
system: system
name: directions
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


## Format Validators

A format validator is a function that tests whether a given string adheres to a known format and returns either true or false, e.g. `(s: string) => boolean`.

For example, a credit card number is a string but it has a specific format known as Luhn.  A JSON schema can use the `format` keyword to reference custom validation.

Jsonotron assumes the presence of the following bespoke formatters and a compliant Jsonotron runtime should provide them.

Formatter Name | Implementation
--- | ---
jsonotron-dateTimeUtc | Expect valid date time in this format `2010-01-01T12:00:00Z`.  The value should always end in a Z and should not include a time zone offset. Leading zeroes are required if any values are less than 10.  This ensures the value is fixed length and thus can be sorted alphanumerically to produce a chronological ordering.
jsonotron-dateTimeLocal | Expect valid date time in this format `2010-01-01T12:00:00+01:00`  The value should always end in a timezone offset which is +HH:mm. Leading zeroes are required if any values are less than 10.
jsonotron-luhn | Implementation of the luhn alrogithm.

In addition, a Jsonotron runtime should allow you to provide custom formatters of your own which you can then reference in your own schema types.


## Using the jss


### Downloading

The `./workspaces/jss/scripts/jss-download.sh` script downloads a release `jss` from this github repo and extracts the enum and schema types into a folder.


### Change Process

For feature or bug releases, the following rules are applied to proposed changes to the core types:

* Enum and schema type names cannot be changed.
* Enum items can be deprecated but never removed or renamed.
* New enum items can be added.
* An optional field can be added to a schema type.
* A required field cannot be added to a schema type.

Any change will always result in a new release.

Any change that violates the rules above will result in a new major release.

Do not automate the downloading of the `jss` types or your own types.  This should always be done as an explicit action or choice.  It is a similar process (in terms of drivers and consequences) to updating your package dependencies.


## Design Decisions


### Why generate code using templates and not dedicated libraries?

The specific requirements of each application will vary.  For example, in C# you might want to create types based on the System.Test.Json namespace or based on the NewtonSoft.Json namespace or even the Amazon.DynamoDB.

In consequence, the best approach is to build solution specific templates.


### Shouldn't each service define and own it's interface?

This often makes sense. 

However, if you have complex (non-trivial) data structures that are in use by multiple services then it becomes necessary to identify that the schema itself is now a duplication that needs to be *factored* out.

Making a change to an interface of a deployed system is always a big deal.  By extracting the data structures that are used by multiple backend services into a single place it becomes more explicit when a breaking change is on the cards.  Schema types and enum types can be placed into "systems" because it's possible (likely) that not all services require all schemas.


### Why use JSON schema?

JSON is already used by many (most?) services to exchange data.  It forms part of the OpenAPI specification.  JSON is supported by most of the document databases (Cosmos, Mongo, DynamoDB, etc) to interact with stored data.  

In short, using the mature and expansive JSON schema for type validation makes more sense than inventing a new type system.


### Why not use GraphQL?

GraphQL defines the shape of objects using primitives but not the associated validation.  For example, you cannot define the constraints for `positiveInteger` or `geoJsonPolygon` using the GraphQL format.

It's also worth recognising that GraphQL is aimed at the interface between a front-end client and a combined set of back-end services.  Whereas Jsonotron is aimed at inter-service communication in the back-end.

The Jsonotron type system can produce GraphQL definition language constructs for use in your graph.  To improve the GraphQL production, include a `documentation` property on your object property definitions.  This should be short.  If an elaborate description of a property is required, use the `documentation` property of the schema type.


### Why use YAML for definitions?

You don't have to, you can use JSON directly and it's strict syntax was hard to let go.

However, YAML offers a few useful advantages:

  1. Comments are supported in YAML with a `#` prefix.
  2. Strings can be spread over multiple lines making the documentation (and j-documentation nodes) easier to read and write.


### Why bother with separate enum types?

We want to be able to define static base data associated with each enum item.

The most basic requirement is to associate documentation and a mark of whether a particular enum item has been deprecated.

In single-language systems, it's very convenient to have a text property as well.

Being able to associated additional arbitrary data, and have that data validated, without ever repeating the key, is a very efficient way of storing this data.

Ultimately, we build a JSON schema containing just the enum definition, so from a client perspective the result is really the same anyway.


### Why is there not an array type?

Very few languages allow us to define constraints on an array type directly, for example, specifying the minimum or maximum number of items.

The availability of array types overlaps with the ability to specify record properties as arrays, which results in a higher burden on the templates used to generate code.


### Why generate JSON Schema IDs?

Jsonotron generates schema ids so that the host part of the URI domain can be specified just once in the jsonoserve constructor params.

This allows you to reference the jss using `../jss/shortString` rather than `https://jsonotron.org/jss/shortString`.  The former is shorter and doesn't litter your schemas with reference to the jsonotron domain.

This also makes it a little easier to validate the name and system fields, and reduces the length of the cli tool statements.

```bash
jsonocli typescript --systems jss other # short
jsonocli typescript --systems https://jsonotron.org/jss https://local.org/other # long
```

Seperate ID generation also makes sense when handling variants.  The variant name can be attached to the schema type name before it is modified to be a JSON schema compliant ID.

## Continuous Deployment

Any pushes or pull-requests on non-master branches will trigger the test runner.

Any pushes to master will cause a release to be created on Github.
