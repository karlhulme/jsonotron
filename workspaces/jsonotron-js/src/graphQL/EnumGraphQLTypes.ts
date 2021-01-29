

/**
 * The GraphQL type definitions for a Jsonotron enumeration.
 */
export const EnumGraphQLTypes = `
"""
An enumeration of values.
"""
type EnumType {
  """
  The domain of the enumeration that serves as a namespace.
  """
  domain: String!

  """
  The system that the enum belongs to.
  """
  system: String!

  """
  The name of the enum.
  """
  name: String!

  """
  The title of the enum that is suitable for display.
  """
  title: String!

  """
  An array of items that are contained within this enumeration.
  """
  items: [EnumTypeItem!]!
}

"""
An item from an enumeration.
"""
type EnumTypeItem {
  """
  The underlying value.
  """
  value: String!

  """
  The display text.
  """
  text: String!

  """
  A symbol associated with the enum value.
  """
  symbol: String

  """
  Populated if the enum value is deprecated, explaining the reason for the deprecation and/or the value to use in it's place.
  """
  deprecated: String
}
`
