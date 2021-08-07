# Jsonotron-codegen

Functions for generating code by applying jsonotron types to handlebar templates.

![](https://github.com/karlhulme/jsonotron/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonotron-codegen.svg)](https://www.npmjs.com/package/jsonotron-codegen)
![npm type definitions](https://img.shields.io/npm/types/typescript)


## Installation

```bash
npm install jsonotron-codegen
```

## Styles

The following styles can be produced:

tag | example | notes
---|---|---
{{identToConstCase}} | CONST_CASE
{{identToPascalCase}} | PascalCase
{{identToSnakeCase}} | snake_case
{{stringify}} | {"foo": "bar"}
{{stringifyPretty}} | See above | In addition, this format includes spaces and newlines.
{{valueToConstCase}} | A_VALUE | Will replace unsafe characters with underscores.
{{valueToIdent}} | aValue | Will replace unsafe characters with underscores.


## Helpers

A helper that renders content if a value is found in an array:

```hbs
{{#isTagged tags with='special'}}
  my content here
{{/isTagged}}
```

A helper that renders content if a value is not found in an array:

```hbs
{{#isNotTagged tags with='not-found'}}
  my content here
{{/isTagged}}
```

A helper that renders content if an array value does include a context value:

```hbs
{{#isIncluded name in='value1,value2'}}
  my content here
{{/isIncluded}}
```

A helper that renders content if an array value does not include a context value:

```hbs
{{#isExcluded name from='value1,value2'}}
  my content here
{{/isExcluded}}
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
