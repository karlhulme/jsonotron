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
  export const test = {
    /**
     * The qualified name of the color type. 
     */
    color: 'https://jsonotron.org/test/color',
  
    /**
     * The qualified name of the size type. 
     */
    size: 'https://jsonotron.org/test/size',
  
    /**
     * The qualified name of the bed type. 
     */
    bed: 'https://jsonotron.org/test/bed',
  
    /**
     * The qualified name of the pillow type. 
     */
    pillow: 'https://jsonotron.org/test/pillow',
  
    /**
     * The qualified name of the drawer type. 
     */
    drawer: 'https://jsonotron.org/test/drawer',
  
    /**
     * A list of colors
     */
    colorValues: {
      /**
       * The color for errors
       */
      RED: 'RED',
  
      GREEN: 'GREEN'
    },
  
    /**
     * A list of sizes
     */
    sizeValues: {
      REGULAR: 'REGULAR',
  
      LARGE: 'LARGE',
  
      XLARGE: 'XLARGE'
    },
  
    /**
     * A list of colors
     */
    colorItems: [
      { value: 'RED', text: 'Red', documentation: 'The color for errors', data: {"hexCode":"f00","isWarningColor":true} },
      { value: 'GREEN', text: 'Green', data: {"hexCode":"0f0"} }
    ] as ExtendedEnumTypeItem<Color_Data>[],
  
    /**
     * A list of sizes
     */
    sizeItems: [
      { value: 'REGULAR', text: 'Regular', symbol: 'M' },
      { value: 'LARGE', text: 'Large', symbol: 'L' },
      { value: 'XLARGE', text: 'Extra Large', deprecated: 'Cannot source anymore.' }
    ] as EnumTypeItem[]
  }
  
  /**
   * The types of the https://jsonotron.org/alt system.
   */
  export const alt = {
    /**
     * The qualified name of the direction type. 
     */
    direction: 'https://jsonotron.org/alt/direction',
  
    /**
     * A list of directions (in an alternative system).
     */
    directionValues: {
      UP: 'UP',
  
      DOWN: 'DOWN'
    },
  
    /**
     * A list of directions (in an alternative system).
     */
    directionItems: [
      { value: 'UP', text: 'Up' },
      { value: 'DOWN', text: 'Down' }
    ] as EnumTypeItem[]
  }
  
  /**
   * The types of the https://jsonotron.org/extra system.
   */
  export const extra = {
    /**
     * The qualified name of the table type. 
     */
    table: 'https://jsonotron.org/extra/table'
  }
  
  /**
   * Custom data that is attached to each color enum item.
   */
  export interface Color_Data {
    hexCode: string
  
    isWarningColor?: boolean
  }
  
  /**
   * A bed
   */
  export interface Bed {
    make: string
  
    thickness?: number
  
    pillow?: Pillow
  
    /**
     * A value from the **direction** enum of the **alt** type system defined by **https://jsonotron.org**.
     */
    direction?: string
  }
  
  /**
   * A pillow
   */
  export interface Pillow {
    make: string
  
    color?: string
  }
  
  /**
   * The drawer type.
   */
  export interface Drawer {
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
  export interface Table {
    height?: number
  }

