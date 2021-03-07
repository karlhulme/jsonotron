import { JsonoserveTypes } from './fetchTypes'

export interface GenerateCodeParameters {
  types: JsonoserveTypes
}

export interface CodeGenerator {
  generate: (props: GenerateCodeParameters) => string
}
