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
{{identToConstCase "constCase"}} | CONST_CASE
{{identToPascalCase "pascalCase"}} | PascalCase
{{identToSnakeCase "snakeCase"}} | snake_case
{{labelValue . labelName}} | labelValue | Example assumes the context is a Jsonotron type.
{{stringify .}} | {"foo": "bar"}
{{stringifyPretty .}} | See above | In addition, this format includes spaces and newlines.
{{valueToConstCase "a value"}} | A_VALUE | Will replace unsafe characters with underscores.
{{valueToIdent "a value"}} | Will replace unsafe characters with underscores.


## Helpers

A helper that renders content if a Jsonotron type has a label with the given name:

```hbs
{{#hasLabel . name='myName'}}
  my content here
{{/hasLabel}}
```

A helper that renders content if a Jsonotron type has a label with the given name and value:

```hbs
{{#hasLabelValue . name='myName' value='myValue'}}
  my content here
{{/hasLabelValue}}
```

A helper that renders content if a Jsonotron type does **not** have a label with the given name:

```hbs
{{#hasNotLabel . name='myName'}}
  my content here
{{/hasNotLabel}}
```

A helper that renders content if a Jsonotron type does **not** have a label with the given name and value:

```hbs
{{#hasNotLabelValue . name='myName' value='myValue'}}
  my content here
{{/hasNotLabelValue}}
```

A helper that renders content if a Jsonotron type is tagged with the given tag name:

```hbs
{{#isTagged . with='special'}}
  my content here
{{/isTagged}}
```

A helper that renders content if a Jsonotron type is **not** tagged with the given tag name:

```hbs
{{#isNotTagged . with='not-found'}}
  my content here
{{/isTagged}}
```

A helper that renders content if the context value is found in the given array:

```hbs
{{#isIncluded name in='value1,value2'}}
  my content here
{{/isIncluded}}
```

A helper that renders content if the context value is **no** found in the given array:

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
