# Jsonotron

Jsonotron is a software stack and code generation tool, based on JSON schema, for defining and validating **data structures** that are used by cross-language services.

Jsonotron is most useful when you have non-trivial data structures that are used by multiple services and you want to avoid duplicating and maintaining the same definitions in multiple places.

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
![npm type definitions](https://img.shields.io/npm/types/typescript)

With Jsonotron data structures are comprised of **schema types** and **enum types**.

Schema types are defined primarily using JSON schema.  This gives us the benefit of a wide range of validation checks, including the use of regular expressions.  JSON schema allows us to define new primitives like shortString or longString, whereby you assign a specific maximum length that is then well known (and can be enforced) across the system.  JSON schema also supports complex types, such as GeoJsonPoint, which supports an array with specific constraints applied to each element.  Schema types can be combined using the standard schema referencing syntax that is native to JSON schema.  In addition to the JSON shema, a Jsonotron schema type defines valid and invalid samples, so you can be confident your type is constraining data as expected.  The additional of examples and documentation can be used to produce great help documentation.

Enum types are a set of string values, a text representation and documentation.  If desired, you can also define a JSON schema for meta-data that you want associated with each value of an enumeration.  For example, for each value of a currency enumeration you may also want to know the difference in magnitude between the major and minor denomination.  Jsonotron will check that the required meta-data is supplied for each enumeration value.

A Jsonotron type service makes these type definitions available to other services via a simple RESTful interface.

A Jsonotron command line tool offers the following capabilities to a microservice client:
* Download the schema types and enum types in a JSON schema that can be used for validation.
* Generate type definitions in a range of languages that can be used to provide a strongly-typed development experience when working with the data structures.
* Generate code in a range of languages that can be used to interrogate the definition of a data structure at run-time.


## Repositories

### JSS

This repo includes a set of commonly required types called the `Jsonotron Standard System` or `JSS` for short.

There are numbers and strings of various lengths.  There are dates and times in a fixed-length format.  There is a money type that incorporates currency and ensures any figures are stored as integers and not floats.

You can define your own but the JSS is a good starting point and all the types are [documented here](https://github.com/karlhulme/jsonotron/blob/master/workspaces/jss/readme.md)


### Jsonotron-js

This repo is a typescript implementation of the Jsonotron engine.


### Jsonoserve

This repo contains an express handler for sharing Jsonotron types.  This is typically used with the codegen and the command line to pull the latest type definitions from a central service into the individual services that need them.


## Motivation

Non-trivial applications will need to process JSON data at some point.  Either on the wire in the form of REST API calls or perhaps in storage via a document-based database such as Mongo, Cosmos or DynamoDB.

Jsonotron provides a language independent way to specify the types that you want to use in a specific microservice.

You can then use Jsonotron-JS to validate against those type.

For the data layer, we have [Sengi](https://github.com/karlhulme/sengi).  Sengi is the foundation of a document-based data service where the table/document definitions are entirely based within code.  Sengi uses the types to define table structures and update messages, to produce documentation and generate downstream formats like GraphQL schema for client library generation.


## Implementations

* **NodeJS**: [Jsonotron-JS](https://github.com/karlhulme/jsonotron/workspaces/jsonotron-js)


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
system | The name of the type system that this type belongs to.
name | A name for the enum type.
title | A display name for the enum type.
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
kind: schema
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
kind: schema
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
      documentation: Additional documentation here.
```

You can include additional documentation for object properties.  An example is shown on the last line of the code listing above.


## Format Validators

A format validator is a function that tests whether a given string adheres to a known format and returns either true of false, e.g. `(s: string) => boolean`.

For example, a credit card number is a string but it has a specific format known as Luhn.  A JSON schema can use the `format` keyword to reference custom validation.

Jsonotron assumes the presence of the following bespoke formatters and a compliant Jsonotron runtime should provide them.

Formatter Name | Implementation
--- | ---
jsonotron-dateTimeUtc | Expect valid date time in this format `2010-01-01T12:00:00Z`.  The value should always end in a Z and should not include a time zone offset. Leading zeroes are required if any values are less than 10.  This ensures the value is fixed length and thus can be sorted alphanumerically to produce a chronological ordering.
jsonotron-dateTimeLocal | Expect valid date time in this format `2010-01-01T12:00:00+01:00`  The value should always end in a timezone offset which is +HH:mm. Leading zeroes are required if any values are less than 10.
jsonotron-luhn | Implementation of the luhn alrogithm.

In addition, a Jsonotron runtime should allow you to provide custom formatters of your own which you can then reference in your own schema types.


## Sharing a Type System

The `./workspaces/jss/scripts/jss-download.sh` script downloads a release JSS from this github repo and extracts the enum and schema types into a folder.  You can take the same approach and then abuse this script to achieve the same thing with your own type systems.  Typically you'll want to set this up as a command line you can run when you want to bring in the types.  Those downloaded types should be committed to your repo.  If using a private repo you'll need to create a personal access token as pass that in the header as well.

By creating a type system, typically in a separate repo, it becomes easier to share those types across multiple services within your organisation.  This can lead to time saving when documenting those types and ensures consistency when those services communicate.  This approach works well for small granular types (like those found in the JSS) and small common types that are used repeatedly throughout your services.

Be wary of trying to share every type though.  This will typically lead to services being bound together by types where contextually they should be able to evolve independently.  Assume that you will probably end up with multiple type systems representing different bounded contexts.  Remember a single service can pull types from multiple services.

It is reasonable (possibly optimal) to offer a single unified type system to frontend clients.  The codegen tool includes a GraphQL code generator which will largely ignore `domain` and `system` when writing out the types.  At some point, it would be good if a config object would allow prefixes to be added based on the system.  This would provide an escape hatch in case of name clashes.


## JSS Change Process

For feature or bug releases, the following rules are applied to proposed changes to the core types:

* Enum and schema type names cannot be changed.
* Enum items can be deprecated but never removed or renamed.
* New enum items can be added.
* An optional field can be added to a schema type.
* A required field cannot be added to a schema type.

Any change will always result in a new release.

Any change that violates the rules above will result in a new major release.


## Shouldn't each service define its own interface

This often makes sense.

However, if you have complex (non-trivial) data structures that are in use by multiple services then it becomes necessary to identify that the schema itself is now a duplication that needs to be *refactored* out.

Making a change to an interface of a deployed system is always a big deal.  By extracting the data structures that are used by multiple backend services into a single place it becomes more explicit when a breaking change is on the cards.  Schema types and enum types can be placed into namespaces because it's possible (likely) that not all services require the definitions for all namespaces.


## Why use JSON schema?

JSON is already used by many (most?) services to exchange data.  JSON is also used by most of the document databases (Cosmos, Mongo, DynamoDB, etc) to store data.  Therefore using the mature and expansive JSON schema for type validation makes more sense than inventing a new type system.


## Why not use GraphQL?

GraphQL defines the shape of objects using primitives but not the associated validation.  For example, you cannot define the constraints for `positiveInteger` or `geoJsonPolygon` using the GraphQL format.

It's also worth recognising that GraphQL is aimed at the interface between a front-end client and a combined set of back-end services.  Whereas Jsonotron is aimed at inter-service communication in the back-end.

The Jsonotron type system can produce GraphQL definition language constructs for use in your graph.  To improve the GraphQL production, include a `documentation` property on your object property definitions.  This should be short.  If an elaborate description of a property is required, use the `documentation` property of the schema type.


## Design Decisions

Jsonotron does not dictate the API of a Jsonotron validating engine.  This frees each implementation to conform to the best practices of the language.

The definitions are stored as YAML (rather than JSON) for two reasons:

  1. Comments are supported in YAML with a `#` prefix.
  2. Strings can be spread over multiple lines making the documentation easier to read and write.

Jsonotron enforces seperate fields for `domain`, `system` and `name` on each type.  This allows documentation to be built with appropriate headers for the key components of the system.  A single URI could not be unambiguously unpicked. 

The use of namespaces allows different systems to exist.  This is useful because the standard system (JSS) that defines lots of types that you wouldn't want to define manually on every project.  However, the namespacing should not be used within a client project, so the codegen tools discard the namespace as much as possible.  When a name collision exists, the codegen tools should be configured to alias one of the offending types to a new name.

The ability to share the types among multiple services is particularly useful when it comes to enum values.  These are often used in multiple services and not having to define them multiple places is a win.  Since enums can be extended with arbitary (but schema-backed) data, much of a solutions static reference data can be defined as enum values.  By serving this data up from a `type server` such as `jsonoserve`, multiple microservices can access the same definitions without having to share a common library which pins you to a particular technology.  (To make this work in practice, more jsonotron implementations will be needed.)


## Continuous Deployment

Any pushes or pull-requests on non-master branches will trigger the test runner.

Any pushes to master will cause a release to be created on Github.
