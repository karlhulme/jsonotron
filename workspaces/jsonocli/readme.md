# Jsono CLI

A command-line for interacting with a Jsonoserve server.

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonocli.svg)](https://www.npmjs.com/package/jsonocli)
![npm type definitions](https://img.shields.io/npm/types/typescript)


## Installation

```bash
npm install jsonocli
```

## Commands

Command | Output
--- | ---
npm start | Show the help output
npm start clone -- --help | Show the help output for the clone command
npm start clone https://localhost:3006 ./temp/folder | Clone the systems to a series of JSON files locally
npm start codegen https://localhost:3006 ./autogen.ts | Generate typescript code to a local file
npm start codegen https://localhost:3006 ./autogen.gql | Generate GraphQL code to a local file


## Development

This repo does not contain any tests at this time.

This repo directly references `jsonotron-codegen` as a **dependency** in the `package.json`.  This has the following effects:

* [PRO] Any project that depends on jsonocli will pick up jsonotron-codegen as well.
* [CON] You must update the version number in the `package.json` in order to get the latest definitions.
* [CON] When building, a local node_modules will be created with the specific version.

To publish an ES5 transpiled version (with typescript definitions) to npm:

```bash
npm run build
npm publish
```


## Continuous Deployment

Any pushes or pull-requests on non-main branches will trigger the test runner.

Any pushes to main will cause a release to be created on Github.
