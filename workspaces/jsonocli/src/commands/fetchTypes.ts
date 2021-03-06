import { EnumType, SchemaType, TypeMap } from 'jsonotron-interfaces'
import fetch from 'node-fetch'

interface FetchTypesResponse {
  enumTypes: EnumType[]
  schemaTypes: SchemaType[]
  typeMap: TypeMap
}

/**
 * Returns the types that make up the given systems.
 * @param serverUrl The url for a types server.
 * @param systems An array of system names to retrieve.
 */
export async function fetchTypes (serverUrl: string, systems: string[]): Promise<FetchTypesResponse> {
  // fetch the list of systems
  const normalisedUrl = serverUrl.endsWith('/') ? serverUrl : serverUrl + '/'
  const typesUrl = normalisedUrl + 'types'
  const typesResponse = await fetch(`${typesUrl}?n=${systems.map(s => encodeURIComponent(s)).join(',')}`)

  // check the result of the fetch
  if (typesResponse.status !== 200) {
    throw new Error('Unable to retrieve systems from server:\n' +
      `Response code ${typesResponse.status}\n` +
      `${await typesResponse.text()}`
    )
  }

  // get the body of the response
  const types = await typesResponse.json()
  return types
}
