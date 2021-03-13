# Type Systems

[jss https://jsonotron.org/jss](#jss)


## "jss" System

The types of the `https://jsonotron.org/jss` system.


### Enum Types

* [Calling Code](#calling-code)
* [Country Code](#country-code)
* [Currency Code](#currency-code)
* [Day of Week](#day-of-week)
* [Language Code](#language-code)
* [Month of Year](#month-of-year)
* [Time Zone](#time-zone)
* [Yes or No](#yes-or-no)

### Schema Types

* [Address](#address)
* [Boolean](#boolean)
* [Date](#date)
* [Date & Time Local](#date-&-time-local)
* [Date & Time UTC](#date-&-time-utc)
* [Email Address](#email-address)
* [Floating Point Number](#floating-point-number)
* [GeoJSON Point](#geojson-point)
* [GeoJSON Polygon](#geojson-polygon)
* [Huge String](#huge-string)
* [Integer](#integer)
* [IP Version 4](#ip-version-4)
* [IP Version 6](#ip-version-6)
* [JSON Pointer](#json-pointer)
* [Long String](#long-string)
* [Medium String](#medium-string)
* [Money](#money)
* [Negative Floating Point Number](#negative-floating-point-number)
* [Negative Floating Point Number or Zero](#negative-floating-point-number-or-zero)
* [Negative Integer](#negative-integer)
* [Negative Integer or Zero](#negative-integer-or-zero)
* [Object](#object)
* [Payment Card Number](#payment-card-number)
* [Positive Floating Point Number](#positive-floating-point-number)
* [Positive Floating Point Number or Zero](#positive-floating-point-number-or-zero)
* [Positive Integer](#positive-integer)
* [Positive Integer or Zero](#positive-integer-or-zero)
* [Short String](#short-string)
* [String](#string)
* [Telephone Number](#telephone-number)
* [Time](#time)
* [Timestamp](#timestamp)
* [UUID](#uuid)
* [Web Address](#web-address)
* [What 3 Words](#what-3-words)



### Address

**kind**: schema\
**name**: address\
**uri**: https://jsonotron.org/jss/address

An object that captures an address.

The `addressLines` property records the lines that make up the address.

The `postalCode` property records the post code or zip code of the address.

The `countryCode` property records countryCode value.

### Example 1

This example is an address in England so it uses a UK post code.

```json
{
  "addressLines": "1 Acacia Avenue\nPortsmouth",
  "postalCode": "PO125LP",
  "countryCode": "GB"
}
```

### Example 2

This example is an address in the United States so it uses a zip code.

```json
{
  "addressLines": "1 Mansion Street\nBeverley Hills\nLos Angeles",
  "postalCode": "90210",
  "countryCode": "US"
}
```


### Schema


```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "addressLines": {
      "$ref": "hugeString",
      "documentation": "The lines that make up the address."
    },
    "postalCode": {
      "$ref": "shortString",
      "documentation": "The postal code of the address."
    },
    "countryCode": {
      "$ref": "countryCode",
      "documentation": "The country where the address is situated."
    }
  },
  "required": [
    "addressLines",
    "postalCode",
    "countryCode"
  ]
}
```



### Boolean

**kind**: schema\
**name**: boolean\
**uri**: https://jsonotron.org/jss/boolean

A value of either true or false.

### Example 1

A value of true.

```json
true
```

### Example 2

A value of false.

```json
false
```


### Schema


```json
{
  "type": "boolean"
}
```



### Calling Code

**kind**: enum\
**name**: callingCode\
**uri**: https://jsonotron.org/jss/callingCode

An international telephone calling code defined by the ITU-T in standards E.123 and E.164.  The data is taken from https://en.wikipedia.org/wiki/List_of_country_calling_codes. The key piece of data is the dialling code, which is a number.  This is the data that a user would want to specify when entering a telephone number.  They specify their dialling code, e.g. 44.  Each enum item has a region preperty, denoting the location or locations that it represents. A symbol is not defined, because it would be identical to the text in this case.  It's safe to use the text property for looking up values.  The text property is determined entirely by the value, so it will not change.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
ISD_1 |  | 1 |  
ISD_20 |  | 20 |  
ISD_211 |  | 211 |  
ISD_212 |  | 212 |  
ISD_213 |  | 213 |  
ISD_216 |  | 216 |  
ISD_218 |  | 218 |  
ISD_220 |  | 220 |  
ISD_221 |  | 221 |  
ISD_222 |  | 222 |  
ISD_223 |  | 223 |  
ISD_224 |  | 224 |  
ISD_225 |  | 225 |  
ISD_226 |  | 226 |  
ISD_227 |  | 227 |  
ISD_228 |  | 228 |  
ISD_229 |  | 229 |  
ISD_230 |  | 230 |  
ISD_231 |  | 231 |  
ISD_232 |  | 232 |  
ISD_233 |  | 233 |  
ISD_234 |  | 234 |  
ISD_235 |  | 235 |  
ISD_236 |  | 236 |  
ISD_237 |  | 237 |  
ISD_238 |  | 238 |  
ISD_239 |  | 239 |  
ISD_240 |  | 240 |  
ISD_241 |  | 241 |  
ISD_242 |  | 242 |  
ISD_243 |  | 243 |  
ISD_244 |  | 244 |  
ISD_245 |  | 245 |  
ISD_246 |  | 246 |  
ISD_247 |  | 247 |  
ISD_248 |  | 248 |  
ISD_249 |  | 249 |  
ISD_250 |  | 250 |  
ISD_251 |  | 251 |  
ISD_252 |  | 252 |  
ISD_253 |  | 253 |  
ISD_254 |  | 254 |  
ISD_255 |  | 255 |  
ISD_256 |  | 256 |  
ISD_257 |  | 257 |  
ISD_258 |  | 258 |  
ISD_260 |  | 260 |  
ISD_261 |  | 261 |  
ISD_262 |  | 262 |  
ISD_263 |  | 263 |  
ISD_264 |  | 264 |  
ISD_265 |  | 265 |  
ISD_266 |  | 266 |  
ISD_267 |  | 267 |  
ISD_268 |  | 268 |  
ISD_269 |  | 269 |  
ISD_27 |  | 27 |  
ISD_290 |  | 290 |  
ISD_291 |  | 291 |  
ISD_297 |  | 297 |  
ISD_298 |  | 298 |  
ISD_299 |  | 299 |  
ISD_30 |  | 30 |  
ISD_31 |  | 31 |  
ISD_32 |  | 32 |  
ISD_33 |  | 33 |  
ISD_34 |  | 34 |  
ISD_350 |  | 350 |  
ISD_351 |  | 351 |  
ISD_352 |  | 352 |  
ISD_353 |  | 353 |  
ISD_354 |  | 354 |  
ISD_355 |  | 355 |  
ISD_356 |  | 356 |  
ISD_357 |  | 357 |  
ISD_358 |  | 358 |  
ISD_359 |  | 359 |  
ISD_36 |  | 36 |  
ISD_370 |  | 370 |  
ISD_371 |  | 371 |  
ISD_372 |  | 372 |  
ISD_373 |  | 373 |  
ISD_374 |  | 374 |  
ISD_375 |  | 375 |  
ISD_376 |  | 376 |  
ISD_377 |  | 377 |  
ISD_378 |  | 378 |  
ISD_388 |  | 380 |  
ISD_381 |  | 381 |  
ISD_382 |  | 382 |  
ISD_383 |  | 383 |  
ISD_385 |  | 385 |  
ISD_386 |  | 386 |  
ISD_387 |  | 387 |  
ISD_389 |  | 389 |  
ISD_39 |  | 39 |  
ISD_40 |  | 40 |  
ISD_41 |  | 41 |  
ISD_420 |  | 420 |  
ISD_421 |  | 421 |  
ISD_423 |  | 423 |  
ISD_43 |  | 43 |  
ISD_44 |  | 44 |  
ISD_45 |  | 45 |  
ISD_46 |  | 46 |  
ISD_47 |  | 47 |  
ISD_48 |  | 48 |  
ISD_49 |  | 49 |  
ISD_500 |  | 500 |  
ISD_501 |  | 501 |  
ISD_502 |  | 502 |  
ISD_503 |  | 503 |  
ISD_504 |  | 504 |  
ISD_505 |  | 505 |  
ISD_506 |  | 506 |  
ISD_507 |  | 507 |  
ISD_508 |  | 508 |  
ISD_509 |  | 509 |  
ISD_51 |  | 51 |  
ISD_52 |  | 52 |  
ISD_53 |  | 53 |  
ISD_54 |  | 54 |  
ISD_55 |  | 55 |  
ISD_56 |  | 56 |  
ISD_57 |  | 57 |  
ISD_58 |  | 58 |  
ISD_590 |  | 590 |  
ISD_591 |  | 591 |  
ISD_592 |  | 592 |  
ISD_593 |  | 593 |  
ISD_594 |  | 594 |  
ISD_595 |  | 595 |  
ISD_596 |  | 596 |  
ISD_597 |  | 597 |  
ISD_598 |  | 598 |  
ISD_599 |  | 599 |  
ISD_60 |  | 60 |  
ISD_61 |  | 61 |  
ISD_62 |  | 62 |  
ISD_63 |  | 63 |  
ISD_64 |  | 64 |  
ISD_65 |  | 65 |  
ISD_66 |  | 66 |  
ISD_670 |  | 670 |  
ISD_672 |  | 672 |  
ISD_673 |  | 673 |  
ISD_674 |  | 674 |  
ISD_675 |  | 675 |  
ISD_676 |  | 676 |  
ISD_677 |  | 677 |  
ISD_678 |  | 678 |  
ISD_679 |  | 679 |  
ISD_680 |  | 680 |  
ISD_681 |  | 681 |  
ISD_682 |  | 682 |  
ISD_683 |  | 683 |  
ISD_685 |  | 685 |  
ISD_686 |  | 686 |  
ISD_687 |  | 687 |  
ISD_688 |  | 688 |  
ISD_689 |  | 689 |  
ISD_690 |  | 690 |  
ISD_691 |  | 691 |  
ISD_692 |  | 692 |  
ISD_7 |  | 7 |  
ISD_800 |  | 800 |  
ISD_808 |  | 808 |  
ISD_81 |  | 81 |  
ISD_82 |  | 82 |  
ISD_84 |  | 84 |  
ISD_850 |  | 850 |  
ISD_852 |  | 852 |  
ISD_853 |  | 853 |  
ISD_855 |  | 855 |  
ISD_856 |  | 856 |  
ISD_86 |  | 86 |  
ISD_880 |  | 880 |  
ISD_886 |  | 886 |  
ISD_90 |  | 90 |  
ISD_91 |  | 91 |  
ISD_92 |  | 92 |  
ISD_93 |  | 93 |  
ISD_94 |  | 94 |  
ISD_95 |  | 95 |  
ISD_960 |  | 960 |  
ISD_961 |  | 961 |  
ISD_962 |  | 962 |  
ISD_963 |  | 963 |  
ISD_964 |  | 964 |  
ISD_965 |  | 965 |  
ISD_966 |  | 966 |  
ISD_967 |  | 967 |  
ISD_968 |  | 968 |  
ISD_970 |  | 970 |  
ISD_971 |  | 971 |  
ISD_972 |  | 972 |  
ISD_973 |  | 973 |  
ISD_974 |  | 974 |  
ISD_975 |  | 975 |  
ISD_976 |  | 976 |  
ISD_977 |  | 977 |  
ISD_979 |  | 979 |  
ISD_98 |  | 98 |  
ISD_992 |  | 992 |  
ISD_993 |  | 993 |  
ISD_994 |  | 994 |  
ISD_995 |  | 995 |  
ISD_996 |  | 996 |  
ISD_998 |  | 998 |  

  

### Country Code

**kind**: enum\
**name**: countryCode\
**uri**: https://jsonotron.org/jss/countryCode

A country designator from ISO 3166, taken from https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
AF |  | Afghanistan |  
AX |  | Åland Islands |  
AL |  | Albania |  
DZ |  | Algeria |  
AS |  | American Samoa |  
AD |  | Andorra |  
AO |  | Angola |  
AI |  | Anguilla |  
AQ |  | Antarctica |  
AG |  | Antigua and Barbuda |  
AR |  | Argentina |  
AM |  | Armenia |  
AW |  | Aruba |  
AU |  | Australia |  
AT |  | Austria |  
AZ |  | Azerbaijan |  
BS |  | Bahamas (the) |  
BH |  | Bahrain |  
BD |  | Bangladesh |  
BB |  | Barbados |  
BY |  | Belarus |  
BE |  | Belgium |  
BZ |  | Belize |  
BJ |  | Benin |  
BM |  | Bermuda |  
BT |  | Bhutan |  
BO |  | Bolivia (Plurinational State of) |  
BA |  | Bosnia and Herzegovina |  
BW |  | Botswana |  
BV |  | Bouvet Island |  
BR |  | Brazil |  
IO |  | British Indian Ocean Territory (the) |  
BN |  | Brunei Darussalam |  
BG |  | Bulgaria |  
BF |  | Burkina Faso |  
BI |  | Burundi |  
CV |  | Cabo Verde |  
KH |  | Cambodia |  
CM |  | Cameroon |  
CA |  | Canada |  
KY |  | Cayman Islands (the) |  
CF |  | Central African Republic (the) |  
TD |  | Chad |  
CL |  | Chile |  
CN |  | China |  
CX |  | Christmas Island |  
CC |  | Cocos (Keeling) Islands (the) |  
CO |  | Colombia |  
KM |  | Comoros (the) |  
CD |  | Congo (the Democratic Republic of the) |  
CG |  | Congo (the) |  
CK |  | Cook Islands (the) |  
CR |  | Costa Rica |  
CI |  | Côte d"Ivoire |  
HR |  | Croatia |  
CU |  | Cuba |  
CW |  | Curaçao |  
CY |  | Cyprus |  
CZ |  | Czechia |  
DK |  | Denmark |  
DJ |  | Djibouti |  
DM |  | Dominica |  
DO |  | Dominican Republic (the) |  
EC |  | Ecuador |  
EG |  | Egypt |  
SV |  | El Salvador |  
GQ |  | Equatorial Guinea |  
ER |  | Eritrea |  
EE |  | Estonia |  
SZ |  | Eswatini |  
ET |  | Ethiopia |  
FK |  | Falkland Islands (the) |  
FO |  | Faroe Islands (the) |  
FJ |  | Fiji |  
FI |  | Finland |  
FR |  | France |  
GF |  | French Guiana |  
PF |  | French Polynesia |  
TF |  | French Southern Territories (the) |  
GA |  | Gabon |  
GM |  | Gambia (the) |  
GE |  | Georgia |  
DE |  | Germany |  
GH |  | Ghana |  
GI |  | Gibraltar |  
GR |  | Greece |  
GL |  | Greenland |  
GD |  | Grenada |  
GP |  | Guadeloupe |  
GU |  | Guam |  
GT |  | Guatemala |  
GG |  | Guernsey |  
GN |  | Guinea |  
GW |  | Guinea-Bissau |  
GY |  | Guyana |  
HT |  | Haiti |  
HM |  | Heard Island and McDonald Islands |  
VA |  | Holy See (the) |  
HN |  | Honduras |  
HK |  | Hong Kong |  
HU |  | Hungary |  
IS |  | Iceland |  
IN |  | India |  
ID |  | Indonesia |  
IR |  | Iran (Islamic Republic of) |  
IQ |  | Iraq |  
IE |  | Ireland |  
IM |  | Isle of Man |  
IL |  | Israel |  
IT |  | Italy |  
JM |  | Jamaica |  
JP |  | Japan |  
JE |  | Jersey |  
JO |  | Jordan |  
KZ |  | Kazakhstan |  
KE |  | Kenya |  
KI |  | Kiribati |  
KP |  | Korea (the Democratic People"s Republic of) |  
KR |  | Korea (the Republic of) |  
KW |  | Kuwait |  
KG |  | Kyrgyzstan |  
LA |  | Lao People"s Democratic Republic (the) |  
LV |  | Latvia |  
LB |  | Lebanon |  
LS |  | Lesotho |  
LR |  | Liberia |  
LY |  | Libya |  
LI |  | Liechtenstein |  
LT |  | Lithuania |  
LU |  | Luxembourg |  
MO |  | Macao  |  
MK |  | North Macedonia |  
MG |  | Madagascar |  
MW |  | Malawi |  
MY |  | Malaysia |  
MV |  | Maldives |  
ML |  | Mali |  
MT |  | Malta |  
MH |  | Marshall Islands (the) |  
MQ |  | Martinique |  
MR |  | Mauritania |  
MU |  | Mauritius |  
YT |  | Mayotte |  
MX |  | Mexico |  
FM |  | Micronesia (Federated States of) |  
MD |  | Moldova (the Republic of) |  
MC |  | Monaco |  
MN |  | Mongolia |  
ME |  | Montenegro |  
MS |  | Montserrat |  
MA |  | Morocco |  
MZ |  | Mozambique |  
MM |  | Myanmar |  
NA |  | Namibia |  
NR |  | Nauru |  
NP |  | Nepal |  
NL |  | Netherlands (the) |  
NC |  | New Caledonia |  
NZ |  | New Zealand |  
NI |  | Nicaragua |  
NE |  | Niger (the) |  
NG |  | Nigeria |  
NU |  | Niue |  
NF |  | Norfolk Island |  
MP |  | Northern Mariana Islands (the) |  
NO |  | Norway |  
OM |  | Oman |  
PK |  | Pakistan |  
PW |  | Palau |  
PS |  | Palestine, State of |  
PA |  | Panama |  
PG |  | Papua New Guinea |  
PY |  | Paraguay |  
PE |  | Peru |  
PH |  | Philippines (the) |  
PN |  | Pitcairn |  
PL |  | Poland |  
PT |  | Portugal |  
PR |  | Puerto Rico |  
QA |  | Qatar |  
RE |  | Réunion |  
RO |  | Romania |  
RU |  | Russian Federation (the) |  
RW |  | Rwanda |  
BL |  | Saint Barthélemy |  
KN |  | Saint Kitts and Nevis |  
LC |  | Saint Lucia |  
MF |  | Saint Martin (French part) |  
PM |  | Saint Pierre and Miquelon |  
VC |  | Saint Vincent and the Grenadines |  
WS |  | Samoa |  
SM |  | San Marino |  
ST |  | Sao Tome and Principe |  
SA |  | Saudi Arabia |  
SN |  | Senegal |  
RS |  | Serbia |  
SC |  | Seychelles |  
SL |  | Sierra Leone |  
SG |  | Singapore |  
SX |  | Sint Maarten (Dutch part) |  
SK |  | Slovakia |  
SI |  | Slovenia |  
SB |  | Solomon Islands |  
SO |  | Somalia |  
ZA |  | South Africa |  
GS |  | South Georgia and the South Sandwich Islands |  
SS |  | South Sudan |  
ES |  | Spain |  
LK |  | Sri Lanka |  
SD |  | Sudan (the) |  
SR |  | Suriname |  
SE |  | Sweden |  
CH |  | Switzerland |  
SY |  | Syrian Arab Republic (the) |  
TW |  | Taiwan (Province of China) |  
TJ |  | Tajikistan |  
TZ |  | Tanzania, the United Republic of |  
TH |  | Thailand |  
TL |  | Timor-Leste |  
TG |  | Togo |  
TK |  | Tokelau |  
TO |  | Tonga |  
TT |  | Trinidad and Tobago |  
TN |  | Tunisia |  
TR |  | Turkey |  
TM |  | Turkmenistan |  
TC |  | Turks and Caicos Islands (the) |  
TV |  | Tuvalu |  
UG |  | Uganda |  
UA |  | Ukraine |  
AE |  | United Arab Emirates (the) |  
GB |  | United Kingdom of Great Britain and Northern Ireland (the) |  
UM |  | United States Minor Outlying Islands (the) |  
US |  | United States of America (the) |  
UY |  | Uruguay |  
UZ |  | Uzbekistan |  
VU |  | Vanuatu |  
VE |  | Venezuela (Bolivarian Republic of) |  
VN |  | Viet Nam |  
VG |  | Virgin Islands (British) |  
VI |  | Virgin Islands (U.S.) |  
WF |  | Wallis and Futuna |  
EH |  | Western Sahara |  
YE |  | Yemen |  
ZM |  | Zambia |  
ZW |  | Zimbabwe |  

  

### Currency Code

**kind**: enum\
**name**: currencyCode\
**uri**: https://jsonotron.org/jss/currencyCode

A currency designator from ISO 4217.  The data is taken from https://en.wikipedia.org/wiki/ISO_4217.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
AED | د.إ | United Arab Emirates Dirham |  
AFN | AFN | Afghan Afghani |  
ALL | ALL | Albanian Lek |  
AMD | AMD | Armenian Dram |  
ANG | ANG | Netherlands Antillean Guilder |  
AOA | AOA | Angolan Kwanza |  
ARS | ARS | Argentine Peso |  
AUD | $ | Australian Dollar |  
AWG | AWG | Aruban Florin |  
AZN | AZN | Azerbaijani Manat |  
BAM | BAM | Bosnia and Herzegovina Convertible Mark |  
BBD | BBD | Barbados Dollar |  
BDT | ৳ | Bangladeshi Taka |  
BGN | лв | Bulgarian Lev |  
BHD | BHD | Bahraini Dinar |  
BIF | BIF | Burundian Franc |  
BMD | BMD | Bermudian Dollar |  
BND | BND | Brunei Dollar |  
BOB | BOB | Boliviano |  
BOV | BOV | Bolivian Mvdol (funds code) |  
BRL | R$ | Brazilian Real |  
BSD | BSD | Bahamian Dollar |  
BTC | ₿ | Bitcoin |  
BTN | BTN | Bhutanese Ngultrum |  
BWP | BWP | Botswana Pula |  
BYN | BYN | Belarusian Ruble |  
BZD | BZD | Belize Dollar |  
CAD | $ | Canadian Dollar |  
CDF | CDF | Congolese Franc |  
CHE | € | WIR Euro |  
CHF | CHF | Swiss Franc |  
CHW | CHW | WIR Franc |  
CLF | CLF | Unidad de Fomento (funds code) |  
CLP | $ | Chilean Peso |  
CNY | ¥ | Renminbi (Chinese) Yuan |  
COP | $ | Colombian Peso |  
COU | COU | Unidad de Valor Real (UVR) |  
CRC | CRC | Costa Rican Colon |  
CUC | CUC | Cuban convertible Peso |  
CUP | CUP | Cuban Peso |  
CVE | CVE | Cape Verdean Escudo |  
CZK | Kč | Czech Koruna |  
DJF | DJF | Djiboutian Franc |  
DKK | kr | Danish Krone |  
DOP | DOP | Dominican Peso |  
DZD | DZD | Algerian Dinar |  
EGP | EGP | Egyptian Pound |  
ERN | ERN | Eritrean Nakfa |  
ETB | ETB | Ethiopian Birr |  
ETH | Ξ | Etherium |  
EUR | € | Euro |  
FJD | FJD | Fiji Dollar |  
FKP | FKP | Falkland Islands Pound |  
GBP | £ | Pound Sterling |  
GEL | ₾ | Georgian Lari |  
GHS | GHS | Ghanaian Cedi |  
GIP | GIP | Gibraltar Pound |  
GMD | GMD | Gambian Dalasi |  
GNF | GNF | Guinean Franc |  
GTQ | GTQ | Guatemalan Quetzal |  
GYD | GYD | Guyanese Dollar |  
HKD | $ | Hong Kong Dollar |  
HNL | HNL | Honduran Lempira |  
HRK | kn | Croatian Kuna |  
HTG | HTG | Haitian Gourde |  
HUF | ft | Hungarian Forint |  
IDR | Rp | Indonesian Rupiah |  
ILS | ₪ | Israeli New Shekel |  
INR | ₹ | Indian Rupee |  
IQD | IQD | Iraqi Dinar |  
IRR | IRR | Iranian Rial |  
ISK | ISK | Icelandic Króna |  
JMD | JMD | Jamaican Dollar |  
JOD | JOD | Jordanian Dinar |  
JPY | ¥ | Japanese Yen |  
KES | Ksh | Kenyan Shilling |  
KGS | KGS | Kyrgyzstani Som |  
KHR | KHR | Cambodian Riel |  
KMF | KMF | Comoro Franc |  
KPW | $KPW | North Korean Won |  
KRW | ₩ | South Korean Won |  
KWD | KWD | Kuwaiti Dinar |  
KYD | KYD | Cayman Islands Dollar |  
KZT | KZT | Kazakhstani Tenge |  
LAK | LAK | Lao Kip |  
LBP | LBP | Lebanese Pound |  
LKR | Rs | Sri Lankan Rupee |  
LRD | LRD | Liberian Dollar |  
LSL | LDL | Lesotho Loti |  
LTC | Ł | Litecoin |  
LYD | LYD | Libyan Dinar |  
MAD | .د.م | Moroccan Dirham |  
MDL | MDL | Moldovan Leu |  
MGA | MGA | Malagasy Ariary |  
MKD | MKD | Macedonian Denar |  
MMK | MMK | Myanmar Kyat |  
MNT | MNT | Mongolian Tögrög |  
MOP | MOP | Macanese Pataca |  
MRU | MRU | Mauritanian Ouguiya |  
MUR | MUR | Mauritian Rupee |  
MVR | MVR | Maldivian Rufiyaa |  
MWK | MWK | Malawian Kwacha |  
MXN | $ | Mexican Peso |  
MXV | MXV | Mexican Unidad de Inversion (UDI) |  
MYR | RM | Malaysian Ringgit |  
MZN | MZN | Mozambican Metical |  
NAD | NAD | Namibian Dollar |  
NGN | ₦ | Nigerian Naira |  
NIO | NIO | Nicaraguan Córdoba |  
NOK | kr | Norwegian Krone |  
NPR | NPR | Nepalese Rupee |  
NZD | $ | New Zealand Dollar |  
OMR | OMR | Omani Rial |  
PAB | PAB | Panamanian Balboa |  
PEN | S/. | Peruvian Sol |  
PGK | PGK | Papua New Guinean Kina |  
PHP | ₱ | Philippine Peso |  
PKR | Rs | Pakistani Rupee |  
PLN | zł | Polish Złoty |  
PYG | PYG | Paraguayan Guaraní |  
QAR | QAR | Qatari Riyal |  
RON | lei | Romanian Leu |  
RSD | RSD | Serbian Dinar |  
RUB | ₽ | Russian Ruble |  
RWF | RWF | Rwandan Franc |  
SAR | SAR | Saudi Riyal |  
SBD | SBD | Solomon Islands Dollar |  
SCR | SCR | Seychelles Rupee |  
SDG | SDG | Sudanese Pound |  
SEK | kr | Swedish Krona/Kronor |  
SGD | $ | Singapore Dollar |  
SHP | SHP | Saint Helena Pound |  
SLL | SLL | Sierra Leonean Leone |  
SOS | SOS | Somali Shilling |  
SRD | SRD | Surinamese Dollar |  
SSP | SSP | South Sudanese Pound |  
STN | STN | São Tomé and Príncipe Dobra |  
SVC | SVC | Salvadoran Colón |  
SYP | SYP | Syrian Pound |  
SZL | SZL | Swazi Lilangeni |  
THB | ฿ | Thai Baht |  
TJS | TJS | Tajikistani Somoni |  
TMT | TMT | Turkmenistan Manat |  
TND | TND | Tunisian Dinar |  
TOP | TOP | Tongan Paʻanga |  
TRY | ₺ | Turkish Lira |  
TTD | TTD | Trinidad and Tobago Dollar |  
TWD | TWD | New Taiwan Dollar |  
TZS | TZS | Tanzanian Shilling |  
UAH | ₴ | Ukrainian Hryvnia |  
UGX | UGX | Ugandan Shilling |  
USD | $ | United States Dollar |  
USN | $ | United States Dollar (next day) |  
UYI | UYI | Uruguay Peso en Unidades Indexadas (URUIURUI) |  
UYU | UYU | Uruguayan Peso |  
UYW | UYW | Unidad Previsional |  
UZS | UZS | Uzbekistan Som |  
VES | VES | Venezuelan Bolívar Soberano |  
VND | ₫ | Vietnamese Dồng |  
VUV | VUV | Vanuatu Vatu |  
WST | WST | Samoan Tala |  
XAF | XAF | CFA franc BEAC |  
XCD | XCD | East Caribbean Dollar |  
XMR | ɱ | Monero |  
XOF | XOF | CFA Franc BCEAO |  
XPD | XPD | Palladium (one troy ounce) |  
XPF | XPF | CFP Franc (franc Pacifique) |  
XRP | XRP | Ripples |  
YER | YER | Yemeni Rial |  
ZAR | R | South African Rand |  
ZMW | ZMW | Zambian Kwacha |  
ZWL | ZWL | Zimbabwean Dollar |  

  

### Date

**kind**: schema\
**name**: date\
**uri**: https://jsonotron.org/jss/date

A string with the date components arranged using the YYYY-MM-DD pattern.  If the day or month component is a value less than 10 then a leading zero must be included.  This ensures that all stored dates are the same length.

### Example 1

An example.

```json
"2007-09-25"
```


### Schema


```json
{
  "type": "string",
  "format": "date"
}
```



### Date & Time Local

**kind**: schema\
**name**: dateTimeLocal\
**uri**: https://jsonotron.org/jss/dateTimeLocal

An object that captures a date and time in a specific time zone.

The `dateTime` property records the date and time in the YYYY-MM-DDTHH:mm:ss+Z format.  Notice
that the pattern always has a T between the date and time components and that the
time zone is always expressed with 2 digits for hours and 2 digits for minutes.

The `timeZone` property records where in the world the time applies.  It is a timeZone
value.

The `timestamp` property records when the date and time was captured.  It
is a timestamp value.  This is useful for advanced scenarios where the behaviour
of a time zone is changed at some point in the future.  Knowing when the capture
was made allows you to pinpoint the rules at the point and then convert to the prevailing
rules.  Leading zeroes must be used to ensure that all values are the same length.

### Example 1

The europe/london time zone operates at +00:00 during the winter and +01:00 during the summer.  In this example we can see the value is in the summer because of the +01:00 suffix.

```json
{
  "dateTime": "2010-06-08T05:30:12+01:00",
  "timeZone": "EUROPE_LONDON",
  "captured": 1563119540628
}
```


### Schema


```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "dateTime": {
      "type": "string",
      "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[+][0-9]{2}:[0-9]{2}$",
      "format": "jsonotron-dateTimeLocal",
      "documentation": "A date and time in YYYY-MM-DDTHH:mm:ss+Z format."
    },
    "timeZone": {
      "$ref": "timeZone",
      "documentation": "An international time zone."
    },
    "captured": {
      "$ref": "timestamp",
      "documentation": "A unix-style timestamp."
    }
  },
  "required": [
    "dateTime",
    "timeZone",
    "captured"
  ]
}
```



### Date & Time UTC

**kind**: schema\
**name**: dateTimeUtc\
**uri**: https://jsonotron.org/jss/dateTimeUtc

A string with the date and time components arranged using the YYYY-MM-DDTHH:mm:ssZ pattern. Leading zeroes must be used to ensure that all values are the same length.

### Example 1

An example.

```json
"2014-09-15T23:59:25Z"
```


### Schema


```json
{
  "type": "string",
  "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$",
  "format": "jsonotron-dateTimeUtc"
}
```



### Day of Week

**kind**: enum\
**name**: dayOfWeek\
**uri**: https://jsonotron.org/jss/dayOfWeek

A day of the week.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
SU |  | Sunday |  
MO |  | Monday |  
TU |  | Tuesday |  
WE |  | Wednesday |  
TH |  | Thursday |  
FR |  | Friday |  
SA |  | Saturday |  

  

### Email Address

**kind**: schema\
**name**: emailAddress\
**uri**: https://jsonotron.org/jss/emailAddress

An email address.

### Example 1

An example.

```json
"anon@gmail.com"
```


### Schema


```json
{
  "type": "string",
  "format": "email"
}
```



### Floating Point Number

**kind**: schema\
**name**: float\
**uri**: https://jsonotron.org/jss/float

A number with an integral and decimal part.

### Example 1

An example.

```json
3.14
```


### Schema


```json
{
  "type": "number"
}
```



### GeoJSON Point

**kind**: schema\
**name**: geoJsonPoint\
**uri**: https://jsonotron.org/jss/geoJsonPoint

A point on Earth.

### Example 1

A position on Earth recorded in GeoJSON format expressed as a longitude and latitude pair.
The `type` value should be 'Point'.
The `coordinates` property should be a 2-element array consisting of longitude first and latitude second.

```json
{
  "type": "Point",
  "coordinates": [
    31.9,
    -4.8
  ]
}
```


### Schema


```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "type": {
      "enum": [
        "Point"
      ],
      "documentation": "The value 'Point'."
    },
    "coordinates": {
      "type": "array",
      "minItems": 2,
      "maxItems": 2,
      "items": [
        {
          "type": "number",
          "minimum": -180,
          "maximum": 180
        },
        {
          "type": "number",
          "minimum": -90,
          "maximum": 90
        }
      ],
      "documentation": "A 2-element array containing the longitude value first and the latitude value second."
    }
  },
  "required": [
    "type",
    "coordinates"
  ]
}
```



### GeoJSON Polygon

**kind**: schema\
**name**: geoJsonPolygon\
**uri**: https://jsonotron.org/jss/geoJsonPolygon

A boundary of connected points that encompasses a region on Earth.  
The `type` property should be 'Polygon'.
The `co-ordinates` property should be an array, where each element is a co-ordinate pair that
makes up the polygon.  The co-ordinate pairs must be specified in a counter-clockwise direction.  The last co-ordinate
should be a duplicate of the first co-ordinate.  This means the minimum number of
elements in the co-ordinate array is 4.
Each element in the co-ordinate array is 2-element array, longitude first and latitude second.

### Example 1

A region on Earth recorded in GeoJSON format expressed as a series of longitude and latitude pairs.

```json
{
  "type": "Polygon",
  "coordinates": [
    [
      31.8,
      -5
    ],
    [
      31.8,
      -4.7
    ],
    [
      32,
      -4.7
    ],
    [
      32,
      -5
    ],
    [
      31.8,
      -5
    ]
  ]
}
```


### Schema


```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "type": {
      "enum": [
        "Polygon"
      ],
      "documentation": "The value 'Polygon'"
    },
    "coordinates": {
      "type": "array",
      "minItems": 4,
      "items": {
        "type": "array",
        "minItems": 2,
        "maxItems": 2,
        "items": [
          {
            "type": "number",
            "minimum": -180,
            "maximum": 180
          },
          {
            "type": "number",
            "minimum": -90,
            "maximum": 90
          }
        ]
      },
      "documentation": "An array of arrays.  The outer array must contain at least 4 elements, with the first one repeated last.  Each inner array should be 2 elements with longitude first and latitude second."
    }
  },
  "required": [
    "type",
    "coordinates"
  ]
}
```



### Huge String

**kind**: schema\
**name**: hugeString\
**uri**: https://jsonotron.org/jss/hugeString

A string of 4000 characters or less.  An empty string is valid.

### Example 1

An example.

```json
"A very long paragraph about an interesting subject..."
```


### Schema


```json
{
  "type": "string",
  "maxLength": 4000
}
```



### Integer

**kind**: schema\
**name**: integer\
**uri**: https://jsonotron.org/jss/integer

A whole number.

### Example 1

An example.

```json
365
```


### Schema


```json
{
  "type": "integer"
}
```



### IP Version 4

**kind**: schema\
**name**: ipv4\
**uri**: https://jsonotron.org/jss/ipv4

A string of digits that identify a computer on a network in IP v4 format.

### Example 1

An example.

```json
"127.0.0.1"
```


### Schema


```json
{
  "type": "string",
  "format": "ipv4"
}
```



### IP Version 6

**kind**: schema\
**name**: ipv6\
**uri**: https://jsonotron.org/jss/ipv6

A string of digits that identify a computer on a network in IP v6 format.

### Example 1

An example.

```json
"2001:0DB8:85A3:0000:0000:8A2E:0370:7334"
```

### Example 2

The shorthand loopback address is also supported.

```json
"::1"
```


### Schema


```json
{
  "type": "string",
  "format": "ipv6"
}
```



### JSON Pointer

**kind**: schema\
**name**: jsonPointer\
**uri**: https://jsonotron.org/jss/jsonPointer

A JSON pointer.

### Example 1

An example.

```json
"/root/tree/branch/leaf"
```


### Schema


```json
{
  "type": "string",
  "format": "json-pointer"
}
```



### Language Code

**kind**: enum\
**name**: languageCode\
**uri**: https://jsonotron.org/jss/languageCode

A language code conforming to the from ISO 639-1 standard.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
AF |  | Afrikaans |  
AR |  | Arabic |  
AR_DZ |  | Arabic (Algeria) |  
AR_BH |  | Arabic (Bahrain) |  
AR_EG |  | Arabic (Egypt) |  
AR_IQ |  | Arabic (Iraq) |  
AR_JO |  | Arabic (Jordan) |  
AR_KW |  | Arabic (Kuwait) |  
AR_LB |  | Arabic (Lebanon) |  
AR_LY |  | Arabic (Libya) |  
AR_MA |  | Arabic (Morocco) |  
AR_OM |  | Arabic (Oman) |  
AR_QA |  | Arabic (Qatar) |  
AR_SA |  | Arabic (Saudi Arabia) |  
AR_SY |  | Arabic (Syria) |  
AR_TN |  | Arabic (Tunisia) |  
AR_AE |  | Arabic (U.A.E.) |  
AR_YE |  | Arabic (Yemen) |  
BE |  | Belarusian |  
BG |  | Bulgarian |  
CA |  | Catalan |  
CY |  | Welsh |  
CS |  | Czech |  
DA |  | Danish |  
DE |  | German |  
DE_AT |  | German (Austria) |  
DE_CH |  | German (Switzerland) |  
DE_DE |  | German (Germany) |  
DE_LI |  | German (Liechtenstein) |  
DE_LU |  | German (Luxembourg) |  
EL |  | Greek |  
EN |  | English |  
EN_AU |  | English (Australia) |  
EN_BZ |  | English (Belize) |  
EN_CA |  | English (Canada) |  
EN_GB |  | English (United Kingdom) |  
EN_IE |  | English (Ireland) |  
EN_JM |  | English (Jamaica) |  
EN_NZ |  | English (New Zealand) |  
EN_ZA |  | English (South Africa) |  
EN_TT |  | English (Trinidad) |  
EN_US |  | English (United States) |  
ES |  | Spanish |  
ES_AR |  | Spanish (Argentina) |  
ES_BO |  | Spanish (Bolivia) |  
ES_CL |  | Spanish (Chile) |  
ES_CO |  | Spanish (Colombia) |  
ES_CR |  | Spanish (Costa Rica) |  
ES_DO |  | Spanish (Dominican Republic) |  
ES_EC |  | Spanish (Ecuador) |  
ES_ES |  | Spanish (Spain) |  
ES_GT |  | Spanish (Guatemala) |  
ES_HN |  | Spanish (Honduras) |  
ES_MX |  | Spanish (Mexico) |  
ES_NI |  | Spanish (Nicaragua) |  
ES_PA |  | Spanish (Panama) |  
ES_PY |  | Spanish (Paraguay) |  
ES_PE |  | Spanish (Peru) |  
ES_PR |  | Spanish (Puerto Rico) |  
ES_SV |  | Spanish (El Salvador) |  
ES_UY |  | Spanish (Uruguay) |  
ES_VE |  | Spanish (Venezuela) |  
ET |  | Estonian |  
EU |  | Basque |  
FA |  | Farsi |  
FI |  | Finnish |  
FO |  | Faeroese |  
FR |  | French |  
FR_BE |  | French (Belgium) |  
FR_CA |  | French (Canada) |  
FR_CH |  | French (Switzerland) |  
FR_FR |  | French (France) |  
FR_LU |  | French (Luxembourg) |  
GA |  | Irish |  
GD |  | Gaelic |  
HE |  | Hebrew |  
HI |  | Hindi |  
HR |  | Croatian |  
HU |  | Hungarian |  
IS |  | Icelandic |  
ID |  | Indonesian |  
IT |  | Italian |  
IT_CH |  | Italian (Switzerland) |  
IT_IT |  | Italian (Italy) |  
JA |  | Japanese |  
KO |  | Korean |  
KU |  | Kurdish |  
LV |  | Latvian |  
LT |  | Lithuanian |  
MK |  | Macedonian (FYROM) |  
ML |  | Malayalam |  
MS |  | Malaysian |  
MT |  | Maltese |  
NB |  | Norwegian (Bokmål) |  
NL |  | Dutch |  
NL_BE |  | Dutch (Belgium) |  
NN |  | Norwegian (Nynorsk) |  
NO |  | Norwegian |  
PL |  | Polish |  
PA |  | Punjabi |  
PT |  | Portuguese |  
PT_PT |  | Portuguese (Portugal) |  
PT_BR |  | Portuguese (Brazil) |  
RM |  | Rhaeto-Romanic |  
RO |  | Romanian |  
RO_RO |  | Romanian (Romania) |  
RO_MD |  | Romanian (Republic of Moldova) |  
RU |  | Russian |  
RU_RU |  | Russian (Russia) |  
RU_MD |  | Russian (Republic of Moldova) |  
SB |  | Sorbian |  
SK |  | Slovak |  
SL |  | Slovenian |  
SQ |  | Albanian |  
SR |  | Serbian |  
SV |  | Swedish |  
SV_SV |  | Swedish (Sweden) |  
SV_FI |  | Swedish (Finland) |  
TH |  | Thai |  
TS |  | Tsonga |  
TN |  | Tswana |  
TR |  | Turkish |  
UK |  | Ukrainian |  
UR |  | Urdu |  
VE |  | Venda |  
VI |  | Vietnamese |  
XH |  | Xhosa |  
YI |  | Yiddish |  
ZH_HK |  | Chinese (Hong Kong) |  
ZH_CN |  | Chinese (PRC) |  
ZH_SG |  | Chinese (Singapore) |  
ZH_TW |  | Chinese (Taiwan) |  
ZU |  | Zulu |  

  

### Long String

**kind**: schema\
**name**: longString\
**uri**: https://jsonotron.org/jss/longString

A string of 250 characters or less.  An empty string is valid.

### Example 1

An example.

```json
"A long string that contains a lot of characters"
```


### Schema


```json
{
  "type": "string",
  "maxLength": 250
}
```



### Medium String

**kind**: schema\
**name**: mediumString\
**uri**: https://jsonotron.org/jss/mediumString

A string of 50 characters or less.  An empty string is valid.

### Example 1

An example.

```json
"A string that contains some characters"
```


### Schema


```json
{
  "type": "string",
  "maxLength": 50
}
```



### Money

**kind**: schema\
**name**: money\
**uri**: https://jsonotron.org/jss/money

An amount of money designated in a specific currency.
The `amount` property stores an integral amount of money in a currencies minor denomination. Each currency defines a scalar which indicates how many places the decimal point is shifted to the left, in order to convert to a currencies major denomination.  Storing the data in the minor denomination ensures that most currency manipulation and equality checks can be performed using integers rather than floating point numbers.
The `currency` indicates which currency this monetary amount represents.

### Example 1

In this example, the GBP currency defines a scaler of 2, which means that we shift the decimal point 2 places to the left.  So 9999 becomes £ 99.99 for display.

```json
{
  "amount": 9999,
  "currency": "GBP"
}
```


### Schema


```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "amount": {
      "$ref": "integer",
      "documentation": "The amount of money in a minor denomination."
    },
    "currency": {
      "$ref": "currencyCode",
      "documentation": "The currency represented by this monetary amount."
    }
  },
  "required": [
    "amount",
    "currency"
  ]
}
```



### Month of Year

**kind**: enum\
**name**: monthOfYear\
**uri**: https://jsonotron.org/jss/monthOfYear

A calendar month.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
JAN |  | January |  
FEB |  | February |  
MAR |  | March |  
APR |  | April |  
MAY |  | May |  
JUN |  | June |  
JUL |  | July |  
AUG |  | August |  
SEP |  | September |  
OCT |  | October |  
NOV |  | November |  
DEC |  | December |  

  

### Negative Floating Point Number

**kind**: schema\
**name**: negativeFloat\
**uri**: https://jsonotron.org/jss/negativeFloat

A number with an integral and decimal part that is less than zero.

### Example 1

An example.

```json
-21.09
```


### Schema


```json
{
  "type": "number",
  "exclusiveMaximum": 0
}
```



### Negative Floating Point Number or Zero

**kind**: schema\
**name**: negativeFloatOrZero\
**uri**: https://jsonotron.org/jss/negativeFloatOrZero

A number with an integral and decimal part that is less than or equal to zero.

### Example 1

An example.

```json
-6.16
```

### Example 2

An example.

```json
0
```


### Schema


```json
{
  "type": "number",
  "maximum": 0
}
```



### Negative Integer

**kind**: schema\
**name**: negativeInteger\
**uri**: https://jsonotron.org/jss/negativeInteger

A whole number that is equal to -1 or less.

### Example 1

An example.

```json
-9
```


### Schema


```json
{
  "type": "integer",
  "maximum": -1
}
```



### Negative Integer or Zero

**kind**: schema\
**name**: negativeIntegerOrZero\
**uri**: https://jsonotron.org/jss/negativeIntegerOrZero

A whole number that is equal to zero or less.

### Example 1

An example.

```json
-15
```

### Example 2

An example.

```json
0
```


### Schema


```json
{
  "type": "integer",
  "maximum": 0
}
```



### Object

**kind**: schema\
**name**: object\
**uri**: https://jsonotron.org/jss/object

A JSON object.  The underlying data store may impose a limit of the depth of the JSON object.  You cannot store a null value.  Care should be taken not to supply an object of such depth or serialized size that the underlying data store cannot save it.

### Example 1

In this example we store an object with nested objects.

```json
{
  "hello": "world",
  "foo": {
    "bar": true
  }
}
```

### Example 2

Here we store an empty object.

```json
{}
```


### Schema


```json
{
  "type": "object"
}
```



### Payment Card Number

**kind**: schema\
**name**: paymentCardNo\
**uri**: https://jsonotron.org/jss/paymentCardNo

A value that uniquely identifies a payment card, such as a credit or debit card.  Any stored value will need to satisfy the LUHN algorithm.

### Example 1

An example.

```json
"4111111111111111"
```


### Schema


```json
{
  "type": "string",
  "format": "jsonotron-luhn"
}
```



### Positive Floating Point Number

**kind**: schema\
**name**: positiveFloat\
**uri**: https://jsonotron.org/jss/positiveFloat

A number with an integral and decimal part that is greater than zero.

### Example 1

An example.

```json
12.34
```


### Schema


```json
{
  "type": "number",
  "exclusiveMinimum": 0
}
```



### Positive Floating Point Number or Zero

**kind**: schema\
**name**: positiveFloatOrZero\
**uri**: https://jsonotron.org/jss/positiveFloatOrZero

A number with an integral and decimal part that is greater than or equal to zero.

### Example 1

An example.

```json
12.34
```

### Example 2

An example.

```json
0
```


### Schema


```json
{
  "type": "number",
  "minimum": 0
}
```



### Positive Integer

**kind**: schema\
**name**: positiveInteger\
**uri**: https://jsonotron.org/jss/positiveInteger

A whole number that is equal to 1 or greater.

### Example 1

An example.

```json
7
```


### Schema


```json
{
  "type": "integer",
  "minimum": 1
}
```



### Positive Integer or Zero

**kind**: schema\
**name**: positiveIntegerOrZero\
**uri**: https://jsonotron.org/jss/positiveIntegerOrZero

A whole number that is equal to zero or greater.

### Example 1

An example.

```json
21
```

### Example 2

An example.

```json
0
```


### Schema


```json
{
  "type": "integer",
  "minimum": 0
}
```



### Short String

**kind**: schema\
**name**: shortString\
**uri**: https://jsonotron.org/jss/shortString

A string of 20 characters or less.  An empty string is valid.

### Example 1

A short text string.

```json
"A terse string"
```


### Schema


```json
{
  "type": "string",
  "maxLength": 20
}
```



### String

**kind**: schema\
**name**: string\
**uri**: https://jsonotron.org/jss/string

A string of characters of any length.  Care should be taken not to supply a string of such great length that the underlying data store cannot save it.  An empty string is valid.

### Example 1

An example.

```json
"A string"
```


### Schema


```json
{
  "type": "string"
}
```



### Telephone Number

**kind**: schema\
**name**: telephoneNo\
**uri**: https://jsonotron.org/jss/telephoneNo

A telephone number that comprises of a dialling code and a number.

The `isd` property identifies the country that the telephone number resides in.

The `number` property optionally describes extension information.

### Example 1

In this example we have a UK mobile number.

```json
{
  "isd": "ISD_44",
  "number": "7834111222"
}
```

### Example 2

In this example we have a US landline number with an extension.

```json
{
  "isd": "ISD_1",
  "number": "5550172",
  "ext": "2209"
}
```


### Schema


```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "isd": {
      "$ref": "callingCode",
      "documentation": "An international dialling code."
    },
    "number": {
      "$ref": "shortString",
      "documentation": "The main number.  It should NOT have a leading zero."
    },
    "ext": {
      "$ref": "shortString",
      "documentation": "Optional extension information."
    }
  },
  "required": [
    "isd",
    "number"
  ]
}
```



### Time

**kind**: schema\
**name**: time\
**uri**: https://jsonotron.org/jss/time

A string with the time components arranged using the HH:mm:ss pattern.  If the hours, minutes or seconds component is a value less than 10 then a leading zero must be included.  This ensures that all stored times are the same length.

### Example 1

An example.

```json
"23:14:56"
```


### Schema


```json
{
  "type": "string",
  "format": "time"
}
```



### Timestamp

**kind**: schema\
**name**: timestamp\
**uri**: https://jsonotron.org/jss/timestamp

The number of milliseconds that have elapsed since 00:00:00 Thursday, 1 January 1970.

### Example 1

An example.

```json
1595354428000
```


### Schema


```json
{
  "type": "integer",
  "minimum": 0
}
```



### Time Zone

**kind**: enum\
**name**: timeZone\
**uri**: https://jsonotron.org/jss/timeZone

A time zone from the IANA tz database.  The data is taken from https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
AFRICA_ABIDJAN |  | Africa/Abidjan (+00:00, DST +00:00) |  
AFRICA_ACCRA |  | Africa/Accra (+00:00, DST +00:00) |  
AFRICA_ALGIERS |  | Africa/Algiers (+01:00, DST +01:00) |  
AFRICA_BISSAU |  | Africa/Bissau (+00:00, DST +00:00) |  
AFRICA_CAIRO |  | Africa/Cairo (+02:00, DST +02:00) |  
AFRICA_CASABLANCA |  | Africa/Casablanca (+01:00, DST +01:00) |  
AFRICA_CEUTA |  | Africa/Ceuta (+01:00, DST +02:00) |  
AFRICA_EL_AAIUN |  | Africa/El_Aaiun (+00:00, DST +01:00) |  
AFRICA_JOHANNESBURG |  | Africa/Johannesburg (+02:00, DST +02:00) |  
AFRICA_JUBA |  | Africa/Juba (+03:00, DST +03:00) |  
AFRICA_KHARTOUM |  | Africa/Khartoum (+02:00, DST +02:00) |  
AFRICA_LAGOS |  | Africa/Lagos (+01:00, DST +01:00) |  
AFRICA_MAPUTO |  | Africa/Maputo (+02:00, DST +02:00) |  
AFRICA_MONROVIA |  | Africa/Monrovia (+00:00, DST +00:00) |  
AFRICA_NAIROBI |  | Africa/Nairobi (+03:00, DST +03:00) |  
AFRICA_NDJAMENA |  | Africa/Ndjamena (+01:00, DST +01:00) |  
AFRICA_TRIPOLI |  | Africa/Tripoli (+02:00, DST +02:00) |  
AFRICA_TUNIS |  | Africa/Tunis (+01:00, DST +01:00) |  
AFRICA_WINDHOEK |  | Africa/Windhoek (+02:00, DST +02:00) |  
AMERICA_ADAK |  | America/Adak (−10:00, DST −09:00) |  
AMERICA_ANCHORAGE |  | America/Anchorage (−09:00, DST −08:00) |  
AMERICA_ARAGUAINA |  | America/Araguaina (−03:00, DST −03:00) |  
AMERICA_ARGENTINA_BUENOS_AIRES |  | America/Argentina/Buenos_Aires (−03:00, DST −03:00) |  
AMERICA_ARGENTINA_CATAMARCA |  | America/Argentina/Catamarca (−03:00, DST −03:00) |  
AMERICA_ARGENTINA_CORDOBA |  | America/Argentina/Cordoba (−03:00, DST −03:00) |  
AMERICA_ARGENTINA_JUJUY |  | America/Argentina/Jujuy (−03:00, DST −03:00) |  
AMERICA_ARGENTINA_LA_RIOJA |  | America/Argentina/La_Rioja (−03:00, DST −03:00) |  
AMERICA_ARGENTINA_MENDOZA |  | America/Argentina/Mendoza (−03:00, DST −03:00) |  
AMERICA_ARGENTINA_RIO_GALLEGOS |  | America/Argentina/Rio_Gallegos (−03:00, DST −03:00) |  
AMERICA_ARGENTINA_SALTA |  | America/Argentina/Salta (−03:00, DST −03:00) |  
AMERICA_ARGENTINA_SAN_JUAN |  | America/Argentina/San_Juan (−03:00, DST −03:00) |  
AMERICA_ARGENTINA_SAN_LUIS |  | America/Argentina/San_Luis (−03:00, DST −03:00) |  
AMERICA_ARGENTINA_TUCUMAN |  | America/Argentina/Tucuman (−03:00, DST −03:00) |  
AMERICA_ARGENTINA_USHUAIA |  | America/Argentina/Ushuaia (−03:00, DST −03:00) |  
AMERICA_ASUNCION |  | America/Asuncion (−04:00, DST −03:00) |  
AMERICA_ATIKOKAN |  | America/Atikokan (−05:00, DST −05:00) |  
AMERICA_BAHIA |  | America/Bahia (−03:00, DST −03:00) |  
AMERICA_BAHIA_BANDERAS |  | America/Bahia_Banderas (−06:00, DST −05:00) |  
AMERICA_BARBADOS |  | America/Barbados (−04:00, DST −04:00) |  
AMERICA_BELEM |  | America/Belem (−03:00, DST −03:00) |  
AMERICA_BELIZE |  | America/Belize (−06:00, DST −06:00) |  
AMERICA_BLANC_SABLON |  | America/Blanc-Sablon (−04:00, DST −04:00) |  
AMERICA_BOA_VISTA |  | America/Boa_Vista (−04:00, DST −04:00) |  
AMERICA_BOGOTA |  | America/Bogota (−05:00, DST −05:00) |  
AMERICA_BOISE |  | America/Boise (−07:00, DST −06:00) |  
AMERICA_CAMBRIDGE_BAY |  | America/Cambridge_Bay (−07:00, DST −06:00) |  
AMERICA_CAMPO_GRANDE |  | America/Campo_Grande (−04:00, DST −03:00) |  
AMERICA_CANCUN |  | America/Cancun (−05:00, DST −05:00) |  
AMERICA_CARACAS |  | America/Caracas (−04:00, DST −04:00) |  
AMERICA_CAYENNE |  | America/Cayenne (−03:00, DST −03:00) |  
AMERICA_CHICAGO |  | America/Chicago (−06:00, DST −05:00) |  
AMERICA_CHIHUAHUA |  | America/Chihuahua (−07:00, DST −06:00) |  
AMERICA_COSTA_RICA |  | America/Costa_Rica (−06:00, DST −06:00) |  
AMERICA_CRESTON |  | America/Creston (−07:00, DST −07:00) |  
AMERICA_CUIABA |  | America/Cuiaba (−04:00, DST −03:00) |  
AMERICA_CURACAO |  | America/Curacao (−04:00, DST −04:00) |  
AMERICA_DANMARKSHAVN |  | America/Danmarkshavn (+00:00, DST +00:00) |  
AMERICA_DAWSON |  | America/Dawson (−08:00, DST −07:00) |  
AMERICA_DAWSON_CREEK |  | America/Dawson_Creek (−07:00, DST −07:00) |  
AMERICA_DENVER |  | America/Denver (−07:00, DST −06:00) |  
AMERICA_DETROIT |  | America/Detroit (−05:00, DST −04:00) |  
AMERICA_EDMONTON |  | America/Edmonton (−07:00, DST −06:00) |  
AMERICA_EIRUNEPE |  | America/Eirunepe (−05:00, DST −05:00) |  
AMERICA_EL_SALVADOR |  | America/El_Salvador (−06:00, DST −06:00) |  
AMERICA_FORT_NELSON |  | America/Fort_Nelson (−07:00, DST −07:00) |  
AMERICA_FORTALEZA |  | America/Fortaleza (−03:00, DST −03:00) |  
AMERICA_GLACE_BAY |  | America/Glace_Bay (−04:00, DST −03:00) |  
AMERICA_GODTHAB |  | America/Godthab (−03:00, DST −02:00) |  
AMERICA_GOOSE_BAY |  | America/Goose_Bay (−04:00, DST −03:00) |  
AMERICA_GRAND_TURK |  | America/Grand_Turk (−05:00, DST −04:00) |  
AMERICA_GUATEMALA |  | America/Guatemala (−06:00, DST −06:00) |  
AMERICA_GUAYAQUIL |  | America/Guayaquil (−05:00, DST −05:00) |  
AMERICA_GUYANA |  | America/Guyana (−04:00, DST −04:00) |  
AMERICA_HALIFAX |  | America/Halifax (−04:00, DST −03:00) |  
AMERICA_HAVANA |  | America/Havana (−05:00, DST −04:00) |  
AMERICA_HERMOSILLO |  | America/Hermosillo (−07:00, DST −07:00) |  
AMERICA_INDIANA_INDIANAPOLIS |  | America/Indiana/Indianapolis (−05:00, DST −04:00) |  
AMERICA_INDIANA_KNOX |  | America/Indiana/Knox (−06:00, DST −05:00) |  
AMERICA_INDIANA_MARENGO |  | America/Indiana/Marengo (−05:00, DST −04:00) |  
AMERICA_INDIANA_PETERSBURG |  | America/Indiana/Petersburg (−05:00, DST −04:00) |  
AMERICA_INDIANA_TELL_CITY |  | America/Indiana/Tell_City (−06:00, DST −05:00) |  
AMERICA_INDIANA_VEVAY |  | America/Indiana/Vevay (−05:00, DST −04:00) |  
AMERICA_INDIANA_VINCENNES |  | America/Indiana/Vincennes (−05:00, DST −04:00) |  
AMERICA_INDIANA_WINAMAC |  | America/Indiana/Winamac (−05:00, DST −04:00) |  
AMERICA_INUVIK |  | America/Inuvik (−07:00, DST −06:00) |  
AMERICA_IQALUIT |  | America/Iqaluit (−05:00, DST −04:00) |  
AMERICA_JAMAICA |  | America/Jamaica (−05:00, DST −05:00) |  
AMERICA_JUNEAU |  | America/Juneau (−09:00, DST −08:00) |  
AMERICA_KENTUCKY_LOUISVILLE |  | America/Kentucky/Louisville (−05:00, DST −04:00) |  
AMERICA_KENTUCKY_MONTICELLO |  | America/Kentucky/Monticello (−05:00, DST −04:00) |  
AMERICA_LA_PAZ |  | America/La_Paz (−04:00, DST −04:00) |  
AMERICA_LIMA |  | America/Lima (−05:00, DST −05:00) |  
AMERICA_LOS_ANGELES |  | America/Los_Angeles (−08:00, DST −07:00) |  
AMERICA_MACEIO |  | America/Maceio (−03:00, DST −03:00) |  
AMERICA_MANAGUA |  | America/Managua (−06:00, DST −06:00) |  
AMERICA_MANAUS |  | America/Manaus (−04:00, DST −04:00) |  
AMERICA_MARTINIQUE |  | America/Martinique (−04:00, DST −04:00) |  
AMERICA_MATAMOROS |  | America/Matamoros (−06:00, DST −05:00) |  
AMERICA_MAZATLAN |  | America/Mazatlan (−07:00, DST −06:00) |  
AMERICA_MENOMINEE |  | America/Menominee (−06:00, DST −05:00) |  
AMERICA_MERIDA |  | America/Merida (−06:00, DST −05:00) |  
AMERICA_METLAKATLA |  | America/Metlakatla (−09:00, DST −08:00) |  
AMERICA_MEXICO_CITY |  | America/Mexico_City (−06:00, DST −05:00) |  
AMERICA_MIQUELON |  | America/Miquelon (−03:00, DST −02:00) |  
AMERICA_MONCTON |  | America/Moncton (−04:00, DST −03:00) |  
AMERICA_MONTERREY |  | America/Monterrey (−06:00, DST −05:00) |  
AMERICA_MONTEVIDEO |  | America/Montevideo (−03:00, DST −03:00) |  
AMERICA_NASSAU |  | America/Nassau (−05:00, DST −04:00) |  
AMERICA_NEW_YORK |  | America/New_York (−05:00, DST −04:00) |  
AMERICA_NIPIGON |  | America/Nipigon (−05:00, DST −04:00) |  
AMERICA_NOME |  | America/Nome (−09:00, DST −08:00) |  
AMERICA_NORONHA |  | America/Noronha (−02:00, DST −02:00) |  
AMERICA_NORTH_DAKOTA_BEULAH |  | America/North_Dakota/Beulah (−06:00, DST −05:00) |  
AMERICA_NORTH_DAKOTA_CENTER |  | AmericaNorth_Dakota/Center (−06:00, DST −05:00) |  
AMERICA_NORTH_DAKOTA_NEW_SALEM |  | America/North_Dakota/New_Salem (−06:00, DST −05:00) |  
AMERICA_OJINAGA |  | America/Ojinaga (−07:00, DST −06:00) |  
AMERICA_PANAMA |  | America/Panama (−05:00, DST −05:00) |  
AMERICA_PANGNIRTUNG |  | America/Pangnirtung (−05:00, DST −04:00) |  
AMERICA_PARAMARIBO |  | America/Paramaribo (−03:00, DST −03:00) |  
AMERICA_PHOENIX |  | America/Phoenix (−07:00, DST −07:00) |  
AMERICA_PORT_OF_SPAIN |  | America/Port_of_Spain (−04:00, DST −04:00) |  
AMERICA_PORT_AU_PRINCE |  | America/Port-au-Prince (−05:00, DST −04:00) |  
AMERICA_PORTO_VELHO |  | America/Porto_Velho (−04:00, DST −04:00) |  
AMERICA_PUERTO_RICO |  | America/Puerto_Rico (−04:00, DST −04:00) |  
AMERICA_PUNTA_ARENAS |  | America/Punta_Arenas (−03:00, DST −03:00) |  
AMERICA_RAINY_RIVER |  | America/Rainy_River (−06:00, DST −05:00) |  
AMERICA_RANKIN_INLET |  | America/Rankin_Inlet (−06:00, DST −05:00) |  
AMERICA_RECIFE |  | America/Recife (−03:00, DST −03:00) |  
AMERICA_REGINA |  | America/Regina (−06:00, DST −06:00) |  
AMERICA_RESOLUTE |  | America/Resolute (−06:00, DST −05:00) |  
AMERICA_RIO_BRANCO |  | America/Rio_Branco (−05:00, DST −05:00) |  
AMERICA_SANTAREM |  | America/Santarem (−03:00, DST −03:00) |  
AMERICA_SANTIAGO |  | America/Santiago (−04:00, DST −03:00) |  
AMERICA_SANTO_DOMINGO |  | America/Santo_Domingo (−04:00, DST −04:00) |  
AMERICA_SAO_PAULO |  | America/Sao_Paulo (−03:00, DST −02:00) |  
AMERICA_SCORESBYSUND |  | America/Scoresbysund (−01:00, DST +00:00) |  
AMERICA_SITKA |  | America/Sitka (−09:00, DST −08:00) |  
AMERICA_ST_JOHNS |  | America/St_Johns (−03:30, DST −02:30) |  
AMERICA_SWIFT_CURRENT |  | America/Swift_Current (−06:00, DST −06:00) |  
AMERICA_TEGUCIGALPA |  | America/Tegucigalpa (−06:00, DST −06:00) |  
AMERICA_THULE |  | America/Thule (−04:00, DST −03:00) |  
AMERICA_THUNDER_BAY |  | America/Thunder_Bay (−05:00, DST −04:00) |  
AMERICA_TIJUANA |  | America/Tijuana (−08:00, DST −07:00) |  
AMERICA_TORONTO |  | America/Toronto (−05:00, DST −04:00) |  
AMERICA_VANCOUVER |  | America/Vancouver (−08:00, DST −07:00) |  
AMERICA_WHITEHORSE |  | America/Whitehorse (−08:00, DST −07:00) |  
AMERICA_WINNIPEG |  | America/Winnipeg (−06:00, DST −05:00) |  
AMERICA_YAKUTAT |  | America/Yakutat (−09:00, DST −08:00) |  
AMERICA_YELLOWKNIFE |  | America/Yellowknife (−07:00, DST −06:00) |  
ANTARCTICA_CASEY |  | Antarctica/Casey (+11:00, DST +11:00) |  
ANTARCTICA_DAVIS |  | Antarctica/Davis (+07:00, DST +07:00) |  
ANTARCTICA_DUMONTDURVILLE |  | Antarctica/DumontDUrville (+10:00, DST +10:00) |  
ANTARCTICA_MACQUARIE |  | Antarctica/Macquarie (+11:00, DST +11:00) |  
ANTARCTICA_MAWSON |  | Antarctica/Mawson (+05:00, DST +05:00) |  
ANTARCTICA_PALMER |  | Antarctica/Palmer (−03:00, DST −03:00) |  
ANTARCTICA_ROTHERA |  | Antarctica/Rothera (−03:00, DST −03:00) |  
ANTARCTICA_SYOWA |  | Antarctica/Syowa (+03:00, DST +03:00) |  
ANTARCTICA_TROLL |  | Antarctica/Troll (+00:00, DST +02:00) |  
ANTARCTICA_VOSTOK |  | Antarctica/Vostok (+06:00, DST +06:00) |  
ASIA_ALMATY |  | Asia/Almaty (+06:00, DST +06:00) |  
ASIA_AMMAN |  | Asia/Amman (+02:00, DST +03:00) |  
ASIA_ANADYR |  | Asia/Anadyr (+12:00, DST +12:00) |  
ASIA_AQTAU |  | Asia/Aqtau (+05:00, DST +05:00) |  
ASIA_AQTOBE |  | Asia/Aqtobe (+05:00, DST +05:00) |  
ASIA_ASHGABAT |  | Asia/Ashgabat (+05:00, DST +05:00) |  
ASIA_ATYRAU |  | Asia/Atyrau (+05:00, DST +05:00) |  
ASIA_BAGHDAD |  | Asia/Baghdad (+03:00, DST +03:00) |  
ASIA_BAKU |  | Asia/Baku (+04:00, DST +04:00) |  
ASIA_BANGKOK |  | Asia/Bangkok (+07:00, DST +07:00) |  
ASIA_BARNAUL |  | Asia/Barnaul (+07:00, DST +07:00) |  
ASIA_BEIRUT |  | Asia/Beirut (+02:00, DST +03:00) |  
ASIA_BISHKEK |  | Asia/Bishkek (+06:00, DST +06:00) |  
ASIA_BRUNEI |  | Asia/Brunei (+08:00, DST +08:00) |  
ASIA_CHITA |  | Asia/Chita (+09:00, DST +09:00) |  
ASIA_CHOIBALSAN |  | Asia/Choibalsan (+08:00, DST +08:00) |  
ASIA_COLOMBO |  | Asia/Colombo (+05:30, DST +05:30) |  
ASIA_DAMASCUS |  | Asia/Damascus (+02:00, DST +03:00) |  
ASIA_DHAKA |  | Asia/Dhaka (+06:00, DST +06:00) |  
ASIA_DILI |  | Asia/Dili (+09:00, DST +09:00) |  
ASIA_DUBAI |  | Asia/Dubai (+04:00, DST +04:00) |  
ASIA_DUSHANBE |  | Asia/Dushanbe (+05:00, DST +05:00) |  
ASIA_FAMAGUSTA |  | Asia/Famagusta (+02:00, DST +02:00) |  
ASIA_GAZA |  | Asia/Gaza (+02:00, DST +03:00) |  
ASIA_HEBRON |  | Asia/Hebron (+02:00, DST +03:00) |  
ASIA_HO_CHI_MINH |  | Asia/Ho_Chi_Minh (+07:00, DST +07:00) |  
ASIA_HONG_KONG |  | Asia/Hong_Kong (+08:00, DST +08:00) |  
ASIA_HOVD |  | Asia/Hovd (+07:00, DST +07:00) |  
ASIA_IRKUTSK |  | Asia/Irkutsk (+08:00, DST +08:00) |  
ASIA_JAKARTA |  | Asia/Jakarta (+07:00, DST +07:00) |  
ASIA_JAYAPURA |  | Asia/Jayapura (+09:00, DST +09:00) |  
ASIA_JERUSALEM |  | Asia/Jerusalem (+02:00, DST +03:00) |  
ASIA_KABUL |  | Asia/Kabul (+04:30, DST +04:30) |  
ASIA_KAMCHATKA |  | Asia/Kamchatka (+12:00, DST +12:00) |  
ASIA_KARACHI |  | Asia/Karachi (+05:00, DST +05:00) |  
ASIA_KATHMANDU |  | Asia/Kathmandu (+05:45, DST +05:45) |  
ASIA_KHANDYGA |  | Asia/Khandyga (+09:00, DST +09:00) |  
ASIA_KOLKATA |  | Asia/Kolkata (+05:30, DST +05:30) |  
ASIA_KRASNOYARSK |  | Asia/Krasnoyarsk (+07:00, DST +07:00) |  
ASIA_KUALA_LUMPUR |  | Asia/Kuala_Lumpur (+08:00, DST +08:00) |  
ASIA_KUCHING |  | Asia/Kuching (+08:00, DST +08:00) |  
ASIA_MACAU |  | Asia/Macau (+08:00, DST +08:00) |  
ASIA_MAGADAN |  | Asia/Magadan (+11:00, DST +11:00) |  
ASIA_MAKASSAR |  | Asia/Makassar (+08:00, DST +08:00) |  
ASIA_MANILA |  | Asia/Manila (+08:00, DST +08:00) |  
ASIA_NOVOKUZNETSK |  | Asia/Novokuznetsk (+07:00, DST +07:00) |  
ASIA_NOVOSIBIRSK |  | Asia/Novosibirsk (+07:00, DST +07:00) |  
ASIA_OMSK |  | Asia/Omsk (+06:00, DST +06:00) |  
ASIA_ORAL |  | Asia/Oral (+05:00, DST +05:00) |  
ASIA_PONTIANAK |  | Asia/Pontianak (+07:00, DST +07:00) |  
ASIA_PYONGYANG |  | Asia/Pyongyang (+09:00, DST +09:00) |  
ASIA_QATAR |  | Asia/Qatar (+03:00, DST +03:00) |  
ASIA_QYZYLORDA |  | Asia/Qyzylorda (+05:00, DST +05:00) |  
ASIA_RIYADH |  | Asia/Riyadh (+03:00, DST +03:00) |  
ASIA_SAKHALIN |  | Asia/Sakhalin (+11:00, DST +11:00) |  
ASIA_SAMARKAND |  | Asia/Samarkand (+05:00, DST +05:00) |  
ASIA_SEOUL |  | Asia/Seoul (+09:00, DST +09:00) |  
ASIA_SHANGHAI |  | Asia/Shanghai (+08:00, DST +08:00) |  
ASIA_SINGAPORE |  | Asia/Singapore (+08:00, DST +08:00) |  
ASIA_SREDNEKOLYMSK |  | Asia/Srednekolymsk (+11:00, DST +11:00) |  
ASIA_TAIPEI |  | Asia/Taipei (+08:00, DST +08:00) |  
ASIA_TASHKENT |  | Asia/Tashkent (+05:00, DST +05:00) |  
ASIA_TBILISI |  | Asia/Tbilisi (+04:00, DST +04:00) |  
ASIA_TEHRAN |  | Asia/Tehran (+03:30, DST +04:30) |  
ASIA_THIMPHU |  | Asia/Thimphu (+06:00, DST +06:00) |  
ASIA_TOKYO |  | Asia/Tokyo (+09:00, DST +09:00) |  
ASIA_TOMSK |  | Asia/Tomsk (+07:00, DST +07:00) |  
ASIA_ULAANBAATAR |  | Asia/Ulaanbaatar (+08:00, DST +08:00) |  
ASIA_URUMQI |  | Asia/Urumqi (+06:00, DST +06:00) |  
ASIA_UST_NERA |  | Asia/Ust-Nera (+10:00, DST +10:00) |  
ASIA_VLADIVOSTOK |  | Asia/Vladivostok (+10:00, DST +10:00) |  
ASIA_YAKUTSK |  | Asia/Yakutsk (+09:00, DST +09:00) |  
ASIA_YANGON |  | Asia/Yangon (+06:30, DST +06:30) |  
ASIA_YEKATERINBURG |  | Asia/Yekaterinburg (+05:00, DST +05:00) |  
ASIA_YEREVAN |  | Asia/Yerevan (+04:00, DST +04:00) |  
ATLANTIC_AZORES |  | Atlantic/Azores (−01:00, DST +00:00) |  
ATLANTIC_BERMUDA |  | Atlantic/Bermuda (−04:00, DST −03:00) |  
ATLANTIC_CANARY |  | Atlantic/Canary (+00:00, DST +01:00) |  
ATLANTIC_CAPE_VERDE |  | Atlantic/Cape_Verde (−01:00, DST −01:00) |  
ATLANTIC_FAROE |  | Atlantic/Faroe (+00:00, DST +01:00) |  
ATLANTIC_MADEIRA |  | Atlantic/Madeira (+00:00, DST +01:00) |  
ATLANTIC_REYKJAVIK |  | Atlantic/Reykjavik (+00:00, DST +00:00) |  
ATLANTIC_SOUTH_GEORGIA |  | Atlantic/South_Georgia (−02:00, DST −02:00) |  
ATLANTIC_STANLEY |  | Atlantic/Stanley (−03:00, DST −03:00) |  
AUSTRALIA_ADELAIDE |  | Australia/Adelaide (+09:30, DST +10:30) |  
AUSTRALIA_BRISBANE |  | Australia/Brisbane (+10:00, DST +10:00) |  
AUSTRALIA_BROKEN_HILL |  | Australia/Broken_Hill (+09:30, DST +10:30) |  
AUSTRALIA_CURRIE |  | Australia/Currie (+10:00, DST +11:00) |  
AUSTRALIA_DARWIN |  | Australia/Darwin (+09:30, DST +09:30) |  
AUSTRALIA_EUCLA |  | Australia/Eucla (+08:45, DST +08:45) |  
AUSTRALIA_HOBART |  | Australia/Hobart (+10:00, DST +11:00) |  
AUSTRALIA_LINDEMAN |  | Australia/Lindeman (+10:00, DST +10:00) |  
AUSTRALIA_LORD_HOWE |  | Australia/Lord_Howe (+10:30, DST +11:00) |  
AUSTRALIA_MELBOURNE |  | Australia/Melbourne (+10:00, DST +11:00) |  
AUSTRALIA_PERTH |  | Australia/Perth (+08:00, DST +08:00) |  
AUSTRALIA_SYDNEY |  | Australia/Sydney (+10:00, DST +11:00) |  
ETC_GMT |  | Etc/GMT (+00:00, DST +00:00) |  
ETC_GMT_PLUS_1 |  | Etc/GMT+1 (−01:00, DST −01:00) |  
ETC_GMT_PLUS_10 |  | Etc/GMT+10 (−10:00, DST −10:00) |  
ETC_GMT_PLUS_11 |  | Etc/GMT+11 (−11:00, DST −11:00) |  
ETC_GMT_PLUS_12 |  | Etc/GMT+12 (−12:00, DST −12:00) |  
ETC_GMT_PLUS_2 |  | Etc/GMT+2 (−02:00, DST −02:00) |  
ETC_GMT_PLUS_3 |  | Etc/GMT+3 (−03:00, DST −03:00) |  
ETC_GMT_PLUS_4 |  | Etc/GMT+4 (−04:00, DST −04:00) |  
ETC_GMT_PLUS_5 |  | Etc/GMT+5 (−05:00, DST −05:00) |  
ETC_GMT_PLUS_6 |  | Etc/GMT+6 (−06:00, DST −06:00) |  
ETC_GMT_PLUS_7 |  | Etc/GMT+7 (−07:00, DST −07:00) |  
ETC_GMT_PLUS_8 |  | Etc/GMT+8 (−08:00, DST −08:00) |  
ETC_GMT_PLUS_9 |  | Etc/GMT+9 (−09:00, DST −09:00) |  
ETC_GMT_MINUS_1 |  | Etc/GMT-1 (+01:00, DST +01:00) |  
ETC_GMT_MINUS_10 |  | Etc/GMT-10 (+10:00, DST +10:00) |  
ETC_GMT_MINUS_11 |  | Etc/GMT-11 (+11:00, DST +11:00) |  
ETC_GMT_MINUS_12 |  | Etc/GMT-12 (+12:00, DST +12:00) |  
ETC_GMT_MINUS_13 |  | Etc/GMT-13 (+13:00, DST +13:00) |  
ETC_GMT_MINUS_14 |  | Etc/GMT-14 (+14:00, DST +14:00) |  
ETC_GMT_MINUS_2 |  | Etc/GMT-2 (+02:00, DST +02:00) |  
ETC_GMT_MINUS_3 |  | Etc/GMT-3 (+03:00, DST +03:00) |  
ETC_GMT_MINUS_4 |  | Etc/GMT-4 (+04:00, DST +04:00) |  
ETC_GMT_MINUS_5 |  | Etc/GMT-5 (+05:00, DST +05:00) |  
ETC_GMT_MINUS_6 |  | Etc/GMT-6 (+06:00, DST +06:00) |  
ETC_GMT_MINUS_7 |  | Etc/GMT-7 (+07:00, DST +07:00) |  
ETC_GMT_MINUS_8 |  | Etc/GMT-8 (+08:00, DST +08:00) |  
ETC_GMT_MINUS_9 |  | Etc/GMT-9 (+09:00, DST +09:00) |  
ETC_UTC |  | Etc/UTC (+00:00, DST +00:00) |  
EUROPE_AMSTERDAM |  | Europe/Amsterdam (+01:00, DST +02:00) |  
EUROPE_ANDORRA |  | Europe/Andorra (+01:00, DST +02:00) |  
EUROPE_ASTRAKHAN |  | Europe/Astrakhan (+04:00, DST +04:00) |  
EUROPE_ATHENS |  | Europe/Athens (+02:00, DST +03:00) |  
EUROPE_BELGRADE |  | Europe/Belgrade (+01:00, DST +02:00) |  
EUROPE_BERLIN |  | Europe/Berlin (+01:00, DST +02:00) |  
EUROPE_BRUSSELS |  | Europe/Brussels (+01:00, DST +02:00) |  
EUROPE_BUCHAREST |  | Europe/Bucharest (+02:00, DST +03:00) |  
EUROPE_BUDAPEST |  | Europe/Budapest (+01:00, DST +02:00) |  
EUROPE_CHISINAU |  | Europe/Chisinau (+02:00, DST +03:00) |  
EUROPE_COPENHAGEN |  | Europe/Copenhagen (+01:00, DST +02:00) |  
EUROPE_DUBLIN |  | Europe/Dublin (+00:00, DST +01:00) |  
EUROPE_GIBRALTAR |  | Europe/Gibraltar (+01:00, DST +02:00) |  
EUROPE_HELSINKI |  | Europe/Helsinki (+02:00, DST +03:00) |  
EUROPE_ISTANBUL |  | Europe/Istanbul (+03:00, DST +03:00) |  
EUROPE_KALININGRAD |  | Europe/Kaliningrad (+02:00, DST +02:00) |  
EUROPE_KIEV |  | Europe/Kiev (+02:00, DST +03:00) |  
EUROPE_KIROV |  | Europe/Kirov (+03:00, DST +03:00) |  
EUROPE_LISBON |  | Europe/Lisbon (+00:00, DST +01:00) |  
EUROPE_LONDON |  | Europe/London (+00:00, DST +01:00) |  
EUROPE_LUXEMBOURG |  | Europe/Luxembourg (+01:00, DST +02:00) |  
EUROPE_MADRID |  | Europe/Madrid (+01:00, DST +02:00) |  
EUROPE_MALTA |  | Europe/Malta (+01:00, DST +02:00) |  
EUROPE_MINSK |  | Europe/Minsk (+03:00, DST +03:00) |  
EUROPE_MONACO |  | Europe/Monaco (+01:00, DST +02:00) |  
EUROPE_MOSCOW |  | Europe/Moscow (+03:00, DST +03:00) |  
ASIA_NICOSIA |  | Asia/Nicosia (+02:00, DST +03:00) |  
EUROPE_OSLO |  | Europe/Oslo (+01:00, DST +02:00) |  
EUROPE_PARIS |  | Europe/Paris (+01:00, DST +02:00) |  
EUROPE_PRAGUE |  | Europe/Prague (+01:00, DST +02:00) |  
EUROPE_RIGA |  | Europe/Riga (+02:00, DST +03:00) |  
EUROPE_ROME |  | Europe/Rome (+01:00, DST +02:00) |  
EUROPE_SAMARA |  | Europe/Samara (+04:00, DST +04:00) |  
EUROPE_SARATOV |  | Europe/Saratov (+04:00, DST +04:00) |  
EUROPE_SIMFEROPOL |  | Europe/Simferopol (+03:00, DST +03:00) |  
EUROPE_SOFIA |  | Europe/Sofia (+02:00, DST +03:00) |  
EUROPE_STOCKHOLM |  | Europe/Stockholm (+01:00, DST +02:00) |  
EUROPE_TALLINN |  | Europe/Tallinn (+02:00, DST +03:00) |  
EUROPE_TIRANE |  | Europe/Tirane (+01:00, DST +02:00) |  
EUROPE_ULYANOVSK |  | Europe/Ulyanovsk (+04:00, DST +04:00) |  
EUROPE_UZHGOROD |  | Europe/Uzhgorod (+02:00, DST +03:00) |  
EUROPE_VIENNA |  | Europe/Vienna (+01:00, DST +02:00) |  
EUROPE_VILNIUS |  | Europe/Vilnius (+02:00, DST +03:00) |  
EUROPE_VOLGOGRAD |  | Europe/Volgograd (+04:00, DST +04:00) |  
EUROPE_WARSAW |  | Europe/Warsaw (+01:00, DST +02:00) |  
EUROPE_ZAPOROZHYE |  | Europe/Zaporozhye (+02:00, DST +03:00) |  
EUROPE_ZURICH |  | Europe/Zurich (+01:00, DST +02:00) |  
INDIAN_CHAGOS |  | Indian/Chagos (+06:00, DST +06:00) |  
INDIAN_CHRISTMAS |  | Indian/Christmas (+07:00, DST +07:00) |  
INDIAN_COCOS |  | Indian/Cocos (+06:30, DST +06:30) |  
INDIAN_KERGUELEN |  | Indian/Kerguelen (+05:00, DST +05:00) |  
INDIAN_MAHE |  | Indian/Mahe (+04:00, DST +04:00) |  
INDIAN_MALDIVES |  | Indian/Maldives (+05:00, DST +05:00) |  
INDIAN_MAURITIUS |  | Indian/Mauritius (+04:00, DST +04:00) |  
INDIAN_REUNION |  | Indian/Reunion (+04:00, DST +04:00) |  
PACIFIC_APIA |  | Pacific/Apia (+13:00, DST +14:00) |  
PACIFIC_AUCKLAND |  | Pacific/Auckland (+12:00, DST +13:00) |  
PACIFIC_BOUGAINVILLE |  | Pacific/Bougainville (+11:00, DST +11:00) |  
PACIFIC_CHATHAM |  | Pacific/Chatham (+12:45, DST +13:45) |  
PACIFIC_CHUUK |  | Pacific/Chuuk (+10:00, DST +10:00) |  
PACIFIC_EASTER |  | Pacific/Easter (−06:00, DST −05:00) |  
PACIFIC_EFATE |  | Pacific/Efate (+11:00, DST +11:00) |  
PACIFIC_ENDERBURY |  | Pacific/Enderbury (+13:00, DST +13:00) |  
PACIFIC_FAKAOFO |  | Pacific/Fakaofo (+13:00, DST +13:00) |  
PACIFIC_FIJI |  | Pacific/Fiji (+12:00, DST +13:00) |  
PACIFIC_FUNAFUTI |  | Pacific/Funafuti (+12:00, DST +12:00) |  
PACIFIC_GALAPAGOS |  | Pacific/Galapagos (−06:00, DST −06:00) |  
PACIFIC_GAMBIER |  | Pacific/Gambier (−09:00, DST −09:00) |  
PACIFIC_GUADALCANAL |  | Pacific/Guadalcanal (+11:00, DST +11:00) |  
PACIFIC_GUAM |  | Pacific/Guam (+10:00, DST +10:00) |  
PACIFIC_HONOLULU |  | Pacific/Honolulu (−10:00, DST −10:00) |  
PACIFIC_KIRITIMATI |  | Pacific/Kiritimati (+14:00, DST +14:00) |  
PACIFIC_KOSRAE |  | Pacific/Kosrae (+11:00, DST +11:00) |  
PACIFIC_KWAJALEIN |  | Pacific/Kwajalein (+12:00, DST +12:00) |  
PACIFIC_MAJURO |  | Pacific/Majuro (+12:00, DST +12:00) |  
PACIFIC_MARQUESAS |  | Pacific/Marquesas (−09:30, DST −09:30) |  
PACIFIC_NAURU |  | Pacific/Nauru (+12:00, DST +12:00) |  
PACIFIC_NIUE |  | Pacific/Niue (−11:00, DST −11:00) |  
PACIFIC_NORFOLK |  | Pacific/Norfolk (+11:00, DST +11:00) |  
PACIFIC_NOUMEA |  | Pacific/Noumea (+11:00, DST +11:00) |  
PACIFIC_PAGO_PAGO |  | Pacific/Pago_Pago (−11:00, DST −11:00) |  
PACIFIC_PALAU |  | Pacific/Palau (+09:00, DST +09:00) |  
PACIFIC_PITCAIRN |  | Pacific/Pitcairn (−08:00, DST −08:00) |  
PACIFIC_POHNPEI |  | Pacific/Pohnpei (+11:00, DST +11:00) |  
PACIFIC_PORT_MORESBY |  | Pacific/Port_Moresby (+10:00, DST +10:00) |  
PACIFIC_RAROTONGA |  | Pacific/Rarotonga (−10:00, DST −10:00) |  
PACIFIC_TAHITI |  | Pacific/Tahiti (−10:00, DST −10:00) |  
PACIFIC_TARAWA |  | Pacific/Tarawa (+12:00, DST +12:00) |  
PACIFIC_TONGATAPU |  | Pacific/Tongatapu (+13:00, DST +14:00) |  
PACIFIC_WAKE |  | Pacific/Wake (+12:00, DST +12:00) |  
PACIFIC_WALLIS |  | Pacific/Wallis (+12:00, DST +12:00) |  

  

### UUID

**kind**: schema\
**name**: uuid\
**uri**: https://jsonotron.org/jss/uuid

A universally unique 128 bit number formatted as 32 alphanumeric characters and defined by RFC 4122.

### Example 1

An example.

```json
"1ff9a681-092e-48ad-8d5a-1b0919ddb33b"
```


### Schema


```json
{
  "type": "string",
  "pattern": "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
}
```



### Web Address

**kind**: schema\
**name**: webAddress\
**uri**: https://jsonotron.org/jss/webAddress

A url that is prefixed with either https or https.

### Example 1

A link to a site using HTTPS.

```json
"https://www.bbc.co.uk"
```

### Example 2

A link to an secured site using HTTP.

```json
"http://www.simple.com"
```


### Schema


```json
{
  "type": "string",
  "pattern": "^http[s]?://[a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%_+.~#?&//=]*)$"
}
```



### What 3 Words

**kind**: schema\
**name**: what3words\
**uri**: https://jsonotron.org/jss/what3words

A 3-element array that captures an address based on the https://what3words.com geocoding system. The system allows you to specify any location on Earth, within a few metres, using just 3 words. Each element in the array is a shortString.

### Example 1

This example locates an address near Charing Cross Station.

```json
[
  "daring",
  "lion",
  "race"
]
```

### Example 2

This example is for an embassy in panama.

```json
[
  "science",
  "touted",
  "uplifted"
]
```


### Schema


```json
{
  "type": "array",
  "minItems": 3,
  "maxItems": 3,
  "items": {
    "$ref": "shortString"
  }
}
```



### Yes or No

**kind**: enum\
**name**: yesNo\
**uri**: https://jsonotron.org/jss/yesNo

A binary choice between yes or no.
This type can be used where a third option may be introduced in the future.  In that scenario a boolean field would be limiting, but a yesNo field could be replaced by a new enum without having to migrate existing data.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
YES |  | Yes |  
NO |  | No |  

  
      