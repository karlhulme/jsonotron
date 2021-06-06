# jsonotron-factories

A set of factories for jsonotron.

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonotron-factories.svg)](https://www.npmjs.com/package/jsonotron-factories)
![npm type definitions](https://img.shields.io/npm/types/typescript)


## Factories

* **Sengi Factory** - Adds id, docType, docOpIds and docVersion properties to a type.  It then generates variants for ___Record (queries), ___Template (new) and ___Patch (update).


## Development

To run the tests:

```bash
npm install
npm test
```


## Continuous Deployment

Any pushes or pull-requests on non-main branches will trigger the test runner.

Any pushes to main will cause a release to be created on Github.
