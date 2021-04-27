import fg from 'fast-glob'
import { readFile } from 'fs/promises'
import { Template, TemplatePartial } from 'jsonotron-interfaces'

/**
 * Returns an array of TemplateSystem's pulled from the given folder.
 * The files are sorted alphabetically by path during the process.
 * @param folder A folder.
 */
export async function loadTemplatesFromFolder (folder: string): Promise<Template[]> {
  const normalisedFolder = folder.endsWith('/') ? folder : folder + '/'
  const searchPhrase = `${normalisedFolder}**/index.hbs`
  const indexFiles = await fg(searchPhrase)

  return Promise.all(indexFiles.sort().map(async indexFile => {
    const parentPath = indexFile.substring(0, indexFile.length - 10) // knockoff "/index.hbs"

    const name = parentPath.substring(parentPath.lastIndexOf('/') + 1)

    const content = await readFile(indexFile, 'utf-8') 

    const partialFiles = await fg(`${parentPath}/*.hbs`)

    const partialFilesToLoad = partialFiles
      .filter(f => !f.endsWith('index.hbs'))
      .sort()

    const partials = await Promise.all(partialFilesToLoad.map(async partialFile => {
      const partialName = partialFile.substring(partialFile.lastIndexOf('/') + 1, partialFile.length - 4)

      const partialContent = await readFile(partialFile, 'utf-8')

      const partial: TemplatePartial = {
        name: partialName,
        content: partialContent
      }

      return partial
    }))

    const templateSystem: Template = {
      name,
      content,
      partials
    }

    return templateSystem
  }))
}
