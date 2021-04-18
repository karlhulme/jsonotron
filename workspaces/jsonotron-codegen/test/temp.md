# Type Library

This type library is based on the following systems:

* alt
* extra
* test

**Scalar Types:**

* [hugeString *[extra]*](#hugeString)

**Root Object Types:**

* [bed *[test]*](#bed)

* [colorData *[test]*](#colorData)

* [drawer *[test]*](#drawer)

* [drawerBasedOnExcludes *[test]*](#drawerBasedOnExcludes)

* [drawerBasedOnIncludes *[test]*](#drawerBasedOnIncludes)

* [pillow *[test]*](#pillow)

* [table *[extra]*](#table)

**Enum Types:**

* [color *[test]*](#color)

* [direction *[alt]*](#direction)

* [numbersList *[test]*](#numbersList)

* [size *[test]*](#size)

## Scalar Types

### `hugeString`

A large string with a defined length.

This type is defined in the extra system.

#### Example 1

An example.

```json
"A really really big string"
```

## Object Types

### `bed`

A bed

This type is defined in the test system.

#### Example 1

An example.

```json
{
  "make": "SleepTight",
  "thickness": 25
}
```


Property name | Type | Req | Description
--- | --- | --- | ---
make | extra/hugeString | Y | The make of the bed.
thickness | number | - | The thickness of the bed mattress
pillow | test/pillow | - | The type of pillow on the bed
direction | alt/direction | - | The direction the bed is facing.
  

### `colorData`

Custom data that is attached to each color enum item.

This type is defined in the test system.


Property name | Type | Req | Description
--- | --- | --- | ---
hexCode | string | Y | 
isWarningColor | boolean | - | 
  

### `drawer`

The drawer type.

This type is defined in the test system.

#### Example 1

An example.

```json
{
  "instructions": {
    "any": "thing"
  },
  "compact": true,
  "fabrics": "plaid",
  "contents": [
    "batteries",
    "clothes"
  ]
}
```


Property name | Type | Req | Description
--- | --- | --- | ---
instructions | object | - | 
compact | boolean | - | 
fabrics | string | - | 
enumNumbers | number | - | 
enumBoolean | boolean | - | 
enumObjects | object | - | 
arrayOfStrings | string[] | - | 
arrayOfObjects | test/drawer_arrayOfObjects[] | - | 
age | integer | - | The age in years.
  

### `drawerBasedOnExcludes`

The drawerBasedOnExcludes type.

This type is defined in the test system.


Property name | Type | Req | Description
--- | --- | --- | ---
instructions | object | - | 
compact | boolean | - | 
fabrics | string | - | 
enumNumbers | number | - | 
enumBoolean | boolean | - | 
enumObjects | object | - | 
  

### `drawerBasedOnIncludes`

The drawerBasedOnIncludes type.

This type is defined in the test system.


Property name | Type | Req | Description
--- | --- | --- | ---
instructions | object | - | 
compact | boolean | - | 
fabrics | string | - | 
  

### `pillow`

A pillow

This type is defined in the test system.

#### Example 1

An example.

```json
{
  "make": "SleepTight",
  "color": "blue"
}
```


Property name | Type | Req | Description
--- | --- | --- | ---
make | string | Y | The make of the pillow.
color | string | - | The color of the pillow.
  

### `table`

A table.

This type is defined in the extra system.

#### Example 1

An example.

```json
{
  "height": 123
}
```


Property name | Type | Req | Description
--- | --- | --- | ---
height | number | - | 
  

## Enum Types

### `color`

A list of colors

This type is defined in the test system.

Each item has additional data based on the [colorData}](#colorData object type.


Value | Symbol | Text | Data | Description
--- | --- | --- | --- | ---
1red |  | Red | `{"hexCode":"f00","isWarningColor":true}`  |  The color for errors
2green |  | Green | `{"hexCode":"0f0"}`  |  
  

### `direction`

A list of directions (in an alternative system).

This type is defined in the alt system.


Value | Symbol | Text | Data | Description
--- | --- | --- | --- | ---
going/up |  | Up |   |  
going/down |  | Down |   |  
goingAround |  | Around |   |  
  

### `numbersList`

A list of numbers

This type is defined in the test system.


Value | Symbol | Text | Data | Description
--- | --- | --- | --- | ---
1 |  | 1 One |   |  
2 |  | 2 Two |   |  
3 |  | 3 Three |   |  
  

### `size`

A list of sizes

This type is defined in the test system.


Value | Symbol | Text | Data | Description
--- | --- | --- | --- | ---
regular | M | Regular |   |  
large | L | Large |   |  
xlarge |  | Extra Large |   | *Deprecated: Cannot source anymore.*<br /> 
  