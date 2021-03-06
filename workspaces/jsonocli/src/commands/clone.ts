import { mkdir, writeFile } from 'fs/promises'
import { fetchTypes } from './fetchTypes'

/**
 * Clone the systems at a remote jsonoserve server and store them
 * as local JSON files.
 * @param serverUrl The url of a jsonoserve server.
 * @param dir The folder to write the files too.
 * @param systems An array of systems names.
 */
export async function clone (serverUrl: string, dir: string, systems: string[]): Promise<void> {
  // normalise the path
  const normalisedDir = dir.endsWith('/') ? dir : dir + '/'
  if (!normalisedDir.startsWith('.')) {
    throw new Error('Path should be relative.')
  }

  // ensure all the directories are created
  await mkdir(normalisedDir, { recursive: true })
  
  // fetch the list of systems
  const types = await fetchTypes(serverUrl, systems)

  // loop over the enums
  for (const enumType of types.enumTypes) {
    // convert the full type to a shorter name by dropping protocol
    const shortDomain = enumType.domain.replace('http://', '').replace('https://', '')

    // choose a target path for the json file
    const targetPath = `${normalisedDir}${shortDomain}_${enumType.system}_${enumType.name}.json`
 
    // write out the json file
    await writeFile(targetPath, JSON.stringify(enumType, null, 2), 'utf8')
  }

  // loop over the schemas
  for (const schemaType of types.schemaTypes) {
    // convert the full type to a shorter name by dropping protocol
    const shortDomain = schemaType.domain.replace('http://', '').replace('https://', '')

    // choose a target path for the json file
    const targetPath = `${normalisedDir}${shortDomain}_${schemaType.system}_${schemaType.name}.json`
 
    // write out the json file
    await writeFile(targetPath, JSON.stringify(schemaType, null, 2), 'utf8')
  }
}
