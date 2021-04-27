/**
 * Represents a partial that can be called by a parent template.
 */
export interface TemplatePartial {
  /**
   * The name of the partial, used in the {{> myPartial }} call.
   */
  name: string

  /**
   * The content of the partial, which is a handlebars template.
   */
  content: string
}
