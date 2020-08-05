# A library of schemas used by the Jsonotron system.

![](https://github.com/karlhulme/jsonotron-validation/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonotron-validation.svg)](https://www.npmjs.com/package/jsonotron-validation)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A library of schemas used by the Jsonotron system to validate document types, field types and role types.

The schemas allow the use of functions to be added to the JS objects via the customTypeOf keyword.  For example, on a document type, the implementation of a constructor can be included in the definition because of the following definition:

```javascript
ctor: {
  type: 'object',
  description: 'A mechanism for constructing new instances of the document type.',
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
npm install jsonotron-validation --save
```

## Usage

```javascript
const { docTypeSchema, fieldTypeSchema, roleTypeSchema } = require('jsonotron-validation')

console.log(docTypeSchema)
console.log(fieldTypeSchema)
console.log(roleTypeSchema)
```

## Notes

1. The schemas allow additional properties to appear on the docType, fieldType, etc, so that support for new features can be added without breaking compatibility.

## Development

Code base adheres to the rules chosen by https://standardjs.com/.  Code is formatted with 2 spaces.

Tests are written using Jest with 100% coverage.

```javascript
npm test
```

## Continuous Deployment

Any commits to master will cause the library to be re-published.
