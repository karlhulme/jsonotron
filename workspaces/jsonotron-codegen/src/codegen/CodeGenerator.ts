import { CodeGenerationParameters } from './CodeGenerationParameters'

export interface CodeGenerator {
  generate: (params: CodeGenerationParameters) => string
}
