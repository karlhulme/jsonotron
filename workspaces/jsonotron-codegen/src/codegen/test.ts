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
export const test_colorValues = {
  /**
   * The color for errors
   */
  RED: 'RED',

  GREEN: 'GREEN'
}

/**
 * A list of sizes
 */
export const test_sizeValues = {
  REGULAR: 'REGULAR',

  LARGE: 'LARGE',

  XLARGE: 'XLARGE'
}

/**
 * A list of directions (in an alternative system).
 */
export const alt_directionValues = {
  UP: 'UP',

  DOWN: 'DOWN'
}

/**
 * A list of colors
 */
export const TestColorItems = [
  { value: 'RED', text: 'Red', documentation: 'The color for errors', data: {"hexCode":"f00","isWarningColor":true} },
  { value: 'GREEN', text: 'Green', data: {"hexCode":"0f0"} }
] as ExtendedEnumTypeItem<TestColor_Data>[]

/**
 * A list of sizes
 */
export const TestSizeItems = [
  { value: 'REGULAR', text: 'Regular', symbol: 'M' },
  { value: 'LARGE', text: 'Large', symbol: 'L' },
  { value: 'XLARGE', text: 'Extra Large', deprecated: 'Cannot source anymore.' }
] as EnumTypeItem[]

/**
 * A list of directions (in an alternative system).
 */
export const AltDirectionItems = [
  { value: 'UP', text: 'Up' },
  { value: 'DOWN', text: 'Down' }
] as EnumTypeItem[]

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
 * The drawer type.
 */
export interface TestDrawer {
  instructions?: Record<string, unknown>

  compact?: boolean

  fabrics?: string

  enumNumbers?: number

  enumBoolean?: boolean

  enumObjects?: Record<string, unknown>

  contents?: string[]

  complexContents?: string[]

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