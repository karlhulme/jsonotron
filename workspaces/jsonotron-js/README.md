# jsonotron-js

A library for validating a set of Jsonotron enum and schema type resources.

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonotron-js.svg)](https://www.npmjs.com/package/jsonotron-js)
![npm type definitions](https://img.shields.io/npm/types/typescript)


## Installation

```bash
npm install jsonotron-js
```


## Validating a set of resources

To validate a set of resources use the `parseResources` function as shown below.

```javascript
import { parseResources } from 'jsonotron-js'

const colorType = fs.readFileSync('./typeSystem/example/color.yaml', 'utf-8')

try {
  const resources = parseResources({
    resourceStrings: [colorType],
    jsonSchemaFormatValidators: {
      'mycompany-testFormatFunc': v => v.length > 5
    }
  })

  console.log(`Parsed ${resources.enumTypes.length} enum types.`)
  console.log(`Parsed ${resources.schemaTypes.length} schema types.`)
} catch (err) {
  // oops - validation failed!
}
```

If you have schema types that require bespoke formatters then these can be loaded by passing the format functions as keys on the `jsonSchemaFormatValidators` function.


You can pass the following options to the `parseResources` function:

* **resourceStrings** An array of YAML or JSON strings.  Each string represents a Jsonotron enum or schema type.
* **jsonSchemaFormatValidators** An object where each key is the name of a json schema format validator and each corresponding value is the validator function. 

**If validation fails** then an exception is thrown with details of the problem.

**If validation succeeds** then an object is returned with the following properties:

* **enumTypes** An array of parsed and validated enum types.
* **schemaTypes** An array of parsed and validated schema types.


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
