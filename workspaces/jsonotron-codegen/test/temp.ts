/**
       * Represents an item in an enumeration.
       */
 export interface EnumTypeItem {
  /**
   * The underlying value of the item.
   */
  value: string
  
  /**
   * The display text of the value in English.
   */
  text: string

  /**
   * The documentation associated with this item.
   */
  documentation?: string
  
  /**
   * If populated, this value explains why the value was deprecated and/or which item to use instead.
   */
  deprecated?: string
  
  /**
   * A symbol associated with the item
   */
  symbol?: string
}

export interface ExtendedEnumTypeItem<T> extends EnumTypeItem {
  data: T
}


/**
 * The types of the https://jsonotron.org/test system.
 */
export const TEST = {
  /**
   * The fully qualified name of the color type. 
   */
  color: 'https://jsonotron.org/test/color',

  /**
   * The fully qualified name of the size type. 
   */
  size: 'https://jsonotron.org/test/size',

  /**
   * The fully qualified name of the numbersList type. 
   */
  numbersList: 'https://jsonotron.org/test/numbersList',

  /**
   * The fully qualified name of the bed type. 
   */
  bed: 'https://jsonotron.org/test/bed',

  /**
   * The fully qualified name of the pillow type. 
   */
  pillow: 'https://jsonotron.org/test/pillow',

  /**
   * The fully qualified name of the drawer type. 
   */
  drawer: 'https://jsonotron.org/test/drawer'
}

/**
 * The types of the https://jsonotron.org/alt system.
 */
export const ALT = {
  /**
   * The fully qualified name of the direction type. 
   */
  direction: 'https://jsonotron.org/alt/direction'
}

/**
 * The types of the https://jsonotron.org/extra system.
 */
export const EXTRA = {
  /**
   * The fully qualified name of the table type. 
   */
  table: 'https://jsonotron.org/extra/table'
}

/**
 * A list of colors
 */
export const TEST_COLOR_VALUES = {
  /**
   * The color for errors
   */
  _1red: '1red',

  _2green: '2green'
}

/**
 * A list of sizes
 */
export const TEST_SIZE_VALUES = {
  regular: 'regular',

  large: 'large',

  xlarge: 'xlarge'
}

/**
 * A list of numbers
 */
export const TEST_NUMBERS_LIST_VALUES = {
  _1: '1',

  _2: '2',

  _3: '3'
}

/**
 * A list of directions (in an alternative system).
 */
export const ALT_DIRECTION_VALUES = {
  going_up: 'going/up',

  going_down: 'going/down',

  goingAround: 'goingAround'
}

/**
 * A list of colors
 */
export const testColorItems = [
  { value: '1red', text: 'Red', documentation: 'The color for errors', data: {"hexCode":"f00","isWarningColor":true} },
  { value: '2green', text: 'Green', data: {"hexCode":"0f0"} }
] as ExtendedEnumTypeItem<TestColor_Data>[]

/**
 * A list of sizes
 */
export const testSizeItems = [
  { value: 'regular', text: 'Regular', symbol: 'M' },
  { value: 'large', text: 'Large', symbol: 'L' },
  { value: 'xlarge', text: 'Extra Large', deprecated: 'Cannot source anymore.' }
] as EnumTypeItem[]

/**
 * A list of numbers
 */
export const testNumbersListItems = [
  { value: '1', text: '1 One' },
  { value: '2', text: '2 Two' },
  { value: '3', text: '3 Three' }
] as EnumTypeItem[]

/**
 * A list of directions (in an alternative system).
 */
export const altDirectionItems = [
  { value: 'going/up', text: 'Up' },
  { value: 'going/down', text: 'Down' },
  { value: 'goingAround', text: 'Around' }
] as EnumTypeItem[]

/**
 * A GraphQL resolver for the color enum.
 */
export const testColorResolver = {
  _1_RED: '1red',
  _2_GREEN: '2green'
}

/**
 * A GraphQL resolver for the size enum.
 */
export const testSizeResolver = {
  REGULAR: 'regular',
  LARGE: 'large',
  XLARGE: 'xlarge'
}

/**
 * A GraphQL resolver for the numbersList enum.
 */
export const testNumbersListResolver = {
  _1: '1',
  _2: '2',
  _3: '3'
}

/**
 * A GraphQL resolver for the direction enum.
 */
export const altDirectionResolver = {
  GOING_UP: 'going/up',
  GOING_DOWN: 'going/down',
  GOING_AROUND: 'goingAround'
}

/**
 * Custom data that is attached to each color enum item.
 */
export interface TestColor_Data {
  hexCode: string

  isWarningColor?: boolean
}

/**
 * A bed
 */
export interface TestBed {
  make: string

  thickness?: number

  pillow?: TestPillow

  /**
   * A value from the **direction** enum of the **alt** type system defined by **https://jsonotron.org**.
   */
  direction?: string
}

/**
 * A pillow
 */
export interface TestPillow {
  make: string

  color?: string
}

/**
 * The drawer_arrayOfObjects type.
 */
export interface TestDrawer_ArrayOfObjects {
  a?: string

  b?: string
}

/**
 * The drawer type.
 */
export interface TestDrawer {
  instructions?: Record<string, unknown>

  compact?: boolean

  fabrics?: string

  enumNumbers?: number

  enumBoolean?: boolean

  enumObjects?: Record<string, unknown>

  arrayOfStrings?: string[]

  arrayOfObjects?: TestDrawer_ArrayOfObjects[]

  /**
   * The age in years.
   */
  age?: number
}

/**
 * A table
 */
export interface ExtraTable {
  height?: number
}