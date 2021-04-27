import { TypeLibrary } from 'jsonotron-interfaces'

/**
 * Encapsulates the context data that is used by a template processor.
 */
export interface TemplateProcessorContext {
  /**
   * A type library.
   */
  typeLibrary: TypeLibrary

  /**
   * The date/time that the processor is being run.
   */
  generatedDateTime: string
}
