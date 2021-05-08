# Jsonoserve

An express handler for serving Jsonotron types.

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonoserve.svg)](https://www.npmjs.com/package/jsonoserve)
![npm type definitions](https://img.shields.io/npm/types/typescript)


## Installation

```bash
npm install jsonoserve
```


## Development

To run the tests:

```bash
npm install
npm test
```

To publish an ES6 transpiled version (with typescript definitions) to npm:

```bash
npm run build
npm publish
```


## Continuous Deployment

Any pushes or pull-requests on non-main branches will trigger the test runner.

Any pushes to main will cause a release to be created on Github.
