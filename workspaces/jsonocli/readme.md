# Jsono CLI

A command-line for interacting with a Jsonoserve server.

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonocli.svg)](https://www.npmjs.com/package/jsonocli)
![npm type definitions](https://img.shields.io/npm/types/typescript)


## Installation

```bash
npm install jsonocli jsonotron-codegen
```


## Commands

The following commands work in the package.json scripts section, from a client repo, once the jsonocli dependency is installed.

Command | Output
--- | ---
jsonocli | Show the help output
jsonocli clone -- --help | Show the help output for the clone command
jsonocli clone https://localhost:3006 ./temp/folder https://a.com/sys1 https://a.com/sys2 | Clone the systems to a series of JSON files locally
jsonocli codegen https://localhost:3006 ./autogen.ts https://a.com/sys1 https://a.com/sys2 | Generate typescript code to a local file
jsonocli codegen https://localhost:3006 ./autogen.gql https://a.com/sys1 https://a.com/sys2 | Generate GraphQL code to a local file

To run the commands within the jsonocli (for testing) replace `jsonocli` with `npm start`.


## Development

This repo does not contain any tests at this time.

The code generation feature uses the `jsonotron-codegen` package.  If you receive 'package not found' errors when trying to run `jsonocli codegen ___` then you need to `npm install jsonotron-codegen`.

To publish an ES5 transpiled version (with typescript definitions) to npm:

```bash
npm run build
npm publish
```


## Continuous Deployment

Any pushes or pull-requests on non-main branches will trigger the test runner.

Any pushes to main will cause a release to be created on Github.
