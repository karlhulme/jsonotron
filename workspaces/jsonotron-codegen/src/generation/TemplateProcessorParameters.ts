import { TemplatePartial } from './TemplatePartial'

/**
 * Encapsulates the environmental setup parameters for a template processor.
 */
export interface TemplateProcessorParameters {
  /**
   * A handlebars (entry-point) template.
   */
  template: string,

  /**
   * An array of partial handlebars templates that can be re-used by
   * the main entry point template.
   */
  partials?: TemplatePartial[]
}
