/* eslint-env jest */
import { createJsonSchemaForParameterStringBlock } from './createJsonSchemaForParameterStringBlock'

const createParameterBlock = () => ({
  propA: { isRequired: true, paragraphs: ['A description'] },
  propB: { isGuaranteed: true },
  propC: { }
})

test('A schema can be created for a parameter block.', () => {
  const parameterBlock = createParameterBlock()
  expect(createJsonSchemaForParameterStringBlock('test', parameterBlock)).toEqual({
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'test',
    type: 'object',
    properties: {
      propA: { type: 'string' },
      propB: { type: 'string' },
      propC: { type: 'string' }
    },
    required: ['propA', 'propB']
  })
})
