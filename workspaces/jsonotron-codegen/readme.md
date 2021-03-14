# Jsonotron-codegen

Functions for generating code to work with jsonotron enum and schema types.

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonotron-codegen.svg)](https://www.npmjs.com/package/jsonotron-codegen)
![npm type definitions](https://img.shields.io/npm/types/typescript)

## Installation

```bash
npm install jsonotron-codegen
```


## Development


To publish an ES6 transpiled version (with typescript definitions) to npm:

```bash
npm run build
npm publish
```


## Design Decisions

The code generates required marks that match the original schema.  This means:

* In **Typescript**, only optional properties are marked with a ?
* In **GraphQL**, required properties are marked with a !

In Typescript, you can use the Partial type to make all the fields optional.  This is useful when defining UI components that edit composite or complex types and not all fields will be populated at all times.

The GraphQL output supports types that define the customised data of enum types, as well as all the standard properties.
This allows you to build a graph that will return the additional enum information if the client requests.  This will
typically be required for any enums that are to be presented to the user, such as in a drop-down.  These should be
requested on first use and then cached.

Capitalization for the typescript code generation has proved difficult to choose.  There are various style guides from large tech companies that do not agree, but there does not seem to be an authoritative reference.  Having tried a lot of different variants, none of them are consistently satisfying becuase javascript does not in fact support constants (or enums) in the sense established by other languages.  However there is a convention for uppercase characters to denote values that will not change, which is reflected in the types produced by this lib.


## Continuous Deployment

Any pushes or pull-requests on non-main branches will trigger the test runner.

Any pushes to main will cause a release to be created on Github.
