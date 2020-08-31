/**
 * Returns the given string converted into title case.  For example,
 * "helloWorld" becomes "Hello World".
 * @param {String} pascalText A string in pascal case.
 */
export function pascalToTitleCase (pascalText) {
  const initialCap = pascalText.charAt(0).toUpperCase()
  const spacedOutSection = pascalText.slice(1).replace(/([A-Z])/g, ' $1')
  return (initialCap + spacedOutSection).trim()
}
