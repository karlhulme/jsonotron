import check from 'check-types'

export class JsonotronInitialisationError extends Error {
  constructor (errors) {
    check.assert.array.of.object(errors)
    super('The Jsonotron initialisation process failed because the provided types were not valid.\n\n' + JSON.stringify(errors, null, 2))
    this.name = this.constructor.name
    this.errors = errors
  }
}
