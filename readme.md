# A library of schemas used by the Jsonotron system.

![](https://github.com/karlhulme/jsonotron-schemas/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonotron-schemas.svg)](https://www.npmjs.com/package/jsonotron-schemas)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A library of schemas used by the Jsonotron system to validate document types, field types and role types.

The schemas allow the use of functions to be added to the JS objects via the customTypeOf keyword.  For example, on a document type, the implementation of a constructor can be included in the definition because of the following definition:

```javascript
ctor: {
  type: 'object',
  description: 'A mechanism for constructing new instances of the document type.',
  additionalProperties: false,
  properties: {
    parameters: { /* edited out */ }
    implementation: { customTypeOf: 'function' } // <-- function inline with the JSON Schema.
  },
  required: ['parameters', 'implementation']
}
```

> This package is part of the Jsonotron system.
>
> Jsonotron is...
> * a small set of components for building a **NodeJS microservice**
> * for storing, patching and querying **JSON documents**
> * stored in a schemaless/NoSQL **database**
> * that have known, enforceable, and **evolving schemas**.
>
> **Visit https://karlhulme.github.io/jsonotron/ for details on how to get started.**

## Installation

```bash
npm install jsonotron-schemas --save
```

## Usage

```javascript
const { docTypeSchema, fieldTypeSchema, roleTypeSchema } = require('jsonotron-schemas')

console.log(docTypeSchema)
console.log(fieldTypeSchema)
console.log(roleTypeSchema)
```

## Development

Code base adheres to the rules chosen by https://standardjs.com/.  Code is formatted with 2 spaces.

Tests are written using Jest with 100% coverage.

```javascript
npm test
```

## Continuous Deployment

Any commits to master will cause the library to be re-published.

Setting up a new feature after cloning the repository:
* Switch to master and get the latest code: `git checkout master && git pull`
* Create a new feature branch: `git checkout -b new-feature`

Merging a completed feature branch to master:
* Switch to master and get the latest code: `git checkout master && git pull`
* Merge the feature branch into master: `git merge new-feature`
* Check the tests are still passing: `npm test`
* Push the changes back to the remote server to trigger publishing: `git push`
