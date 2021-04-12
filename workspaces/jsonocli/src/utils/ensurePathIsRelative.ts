/**
 * Raises an error if the given path is absolute.
 * @param path A path.
 */
export function ensurePathIsRelative (path: string): void {
  if (!path.startsWith('.')) {
    throw new Error('Path should be relative.')
  }
}
