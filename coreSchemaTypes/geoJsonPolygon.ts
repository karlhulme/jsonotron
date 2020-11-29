import { SchemaType } from '../interfaces'

export const geoJsonPolygon: SchemaType = {
  name: 'geoJsonPolygon',
  title: 'GeoJSON Polygon',
  paragraphs: [
    'A boundary of connected points that encompasses a region on Earth.',
    'The co-ordinates must be specified in a counter-clockwise direction.',
    'The last co-ordinate should be a duplicate of the first co-ordinate.  This means the minimum number of elements in the co-ordinate array is 4.'
  ],
  examples: [
    {
      value: {
        type: 'Polygon',
        coordinates: [[31.8, -5], [31.8, -4.7], [32, -4.7], [32, -5], [31.8, -5]]
      },
      paragraphs: ['A region on Earth recorded in GeoJSON format expressed as a series of longitude and latitude pairs.']
    }
  ],
  validTestCases: [{ type: 'Polygon', coordinates: [[31.8, -5], [32, -4.7], [32, -5], [31.8, -5]] }],
  invalidTestCases: [
    123, null, true, {}, [],
    { type: 'polygon', coordinates: [[31.8, -5], [32, -4.7], [32, -5], [31.8, -5]] },
    { type: 'Polygon', coordinates: [[32, -4.7], [32, -5], [31.8, -5]] },
    // out of range longitude
    { type: 'Polygon', coordinates: [[183.8, -5], [32, -4.7], [32, -5], [31.8, -5]] },
    // out of range lattitude
    { type: 'Polygon', coordinates: [[31.8, -95], [32, -4.7], [32, -5], [31.8, -5]] }
  ],
  jsonSchema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      type: { enum: ['Polygon'] },
      coordinates: {
        type: 'array',
        minItems: 4,
        items: {
          type: 'array',
          minItems: 2,
          maxItems: 2,
          items: [{
            type: 'number',
            minimum: -180,
            maximum: 180
          }, {
            type: 'number',
            minimum: -90,
            maximum: 90
          }]
        }
      }
    },
    required: ['type', 'coordinates']
  }
}
