import { mkdir, writeFile } from 'fs/promises'
import fetch from 'node-fetch'

/**
 * Retrieves typescript data from a jsonotron service and writes
 * it to a target file.
 * @param serverUrl The url of a jsonoserve server.
 * @param path The target path for the output file.
 * @param systems An array of system names.
 */
export async function typescript (serverUrl: string, path: string, systems: string[]): Promise<void> {
  // check the path
  if (!path.startsWith('.')) {
    throw new Error('Path should be relative.')
  }

  // ensure all the directories are created, upto the path
  const lastDividerIndex = path.lastIndexOf('/')
  await mkdir(path.slice(0, lastDividerIndex), { recursive: true })
  
  // build the url
  const normalisedBaseUrl = serverUrl.endsWith('/') ? serverUrl : serverUrl + '/'
  const url = `${normalisedBaseUrl}typescript?systems=${systems.map(s => encodeURIComponent(s)).join(',')}`

  // get content
  const response = await fetch(url)

  // check the result of the fetch
  if (response.status !== 200) {
    throw new Error('Unable to retrieve content from server:\n' +
      `Response code ${response.status}\n` +
      `${await response.text()}`
    )
  }

  // get the response data
  const data = await response.json()

  // check data
  if (typeof data?.typescript !== 'string') {
    throw new Error('Expected property \'typescript\' not found on the response.')
  }

  // write out the file
  await writeFile(path, data.typescript, 'utf8')
}
