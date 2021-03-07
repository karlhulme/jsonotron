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


## Continuous Deployment

Any pushes or pull-requests on non-main branches will trigger the test runner.

Any pushes to main will cause a release to be created on Github.
