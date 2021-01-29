/**
 * Raised if the kind of a type object is not recognised.
 */
export class UnrecognisedTypeKindError extends Error {
  kind: string

  /**
   * Constructs a new instance.
   * @param kind The unrecognised kind.
   */
  constructor (kind: string) {
    super(`Type kind ${kind} is not recognised.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.kind = kind
  }
}
