import { ReferencedTypeSystem } from './ReferencedTypeSystem'

/**
 * Represents the properties that can be passed
 * to the createMarkdownForTypeSystem function.
 */
export interface MarkdownGenerationProps {
  /**
   * The title for the markdown page.
   */
  title: string

  /**
   * The name of the domain of the types to document. 
   */
  domain: string

  /**
   * The name of the system of the types to document.
   */
  system: string

  /**
   * An array of referenced type systems.
   */
  referencedTypeSystems: ReferencedTypeSystem[]
}
