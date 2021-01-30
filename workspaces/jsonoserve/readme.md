# Jsonoserve

An express handler for serving [Jsonotron](https://github.com/karlhulme/jsonotron) types.

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonoserve.svg)](https://www.npmjs.com/package/jsonoserve)
![npm type definitions](https://img.shields.io/npm/types/typescript)

## Installation

```bash
npm install jsonoserve
```


## Instantiate a Jsonoserve

You will need to define some types, as per the instructions for [Jsonotron](https://github.com/karlhulme/jsonotron).  You will then typically load the types (in a loop) into string variables that can be passed to the Jsonotron class constructor.

```javascript
import { createJsonoserveExpress } from 'jsonoserve'

const type1 = fs.readFileSync('./test/testTypes/type1.yaml', 'utf-8')
const type2 = fs.readFileSync('./test/testTypes/type2.yaml', 'utf-8')

const app = express()

app.use('/', createJsonoserveExpress({
  types: [type1, type2]
}))

app.listen()
```

## Routes

The handler is listening for the following requests:

url | result
--- | ---
`/systems` | An array of `JsonotronSystem` objects that describe the available systems.  Each system has a `domain` and `system` property.
`/systems/<requested-system>` | An array of the types (`JsonotronType[]`) that make up the requested system.  Each type has a `domain`, `system`, `name` and `kind` property as well as a `definition` property which contains the full type as a JSON-encoded string.


## Development

To run the tests:

```bash
npm install
npm test
```

To publish an ES5 transpiled version (with typescript definitions) to npm:

```bash
npm run build
npm publish
```


## Continuous Deployment

Any pushes or pull-requests on non-main branches will trigger the test runner.

Any pushes to main will cause a release to be created on Github.
