import { mkdir, writeFile } from 'fs/promises'
import { CodeGenerator } from './CodeGenerator'
import { TypescriptCodeGenerator } from './codegen_typescript'
import { fetchTypes } from './fetchTypes'

/**
 * Returns an object that can generate code in the language
 * associated with the given path.
 * @param path The path of the file to be populated by the code generator.
 */
function chooseGenerator (path: string): CodeGenerator {
  if (path.endsWith('.ts')) {
    return new TypescriptCodeGenerator()
  } else {
    throw new Error('Unrecognised extension on code file.')
  }
}

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

  // get the code generator
  const generator = chooseGenerator(path)

  // generate code content
  const content = generator.generate({ types })

  // write out the code file
  await writeFile(path, content, 'utf8')
}
