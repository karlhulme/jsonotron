/**
 * Raised if two types within a single system have been
 * given the same name.
 */
 export class DuplicateTypeNameError extends Error {
  systemQualifiedTypeName: string

  /**
   * Constructs a new instance.
   * @param systemQualifiedTypeName The system-qualified name of a type.
   */
  constructor (systemQualifiedTypeName: string) {
    super(`System qualified name ${systemQualifiedTypeName} is not unique.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.systemQualifiedTypeName = systemQualifiedTypeName
  }
}
