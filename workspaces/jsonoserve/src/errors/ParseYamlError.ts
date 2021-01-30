/**
 * Raised if YAML cannot be parsed.
 */
export class ParseYamlError extends Error {
  contents: string
  err: Error

  /**
   * Constructs a new instance.
   * @param contents The YAML being parsed.
   * @param err The underlying error raised by the parser.
   */
  constructor (contents: string, err: Error) {
    super(`Failed to parse YAML: ${contents.substring(0, 30).replace(/\n/g, '\\n')}...\n${err.message} `)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.contents = contents
    this.err = err
  }
}
