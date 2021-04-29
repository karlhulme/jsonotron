import Ajv from 'ajv'
import { boolTypeDefSchema } from './boolTypeDefSchema'
import { enumTypeDefSchema } from './enumTypeDefSchema'
import { floatTypeDefSchema } from './floatTypeDefSchema'
import { intTypeDefSchema } from './intTypeDefSchema'
import { objectTypeDefSchema } from './objectTypeDefSchema'
import { recordTypeDefSchema } from './recordTypeDefSchema'
import { stringTypeDefSchema } from './stringTypeDefSchema'
import { TypeDefValidators } from './TypeDefValidators'

/**
 * Returns a set of validators for the various types.
 */
export function createTypeDefValidators (): TypeDefValidators {
  const ajv = new Ajv({ ownProperties: true })

  return {
    boolTypeDefValidator: ajv.compile(boolTypeDefSchema),
    enumTypeDefValidator: ajv.compile(enumTypeDefSchema),
    floatTypeDefValidator: ajv.compile(floatTypeDefSchema),
    intTypeDefValidator: ajv.compile(intTypeDefSchema),
    objectTypeDefValidator: ajv.compile(objectTypeDefSchema),
    recordTypeDefValidator: ajv.compile(recordTypeDefSchema),
    stringTypeDefValidator: ajv.compile(stringTypeDefSchema)
  }
}
