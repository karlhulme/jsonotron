/**
 * Returns the given text string with initial letters capitalise.
 * An initial letter is considered to be
 * (a) The first letter, and
 * (b) A letter that follows an underscore, and
 * (c) A letter that follows an open square bracket.
 * @param text A text string.
 */
export function capitalizeInitialLetters (text: string): string {
  let result = ''
  let capNext = true

  for (let i = 0; i < text.length; i++) {
    if (capNext) {
      result += text[i].toUpperCase() 
    } else {
      result += text[i]
    }

    capNext = ['[', '_'].includes(text[i])
  }

  return result
}
