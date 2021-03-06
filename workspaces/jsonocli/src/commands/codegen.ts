import { mkdir, writeFile } from 'fs/promises'
import { fetchTypes } from './fetchTypes'

/**
 * Retrieve the enum and schema types from a remote
 * Jsonotron server and use them to generate code.
 * @param serverUrl The url of a jsonoserve server.
 * @param path: The target path for the output file.
 * @param systems An array of systems names.
 */
export async function codegen (serverUrl: string, path: string, systems: string[]): Promise<void> {
  // check the path
  if (!path.startsWith('.')) {
    throw new Error('Path should be relative.')
  }

  // ensure all the directories are created, upto the path
  const lastDividerIndex = path.lastIndexOf('/')
  await mkdir(path.slice(0, lastDividerIndex), { recursive: true })

  // fetch the list of systems
  const types = await fetchTypes(serverUrl, systems)

  const codeContent = types.typeMap.refTypes.map(r => r.name).join(',')

  // write out the code file
  await writeFile(path, codeContent, 'utf8')
}
