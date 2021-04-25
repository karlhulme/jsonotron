# jsonotron-js

A library for parsing a set of Jsonotron types.

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonotron-js.svg)](https://www.npmjs.com/package/jsonotron-js)
![npm type definitions](https://img.shields.io/npm/types/typescript)


## Installation

```bash
npm install jsonotron-js
```


## Validating a set of resources

To validate a set of resources use the `parseTypeLibrary` function as shown below.

```javascript
import { parseTypeLibrary } from 'jsonotron-js'

const colorType = fs.readFileSync('./typeSystem/example/color.yaml', 'utf-8')

try {
  const typeLibrary = parseTypeLibrary({
    resourceStrings: [colorType]
  })

  console.log(`Parsed ${typeLibrary.arrayTypes.length} array types.`)
} catch (err) {
  // oops - validation failed!
}
```

You can pass the following options to the `parseTypeLibrary` function:

* **resourceStrings** An array of YAML or JSON strings.  Each string represents a Jsonotron type.

**If validation fails** then an exception is thrown with details of the problem.


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
