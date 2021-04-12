import { mkdir } from 'fs/promises'

/**
 * Ensures the directories that make up the path are created.
 * @param path A path string.
 */
export async function ensurePathDirectoriesExist (path: string): Promise<void> {
  const lastDividerIndex = path.lastIndexOf('/')
  await mkdir(path.slice(0, lastDividerIndex), { recursive: true })
}
