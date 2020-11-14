import * as allEnumTypes from './coreEnumTypes/index.js'
import * as allSchemaTypes from './coreSchemaTypes/index.js'

// export all the enum types as a single array
export const coreEnumTypes = Object.keys(allEnumTypes).map(key => allEnumTypes[key])

// export all the schema types as a single array
export const coreSchemaTypes = Object.keys(allSchemaTypes).map(key => allSchemaTypes[key])

// export the jsonotron types
export { Jsonotron } from './Jsonotron/index.js'
export { JsonotronFieldBlockDefinitionCompilationError, JsonotronInitialisationError } from './errors/index.js'
export { createTypeProcError, deepClone, JSON_SCHEMA_DECLARATION, JSON_SCHEMA_DEFINITIONS_PATH, pascalToTitleCase } from './shared/index.js'
export { createCustomisedAjv } from './jsonSchemaValidation/index.js'
