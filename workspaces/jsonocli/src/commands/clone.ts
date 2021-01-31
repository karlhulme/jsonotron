import { mkdir, writeFile } from 'fs/promises'
import fetch from 'node-fetch'

/**
 * Clone the systems at a remote jsonoserve server and store them
 * as local JSON files.
 * @param serverUrl The url of a jsonoserve server.
 * @param dir The folder to write the files too.
 */
export async function clone (serverUrl: string, dir: string): Promise<void> {
  // normalise the server url
  const normalisedUrl = serverUrl.endsWith('/') ? serverUrl : serverUrl + '/'
  const systemsUrl = normalisedUrl + 'systems'

  // normalise the path
  const normalisedDir = dir.endsWith('/') ? dir : dir + '/'
  if (!normalisedDir.startsWith('.')) {
    throw new Error('Path should be relative.')
  }

  // ensure all the directories are created
  await mkdir(normalisedDir, { recursive: true })

  // fetch the list of systems
  const systemsResult = await fetch(systemsUrl)

  // check the result of the fetch
  if (systemsResult.status !== 200) {
    throw new Error('Unable to retrieve systems from server:\n' +
      `Response code ${systemsResult.status}\n` +
      `${await systemsResult.text()}`
    )
  }

  // convert the systems to json
  const systemsJson = await systemsResult.json()

  // loop over the systems
  for (const system of systemsJson.systems) {
    // build the url for a system
    const systemUrl = `${systemsUrl}/${encodeURIComponent(system.domain + '/' + system.system)}`

    // fetch the types for the system
    const systemResult = await fetch(systemUrl)

    // check the result of the fetch
    if (systemResult.status !== 200) {
      throw new Error('Unable to retrieve system from server:\n' +
        `Response code ${systemsResult.status}\n` +
        `${await systemsResult.text()}`
      )
    }

    // convert the result to json
    const systemJson = await systemResult.json()

    // loop over the types
    for (const typeElement of systemJson.types) {
      // convert the full type to a shorter name by dropping domain
      const shortDomain = typeElement.domain.replace('http://', '').replace('https://', '')

      // choose a target path for the json file
      const targetPath = `${normalisedDir}${shortDomain}_${typeElement.system}_${typeElement.name}.json`

      // write out the json file
      await writeFile(targetPath, typeElement.definition, 'utf8')
    }
  }
}
