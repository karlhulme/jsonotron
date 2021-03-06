import { mkdir, writeFile } from 'fs/promises'
import { EnumType, SchemaType } from 'jsonotron-interfaces'
import fetch from 'node-fetch'

/**
 * Clone the systems at a remote jsonoserve server and store them
 * as local JSON files.
 * @param serverUrl The url of a jsonoserve server.
 * @param dir The folder to write the files too.
 * @param systems An array of systems names.
 */
export async function clone (serverUrl: string, dir: string, systems: string[]): Promise<void> {
  // normalise the server url
  const normalisedUrl = serverUrl.endsWith('/') ? serverUrl : serverUrl + '/'
  const typesUrl = normalisedUrl + 'types'

  // normalise the path
  const normalisedDir = dir.endsWith('/') ? dir : dir + '/'
  if (!normalisedDir.startsWith('.')) {
    throw new Error('Path should be relative.')
  }

  // ensure all the directories are created
  await mkdir(normalisedDir, { recursive: true })
  
  // fetch the list of systems
  const typesResponse = await fetch(`${typesUrl}?n=${systems.map(s => encodeURIComponent(s)).join(',')}`)

  // check the result of the fetch
  if (typesResponse.status !== 200) {
    throw new Error('Unable to retrieve systems from server:\n' +
      `Response code ${typesResponse.status}\n` +
      `${await typesResponse.text()}`
    )
  }

  // convert the response to json
  const types = await typesResponse.json()

  // loop over the enums
  for (const enumType of types.enumTypes as EnumType[]) {
    // convert the full type to a shorter name by dropping protocol
    const shortDomain = enumType.domain.replace('http://', '').replace('https://', '')

    // choose a target path for the json file
    const targetPath = `${normalisedDir}${shortDomain}_${enumType.system}_${enumType.name}.json`
 
    // write out the json file
    await writeFile(targetPath, JSON.stringify(enumType, null, 2), 'utf8')
  }

  // loop over the schemas
  for (const schemaType of types.schemaTypes as SchemaType[]) {
    // convert the full type to a shorter name by dropping protocol
    const shortDomain = schemaType.domain.replace('http://', '').replace('https://', '')

    // choose a target path for the json file
    const targetPath = `${normalisedDir}${shortDomain}_${schemaType.system}_${schemaType.name}.json`
 
    // write out the json file
    await writeFile(targetPath, JSON.stringify(schemaType, null, 2), 'utf8')
  }
}
