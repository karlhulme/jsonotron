# Jsonotron-JS

A javascript implementation of the [Jsonotron](https://github.com/karlhulme/jsonotron) type system using the JSON schema validation engine [AJV](https://ajv.js.org/).

![](https://github.com/karlhulme/jsonotron-js/workflows/CD/badge.svg)
[![npm](https://img.shields.io/npm/v/jsonotron-js.svg)](https://www.npmjs.com/package/jsonotron-js)
![npm type definitions](https://img.shields.io/npm/types/typescript)


## Installation

```bash
npm install jsonotron-js
```


## Instantiate a Jsonotron runtime

You will need to define some types, as per the instructions for [Jsonotron](https://github.com/karlhulme/jsonotron).  You will then typically load the types (in a loop) into string variables that can be passed to the Jsonotron class constructor.

```javascript
import { Jsonotron } from 'jsonotron-js'

const colorType = fs.readFileSync('./typeSystem/example/color.yaml', 'utf-8')

const jsonotron = new Jsonotron({
  types: [colorType],
  jsonSchemaFormatValidators: {
    'mycompany-testFormatFunc': v => v.length > 5
  }
})
```

If you have schema types that require bespoke formatters then these can be loaded by passing the format functions as keys on the `jsonSchemaFormatValidators` function.


## Validate a Value or a Value Array

You can perform validation using either a short or a fully qualified type name.  The validation process returns a `ValueValidationResult`:

* **resolved**: True if the type was resolved to an enum or schema definition, otherwise false.  If you have multiple type systems in use you may need to fully qualify the type name supplied.
* **validated**: True if the value conforms to the definition in the corresponding enum or schema definition.
* **message**: Contains additional information if either `resolved` or `validated` are false.

```javascript
jsonotron.validateValue('color', 'red') // { resolved: true, validated: true }
jsonotron.validateValue('http://jsonotron.org/example/color', 'blue') // { resolved: true, validated: true }

jsonotron.validateValueArray('color', ['green', 'yellow']) // { resolved: true, validated: true }
jsonotron.validateValueArray('http://jsonotron.org/example/color', ['green', 'yellow']) // { resolved: true, validated: true }

jsonotron.validateValue('madeup', null) // { resolved: false, validated: false, message: ... }
jsonotron.validateValue('color', 'not-a-color') // { resolved: true, validated: false, message: ... }
```


## Validate a Structure

You can validate a structure by specifying the requirements of each field.

* **isRequired**: True if a value must be supplied for the structure to be valid.  Null is a supplied value, although it may not be acceptable.
* **isNullable**: True if a value can be null and the structure remain valid.
* **isArray**: True if an array of values is expected.

The `validateStructure` function returns a `StructureValidationResult`:

* **validated**: True if the structure conforms to the definition described by the fields and field properties.
* **fields**: An array of fields that failed validation.
* **fields.name**: The name of a field that failed validation.
* **fields.message**: A detailed validation error.

```javascript
const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
const jsonotron = new Jsonotron({ types: [colorType] })

jsonotron.validateStructure({
  doorColor: { type: 'color', isRequired: true },
  windowColor: { type: 'color', isNullable: true },
  wallColors: { type: 'color', isArray: true }
}, {
  doorColor: 'red',
  windowColor: null,
  wallColors: ['green', 'blue']
} // { validated: true , fields: [] })
```


## Extract types

You can extract the types at runtime.  

```javascript
jsonotron.getEnumTypes()
jsonotron.getSchemaTypes()
jsonotron.getFullyQualifiedTypeName('typeShortName')
```

The `getEnumTypes` function returns an array of `EnumType` objects.

The `getSchemaTypes` function returns an array of `SchemaType` objects.

The `getFullyQualifiedTypeName` function returns the fully qualified type name given a short name.


## Markdown Generation

You can generate markdown documentation:

```javascript
jsonotron.getMarkdownForTypeSystem({
  title: 'My System',
  domain: 'https://mydomain.org',
  system: 'sys',
  referencedTypeSystems: [
    domain: 'https://jsonotron.org',
    system: 'jss',
    href: 'https://github.com/karlhulme/jsonotron/blob/master/systems/jss/docs.autogen.md'
  ]
})
```


## GraphQL Generation

You can get the equivalent GraphQL primitive of a jsonotron type.

Schema types that are based on an object (rather than number, integer, string or boolean) will be given the `JSON` type.  This is necessary because GraphQL uses null to represent requested but unpopulated data, whereas within Jsonotron null is a valid value within a schema type value.  Experiments with converting a JSON schema to GraphQL exposed a problem where GraphQL will insert nulls for those optional fields, and this could be at any level within a schema type value.  This creates friction when trying to round-trip a schema type value, because these optional nulls need to be removed before the data can be validated again. Serialising object-based schema types as JSON avoids the population of nulls by a GraphQL server.

If you are using the types somewhere else in the system (such as in a front-end client) use the typescript generation to create strongly typed wrappers.

```javascript
jsonotron.getGraphQLPrimitiveType({ typeName: 'color', isArray: true, isRequired: true })
// assuming 'color' is an enum type, the result would be [String!]!
```

If you specify isArray, then the type will be wrapped in array markers and each array element will be non-null:  `[MyType!]`
If you specify isRequired, then the type will be appended with a required marker: `MyType!`
If you specify both you'll get `[MyType!]!`


## Design Decisions

Jsonotron creates a separate schema for the array version of each enum and schema type.  This means that a structure can be validated at the field level.  If a field is given the `isArray=true` property, and the supplied value has multiple invalid entries in said array, the field will appear only once in the `StructureValidationResult`.


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
