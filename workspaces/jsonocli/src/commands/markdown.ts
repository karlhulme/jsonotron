import { writeFile } from 'fs/promises'
import fetch from 'node-fetch'
import { ensurePathDirectoriesExist, ensurePathIsRelative } from '../utils'

/**
 * Retrieves markdown from a jsonotron service and writes
 * it to a target file.
 * @param serverUrl The url of a jsonoserve server.
 * @param path The target path for the output file.
 * @param systems An array of system names.
 */
export async function markdown (serverUrl: string, path: string, systems: string[]): Promise<void> {
  ensurePathIsRelative(path)
  ensurePathDirectoriesExist(path)
  
  // build the url
  const normalisedBaseUrl = serverUrl.endsWith('/') ? serverUrl : serverUrl + '/'
  const url = `${normalisedBaseUrl}markdown?systems=${systems.map(s => encodeURIComponent(s)).join(',')}`

  // get content
  const response = await fetch(url)

  // check the result of the fetch
  if (response.status !== 200) {
    throw new Error('Unable to retrieve markdown from server:\n' +
      `Response code ${response.status}\n` +
      `${await response.text()}`
    )
  }

  // get the response data
  const data = await response.json()

  // check data
  if (typeof data?.markdown !== 'string') {
    throw new Error('Expected property \'markdown\' not found on the response.')
  }

  // write out the file
  await writeFile(path, data.markdown, 'utf8')
}
