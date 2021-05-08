# Jsonotron

A NodeJS service implementation for verifying a type system and then converting and distributing language-specific wrappers to be used by other micro-services.

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonoserve.svg)](https://www.npmjs.com/package/jsonoserve)
![npm type definitions](https://img.shields.io/npm/types/typescript)

Jsonotron is most useful when you have non-trivial data structures that are used by multiple back-end services and you want to avoid duplicating and maintaining the same definitions (and their accompanying validators and deserialisers) in multiple places.  

Common use cases include:

* Stored documents (such as those stored in NoSQL databases like Mongo, Cosmos or Dynamo)
* API Messages (both requests and responses)
* GraphQL definitions
* Token structures (used post authentication)

## How It Works

With Jsonotron, you define a type system for each area of your architecture.  A type system is comprised of definition and validation constraints for `bool`s, `enum`s, `float`s, `int`s, `object`s, `record`s and `string`s.

Each type is defined in a simple YAML file.  The available properties are dependent upon the kind of type being defined.  The [examples repo](https://github.com/karlhulme/jsonotron/workspaces/examples) defines a set of types that serve as a good starting point and a reference for new types.

You then write handlebars templates that define how those types should be be converted to code for the language and specific frameworks that you're using.  This could be simple type declarations or it could include validators, serialisers and deserialisers.  

Micro-services import this generated code by issuing a GET request to the service, specifying which language and which systems they require.


## Benefits

By running a dedicated "type service" within your set of micro-services you get the following benefits:

* All type definitions, summaries and examples are validated on startup.
* All the associated code generation is kept within the boundary of one service.  (Otherwise, multiple micro-services using the same programming language would have to implement the same code generation tool chain.)  
* Micro-service developers can import language-specific types, validators and strongly-typed deserialisers for the specific systems they require.
* Making system wide changes is faster and it's explicit when a change is being made that affects multiple services.
* Micro-service developers can view detailed interactive schema documentation. (future)


## Defining Types

Jsonotron manages a set of Jsonotron types described in YAML files.

Each type is designated a **kind**, one of `bool`, `enum`, `float`, `int`, `object`, `record` or `string`.  This affects the properties you can set.

The following properties apply to all kinds.

property | type | reqd | description
--- | --- | --- | ---
kind | string | Y | One of `bool`, `enum`, `float`, `int`, `object`, `record` or `string`.
system | string | Y | The name of the system the type belongs to.  Keep this short.
summary | string | Y | A description of the type and it's usage.
deprecated | string | Y | If populated, this value explains why the type has been deprecated and/or which type to use instead.
tags | string[] | | An array of arbitrary string tags that the code generation can use.

The following properties apply to **enum** types.

property | type | reqd | description
--- | --- | --- | ---
dataType | string | | If populated, this type describes the shape of the data associated with each enumeration item.  This should be a record to make it easier to adapt and extend over time.
items | [] | Y | An array of enumeration items.
&nbsp; .value | string | Y | The value of the enum item.
&nbsp; .text | string | Y | A display value of the enum item.
&nbsp; .deprecated | string | | If populated, this value explains why the value was deprecated and/or which item to use instead. 
&nbsp; .symbol | string | | A symbol associated with the item.
&nbsp; .data | string | | Additional data associated with the item.
&nbsp; .summary | string | | The documentation associated with this item.

The following properties apply to the **float** types.

property | type | reqd | description
--- | --- | --- | ---
minimum | number | Y | Specifies the minimum value of the float.
isMinimumExclusive | boolean | | Specifies whether the minimum value should be treated as an exclusive value.
maximum | number | Y | Specifies the maximum value of the float.
isMaximumExclusive | boolean | | Specifies whether the maximum value should be treated as an exclusive value.

The following properties apply to the **int** types.

property | type | reqd | description
--- | --- | --- | ---
minimum | number | Y | Specifies the minimum value of the integer.
maximum | number | Y | Specifies the maximum value of the integer.

The following properties apply to the **record** types.

Notice that the variants property allows you to define additional record types which are very similar.

property | type | reqd | description
--- | --- | --- | ---
properties | [] | Y | An array of properties that can appear in this record.
&nbsp; .name | string | Y | The name of the property.
&nbsp; .summary | string | Y | A description of how this property is to be used.
&nbsp; .propertyType | string | Y | The type of the property.  This can be local e.g. shortString or it can be fully qualified e.g. std/shortString.
&nbsp; .isArray | boolean | | Specifies if the property is to be treated as an array.
&nbsp; .deprecated | string | | If populated, this value explains why the property was deprecated and/or which property to use instead.
required | string[] | | Indicates which of the properties on this record type are mandatory.
direction | input,output,both | | Indicates whether the record is used exclusively for input, exclusively for output, or for either.  If not specified, a direction of 'both' is assumed.  (This makes it easier to support GraphQL.)
variants | [] | | An array of types that are derived by selecting or excluding specific properties of the type.
&nbsp; .name | string | Y | The name of this variant.
&nbsp; .summary | string | Y | Documents the usage of the variant.
&nbsp; .includeProperties | string[] | | If present, it lists the only properties that are included in this variant of the record.
&nbsp; .excludeProperties | string[] | | If present, and if includeProperties is not present, the variant will include all the properties except the ones specified.
&nbsp; .required | string[] | | Indicates which of the properties on this variant are mandatory.
&nbsp; .direction | input,output,both | | Indicates whether the record is used exclusively for input, exclusively for output, or for either.  If not specified, a direction of 'both' is assumed.
&nbsp; .deprecated | string | | If populated, this value explains why the variant was deprecated and/or which variant to use instead.
&nbsp; .tags | string[] | | An array of tags that can be used by the code generator to discriminate between the types.
validTestCases | [] |  | An array of values that can be represented by this type.
&nbsp; .summary | string | Y | A description of the test case.
&nbsp; .value | object | Y | A value that should be valid.
invalidTestCases | [] |  | An array of values that cannot be represented by this type.
&nbsp; .summary | string | Y | A description of the invalid test case.
&nbsp; .value | object | Y | A value that should not be valid.

The following properties apply to the **string** types.

property | type | reqd | description
--- | --- | --- | ---
regex | string |  | Specifies the regular expression string that can be used to validate the string.
minimumLength | number |  | Specifies the minimum length of the string.
maximumLength | number |  | Specifies the maximum length of the string.
validTestCases | [] |  | An array of values that can be represented by this type.
&nbsp; .summary | string | Y | A description of the test case.
&nbsp; .value | string | Y | A value that should be valid.
invalidTestCases | [] |  | An array of values that cannot be represented by this type.
&nbsp; .summary | string | Y | A description of the invalid test case.
&nbsp; .value | string | Y | A value that should not be valid.


## Instantiate a Jsonoserve

You will need to define a folder structure such as:

<pre>
project
  + assets
    + langTemplates
      + typescript
      + csharp
    + typeLibrary
      + doc
      + op
      + std
</pre>

You will need to `npm install jsonotron-js jsontron-interfaces jsonotron-codegen jsonoserve`.

You can then use the following code to set up a jsonotron service based on Express.

```javascript
import express, { Express } from 'express'
import fg from 'fast-glob'
import { readFile } from 'fs/promises'
import { createJsonoserveExpress } from 'jsonoserve'
import { loadTemplatesFromFolder } from 'jsonotron-codegen'

export async function createApp (): Promise<Express> {
  const app = express()

  const typeFileNames = await fg('./assets/typeLibrary/**/*.yaml')
  const resourceStrings = await Promise.all(typeFileNames.map(fileName => readFile(fileName, 'utf8')))
  console.log(`${resourceStrings.length} types found`)

  const templates = await loadTemplatesFromFolder('./assets/langTemplates')
  console.log(`${templates.length} language templates found.`)

  app.use('/', createJsonoserveExpress({ domain: 'https://example.com', resourceStrings, templates }))

  return app
}
```


## Routes

The handler is listening for `GET` requests made to a path named after one of the language templates.

For example, if you have a language template called **typescript** and you want the code for the **std**, **doc** and **op** systems, then you can invoke...

```bash
curl "http://localhost:3006/typescript?systems=std,doc,op" -o "./src/domain/types.autogen.ts" --create-dirs
```

That would write a new file to **'./src/domain/types.autogen.ts** containing all the type definitions in typescript.


## Repositories


### examples

This repo includes a set of example types and language templates.


### jsonotron-interfaces

The interfaces used by the rest of the workspaces.


### jsonotron-js

Functions for parsing jsonotron type strings into a `TypeLibrary`.


### jsonotron-codegen

Functions for generating code using handlebars templates and a `TypeLibrary`.


### jsonoserve

An express handler for distributing generated code to other micro-services.  `npm install` this library into an express-based service to add jsonotron functionality to it. 


## Design Decisions

### Why generate code using templates and not dedicated libraries?

The specific requirements of each application will vary.  For example, in C# you might want to create types based on the System.Text.Json namespace or based on the NewtonSoft.Json namespace or even the Amazon.DynamoDB namespace.

In consequence, the best approach is to build solution specific templates.


### Shouldn't each service define and own it's interface?

Generally yes.

However, if you have complex (non-trivial) data structures that are in use by multiple services then the schema itself is now being duplicated and that needs to be *factored out*.

Making a change to an interface of a deployed system is always a big deal.  By extracting the data structures that are used by multiple backend services into a single place it becomes more explicit when a breaking change is on the cards.

Notice that you can set deprecation warnings on types, enum items, record properties and variants.


### Why not use JSON schema directly?

JSON schema doesn't align particularly well with the capabilities of programming languages.  In many cases JSON schema supports more varied layouts of data.  The intention with Jsonotron's type system was to reduce the scope such that it can be fully represented in any language without workarounds.  It should also be quick and easy to author the code generators.

For this reason, structures like Maps and TaggedUnions are also not supported.  A map is really an optimisation for fast lookup which can be implemented inside a service if required.  Support for unions (and base interfaces) can be achieved using tags if required.

Jsonotron produces JSON schemas for the purpose of validation and makes those schemas available to the code generators too.


### Why not use GraphQL?

GraphQL is aimed at the interface between a front-end client and a combined set of back-end services.  Whereas Jsonotron is aimed at inter-service communication in the back-end.

In addition, GraphQL defines the shape of objects but not the associated validation.  For example, you cannot define the constraints for `latitudeFloat` or use regex to restrict the valid values for strings.

The Jsonotron type system can produce GraphQL definition language constructs for use in your graph.  An example is included in the examples repo.


### Why use YAML for definitions?

YAML allows you to write multiline strings, which makes it much easier to write and maintain summary strings on the types.  Documentation is a key part of the overall value of Jsonotron.

If JSON supported something similar then the strict syntax of JSON would be preferred over the very lax (and error-prone) nature of YAML.  To combat this, the validation of the types is pretty rigid.


### Why attach data to enum types?

The facility to define additional arbitrary data for each enum item and have that data validated, without every repeating the key, is a very efficient way of authoring this data.

This data is then made available at design-time (typically as constant declarations) to client micro-services by including it in the code generation.


### Why is there not an array type?

Very few languages allow us to define constraints on an array type directly, for example, specifying the minimum or maximum number of items.

The availability of array types overlaps with the ability to specify record properties as arrays, which results in a higher burden on the templates used to generate code.


## Continuous Deployment

Any pushes or pull-requests on non-master branches will trigger the test runner.

Any pushes to master will cause a release to be created on Github.
