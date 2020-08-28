/* eslint-env jest */
const createApiResourceTypeFromDocType = require('./createApiResourceTypeFromDocType')

function createDocType () {
  return {
    name: 'country',
    pluralName: 'countries',
    title: 'Country',
    pluralTitle: 'Countries',
    summary: 'Information about a country.',
    paragraphs: [
      'This document represents a country and stores information about it.'
    ],
    policy: {
      canFetchWholeCollection: true,
      canReplaceDocuments: true,
      canDeleteDocuments: true,
      maxOpsSize: 5
    },
    fields: {
      fullName: { type: 'mediumString', isRequired: true, canUpdate: true, paragraphs: ['The scientist\'s full name.'] },
      dateOfBirth: { type: 'date', isRequired: true, canUpdate: true, paragraphs: ['The date of birth.'] },
      countryOfBirth: { type: 'countryCode', isRequired: true, canUpdate: true, paragraphs: ['The country where the scientist was born.'] },
      awards: { type: 'mediumString', isRequired: true, isArray: true, paragraphs: ['The names of the scientist\'s awards.'] },
      areaOfStudy: { type: 'longString', default: 'Philosophy', canUpdate: true, paragraphs: ['The primary areas of study for the scientist.'] },
      associateId: { type: 'sysId', canUpdate: true, paragraphs: ['The id of the %%scientist%% that has supported them the most in their career.'] },
      title: { type: 'shortString', canUpdate: true, paragraphs: ['The prefix used when formally addressing the scientist.  For example Ms or Mr.'] },
      age: { type: 'positiveIntegerOrZero', canUpdate: true, isDeprecated: true, paragraphs: ['The age of a person.  Use date of birth instead.'] }
    },
    examples: [{
      paragraphs: ['One of the most influential thinkers of all time, Albert Einstein.'],
      value: {
        fullName: 'Albert Einstein',
        dateOfBirth: '1879-03-14',
        countryOfBirth: 'de',
        awards: ['Barnard Medal', 'Matteucci Medal', 'Copley Medal'],
        numberOfAwards: 3
      }
    }, {
      paragraphs: ['Sir Isaac Newton was an English mathematician, physicist, astronomer, theologian, and author.'],
      value: {
        fullName: 'Isaac Newton',
        dateOfBirth: '1642-12-25',
        countryOfBirth: 'gb',
        awards: ['FRS', 'Knight Bachelor'],
        numberOfAwards: 2
      }
    }],
    validate: doc => {
      if (doc.countryOfBirth === 'ca') {
        throw new Error('No Canadian scientists allowed.')
      }
    },
    preSave: doc => {
      if (typeof doc.age !== 'undefined') {
        delete doc.age
      }
    },
    calculatedFields: {
      numberOfAwards: {
        inputFields: ['awards'],
        type: 'positiveIntegerOrZero',
        value: data => (data.awards || []).length,
        paragraphs: ['The number of awards given to the scientist.']
      }
    },
    filters: {
      byCountryCode: {
        title: 'By Country Code',
        paragraphs: ['Fetch scientists that were born in a specific country.'],
        parameters: {
          countryCode: { type: 'countryCode', isRequired: true, paragraphs: ['A country code.'] }
        },
        examples: [{
          paragraphs: ['Retrieve the list of scientists born in Germany.'],
          value: {
            countryCode: 'de'
          }
        }],
        implementation: input => d => d.countryCode === input.countryCode
      }
    },
    ctor: {
      parameters: {
        isMedicalDoctor: { type: 'boolean', paragraphs: ['True if the `areaOfStudy` should be initialised to medicine, and the `title` should be initialised to Sir'] }
      },
      title: 'Create New Scientist',
      paragraphs: ['Creates a new scientist document.'],
      implementation: input => {
        return input.isMedicalDoctor
          ? {
            title: 'Dr',
            areaOfStudy: 'medicine'
          }
          : {}
      },
      examples: [{
        paragraphs: ['A constructor using the regular update fields.'],
        value: {
          fullName: 'Albert Einstein',
          dateOfBirth: '1879-03-14',
          countryOfBirth: 'de'
        }
      }, {
        paragraphs: ['A constructor using the `isMedicalDoctor` constructor parameter.  Although the constructor will initialise the `title` field, we\'re overriding here.'],
        value: {
          isMedicalDoctor: true,
          fullName: 'Alexander Fleming',
          dateOfBirth: '1881-08-06',
          countryOfBirth: 'gb',
          title: 'Sir'
        }
      }]
    },
    operations: {
      addAward: {
        title: 'Add Award',
        paragraphs: ['Adds an award that the scientist has received.'],
        parameters: {
          awardName: { type: 'mediumString', isRequired: true, paragraphs: ['The name of an award.'] }
        },
        implementation: (doc, input) => ({
          awards: doc.awards.concat(input.awardName)
        }),
        examples: [{
          paragraphs: ['This example shows how to add the Nobel Prize for Physics to a scientist document.'],
          value: {
            awardName: 'Nobel Prize for Physics'
          }
        }]
      }
    },
    docStoreOptions: {
      specialFlag: 'example_123'
    }
  }
}

test('A doc type can be converted to an api resource.', () => {
  const candidate = createDocType()
  const apiResourceType = createApiResourceTypeFromDocType(candidate)
  expect(apiResourceType).toBeDefined()
})
