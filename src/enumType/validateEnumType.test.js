/* eslint-env jest */
import { validateEnumType } from './validateEnumType'

function createFullEnumType () {
  return {
    name: 'candidateEnumType',
    title: 'Candidate Enum Type Here',
    paragraphs: ['A description of the enum', 'appears here.'],
    items: [
      { value: 'en', paragraphs: ['England'], symbol: 'EN' },
      { value: 'us', paragraphs: ['United States'], isDeprecated: false },
      { value: 'fr', paragraphs: ['France'] }
    ]
  }
}

function testBody (mutator, isSuccessful, isSuccessulWithNoWarnings) {
  const candidate = createFullEnumType()
  mutator(candidate)
  const result = validateEnumType(candidate)
  expect(result.isSuccessful()).toEqual(isSuccessful)
  expect(result.isSuccessfulWithNoWarnings()).toEqual(isSuccessulWithNoWarnings)
}

test('An invalid enum type is not successfully validated', () => {
  testBody(e => { delete e.name }, false, false)
  testBody(e => { e.name = 123 }, false, false)
  testBody(e => { e.name = '123' }, false, false)

  testBody(e => { e.title = 123 }, false, false)

  testBody(e => { e.paragraphs = 123 }, false, false)
  testBody(e => { e.paragraphs = [123] }, false, false)

  testBody(e => { delete e.items }, false, false)
  testBody(e => { e.items = 123 }, false, false)
  testBody(e => { e.items = [] }, false, false)
  testBody(e => { e.items = [123] }, false, false)
  testBody(e => { delete e.items[0].value }, false, false)
  testBody(e => { e.items[0].value = 123 }, false, false)
  testBody(e => { e.items[1].value = 'en' }, false, false) // this creates 'en' as a duplicated value
  testBody(e => { e.items[0].symbol = 123 }, false, false)
  testBody(e => { e.items[0].isDeprecated = 123 }, false, false)
  testBody(e => { e.items[0].paragraphs = 123 }, false, false)
  testBody(e => { e.items[0].paragraphs = [123] }, false, false)
})

test('An undocumented enum type is successfully validated but not without warnings', () => {
  testBody(e => { delete e.title }, true, false)

  testBody(e => { delete e.paragraphs }, true, false)
  testBody(e => { e.paragraphs = [] }, true, false)

  testBody(e => { delete e.items[0].paragraphs }, true, false)
  testBody(e => { e.items[0].paragraphs = [] }, true, false)
})

test('A fully documented enum type is successfully validated with no warnings', () => {
  testBody(e => e, true, true)
})
