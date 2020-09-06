import check from 'check-types'

export class JsonotronFieldBlockDefinitionCompilationError extends Error {
  constructor (errors) {
    check.assert.array.of.object(errors)
    super('The compilation of a Field Block Definition failed because the definition was not valid.')
    this.name = this.constructor.name
    this.errors = errors
  }
}
