import check from 'check-types'

export class JsonotronFieldBlockDefinitionCompilationError extends Error {
  constructor (errors) {
    check.assert.array.of.object(errors)
    super('The compilation of a Field Block Definition failed because the definition was not valid.\n\n' + JSON.stringify(errors, null, 2))
    this.name = this.constructor.name
    this.errors = errors
  }
}
