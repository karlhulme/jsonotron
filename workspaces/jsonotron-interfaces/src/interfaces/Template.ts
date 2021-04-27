import { TemplatePartial } from './TemplatePartial'

/**
 * Represents a template for producing a type system in a target language and/or framework.
 */
export interface Template {
  /**
   * The name of the language and/or framework that is produced by applying this template.
   */
  name: string

  /**
   * The content, which is a handlebars template.
   */
  content: string

  /**
   * An array of partial handlebars templates that can be re-used by
   * the main entry point template.
   */
  partials?: TemplatePartial[]
}
