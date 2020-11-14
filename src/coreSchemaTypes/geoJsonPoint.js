export const geoJsonPoint = {
  name: 'geoJsonPoint',
  title: 'GeoJSON Point',
  paragraphs: ['A point on Earth.'],
  examples: [
    {
      value: {
        type: 'Point',
        coordinates: [31.9, -4.8]
      },
      paragraphs: [
        'A position on Earth recorded in GeoJSON format expressed as a longitude and latitude pair.',
        'The properties should be supplied in the correct order, longitude first and latitude second.'
      ]
    }
  ],
  validTestCases: [{ type: 'Point', coordinates: [31.9, -4.8] }],
  invalidTestCases: [
    123, null, true, {}, [],
    { type: 'point', coordinates: [31.9, -4.8] },
    // out of range longitude
    { type: 'Point', coordinates: [182, 27.9] },
    // out of range latitude
    { type: 'Point', coordinates: [10.2, -98.2] }
  ],
  jsonSchema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      type: { enum: ['Point'] },
      coordinates: {
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
    },
    required: ['type', 'coordinates']
  }
}
