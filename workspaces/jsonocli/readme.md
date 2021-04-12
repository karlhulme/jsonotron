# jsonocli

A command-line tool for downloading language-specific validators and deserialisers from a Jsonoserve server.

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonocli.svg)](https://www.npmjs.com/package/jsonocli)
![npm type definitions](https://img.shields.io/npm/types/typescript)


## Installation

```bash
npm install jsonocli
```


## Commands

The following commands work in the package.json scripts section, from a client repo, once the jsonocli dependency is installed.

Command | Output
--- | ---
jsonocli | Show the help output
jsonocli typescript -- --help | Show the help output for the typescript command
jsonocli typescript https://localhost:3006 ./autogen.ts sys1 sys2 | Generate typescript code for sys1 and sys2.

To run the commands within the jsonocli (for testing) replace `jsonocli` with `npm start`.


## Development

This repo does not contain any tests at this time.

To publish an ES6 transpiled version (with typescript definitions) to npm:

```bash
npm run build
npm publish
```


## Continuous Deployment

Any pushes or pull-requests on non-main branches will trigger the test runner.

Any pushes to main will cause a release to be created on Github.
