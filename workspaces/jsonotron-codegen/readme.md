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

A GraphQL client may present a user with a UI that allows them to build up a valid value over time.  In this editing mode, the value will sometimes be valid and sometimes not.  To assist with this, the GraphQL code generator outputs ___Editing types.

## Continuous Deployment

Any pushes or pull-requests on non-main branches will trigger the test runner.

Any pushes to main will cause a release to be created on Github.
