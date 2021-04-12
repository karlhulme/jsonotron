# Type Systems

* ["jss" System](#"jss"-System)


## "jss" System

The types of the `jss` system.


### Enum Types

* [callingCode](#callingCode)
* [countryCode](#countryCode)
* [currencyCode](#currencyCode)
* [dayOfWeek](#dayOfWeek)
* [languageCode](#languageCode)
* [monthOfYear](#monthOfYear)
* [timeZone](#timeZone)
* [yesNo](#yesNo)

### Schema Types

* [address](#address)
* [boolean](#boolean)
* [date](#date)
* [dateTimeLocal](#dateTimeLocal)
* [dateTimeUtc](#dateTimeUtc)
* [emailAddress](#emailAddress)
* [float](#float)
* [geoJsonPoint](#geoJsonPoint)
* [geoJsonPolygon](#geoJsonPolygon)
* [hugeString](#hugeString)
* [integer](#integer)
* [ipv4](#ipv4)
* [ipv6](#ipv6)
* [jsonPointer](#jsonPointer)
* [longString](#longString)
* [mediumString](#mediumString)
* [money](#money)
* [negativeFloat](#negativeFloat)
* [negativeFloatOrZero](#negativeFloatOrZero)
* [negativeInteger](#negativeInteger)
* [negativeIntegerOrZero](#negativeIntegerOrZero)
* [paymentCardNo](#paymentCardNo)
* [plainObject](#plainObject)
* [positiveFloat](#positiveFloat)
* [positiveFloatOrZero](#positiveFloatOrZero)
* [positiveInteger](#positiveInteger)
* [positiveIntegerOrZero](#positiveIntegerOrZero)
* [shortString](#shortString)
* [string](#string)
* [telephoneNo](#telephoneNo)
* [time](#time)
* [timestamp](#timestamp)
* [uuid](#uuid)
* [webAddress](#webAddress)
* [what3words](#what3words)



### address

**kind**: schema\
**system**: jss\
**name**: address

#### Example 1

This example is an address in England so it uses a UK post code.

```json
{
  "addressLines": "1 Acacia Avenue\nPortsmouth",
  "postalCode": "PO125LP",
  "countryCode": "gb"
}
```

#### Example 2

This example is an address in the United States so it uses a zip code.

```json
{
  "addressLines": "1 Mansion Street\nBeverley Hills\nLos Angeles",
  "postalCode": "90210",
  "countryCode": "gb"
}
```


#### Schema


```json
{
  "type": "object",
  "j-documentation": "An object that captures an international address.",
  "additionalProperties": false,
  "properties": {
    "addressLines": {
      "$ref": "hugeString",
      "j-documentation": "The lines that make up the address that includes street names, towns, villages, states and any other descriptors as required."
    },
    "postalCode": {
      "$ref": "shortString",
      "j-documentation": "The postal code or zip code of the address."
    },
    "countryCode": {
      "$ref": "countryCode",
      "j-documentation": "The country where the address is situated."
    }
  },
  "required": [
    "addressLines",
    "postalCode",
    "countryCode"
  ]
}
```



### boolean

**kind**: schema\
**system**: jss\
**name**: boolean

#### Example 1

A value of true.

```json
true
```

#### Example 2

A value of false.

```json
false
```


#### Schema


```json
{
  "type": "boolean",
  "j-documentation": "A value of either true or false."
}
```



### callingCode

**kind**: enum\
**system**: jss\
**name**: callingCode

An international telephone calling code defined by the ITU-T in standards E.123 and E.164.  The data is taken from https://en.wikipedia.org/wiki/List_of_country_calling_codes. The key piece of data is the dialling code, which is a number.  This is the data that a user would want to specify when entering a telephone number.  They specify their dialling code, e.g. 44.  Each enum item has a region preperty, denoting the location or locations that it represents. A symbol is not defined, because it would be identical to the text in this case.  It's safe to use the text property for looking up values.  The text property is determined entirely by the value, so it will not change.

Value | Symbol | Text | Data | Documentation
--- | --- | --- | --- | ---
1 |  | 1 | `{"region":"Canada, United States and North American Numbering Plan (NANP)"}`  |  
20 |  | 20 | `{"region":"Egypt"}`  |  
211 |  | 211 | `{"region":"South Sudan"}`  |  
212 |  | 212 | `{"region":"Morocco"}`  |  
213 |  | 213 | `{"region":"Algeria"}`  |  
216 |  | 216 | `{"region":"Tunisia"}`  |  
218 |  | 218 | `{"region":"Libya"}`  |  
220 |  | 220 | `{"region":"Gambia"}`  |  
221 |  | 221 | `{"region":"Senegal"}`  |  
222 |  | 222 | `{"region":"Mauritania"}`  |  
223 |  | 223 | `{"region":"Mali"}`  |  
224 |  | 224 | `{"region":"Guinea"}`  |  
225 |  | 225 | `{"region":"Ivory Coast"}`  |  
226 |  | 226 | `{"region":"Burkina Faso"}`  |  
227 |  | 227 | `{"region":"Niger"}`  |  
228 |  | 228 | `{"region":"Togo"}`  |  
229 |  | 229 | `{"region":"Benin"}`  |  
230 |  | 230 | `{"region":"Mauritius"}`  |  
231 |  | 231 | `{"region":"Liberia"}`  |  
232 |  | 232 | `{"region":"Sierra Leone"}`  |  
233 |  | 233 | `{"region":"Ghana"}`  |  
234 |  | 234 | `{"region":"Nigeria"}`  |  
235 |  | 235 | `{"region":"Chad"}`  |  
236 |  | 236 | `{"region":"Central African Republic"}`  |  
237 |  | 237 | `{"region":"Cameroon"}`  |  
238 |  | 238 | `{"region":"Cape Verde"}`  |  
239 |  | 239 | `{"region":"São Tomé and Príncipe"}`  |  
240 |  | 240 | `{"region":"Equatorial Guinea"}`  |  
241 |  | 241 | `{"region":"Gabon"}`  |  
242 |  | 242 | `{"region":"Republic of the Congo"}`  |  
243 |  | 243 | `{"region":"Democratic Republic of the Congo"}`  |  
244 |  | 244 | `{"region":"Angola"}`  |  
245 |  | 245 | `{"region":"Guinea-Bissau"}`  |  
246 |  | 246 | `{"region":"British Indian Ocean Territory"}`  |  
247 |  | 247 | `{"region":"Ascension Island"}`  |  
248 |  | 248 | `{"region":"Seychelles"}`  |  
249 |  | 249 | `{"region":"Sudan"}`  |  
250 |  | 250 | `{"region":"Rwanda"}`  |  
251 |  | 251 | `{"region":"Ethiopia"}`  |  
252 |  | 252 | `{"region":"Somalia"}`  |  
253 |  | 253 | `{"region":"Djibouti"}`  |  
254 |  | 254 | `{"region":"Kenya"}`  |  
255 |  | 255 | `{"region":"Tanzania and Zanzibar"}`  |  
256 |  | 256 | `{"region":"Uganda"}`  |  
257 |  | 257 | `{"region":"Burundi"}`  |  
258 |  | 258 | `{"region":"Mozambique"}`  |  
260 |  | 260 | `{"region":"Zambia"}`  |  
261 |  | 261 | `{"region":"Madagascar"}`  |  
262 |  | 262 | `{"region":"Réunion and Moyette"}`  |  
263 |  | 263 | `{"region":"Zimbabwe"}`  |  
264 |  | 264 | `{"region":"Namibia"}`  |  
265 |  | 265 | `{"region":"Malawi"}`  |  
266 |  | 266 | `{"region":"Lesotho"}`  |  
267 |  | 267 | `{"region":"Botswana"}`  |  
268 |  | 268 | `{"region":"Eswatini"}`  |  
269 |  | 269 | `{"region":"Comoros"}`  |  
27 |  | 27 | `{"region":"South Africa"}`  |  
290 |  | 290 | `{"region":"Saint Helena and Tristan da Cunha"}`  |  
291 |  | 291 | `{"region":"Eritrea"}`  |  
297 |  | 297 | `{"region":"Aruba"}`  |  
298 |  | 298 | `{"region":"Faroe Islands"}`  |  
299 |  | 299 | `{"region":"Greenland"}`  |  
30 |  | 30 | `{"region":"Greece"}`  |  
31 |  | 31 | `{"region":"Netherlands"}`  |  
32 |  | 32 | `{"region":"Belgium"}`  |  
33 |  | 33 | `{"region":"France"}`  |  
34 |  | 34 | `{"region":"Spain"}`  |  
350 |  | 350 | `{"region":"Gibraltar"}`  |  
351 |  | 351 | `{"region":"Portugal"}`  |  
352 |  | 352 | `{"region":"Luxembourg"}`  |  
353 |  | 353 | `{"region":"Ireland"}`  |  
354 |  | 354 | `{"region":"Iceland"}`  |  
355 |  | 355 | `{"region":"Albania"}`  |  
356 |  | 356 | `{"region":"Malta"}`  |  
357 |  | 357 | `{"region":"Cyprus"}`  |  
358 |  | 358 | `{"region":"Finland and Åland Islands"}`  |  
359 |  | 359 | `{"region":"Bulgaria"}`  |  
36 |  | 36 | `{"region":"Hungary"}`  |  
370 |  | 370 | `{"region":"Lithuania"}`  |  
371 |  | 371 | `{"region":"Latvia"}`  |  
372 |  | 372 | `{"region":"Estonia"}`  |  
373 |  | 373 | `{"region":"Moldova"}`  |  
374 |  | 374 | `{"region":"Armenia and Artsakh"}`  |  
375 |  | 375 | `{"region":"Belarus"}`  |  
376 |  | 376 | `{"region":"Andorra"}`  |  
377 |  | 377 | `{"region":"Monaco"}`  |  
378 |  | 378 | `{"region":"San Marino"}`  |  
388 |  | 380 | `{"region":"Ukraine"}`  |  
381 |  | 381 | `{"region":"Serbia"}`  |  
382 |  | 382 | `{"region":"Montenegro"}`  |  
383 |  | 383 | `{"region":"Kosovo"}`  |  
385 |  | 385 | `{"region":"Croatia"}`  |  
386 |  | 386 | `{"region":"Slovenia"}`  |  
387 |  | 387 | `{"region":"Bosnia and Herzegovina"}`  |  
389 |  | 389 | `{"region":"North Macedonia"}`  |  
39 |  | 39 | `{"region":"Italy and Vatican City"}`  |  
40 |  | 40 | `{"region":"Romania"}`  |  
41 |  | 41 | `{"region":"Switzerland"}`  |  
420 |  | 420 | `{"region":"Czech Republic"}`  |  
421 |  | 421 | `{"region":"Slovakia"}`  |  
423 |  | 423 | `{"region":"Liechtenstein"}`  |  
43 |  | 43 | `{"region":"Austria"}`  |  
44 |  | 44 | `{"region":"United Kingdom, Guernsey, Jersey and Isle of Man"}`  |  
45 |  | 45 | `{"region":"Denmark"}`  |  
46 |  | 46 | `{"region":"Sweden"}`  |  
47 |  | 47 | `{"region":"Norway and Svalbard"}`  |  
48 |  | 48 | `{"region":"Poland"}`  |  
49 |  | 49 | `{"region":"Germany"}`  |  
500 |  | 500 | `{"region":"Falkland Islands, South Georgia and the South Sandwich Islands"}`  |  
501 |  | 501 | `{"region":"Belize"}`  |  
502 |  | 502 | `{"region":"Guatemala"}`  |  
503 |  | 503 | `{"region":"El Salvador"}`  |  
504 |  | 504 | `{"region":"Honduras"}`  |  
505 |  | 505 | `{"region":"Nicaragua"}`  |  
506 |  | 506 | `{"region":"Costa Rica"}`  |  
507 |  | 507 | `{"region":"Panama"}`  |  
508 |  | 508 | `{"region":"Saint-Pierre and Miquelon"}`  |  
509 |  | 509 | `{"region":"Haiti"}`  |  
51 |  | 51 | `{"region":"Peru"}`  |  
52 |  | 52 | `{"region":"Mexico"}`  |  
53 |  | 53 | `{"region":"Cuba"}`  |  
54 |  | 54 | `{"region":"Argentina"}`  |  
55 |  | 55 | `{"region":"Brazil"}`  |  
56 |  | 56 | `{"region":"Chile"}`  |  
57 |  | 57 | `{"region":"Colombia"}`  |  
58 |  | 58 | `{"region":"Venezuela"}`  |  
590 |  | 590 | `{"region":"Guadeloupe, Saint Barthélemy and Saint Martin"}`  |  
591 |  | 591 | `{"region":"Bolivia"}`  |  
592 |  | 592 | `{"region":"Guyana"}`  |  
593 |  | 593 | `{"region":"Ecuador"}`  |  
594 |  | 594 | `{"region":"French Guiana"}`  |  
595 |  | 595 | `{"region":"Paraguay"}`  |  
596 |  | 596 | `{"region":"Martinique"}`  |  
597 |  | 597 | `{"region":"Suriname"}`  |  
598 |  | 598 | `{"region":"Uruguay"}`  |  
599 |  | 599 | `{"region":"Sint Eustatius, Saba, Bonaire, Curaçao"}`  |  
60 |  | 60 | `{"region":"Malaysia"}`  |  
61 |  | 61 | `{"region":"Australia, Cocos Islands and Christmas Island"}`  |  
62 |  | 62 | `{"region":"Indonesia"}`  |  
63 |  | 63 | `{"region":"Philippines"}`  |  
64 |  | 64 | `{"region":"New Zealand and Pitcairn Islands"}`  |  
65 |  | 65 | `{"region":"Singapore"}`  |  
66 |  | 66 | `{"region":"Thailand"}`  |  
670 |  | 670 | `{"region":"East Timor"}`  |  
672 |  | 672 | `{"region":"Australian External Territories, Australian Antarctic Territory and Norfolk Island"}`  |  
673 |  | 673 | `{"region":"Brunei"}`  |  
674 |  | 674 | `{"region":"Nauru"}`  |  
675 |  | 675 | `{"region":"Papua New Guinea"}`  |  
676 |  | 676 | `{"region":"Tonga"}`  |  
677 |  | 677 | `{"region":"Solomon Islands"}`  |  
678 |  | 678 | `{"region":"Vanuatu"}`  |  
679 |  | 679 | `{"region":"Fiji"}`  |  
680 |  | 680 | `{"region":"Palau"}`  |  
681 |  | 681 | `{"region":"Wallis and Futuna"}`  |  
682 |  | 682 | `{"region":"Cook Islands"}`  |  
683 |  | 683 | `{"region":"Niue"}`  |  
685 |  | 685 | `{"region":"Samoa"}`  |  
686 |  | 686 | `{"region":"Kiribati"}`  |  
687 |  | 687 | `{"region":"New Caledonia"}`  |  
688 |  | 688 | `{"region":"Tuvalu"}`  |  
689 |  | 689 | `{"region":"French Polynesia"}`  |  
690 |  | 690 | `{"region":"Tokelau"}`  |  
691 |  | 691 | `{"region":"Federated States of Micronesia"}`  |  
692 |  | 692 | `{"region":"Marshall Islands"}`  |  
7 |  | 7 | `{"region":"Russia, Kazakhstan and Abkhazia"}`  |  
800 |  | 800 | `{"region":"International Freephone (UIFN)"}`  |  
808 |  | 808 | `{"region":"Shared Cost Services"}`  |  
81 |  | 81 | `{"region":"Japan"}`  |  
82 |  | 82 | `{"region":"South Korea"}`  |  
84 |  | 84 | `{"region":"Vietnam"}`  |  
850 |  | 850 | `{"region":"North Korea"}`  |  
852 |  | 852 | `{"region":"Hong Kong"}`  |  
853 |  | 853 | `{"region":"Macau"}`  |  
855 |  | 855 | `{"region":"Cambodia"}`  |  
856 |  | 856 | `{"region":"Laos"}`  |  
86 |  | 86 | `{"region":"China"}`  |  
880 |  | 880 | `{"region":"Bangladesh"}`  |  
886 |  | 886 | `{"region":"Taiwan"}`  |  
90 |  | 90 | `{"region":"Turkey and Northern Cyprus"}`  |  
91 |  | 91 | `{"region":"India"}`  |  
92 |  | 92 | `{"region":"Pakistan, Azad Kashmir and Gilgit Baltistan"}`  |  
93 |  | 93 | `{"region":"Afghanistan"}`  |  
94 |  | 94 | `{"region":"Sri Lanka"}`  |  
95 |  | 95 | `{"region":"Myanmar"}`  |  
960 |  | 960 | `{"region":"Maldives"}`  |  
961 |  | 961 | `{"region":"Lebanon"}`  |  
962 |  | 962 | `{"region":"Jordan"}`  |  
963 |  | 963 | `{"region":"Syria"}`  |  
964 |  | 964 | `{"region":"Iraq"}`  |  
965 |  | 965 | `{"region":"Kuwait"}`  |  
966 |  | 966 | `{"region":"Saudi Arabia"}`  |  
967 |  | 967 | `{"region":"Yemen"}`  |  
968 |  | 968 | `{"region":"Oman"}`  |  
970 |  | 970 | `{"region":"Palestine"}`  |  
971 |  | 971 | `{"region":"United Arab Emirates"}`  |  
972 |  | 972 | `{"region":"Israel"}`  |  
973 |  | 973 | `{"region":"Bahrain"}`  |  
974 |  | 974 | `{"region":"Qatar"}`  |  
975 |  | 975 | `{"region":"Bhutan"}`  |  
976 |  | 976 | `{"region":"Mongolia"}`  |  
977 |  | 977 | `{"region":"Nepal"}`  |  
979 |  | 979 | `{"region":"International Premium Rate Service"}`  |  
98 |  | 98 | `{"region":"Iran"}`  |  
992 |  | 992 | `{"region":"Tajikistan"}`  |  
993 |  | 993 | `{"region":"Turkmenistan"}`  |  
994 |  | 994 | `{"region":"Azerbaijan"}`  |  
995 |  | 995 | `{"region":"Georgia, South Ossetia and Abkhazia"}`  |  
996 |  | 996 | `{"region":"Kyrgyzstan"}`  |  
998 |  | 998 | `{"region":"Uzbekistan"}`  |  



### countryCode

**kind**: enum\
**system**: jss\
**name**: countryCode

A country designator from ISO 3166, taken from https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes.

Value | Symbol | Text | Data | Documentation
--- | --- | --- | --- | ---
af |  | Afghanistan |   |  
ax |  | Åland Islands |   |  
al |  | Albania |   |  
dz |  | Algeria |   |  
as |  | American Samoa |   |  
ad |  | Andorra |   |  
ao |  | Angola |   |  
ai |  | Anguilla |   |  
aq |  | Antarctica |   |  
ag |  | Antigua and Barbuda |   |  
ar |  | Argentina |   |  
am |  | Armenia |   |  
aw |  | Aruba |   |  
AU |  | Australia |   |  
at |  | Austria |   |  
az |  | Azerbaijan |   |  
bs |  | Bahamas (the) |   |  
bh |  | Bahrain |   |  
bd |  | Bangladesh |   |  
bb |  | Barbados |   |  
by |  | Belarus |   |  
be |  | Belgium |   |  
bz |  | Belize |   |  
bj |  | Benin |   |  
bm |  | Bermuda |   |  
bt |  | Bhutan |   |  
bo |  | Bolivia (Plurinational State of) |   |  
ba |  | Bosnia and Herzegovina |   |  
bw |  | Botswana |   |  
bv |  | Bouvet Island |   |  
br |  | Brazil |   |  
io |  | British Indian Ocean Territory (the) |   |  
bn |  | Brunei Darussalam |   |  
bg |  | Bulgaria |   |  
bf |  | Burkina Faso |   |  
bi |  | Burundi |   |  
cv |  | Cabo Verde |   |  
kh |  | Cambodia |   |  
cm |  | Cameroon |   |  
ca |  | Canada |   |  
ky |  | Cayman Islands (the) |   |  
cf |  | Central African Republic (the) |   |  
td |  | Chad |   |  
cl |  | Chile |   |  
cn |  | China |   |  
cx |  | Christmas Island |   |  
cc |  | Cocos (Keeling) Islands (the) |   |  
co |  | Colombia |   |  
km |  | Comoros (the) |   |  
cd |  | Congo (the Democratic Republic of the) |   |  
cg |  | Congo (the) |   |  
ck |  | Cook Islands (the) |   |  
cr |  | Costa Rica |   |  
ci |  | Côte d"Ivoire |   |  
hr |  | Croatia |   |  
cu |  | Cuba |   |  
cw |  | Curaçao |   |  
cy |  | Cyprus |   |  
cz |  | Czechia |   |  
dk |  | Denmark |   |  
dj |  | Djibouti |   |  
dm |  | Dominica |   |  
do |  | Dominican Republic (the) |   |  
ec |  | Ecuador |   |  
eg |  | Egypt |   |  
sv |  | El Salvador |   |  
gq |  | Equatorial Guinea |   |  
er |  | Eritrea |   |  
ee |  | Estonia |   |  
sz |  | Eswatini |   |  
et |  | Ethiopia |   |  
fk |  | Falkland Islands (the) |   |  
fo |  | Faroe Islands (the) |   |  
fj |  | Fiji |   |  
fi |  | Finland |   |  
fr |  | France |   |  
gf |  | French Guiana |   |  
pf |  | French Polynesia |   |  
tf |  | French Southern Territories (the) |   |  
ga |  | Gabon |   |  
gm |  | Gambia (the) |   |  
ge |  | Georgia |   |  
de |  | Germany |   |  
gh |  | Ghana |   |  
gi |  | Gibraltar |   |  
gr |  | Greece |   |  
gl |  | Greenland |   |  
gd |  | Grenada |   |  
gp |  | Guadeloupe |   |  
gu |  | Guam |   |  
gt |  | Guatemala |   |  
gg |  | Guernsey |   |  
gn |  | Guinea |   |  
gw |  | Guinea-Bissau |   |  
gy |  | Guyana |   |  
ht |  | Haiti |   |  
hm |  | Heard Island and McDonald Islands |   |  
va |  | Holy See (the) |   |  
hn |  | Honduras |   |  
hk |  | Hong Kong |   |  
hu |  | Hungary |   |  
is |  | Iceland |   |  
in |  | India |   |  
id |  | Indonesia |   |  
ir |  | Iran (Islamic Republic of) |   |  
iq |  | Iraq |   |  
ie |  | Ireland |   |  
im |  | Isle of Man |   |  
il |  | Israel |   |  
it |  | Italy |   |  
jm |  | Jamaica |   |  
jp |  | Japan |   |  
je |  | Jersey |   |  
jo |  | Jordan |   |  
kz |  | Kazakhstan |   |  
ke |  | Kenya |   |  
ki |  | Kiribati |   |  
kp |  | Korea (the Democratic People"s Republic of) |   |  
kr |  | Korea (the Republic of) |   |  
kw |  | Kuwait |   |  
kg |  | Kyrgyzstan |   |  
la |  | Lao People"s Democratic Republic (the) |   |  
lv |  | Latvia |   |  
lb |  | Lebanon |   |  
ls |  | Lesotho |   |  
lr |  | Liberia |   |  
ly |  | Libya |   |  
li |  | Liechtenstein |   |  
lt |  | Lithuania |   |  
lu |  | Luxembourg |   |  
mo |  | Macao  |   |  
mk |  | North Macedonia |   |  
mg |  | Madagascar |   |  
mw |  | Malawi |   |  
my |  | Malaysia |   |  
mv |  | Maldives |   |  
ml |  | Mali |   |  
mt |  | Malta |   |  
mh |  | Marshall Islands (the) |   |  
mq |  | Martinique |   |  
mr |  | Mauritania |   |  
mu |  | Mauritius |   |  
yt |  | Mayotte |   |  
mx |  | Mexico |   |  
fm |  | Micronesia (Federated States of) |   |  
md |  | Moldova (the Republic of) |   |  
mc |  | Monaco |   |  
mn |  | Mongolia |   |  
me |  | Montenegro |   |  
ms |  | Montserrat |   |  
ma |  | Morocco |   |  
mz |  | Mozambique |   |  
mm |  | Myanmar |   |  
na |  | Namibia |   |  
nr |  | Nauru |   |  
np |  | Nepal |   |  
nl |  | Netherlands (the) |   |  
nc |  | New Caledonia |   |  
nz |  | New Zealand |   |  
ni |  | Nicaragua |   |  
ne |  | Niger (the) |   |  
ng |  | Nigeria |   |  
nu |  | Niue |   |  
nf |  | Norfolk Island |   |  
mp |  | Northern Mariana Islands (the) |   |  
no |  | Norway |   |  
om |  | Oman |   |  
pk |  | Pakistan |   |  
pw |  | Palau |   |  
ps |  | Palestine, State of |   |  
pa |  | Panama |   |  
pg |  | Papua New Guinea |   |  
py |  | Paraguay |   |  
pe |  | Peru |   |  
ph |  | Philippines (the) |   |  
pn |  | Pitcairn |   |  
pl |  | Poland |   |  
pt |  | Portugal |   |  
pr |  | Puerto Rico |   |  
qa |  | Qatar |   |  
re |  | Réunion |   |  
ro |  | Romania |   |  
ru |  | Russian Federation (the) |   |  
rw |  | Rwanda |   |  
bl |  | Saint Barthélemy |   |  
kn |  | Saint Kitts and Nevis |   |  
lc |  | Saint Lucia |   |  
mf |  | Saint Martin (French part) |   |  
pm |  | Saint Pierre and Miquelon |   |  
vc |  | Saint Vincent and the Grenadines |   |  
ws |  | Samoa |   |  
sm |  | San Marino |   |  
st |  | Sao Tome and Principe |   |  
sa |  | Saudi Arabia |   |  
sn |  | Senegal |   |  
rs |  | Serbia |   |  
sc |  | Seychelles |   |  
sl |  | Sierra Leone |   |  
sg |  | Singapore |   |  
sx |  | Sint Maarten (Dutch part) |   |  
sk |  | Slovakia |   |  
si |  | Slovenia |   |  
sb |  | Solomon Islands |   |  
so |  | Somalia |   |  
za |  | South Africa |   |  
gs |  | South Georgia and the South Sandwich Islands |   |  
ss |  | South Sudan |   |  
es |  | Spain |   |  
lk |  | Sri Lanka |   |  
sd |  | Sudan (the) |   |  
sr |  | Suriname |   |  
se |  | Sweden |   |  
ch |  | Switzerland |   |  
sy |  | Syrian Arab Republic (the) |   |  
tw |  | Taiwan (Province of China) |   |  
tj |  | Tajikistan |   |  
tz |  | Tanzania, the United Republic of |   |  
th |  | Thailand |   |  
tl |  | Timor-Leste |   |  
tg |  | Togo |   |  
tk |  | Tokelau |   |  
to |  | Tonga |   |  
tt |  | Trinidad and Tobago |   |  
tn |  | Tunisia |   |  
tr |  | Turkey |   |  
tm |  | Turkmenistan |   |  
tc |  | Turks and Caicos Islands (the) |   |  
tv |  | Tuvalu |   |  
ug |  | Uganda |   |  
ua |  | Ukraine |   |  
ae |  | United Arab Emirates (the) |   |  
gb |  | United Kingdom of Great Britain and Northern Ireland (the) |   |  
um |  | United States Minor Outlying Islands (the) |   |  
us |  | United States of America (the) |   |  
uy |  | Uruguay |   |  
uz |  | Uzbekistan |   |  
vu |  | Vanuatu |   |  
ve |  | Venezuela (Bolivarian Republic of) |   |  
vn |  | Viet Nam |   |  
vg |  | Virgin Islands (British) |   |  
vi |  | Virgin Islands (U.S.) |   |  
wf |  | Wallis and Futuna |   |  
eh |  | Western Sahara |   |  
ye |  | Yemen |   |  
zm |  | Zambia |   |  
zw |  | Zimbabwe |   |  



### currencyCode

**kind**: enum\
**system**: jss\
**name**: currencyCode

A currency designator from ISO 4217.  The data is taken from https://en.wikipedia.org/wiki/ISO_4217.

Value | Symbol | Text | Data | Documentation
--- | --- | --- | --- | ---
aed | د.إ | United Arab Emirates Dirham | `{"scaler":2}`  |  
afn | AFN | Afghan Afghani | `{"scaler":2}`  |  
all | ALL | Albanian Lek | `{"scaler":2}`  |  
amd | AMD | Armenian Dram | `{"scaler":2}`  |  
ang | ANG | Netherlands Antillean Guilder | `{"scaler":2}`  |  
aoa | AOA | Angolan Kwanza | `{"scaler":2}`  |  
ars | ARS | Argentine Peso | `{"scaler":2}`  |  
aud | $ | Australian Dollar | `{"scaler":2}`  |  
awg | AWG | Aruban Florin | `{"scaler":2}`  |  
azn | AZN | Azerbaijani Manat | `{"scaler":2}`  |  
bam | BAM | Bosnia and Herzegovina Convertible Mark | `{"scaler":2}`  |  
bbd | BBD | Barbados Dollar | `{"scaler":2}`  |  
bdt | ৳ | Bangladeshi Taka | `{"scaler":2}`  |  
bgn | лв | Bulgarian Lev | `{"scaler":2}`  |  
bhd | BHD | Bahraini Dinar | `{"scaler":3}`  |  
bif | BIF | Burundian Franc | `{"scaler":0}`  |  
bmd | BMD | Bermudian Dollar | `{"scaler":2}`  |  
bnd | BND | Brunei Dollar | `{"scaler":2}`  |  
bob | BOB | Boliviano | `{"scaler":2}`  |  
bov | BOV | Bolivian Mvdol (funds code) | `{"scaler":2}`  |  
brl | R$ | Brazilian Real | `{"scaler":2}`  |  
bsd | BSD | Bahamian Dollar | `{"scaler":2}`  |  
btc | ₿ | Bitcoin | `{"scaler":8}`  |  
btn | BTN | Bhutanese Ngultrum | `{"scaler":2}`  |  
bwp | BWP | Botswana Pula | `{"scaler":2}`  |  
byn | BYN | Belarusian Ruble | `{"scaler":2}`  |  
bzd | BZD | Belize Dollar | `{"scaler":2}`  |  
cad | $ | Canadian Dollar | `{"scaler":2}`  |  
cdf | CDF | Congolese Franc | `{"scaler":2}`  |  
che | € | WIR Euro | `{"scaler":2}`  |  
chf | CHF | Swiss Franc | `{"scaler":2}`  |  
chw | CHW | WIR Franc | `{"scaler":2}`  |  
clf | CLF | Unidad de Fomento (funds code) | `{"scaler":4}`  |  
clp | $ | Chilean Peso | `{"scaler":0}`  |  
cny | ¥ | Renminbi (Chinese) Yuan | `{"scaler":2}`  |  
cop | $ | Colombian Peso | `{"scaler":2}`  |  
cou | COU | Unidad de Valor Real (UVR) | `{"scaler":2}`  |  
crc | CRC | Costa Rican Colon | `{"scaler":2}`  |  
cuc | CUC | Cuban convertible Peso | `{"scaler":2}`  |  
cup | CUP | Cuban Peso | `{"scaler":2}`  |  
cve | CVE | Cape Verdean Escudo | `{"scaler":2}`  |  
czk | Kč | Czech Koruna | `{"scaler":2}`  |  
djf | DJF | Djiboutian Franc | `{"scaler":0}`  |  
dkk | kr | Danish Krone | `{"scaler":2}`  |  
dop | DOP | Dominican Peso | `{"scaler":2}`  |  
dzd | DZD | Algerian Dinar | `{"scaler":2}`  |  
egp | EGP | Egyptian Pound | `{"scaler":2}`  |  
ern | ERN | Eritrean Nakfa | `{"scaler":2}`  |  
etb | ETB | Ethiopian Birr | `{"scaler":2}`  |  
eth | Ξ | Etherium | `{"scaler":18}`  |  
eur | € | Euro | `{"scaler":2}`  |  
fjd | FJD | Fiji Dollar | `{"scaler":2}`  |  
fkp | FKP | Falkland Islands Pound | `{"scaler":2}`  |  
gbp | £ | Pound Sterling | `{"scaler":2}`  |  
gel | ₾ | Georgian Lari | `{"scaler":2}`  |  
ghs | GHS | Ghanaian Cedi | `{"scaler":2}`  |  
gip | GIP | Gibraltar Pound | `{"scaler":2}`  |  
gmd | GMD | Gambian Dalasi | `{"scaler":2}`  |  
gnf | GNF | Guinean Franc | `{"scaler":0}`  |  
gtq | GTQ | Guatemalan Quetzal | `{"scaler":2}`  |  
gyd | GYD | Guyanese Dollar | `{"scaler":2}`  |  
hkd | $ | Hong Kong Dollar | `{"scaler":2}`  |  
hnl | HNL | Honduran Lempira | `{"scaler":2}`  |  
hrk | kn | Croatian Kuna | `{"scaler":2}`  |  
htg | HTG | Haitian Gourde | `{"scaler":2}`  |  
huf | ft | Hungarian Forint | `{"scaler":2}`  |  
idr | Rp | Indonesian Rupiah | `{"scaler":2}`  |  
ils | ₪ | Israeli New Shekel | `{"scaler":2}`  |  
inr | ₹ | Indian Rupee | `{"scaler":2}`  |  
iqd | IQD | Iraqi Dinar | `{"scaler":3}`  |  
irr | IRR | Iranian Rial | `{"scaler":2}`  |  
isk | ISK | Icelandic Króna | `{"scaler":0}`  |  
jmd | JMD | Jamaican Dollar | `{"scaler":2}`  |  
jod | JOD | Jordanian Dinar | `{"scaler":3}`  |  
jpy | ¥ | Japanese Yen | `{"scaler":0}`  |  
kes | Ksh | Kenyan Shilling | `{"scaler":2}`  |  
kgs | KGS | Kyrgyzstani Som | `{"scaler":2}`  |  
khr | KHR | Cambodian Riel | `{"scaler":2}`  |  
kmf | KMF | Comoro Franc | `{"scaler":0}`  |  
kpw | $KPW | North Korean Won | `{"scaler":2}`  |  
krw | ₩ | South Korean Won | `{"scaler":0}`  |  
kwd | KWD | Kuwaiti Dinar | `{"scaler":3}`  |  
kyd | KYD | Cayman Islands Dollar | `{"scaler":2}`  |  
kzt | KZT | Kazakhstani Tenge | `{"scaler":2}`  |  
lak | LAK | Lao Kip | `{"scaler":2}`  |  
lbp | LBP | Lebanese Pound | `{"scaler":2}`  |  
lkr | Rs | Sri Lankan Rupee | `{"scaler":2}`  |  
lrd | LRD | Liberian Dollar | `{"scaler":2}`  |  
lsl | LDL | Lesotho Loti | `{"scaler":2}`  |  
ltc | Ł | Litecoin | `{"scaler":8}`  |  
lyd | LYD | Libyan Dinar | `{"scaler":3}`  |  
mad | .د.م | Moroccan Dirham | `{"scaler":2}`  |  
mdl | MDL | Moldovan Leu | `{"scaler":2}`  |  
mga | MGA | Malagasy Ariary | `{"scaler":2}`  |  
mkd | MKD | Macedonian Denar | `{"scaler":2}`  |  
mmk | MMK | Myanmar Kyat | `{"scaler":2}`  |  
mnt | MNT | Mongolian Tögrög | `{"scaler":2}`  |  
mop | MOP | Macanese Pataca | `{"scaler":2}`  |  
mru | MRU | Mauritanian Ouguiya | `{"scaler":2}`  |  
mur | MUR | Mauritian Rupee | `{"scaler":2}`  |  
mvr | MVR | Maldivian Rufiyaa | `{"scaler":2}`  |  
mwk | MWK | Malawian Kwacha | `{"scaler":2}`  |  
mxn | $ | Mexican Peso | `{"scaler":2}`  |  
mxv | MXV | Mexican Unidad de Inversion (UDI) | `{"scaler":2}`  |  
myr | RM | Malaysian Ringgit | `{"scaler":2}`  |  
mzn | MZN | Mozambican Metical | `{"scaler":2}`  |  
nad | NAD | Namibian Dollar | `{"scaler":2}`  |  
ngn | ₦ | Nigerian Naira | `{"scaler":2}`  |  
nio | NIO | Nicaraguan Córdoba | `{"scaler":2}`  |  
nok | kr | Norwegian Krone | `{"scaler":2}`  |  
npr | NPR | Nepalese Rupee | `{"scaler":2}`  |  
nzd | $ | New Zealand Dollar | `{"scaler":2}`  |  
omr | OMR | Omani Rial | `{"scaler":3}`  |  
pab | PAB | Panamanian Balboa | `{"scaler":2}`  |  
pen | S/. | Peruvian Sol | `{"scaler":2}`  |  
pgk | PGK | Papua New Guinean Kina | `{"scaler":2}`  |  
php | ₱ | Philippine Peso | `{"scaler":2}`  |  
pkr | Rs | Pakistani Rupee | `{"scaler":2}`  |  
pln | zł | Polish Złoty | `{"scaler":2}`  |  
pyg | PYG | Paraguayan Guaraní | `{"scaler":0}`  |  
qar | QAR | Qatari Riyal | `{"scaler":2}`  |  
ron | lei | Romanian Leu | `{"scaler":2}`  |  
rsd | RSD | Serbian Dinar | `{"scaler":2}`  |  
rub | ₽ | Russian Ruble | `{"scaler":2}`  |  
rwf | RWF | Rwandan Franc | `{"scaler":0}`  |  
sar | SAR | Saudi Riyal | `{"scaler":2}`  |  
sbd | SBD | Solomon Islands Dollar | `{"scaler":2}`  |  
scr | SCR | Seychelles Rupee | `{"scaler":2}`  |  
sdg | SDG | Sudanese Pound | `{"scaler":2}`  |  
sek | kr | Swedish Krona/Kronor | `{"scaler":2}`  |  
sgd | $ | Singapore Dollar | `{"scaler":2}`  |  
shp | SHP | Saint Helena Pound | `{"scaler":2}`  |  
sll | SLL | Sierra Leonean Leone | `{"scaler":2}`  |  
sos | SOS | Somali Shilling | `{"scaler":2}`  |  
srd | SRD | Surinamese Dollar | `{"scaler":2}`  |  
ssp | SSP | South Sudanese Pound | `{"scaler":2}`  |  
stn | STN | São Tomé and Príncipe Dobra | `{"scaler":2}`  |  
svc | SVC | Salvadoran Colón | `{"scaler":2}`  |  
syp | SYP | Syrian Pound | `{"scaler":2}`  |  
szl | SZL | Swazi Lilangeni | `{"scaler":2}`  |  
thb | ฿ | Thai Baht | `{"scaler":2}`  |  
tjs | TJS | Tajikistani Somoni | `{"scaler":2}`  |  
tmt | TMT | Turkmenistan Manat | `{"scaler":2}`  |  
tnd | TND | Tunisian Dinar | `{"scaler":3}`  |  
top | TOP | Tongan Paʻanga | `{"scaler":2}`  |  
try | ₺ | Turkish Lira | `{"scaler":2}`  |  
ttd | TTD | Trinidad and Tobago Dollar | `{"scaler":2}`  |  
twd | TWD | New Taiwan Dollar | `{"scaler":2}`  |  
tzs | TZS | Tanzanian Shilling | `{"scaler":2}`  |  
uah | ₴ | Ukrainian Hryvnia | `{"scaler":2}`  |  
ugx | UGX | Ugandan Shilling | `{"scaler":0}`  |  
usd | $ | United States Dollar | `{"scaler":2}`  |  
usn | $ | United States Dollar (next day) | `{"scaler":2}`  |  
uyi | UYI | Uruguay Peso en Unidades Indexadas (URUIURUI) | `{"scaler":0}`  |  
uyu | UYU | Uruguayan Peso | `{"scaler":2}`  |  
uyw | UYW | Unidad Previsional | `{"scaler":4}`  |  
uzs | UZS | Uzbekistan Som | `{"scaler":2}`  |  
ves | VES | Venezuelan Bolívar Soberano | `{"scaler":2}`  |  
vnd | ₫ | Vietnamese Dồng | `{"scaler":0}`  |  
vuv | VUV | Vanuatu Vatu | `{"scaler":0}`  |  
wst | WST | Samoan Tala | `{"scaler":2}`  |  
xaf | XAF | CFA franc BEAC | `{"scaler":0}`  |  
xcd | XCD | East Caribbean Dollar | `{"scaler":2}`  |  
xmr | ɱ | Monero | `{"scaler":12}`  |  
xof | XOF | CFA Franc BCEAO | `{"scaler":0}`  |  
xpd | XPD | Palladium (one troy ounce) | `{"scaler":2}`  |  
xpf | XPF | CFP Franc (franc Pacifique) | `{"scaler":0}`  |  
xrp | XRP | Ripples | `{"scaler":6}`  |  
yer | YER | Yemeni Rial | `{"scaler":2}`  |  
zar | R | South African Rand | `{"scaler":2}`  |  
zmw | ZMW | Zambian Kwacha | `{"scaler":2}`  |  
zwl | ZWL | Zimbabwean Dollar | `{"scaler":2}`  |  



### date

**kind**: schema\
**system**: jss\
**name**: date

#### Example 1

An example.

```json
"2007-09-25"
```


#### Schema


```json
{
  "type": "string",
  "j-documentation": "A string with the date components arranged using the YYYY-MM-DD pattern.  If the day or month component is a value less than 10 then a leading zero must be included.  This ensures that all stored dates are the same length.",
  "format": "date"
}
```



### dateTimeLocal

**kind**: schema\
**system**: jss\
**name**: dateTimeLocal

#### Example 1

The europe/london time zone operates at +00:00 during the winter and +01:00 during the summer.  In this example we can see the value is in the summer because of the +01:00 suffix.

```json
{
  "dateTime": "2010-06-08T05:30:12+01:00",
  "timeZone": "europe/london",
  "captured": 1563119540628
}
```


#### Schema


```json
{
  "type": "object",
  "j-documentation": "An object that captures a date and time in a specific time zone.",
  "additionalProperties": false,
  "properties": {
    "dateTime": {
      "type": "string",
      "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[+][0-9]{2}:[0-9]{2}$",
      "format": "jsonotron-dateTimeLocal",
      "j-documentation": "A value that records the date and time in the YYYY-MM-DDTHH:mm:ss+Z format.  Notice that the pattern always has a T between the date and time components and that the time zone is always expressed with 2 digits for hours and 2 digits for minutes. Leading zeroes must be used to ensure that all values are the same length."
    },
    "timeZone": {
      "$ref": "timeZone",
      "j-documentation": "A value that records where in the world the time applies.  It is a timeZone value."
    },
    "captured": {
      "$ref": "timestamp",
      "j-documentation": "A value that indicates when the date and time was captured.  It is a timestamp value.  This is useful for advanced scenarios where the behaviour of a time zone is changed at some point in the future.  Knowing when the capture was made allows you to pinpoint the rules at the point and then convert to the prevailing rules."
    }
  },
  "required": [
    "dateTime",
    "timeZone",
    "captured"
  ]
}
```



### dateTimeUtc

**kind**: schema\
**system**: jss\
**name**: dateTimeUtc

#### Example 1

An example.

```json
"2014-09-15T23:59:25Z"
```


#### Schema


```json
{
  "type": "string",
  "j-documentation": "A string with the date and time components arranged using the YYYY-MM-DDTHH:mm:ssZ pattern. Leading zeroes must be used to ensure that all values are the same length.",
  "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$",
  "format": "jsonotron-dateTimeUtc"
}
```



### dayOfWeek

**kind**: enum\
**system**: jss\
**name**: dayOfWeek

A day of the week.

Value | Symbol | Text | Data | Documentation
--- | --- | --- | --- | ---
su |  | Sunday |   |  
mo |  | Monday |   |  
tu |  | Tuesday |   |  
we |  | Wednesday |   |  
th |  | Thursday |   |  
fr |  | Friday |   |  
sa |  | Saturday |   |  



### emailAddress

**kind**: schema\
**system**: jss\
**name**: emailAddress

#### Example 1

An example.

```json
"anon@gmail.com"
```


#### Schema


```json
{
  "type": "string",
  "j-documentation": "An email address.",
  "format": "email"
}
```



### float

**kind**: schema\
**system**: jss\
**name**: float

#### Example 1

An example.

```json
3.14
```


#### Schema


```json
{
  "type": "number",
  "j-documentation": "A number with an integral and decimal part."
}
```



### geoJsonPoint

**kind**: schema\
**system**: jss\
**name**: geoJsonPoint

#### Example 1

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


#### Schema


```json
{
  "type": "object",
  "j-documentation": "A point on Earth.",
  "additionalProperties": false,
  "properties": {
    "type": {
      "enum": [
        "Point"
      ],
      "j-documentation": "The value 'Point'."
    },
    "coordinates": {
      "type": "array",
      "j-documentation": "A 2-element array containing the longitude value first and the latitude value second.",
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
    }
  },
  "required": [
    "type",
    "coordinates"
  ]
}
```



### geoJsonPolygon

**kind**: schema\
**system**: jss\
**name**: geoJsonPolygon

#### Example 1

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


#### Schema


```json
{
  "type": "object",
  "j-documentation": "A boundary of connected points that encompasses a region on Earth.  \nThe `type` property should be 'Polygon'.\nThe `co-ordinates` property should be an array, where each element is a co-ordinate pair that\nmakes up the polygon.  The co-ordinate pairs must be specified in a counter-clockwise direction.  The last co-ordinate\nshould be a duplicate of the first co-ordinate.  This means the minimum number of\nelements in the co-ordinate array is 4.\nEach element in the co-ordinate array is 2-element array, longitude first and latitude second.",
  "additionalProperties": false,
  "properties": {
    "type": {
      "enum": [
        "Polygon"
      ],
      "j-documentation": "The value 'Polygon'"
    },
    "coordinates": {
      "type": "array",
      "j-documentation": "An array of arrays.  The outer array must contain at least 4 elements, with the first one repeated last.  Each inner array should contain 2 elements, longitude first and latitude second.",
      "minItems": 4,
      "items": {
        "type": "array",
        "j-documentation": "A 2 element \"inner\" array containing longitude first and latitude second.",
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
      }
    }
  },
  "required": [
    "type",
    "coordinates"
  ]
}
```



### hugeString

**kind**: schema\
**system**: jss\
**name**: hugeString

#### Example 1

An example.

```json
"A very long paragraph about an interesting subject..."
```


#### Schema


```json
{
  "type": "string",
  "j-documentation": "A string of 4000 characters or less.  An empty string is valid.",
  "maxLength": 4000
}
```



### integer

**kind**: schema\
**system**: jss\
**name**: integer

#### Example 1

An example.

```json
365
```


#### Schema


```json
{
  "type": "integer",
  "j-documentation": "A whole number."
}
```



### ipv4

**kind**: schema\
**system**: jss\
**name**: ipv4

#### Example 1

An example.

```json
"127.0.0.1"
```


#### Schema


```json
{
  "type": "string",
  "j-documentation": "A string of digits that identify a computer on a network in IP v4 format.",
  "format": "ipv4"
}
```



### ipv6

**kind**: schema\
**system**: jss\
**name**: ipv6

#### Example 1

An example.

```json
"2001:0DB8:85A3:0000:0000:8A2E:0370:7334"
```

#### Example 2

The shorthand loopback address is also supported.

```json
"::1"
```


#### Schema


```json
{
  "type": "string",
  "j-documentation": "A string of digits that identify a computer on a network in IP v6 format.",
  "format": "ipv6"
}
```



### jsonPointer

**kind**: schema\
**system**: jss\
**name**: jsonPointer

#### Example 1

An example.

```json
"/root/tree/branch/leaf"
```


#### Schema


```json
{
  "type": "string",
  "j-documentation": "A JSON pointer.",
  "format": "json-pointer"
}
```



### languageCode

**kind**: enum\
**system**: jss\
**name**: languageCode

A language code conforming to the from ISO 639-1 standard.

Value | Symbol | Text | Data | Documentation
--- | --- | --- | --- | ---
af |  | Afrikaans |   |  
ar |  | Arabic |   |  
ar-dz |  | Arabic (Algeria) |   |  
ar-bh |  | Arabic (Bahrain) |   |  
ar-eg |  | Arabic (Egypt) |   |  
ar-iq |  | Arabic (Iraq) |   |  
ar-jo |  | Arabic (Jordan) |   |  
ar-kw |  | Arabic (Kuwait) |   |  
ar-lb |  | Arabic (Lebanon) |   |  
ar-ly |  | Arabic (Libya) |   |  
ar-ma |  | Arabic (Morocco) |   |  
ar-om |  | Arabic (Oman) |   |  
ar-qa |  | Arabic (Qatar) |   |  
ar-sa |  | Arabic (Saudi Arabia) |   |  
ar-sy |  | Arabic (Syria) |   |  
ar-tn |  | Arabic (Tunisia) |   |  
ar-ae |  | Arabic (U.A.E.) |   |  
ar-ye |  | Arabic (Yemen) |   |  
be |  | Belarusian |   |  
bg |  | Bulgarian |   |  
ca |  | Catalan |   |  
cy |  | Welsh |   |  
cs |  | Czech |   |  
da |  | Danish |   |  
de |  | German |   |  
de-at |  | German (Austria) |   |  
de-ch |  | German (Switzerland) |   |  
de-de |  | German (Germany) |   |  
de-li |  | German (Liechtenstein) |   |  
de-lu |  | German (Luxembourg) |   |  
el |  | Greek |   |  
en |  | English |   |  
en-au |  | English (Australia) |   |  
en-bz |  | English (Belize) |   |  
en-ca |  | English (Canada) |   |  
en-gb |  | English (United Kingdom) |   |  
en-ie |  | English (Ireland) |   |  
en-jm |  | English (Jamaica) |   |  
en-nz |  | English (New Zealand) |   |  
en-za |  | English (South Africa) |   |  
en-tt |  | English (Trinidad) |   |  
en-us |  | English (United States) |   |  
es |  | Spanish |   |  
es-ar |  | Spanish (Argentina) |   |  
es-bo |  | Spanish (Bolivia) |   |  
es-cl |  | Spanish (Chile) |   |  
es-co |  | Spanish (Colombia) |   |  
es-cr |  | Spanish (Costa Rica) |   |  
es-do |  | Spanish (Dominican Republic) |   |  
es-ec |  | Spanish (Ecuador) |   |  
es-es |  | Spanish (Spain) |   |  
es-gt |  | Spanish (Guatemala) |   |  
es-hn |  | Spanish (Honduras) |   |  
es-mx |  | Spanish (Mexico) |   |  
es-ni |  | Spanish (Nicaragua) |   |  
es-pa |  | Spanish (Panama) |   |  
es-py |  | Spanish (Paraguay) |   |  
es-pe |  | Spanish (Peru) |   |  
es-pr |  | Spanish (Puerto Rico) |   |  
es-sv |  | Spanish (El Salvador) |   |  
es-uy |  | Spanish (Uruguay) |   |  
es-ve |  | Spanish (Venezuela) |   |  
et |  | Estonian |   |  
eu |  | Basque |   |  
fa |  | Farsi |   |  
fi |  | Finnish |   |  
fo |  | Faeroese |   |  
fr |  | French |   |  
fr-be |  | French (Belgium) |   |  
fr-ca |  | French (Canada) |   |  
fr-ch |  | French (Switzerland) |   |  
fr-fr |  | French (France) |   |  
fr-lu |  | French (Luxembourg) |   |  
ga |  | Irish |   |  
gd |  | Gaelic |   |  
he |  | Hebrew |   |  
hi |  | Hindi |   |  
hr |  | Croatian |   |  
hu |  | Hungarian |   |  
is |  | Icelandic |   |  
id |  | Indonesian |   |  
it |  | Italian |   |  
it-ch |  | Italian (Switzerland) |   |  
it-it |  | Italian (Italy) |   |  
ja |  | Japanese |   |  
ko |  | Korean |   |  
ku |  | Kurdish |   |  
lv |  | Latvian |   |  
lt |  | Lithuanian |   |  
mk |  | Macedonian (FYROM) |   |  
ml |  | Malayalam |   |  
ms |  | Malaysian |   |  
mt |  | Maltese |   |  
nb |  | Norwegian (Bokmål) |   |  
nl |  | Dutch |   |  
nl-be |  | Dutch (Belgium) |   |  
nn |  | Norwegian (Nynorsk) |   |  
no |  | Norwegian |   |  
pl |  | Polish |   |  
pa |  | Punjabi |   |  
pt |  | Portuguese |   |  
pt-pt |  | Portuguese (Portugal) |   |  
pt-br |  | Portuguese (Brazil) |   |  
rm |  | Rhaeto-Romanic |   |  
ro |  | Romanian |   |  
ro-ro |  | Romanian (Romania) |   |  
ro-md |  | Romanian (Republic of Moldova) |   |  
ru |  | Russian |   |  
ru-ru |  | Russian (Russia) |   |  
ru-md |  | Russian (Republic of Moldova) |   |  
sb |  | Sorbian |   |  
sk |  | Slovak |   |  
sl |  | Slovenian |   |  
sq |  | Albanian |   |  
sr |  | Serbian |   |  
sv |  | Swedish |   |  
sv-sv |  | Swedish (Sweden) |   |  
sv-fi |  | Swedish (Finland) |   |  
th |  | Thai |   |  
ts |  | Tsonga |   |  
tn |  | Tswana |   |  
tr |  | Turkish |   |  
uk |  | Ukrainian |   |  
ur |  | Urdu |   |  
ve |  | Venda |   |  
vi |  | Vietnamese |   |  
xh |  | Xhosa |   |  
yi |  | Yiddish |   |  
zh-hk |  | Chinese (Hong Kong) |   |  
zh-cn |  | Chinese (PRC) |   |  
zh-sg |  | Chinese (Singapore) |   |  
zh-tw |  | Chinese (Taiwan) |   |  
zu |  | Zulu |   |  



### longString

**kind**: schema\
**system**: jss\
**name**: longString

#### Example 1

An example.

```json
"A long string that contains a lot of characters"
```


#### Schema


```json
{
  "type": "string",
  "j-documentation": "A string of 250 characters or less.  An empty string is valid.",
  "maxLength": 250
}
```



### mediumString

**kind**: schema\
**system**: jss\
**name**: mediumString

#### Example 1

An example.

```json
"A string that contains some characters"
```


#### Schema


```json
{
  "type": "string",
  "j-documentation": "A string of 50 characters or less.  An empty string is valid.",
  "maxLength": 50
}
```



### money

**kind**: schema\
**system**: jss\
**name**: money

#### Example 1

In this example, the GBP currency defines a scaler of 2, which means that we shift the decimal point 2 places to the left.  So 9999 becomes £ 99.99 for display.

```json
{
  "amount": 9999,
  "currency": "gbp"
}
```


#### Schema


```json
{
  "type": "object",
  "j-documentation": "An amount of money designated in a specific currency.",
  "additionalProperties": false,
  "properties": {
    "amount": {
      "$ref": "integer",
      "j-documentation": "This value stores an integral amount of money in a currencies minor denomination. Each currency defines a scalar which indicates how many places the decimal point is shifted to the left, in order to convert to a currencies major denomination.  Storing the data in the minor denomination ensures that most currency manipulation and equality checks can be performed using integers rather than floating point numbers."
    },
    "currency": {
      "$ref": "currencyCode",
      "j-documentation": "This value indicates which currency has been used to express this monetary amount."
    }
  },
  "required": [
    "amount",
    "currency"
  ]
}
```



### monthOfYear

**kind**: enum\
**system**: jss\
**name**: monthOfYear

A calendar month.

Value | Symbol | Text | Data | Documentation
--- | --- | --- | --- | ---
jan |  | January |   |  
feb |  | February |   |  
mar |  | March |   |  
apr |  | April |   |  
may |  | May |   |  
jun |  | June |   |  
jul |  | July |   |  
aug |  | August |   |  
sep |  | September |   |  
oct |  | October |   |  
nov |  | November |   |  
dec |  | December |   |  



### negativeFloat

**kind**: schema\
**system**: jss\
**name**: negativeFloat

#### Example 1

An example.

```json
-21.09
```


#### Schema


```json
{
  "type": "number",
  "j-documentation": "A number with an integral and decimal part that is less than zero.",
  "exclusiveMaximum": 0
}
```



### negativeFloatOrZero

**kind**: schema\
**system**: jss\
**name**: negativeFloatOrZero

#### Example 1

An example.

```json
-6.16
```

#### Example 2

An example.

```json
0
```


#### Schema


```json
{
  "type": "number",
  "j-documentation": "A number with an integral and decimal part that is less than or equal to zero.",
  "maximum": 0
}
```



### negativeInteger

**kind**: schema\
**system**: jss\
**name**: negativeInteger

#### Example 1

An example.

```json
-9
```


#### Schema


```json
{
  "type": "integer",
  "j-documentation": "A whole number that is equal to -1 or less.",
  "maximum": -1
}
```



### negativeIntegerOrZero

**kind**: schema\
**system**: jss\
**name**: negativeIntegerOrZero

#### Example 1

An example.

```json
-15
```

#### Example 2

An example.

```json
0
```


#### Schema


```json
{
  "type": "integer",
  "j-documentation": "A whole number that is equal to zero or less.",
  "maximum": 0
}
```



### paymentCardNo

**kind**: schema\
**system**: jss\
**name**: paymentCardNo

#### Example 1

An example.

```json
"4111111111111111"
```


#### Schema


```json
{
  "type": "string",
  "j-documentation": "A value that uniquely identifies a payment card, such as a credit or debit card.  Any stored value will need to satisfy the LUHN algorithm.",
  "format": "jsonotron-luhn"
}
```



### plainObject

**kind**: schema\
**system**: jss\
**name**: plainObject

#### Example 1

In this example we store an object with nested objects.

```json
{
  "hello": "world",
  "foo": {
    "bar": true
  }
}
```

#### Example 2

Here we store an empty object.

```json
{}
```


#### Schema


```json
{
  "type": "object",
  "j-documentation": "Any valid JSON object.  The underlying data store may impose a limit on the depth of the JSON object.  You cannot store a null value.  Care should be taken not to supply an object of such depth or serialized size that the underlying data store cannot save it.  Wherever possible, define a set of schemas with a specific shape rather than using this type."
}
```



### positiveFloat

**kind**: schema\
**system**: jss\
**name**: positiveFloat

#### Example 1

An example.

```json
12.34
```


#### Schema


```json
{
  "type": "number",
  "j-documentation": "A number with an integral and decimal part that is greater than zero.",
  "exclusiveMinimum": 0
}
```



### positiveFloatOrZero

**kind**: schema\
**system**: jss\
**name**: positiveFloatOrZero

#### Example 1

An example.

```json
12.34
```

#### Example 2

An example.

```json
0
```


#### Schema


```json
{
  "type": "number",
  "j-documentation": "A number with an integral and decimal part that is greater than or equal to zero.",
  "minimum": 0
}
```



### positiveInteger

**kind**: schema\
**system**: jss\
**name**: positiveInteger

#### Example 1

An example.

```json
7
```


#### Schema


```json
{
  "type": "integer",
  "j-documentation": "A whole number that is equal to 1 or greater.",
  "minimum": 1
}
```



### positiveIntegerOrZero

**kind**: schema\
**system**: jss\
**name**: positiveIntegerOrZero

#### Example 1

An example.

```json
21
```

#### Example 2

An example.

```json
0
```


#### Schema


```json
{
  "type": "integer",
  "j-documentation": "A whole number that is equal to zero or greater.",
  "minimum": 0
}
```



### shortString

**kind**: schema\
**system**: jss\
**name**: shortString

#### Example 1

A short text string.

```json
"A terse string"
```


#### Schema


```json
{
  "type": "string",
  "j-documentation": "A string of 20 characters or less.  An empty string is valid.",
  "maxLength": 20
}
```



### string

**kind**: schema\
**system**: jss\
**name**: string

#### Example 1

An example.

```json
"A string"
```


#### Schema


```json
{
  "type": "string",
  "j-documentation": "A string of characters of any length.  Care should be taken not to supply a string of such great length that the underlying data store cannot save it.  An empty string is valid."
}
```



### telephoneNo

**kind**: schema\
**system**: jss\
**name**: telephoneNo

#### Example 1

In this example we have a UK mobile number.

```json
{
  "isd": "44",
  "number": "7834111222"
}
```

#### Example 2

In this example we have a US landline number with an extension.

```json
{
  "isd": "44",
  "number": "5550172",
  "ext": "2209"
}
```


#### Schema


```json
{
  "type": "object",
  "j-documentation": "A telephone number that comprises of a dialling code and a number.",
  "additionalProperties": false,
  "properties": {
    "isd": {
      "$ref": "callingCode",
      "j-documentation": "An international dialling code."
    },
    "number": {
      "$ref": "shortString",
      "j-documentation": "The main number.  It should NOT have a leading zero."
    },
    "ext": {
      "$ref": "shortString",
      "j-documentation": "Optional extension information."
    }
  },
  "required": [
    "isd",
    "number"
  ]
}
```



### time

**kind**: schema\
**system**: jss\
**name**: time

#### Example 1

An example.

```json
"23:14:56"
```


#### Schema


```json
{
  "type": "string",
  "j-documentation": "A string with the time components arranged using the HH:mm:ss pattern.  If the hours, minutes or seconds component is a value less than 10 then a leading zero must be included.  This ensures that all stored times are the same length.",
  "format": "time"
}
```



### timestamp

**kind**: schema\
**system**: jss\
**name**: timestamp

#### Example 1

An example.

```json
1595354428000
```


#### Schema


```json
{
  "type": "integer",
  "j-documentation": "The number of milliseconds that have elapsed since 00:00:00 Thursday, 1 January 1970.",
  "minimum": 0
}
```



### timeZone

**kind**: enum\
**system**: jss\
**name**: timeZone

A time zone from the IANA tz database.  The data is taken from https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.

Value | Symbol | Text | Data | Documentation
--- | --- | --- | --- | ---
africa/abidjan |  | Africa/Abidjan (+00:00, DST +00:00) |   |  
africa/accra |  | Africa/Accra (+00:00, DST +00:00) |   |  
africa/algiers |  | Africa/Algiers (+01:00, DST +01:00) |   |  
africa/bissau |  | Africa/Bissau (+00:00, DST +00:00) |   |  
africa/cairo |  | Africa/Cairo (+02:00, DST +02:00) |   |  
africa/casablanca |  | Africa/Casablanca (+01:00, DST +01:00) |   |  
africa/ceuta |  | Africa/Ceuta (+01:00, DST +02:00) |   |  
africa/el_aaiun |  | Africa/El Aaiun (+00:00, DST +01:00) |   |  
africa/johannesburg |  | Africa/Johannesburg (+02:00, DST +02:00) |   |  
africa/juba |  | Africa/Juba (+03:00, DST +03:00) |   |  
africa/khartoum |  | Africa/Khartoum (+02:00, DST +02:00) |   |  
africa/lagos |  | Africa/Lagos (+01:00, DST +01:00) |   |  
africa/maputo |  | Africa/Maputo (+02:00, DST +02:00) |   |  
africa/monrovia |  | Africa/Monrovia (+00:00, DST +00:00) |   |  
africa/nairobi |  | Africa/Nairobi (+03:00, DST +03:00) |   |  
africa/ndjamena |  | Africa/Ndjamena (+01:00, DST +01:00) |   |  
africa/tripoli |  | Africa/Tripoli (+02:00, DST +02:00) |   |  
africa/tunis |  | Africa/Tunis (+01:00, DST +01:00) |   |  
africa/windhoek |  | Africa/Windhoek (+02:00, DST +02:00) |   |  
america/adak |  | America/Adak (−10:00, DST −09:00) |   |  
america/anchorage |  | America/Anchorage (−09:00, DST −08:00) |   |  
america/araguaina |  | America/Araguaina (−03:00, DST −03:00) |   |  
america/argentina/buenos_aires |  | America/Argentina/Buenos Aires (−03:00, DST −03:00) |   |  
america/argentina/catamarca |  | America/Argentina/Catamarca (−03:00, DST −03:00) |   |  
america/argentina/cordoba |  | America/Argentina/Cordoba (−03:00, DST −03:00) |   |  
america/argentina/jujuy |  | America/Argentina/Jujuy (−03:00, DST −03:00) |   |  
america/argentina/la_rioja |  | America/Argentina/La Rioja (−03:00, DST −03:00) |   |  
america/argentina/mendoza |  | America/Argentina/Mendoza (−03:00, DST −03:00) |   |  
america/argentina/rio_gallegos |  | America/Argentina/Rio Gallegos (−03:00, DST −03:00) |   |  
america/argentina/salta |  | America/Argentina/Salta (−03:00, DST −03:00) |   |  
america/argentina/san_juan |  | America/Argentina/San Juan (−03:00, DST −03:00) |   |  
america/argentina/san_luis |  | America/Argentina/San Luis (−03:00, DST −03:00) |   |  
america/argentina/tucuman |  | America/Argentina/Tucuman (−03:00, DST −03:00) |   |  
america/argentina/ushuaia |  | America/Argentina/Ushuaia (−03:00, DST −03:00) |   |  
america/asuncion |  | America/Asuncion (−04:00, DST −03:00) |   |  
america/atikokan |  | America/Atikokan (−05:00, DST −05:00) |   |  
america/bahia |  | America/Bahia (−03:00, DST −03:00) |   |  
america/bahia_banderas |  | America/Bahia Banderas (−06:00, DST −05:00) |   |  
america/barbados |  | America/Barbados (−04:00, DST −04:00) |   |  
america/belem |  | America/Belem (−03:00, DST −03:00) |   |  
america/belize |  | America/Belize (−06:00, DST −06:00) |   |  
america/blanc_sablon |  | America/Blanc-Sablon (−04:00, DST −04:00) |   |  
america/boa_vista |  | America/Boa Vista (−04:00, DST −04:00) |   |  
america/bogota |  | America/Bogota (−05:00, DST −05:00) |   |  
america/boise |  | America/Boise (−07:00, DST −06:00) |   |  
america/cambridge_bay |  | America/Cambridge Bay (−07:00, DST −06:00) |   |  
america/campo_grande |  | America/Campo Grande (−04:00, DST −03:00) |   |  
america/cancun |  | America/Cancun (−05:00, DST −05:00) |   |  
america/caracas |  | America/Caracas (−04:00, DST −04:00) |   |  
america/cayenne |  | America/Cayenne (−03:00, DST −03:00) |   |  
america/chicago |  | America/Chicago (−06:00, DST −05:00) |   |  
america/chihuahua |  | America/Chihuahua (−07:00, DST −06:00) |   |  
america/costa_rica |  | America/Costa Rica (−06:00, DST −06:00) |   |  
america/creston |  | America/Creston (−07:00, DST −07:00) |   |  
america/cuiaba |  | America/Cuiaba (−04:00, DST −03:00) |   |  
america/curacao |  | America/Curacao (−04:00, DST −04:00) |   |  
america/danmarkshavn |  | America/Danmarkshavn (+00:00, DST +00:00) |   |  
america/dawson |  | America/Dawson (−08:00, DST −07:00) |   |  
america/dawson_creek |  | America/Dawson Creek (−07:00, DST −07:00) |   |  
america/denver |  | America/Denver (−07:00, DST −06:00) |   |  
america/detroit |  | America/Detroit (−05:00, DST −04:00) |   |  
america/edmonton |  | America/Edmonton (−07:00, DST −06:00) |   |  
america/eirunepe |  | America/Eirunepe (−05:00, DST −05:00) |   |  
america/el_salvador |  | America/El Salvador (−06:00, DST −06:00) |   |  
america/fort_nelson |  | America/Fort Nelson (−07:00, DST −07:00) |   |  
america/fortaleza |  | America/Fortaleza (−03:00, DST −03:00) |   |  
america/glace_bay |  | America/Glace Bay (−04:00, DST −03:00) |   |  
america/godthab |  | America/Godthab (−03:00, DST −02:00) |   |  
america/goose_bay |  | America/Goose Bay (−04:00, DST −03:00) |   |  
america/grand_turk |  | America/Grand Turk (−05:00, DST −04:00) |   |  
america/guatemala |  | America/Guatemala (−06:00, DST −06:00) |   |  
america/guayaquil |  | America/Guayaquil (−05:00, DST −05:00) |   |  
america/guyana |  | America/Guyana (−04:00, DST −04:00) |   |  
america/halifax |  | America/Halifax (−04:00, DST −03:00) |   |  
america/havana |  | America/Havana (−05:00, DST −04:00) |   |  
america/hermosillo |  | America/Hermosillo (−07:00, DST −07:00) |   |  
america/indiana/indianapolis |  | America/Indiana/Indianapolis (−05:00, DST −04:00) |   |  
america/indiana/knox |  | America/Indiana/Knox (−06:00, DST −05:00) |   |  
america/indiana/marengo |  | America/Indiana/Marengo (−05:00, DST −04:00) |   |  
america/indiana/petersburg |  | America/Indiana/Petersburg (−05:00, DST −04:00) |   |  
america/indiana/tell_city |  | America/Indiana/Tell City (−06:00, DST −05:00) |   |  
america/indiana/vevay |  | America/Indiana/Vevay (−05:00, DST −04:00) |   |  
america/indiana/vincennes |  | America/Indiana/Vincennes (−05:00, DST −04:00) |   |  
america/indiana/winamac |  | America/Indiana/Winamac (−05:00, DST −04:00) |   |  
america/inuvik |  | America/Inuvik (−07:00, DST −06:00) |   |  
america/iqaluit |  | America/Iqaluit (−05:00, DST −04:00) |   |  
america/jamaica |  | America/Jamaica (−05:00, DST −05:00) |   |  
america/juneau |  | America/Juneau (−09:00, DST −08:00) |   |  
america/kentucky/louisville |  | America/Kentucky/Louisville (−05:00, DST −04:00) |   |  
america/kentucky/monticello |  | America/Kentucky/Monticello (−05:00, DST −04:00) |   |  
america/la_paz |  | America/La Paz (−04:00, DST −04:00) |   |  
america/lima |  | America/Lima (−05:00, DST −05:00) |   |  
america/los_angeles |  | America/Los Angeles (−08:00, DST −07:00) |   |  
america/maceio |  | America/Maceio (−03:00, DST −03:00) |   |  
america/managua |  | America/Managua (−06:00, DST −06:00) |   |  
america/manaus |  | America/Manaus (−04:00, DST −04:00) |   |  
america/martinique |  | America/Martinique (−04:00, DST −04:00) |   |  
america/matamoros |  | America/Matamoros (−06:00, DST −05:00) |   |  
america/mazatlan |  | America/Mazatlan (−07:00, DST −06:00) |   |  
america/menominee |  | America/Menominee (−06:00, DST −05:00) |   |  
america/merida |  | America/Merida (−06:00, DST −05:00) |   |  
america/metlakatla |  | America/Metlakatla (−09:00, DST −08:00) |   |  
america/mexico_city |  | America/Mexico City (−06:00, DST −05:00) |   |  
america/miquelon |  | America/Miquelon (−03:00, DST −02:00) |   |  
america/moncton |  | America/Moncton (−04:00, DST −03:00) |   |  
america/monterrey |  | America/Monterrey (−06:00, DST −05:00) |   |  
america/montevideo |  | America/Montevideo (−03:00, DST −03:00) |   |  
america/nassau |  | America/Nassau (−05:00, DST −04:00) |   |  
america/new_york |  | America/New York (−05:00, DST −04:00) |   |  
america/nipigon |  | America/Nipigon (−05:00, DST −04:00) |   |  
america/nome |  | America/Nome (−09:00, DST −08:00) |   |  
america/noronha |  | America/Noronha (−02:00, DST −02:00) |   |  
america/north_dakota/beulah |  | America/North Dakota/Beulah (−06:00, DST −05:00) |   |  
america/north_dakota/center |  | AmericaNorth Dakota/Center (−06:00, DST −05:00) |   |  
america/north_dakota/new_salem |  | America/North Dakota/New Salem (−06:00, DST −05:00) |   |  
america/ojinaga |  | America/Ojinaga (−07:00, DST −06:00) |   |  
america/panama |  | America/Panama (−05:00, DST −05:00) |   |  
america/pangnirtung |  | America/Pangnirtung (−05:00, DST −04:00) |   |  
america/paramaribo |  | America/Paramaribo (−03:00, DST −03:00) |   |  
america/phoenix |  | America/Phoenix (−07:00, DST −07:00) |   |  
america/port_of_spain |  | America/Port of Spain (−04:00, DST −04:00) |   |  
america/port_au_prince |  | America/Port-au-Prince (−05:00, DST −04:00) |   |  
america/porto_velho |  | America/Porto Velho (−04:00, DST −04:00) |   |  
america/puerto_rico |  | America/Puerto Rico (−04:00, DST −04:00) |   |  
america/punta_arenas |  | America/Punta Arenas (−03:00, DST −03:00) |   |  
america/rainy_river |  | America/Rainy River (−06:00, DST −05:00) |   |  
america/rankin_inlet |  | America/Rankin Inlet (−06:00, DST −05:00) |   |  
america/recife |  | America/Recife (−03:00, DST −03:00) |   |  
america/regina |  | America/Regina (−06:00, DST −06:00) |   |  
america/resolute |  | America/Resolute (−06:00, DST −05:00) |   |  
america/rio_branco |  | America/Rio Branco (−05:00, DST −05:00) |   |  
america/santarem |  | America/Santarem (−03:00, DST −03:00) |   |  
america/santiago |  | America/Santiago (−04:00, DST −03:00) |   |  
america/santo_domingo |  | America/Santo Domingo (−04:00, DST −04:00) |   |  
america/sao_paulo |  | America/Sao Paulo (−03:00, DST −02:00) |   |  
america/scoresbysund |  | America/Scoresbysund (−01:00, DST +00:00) |   |  
america/sitka |  | America/Sitka (−09:00, DST −08:00) |   |  
america/st_johns |  | America/St Johns (−03:30, DST −02:30) |   |  
america/swift_current |  | America/Swift Current (−06:00, DST −06:00) |   |  
america/tegucigalpa |  | America/Tegucigalpa (−06:00, DST −06:00) |   |  
america/thule |  | America/Thule (−04:00, DST −03:00) |   |  
america/thunder_bay |  | America/Thunder Bay (−05:00, DST −04:00) |   |  
america/tijuana |  | America/Tijuana (−08:00, DST −07:00) |   |  
america/toronto |  | America/Toronto (−05:00, DST −04:00) |   |  
america/vancouver |  | America/Vancouver (−08:00, DST −07:00) |   |  
america/whitehorse |  | America/Whitehorse (−08:00, DST −07:00) |   |  
america/winnipeg |  | America/Winnipeg (−06:00, DST −05:00) |   |  
america/yakutat |  | America/Yakutat (−09:00, DST −08:00) |   |  
america/yellowknife |  | America/Yellowknife (−07:00, DST −06:00) |   |  
antarctica/casey |  | Antarctica/Casey (+11:00, DST +11:00) |   |  
antarctica/davis |  | Antarctica/Davis (+07:00, DST +07:00) |   |  
antarctica/dumontdurville |  | Antarctica/DumontDUrville (+10:00, DST +10:00) |   |  
antarctica/macquarie |  | Antarctica/Macquarie (+11:00, DST +11:00) |   |  
antarctica/mawson |  | Antarctica/Mawson (+05:00, DST +05:00) |   |  
antarctica/palmer |  | Antarctica/Palmer (−03:00, DST −03:00) |   |  
antarctica/rothera |  | Antarctica/Rothera (−03:00, DST −03:00) |   |  
antarctica/syowa |  | Antarctica/Syowa (+03:00, DST +03:00) |   |  
antarctica/troll |  | Antarctica/Troll (+00:00, DST +02:00) |   |  
antarctica/vostok |  | Antarctica/Vostok (+06:00, DST +06:00) |   |  
asia/almaty |  | Asia/Almaty (+06:00, DST +06:00) |   |  
asia/amman |  | Asia/Amman (+02:00, DST +03:00) |   |  
asia/anadyr |  | Asia/Anadyr (+12:00, DST +12:00) |   |  
asia/aqtau |  | Asia/Aqtau (+05:00, DST +05:00) |   |  
asia/aqtobe |  | Asia/Aqtobe (+05:00, DST +05:00) |   |  
asia/ashgabat |  | Asia/Ashgabat (+05:00, DST +05:00) |   |  
asia/atyrau |  | Asia/Atyrau (+05:00, DST +05:00) |   |  
asia/baghdad |  | Asia/Baghdad (+03:00, DST +03:00) |   |  
asia/baku |  | Asia/Baku (+04:00, DST +04:00) |   |  
asia/bangkok |  | Asia/Bangkok (+07:00, DST +07:00) |   |  
asia/barnaul |  | Asia/Barnaul (+07:00, DST +07:00) |   |  
asia/beirut |  | Asia/Beirut (+02:00, DST +03:00) |   |  
asia/bishkek |  | Asia/Bishkek (+06:00, DST +06:00) |   |  
asia/brunei |  | Asia/Brunei (+08:00, DST +08:00) |   |  
asia/chita |  | Asia/Chita (+09:00, DST +09:00) |   |  
asia/choibalsan |  | Asia/Choibalsan (+08:00, DST +08:00) |   |  
asia/colombo |  | Asia/Colombo (+05:30, DST +05:30) |   |  
asia/damascus |  | Asia/Damascus (+02:00, DST +03:00) |   |  
asia/dhaka |  | Asia/Dhaka (+06:00, DST +06:00) |   |  
asia/dili |  | Asia/Dili (+09:00, DST +09:00) |   |  
asia/dubai |  | Asia/Dubai (+04:00, DST +04:00) |   |  
asia/dushanbe |  | Asia/Dushanbe (+05:00, DST +05:00) |   |  
asia/famagusta |  | Asia/Famagusta (+02:00, DST +02:00) |   |  
asia/gaza |  | Asia/Gaza (+02:00, DST +03:00) |   |  
asia/hebron |  | Asia/Hebron (+02:00, DST +03:00) |   |  
asia/ho_chi_minh |  | Asia/Ho Chi Minh (+07:00, DST +07:00) |   |  
asia/hong_kong |  | Asia/Hong Kong (+08:00, DST +08:00) |   |  
asia/hovd |  | Asia/Hovd (+07:00, DST +07:00) |   |  
asia/irkutsk |  | Asia/Irkutsk (+08:00, DST +08:00) |   |  
asia/jakarta |  | Asia/Jakarta (+07:00, DST +07:00) |   |  
asia/jayapura |  | Asia/Jayapura (+09:00, DST +09:00) |   |  
asia/jerusalem |  | Asia/Jerusalem (+02:00, DST +03:00) |   |  
asia/kabul |  | Asia/Kabul (+04:30, DST +04:30) |   |  
asia/kamchatka |  | Asia/Kamchatka (+12:00, DST +12:00) |   |  
asia/karachi |  | Asia/Karachi (+05:00, DST +05:00) |   |  
asia/kathmandu |  | Asia/Kathmandu (+05:45, DST +05:45) |   |  
asia/khandyga |  | Asia/Khandyga (+09:00, DST +09:00) |   |  
asia/kolkata |  | Asia/Kolkata (+05:30, DST +05:30) |   |  
asia/krasnoyarsk |  | Asia/Krasnoyarsk (+07:00, DST +07:00) |   |  
asia/kuala_lumpur |  | Asia/Kuala Lumpur (+08:00, DST +08:00) |   |  
asia/kuching |  | Asia/Kuching (+08:00, DST +08:00) |   |  
asia/macau |  | Asia/Macau (+08:00, DST +08:00) |   |  
asia/magadan |  | Asia/Magadan (+11:00, DST +11:00) |   |  
asia/makassar |  | Asia/Makassar (+08:00, DST +08:00) |   |  
asia/manila |  | Asia/Manila (+08:00, DST +08:00) |   |  
asia/novokuznetsk |  | Asia/Novokuznetsk (+07:00, DST +07:00) |   |  
asia/novosibirsk |  | Asia/Novosibirsk (+07:00, DST +07:00) |   |  
asia/omsk |  | Asia/Omsk (+06:00, DST +06:00) |   |  
asia/oral |  | Asia/Oral (+05:00, DST +05:00) |   |  
asia/pontianak |  | Asia/Pontianak (+07:00, DST +07:00) |   |  
asia/pyongyang |  | Asia/Pyongyang (+09:00, DST +09:00) |   |  
asia/qatar |  | Asia/Qatar (+03:00, DST +03:00) |   |  
asia/qyzylorda |  | Asia/Qyzylorda (+05:00, DST +05:00) |   |  
asia/riyadh |  | Asia/Riyadh (+03:00, DST +03:00) |   |  
asia/sakhalin |  | Asia/Sakhalin (+11:00, DST +11:00) |   |  
asia/samarkand |  | Asia/Samarkand (+05:00, DST +05:00) |   |  
asia/seoul |  | Asia/Seoul (+09:00, DST +09:00) |   |  
asia/shanghai |  | Asia/Shanghai (+08:00, DST +08:00) |   |  
asia/singapore |  | Asia/Singapore (+08:00, DST +08:00) |   |  
asia/srednekolymsk |  | Asia/Srednekolymsk (+11:00, DST +11:00) |   |  
asia/taipei |  | Asia/Taipei (+08:00, DST +08:00) |   |  
asia/tashkent |  | Asia/Tashkent (+05:00, DST +05:00) |   |  
asia/tbilisi |  | Asia/Tbilisi (+04:00, DST +04:00) |   |  
asia/tehran |  | Asia/Tehran (+03:30, DST +04:30) |   |  
asia/thimphu |  | Asia/Thimphu (+06:00, DST +06:00) |   |  
asia/tokyo |  | Asia/Tokyo (+09:00, DST +09:00) |   |  
asia/tomsk |  | Asia/Tomsk (+07:00, DST +07:00) |   |  
asia/ulaanbaatar |  | Asia/Ulaanbaatar (+08:00, DST +08:00) |   |  
asia/urumqi |  | Asia/Urumqi (+06:00, DST +06:00) |   |  
asia/ust_nera |  | Asia/Ust-Nera (+10:00, DST +10:00) |   |  
asia/vladivostok |  | Asia/Vladivostok (+10:00, DST +10:00) |   |  
asia/yakutsk |  | Asia/Yakutsk (+09:00, DST +09:00) |   |  
asia/yangon |  | Asia/Yangon (+06:30, DST +06:30) |   |  
asia/yekaterinburg |  | Asia/Yekaterinburg (+05:00, DST +05:00) |   |  
asia/yerevan |  | Asia/Yerevan (+04:00, DST +04:00) |   |  
atlantic/azores |  | Atlantic/Azores (−01:00, DST +00:00) |   |  
atlantic/bermuda |  | Atlantic/Bermuda (−04:00, DST −03:00) |   |  
atlantic/canary |  | Atlantic/Canary (+00:00, DST +01:00) |   |  
atlantic/cape_verde |  | Atlantic/Cape Verde (−01:00, DST −01:00) |   |  
atlantic/faroe |  | Atlantic/Faroe (+00:00, DST +01:00) |   |  
atlantic/madeira |  | Atlantic/Madeira (+00:00, DST +01:00) |   |  
atlantic/reykjavik |  | Atlantic/Reykjavik (+00:00, DST +00:00) |   |  
atlantic/south_georgia |  | Atlantic/South Georgia (−02:00, DST −02:00) |   |  
atlantic/stanley |  | Atlantic/Stanley (−03:00, DST −03:00) |   |  
australia/adelaide |  | Australia/Adelaide (+09:30, DST +10:30) |   |  
australia/brisbane |  | Australia/Brisbane (+10:00, DST +10:00) |   |  
australia/broken_hill |  | Australia/Broken Hill (+09:30, DST +10:30) |   |  
australia/currie |  | Australia/Currie (+10:00, DST +11:00) |   |  
australia/darwin |  | Australia/Darwin (+09:30, DST +09:30) |   |  
australia/eucla |  | Australia/Eucla (+08:45, DST +08:45) |   |  
australia/hobart |  | Australia/Hobart (+10:00, DST +11:00) |   |  
australia/lindeman |  | Australia/Lindeman (+10:00, DST +10:00) |   |  
australia/lord_howe |  | Australia/Lord Howe (+10:30, DST +11:00) |   |  
australia/melbourne |  | Australia/Melbourne (+10:00, DST +11:00) |   |  
australia/perth |  | Australia/Perth (+08:00, DST +08:00) |   |  
australia/sydney |  | Australia/Sydney (+10:00, DST +11:00) |   |  
etc/gmt |  | Etc/GMT (+00:00, DST +00:00) |   |  
etc/gmt_plus_1 |  | Etc/GMT+1 (−01:00, DST −01:00) |   |  
etc/gmt_plus_10 |  | Etc/GMT+10 (−10:00, DST −10:00) |   |  
etc/gmt_plus_11 |  | Etc/GMT+11 (−11:00, DST −11:00) |   |  
etc/gmt_plus_12 |  | Etc/GMT+12 (−12:00, DST −12:00) |   |  
etc/gmt_plus_2 |  | Etc/GMT+2 (−02:00, DST −02:00) |   |  
etc/gmt_plus_3 |  | Etc/GMT+3 (−03:00, DST −03:00) |   |  
etc/gmt_plus_4 |  | Etc/GMT+4 (−04:00, DST −04:00) |   |  
etc/gmt_plus_5 |  | Etc/GMT+5 (−05:00, DST −05:00) |   |  
etc/gmt_plus_6 |  | Etc/GMT+6 (−06:00, DST −06:00) |   |  
etc/gmt_plus_7 |  | Etc/GMT+7 (−07:00, DST −07:00) |   |  
etc/gmt_plus_8 |  | Etc/GMT+8 (−08:00, DST −08:00) |   |  
etc/gmt_plus_9 |  | Etc/GMT+9 (−09:00, DST −09:00) |   |  
etc/gmt_minus_1 |  | Etc/GMT-1 (+01:00, DST +01:00) |   |  
etc/gmt_minus_10 |  | Etc/GMT-10 (+10:00, DST +10:00) |   |  
etc/gmt_minus_11 |  | Etc/GMT-11 (+11:00, DST +11:00) |   |  
etc/gmt_minus_12 |  | Etc/GMT-12 (+12:00, DST +12:00) |   |  
etc/gmt_minus_13 |  | Etc/GMT-13 (+13:00, DST +13:00) |   |  
etc/gmt_minus_14 |  | Etc/GMT-14 (+14:00, DST +14:00) |   |  
etc/gmt_minus_2 |  | Etc/GMT-2 (+02:00, DST +02:00) |   |  
etc/gmt_minus_3 |  | Etc/GMT-3 (+03:00, DST +03:00) |   |  
etc/gmt_minus_4 |  | Etc/GMT-4 (+04:00, DST +04:00) |   |  
etc/gmt_minus_5 |  | Etc/GMT-5 (+05:00, DST +05:00) |   |  
etc/gmt_minus_6 |  | Etc/GMT-6 (+06:00, DST +06:00) |   |  
etc/gmt_minus_7 |  | Etc/GMT-7 (+07:00, DST +07:00) |   |  
etc/gmt_minus_8 |  | Etc/GMT-8 (+08:00, DST +08:00) |   |  
etc/gmt_minus_9 |  | Etc/GMT-9 (+09:00, DST +09:00) |   |  
etc/utc |  | Etc/UTC (+00:00, DST +00:00) |   |  
europe/amsterdam |  | Europe/Amsterdam (+01:00, DST +02:00) |   |  
europe/andorra |  | Europe/Andorra (+01:00, DST +02:00) |   |  
europe/astrakhan |  | Europe/Astrakhan (+04:00, DST +04:00) |   |  
europe/athens |  | Europe/Athens (+02:00, DST +03:00) |   |  
europe/belgrade |  | Europe/Belgrade (+01:00, DST +02:00) |   |  
europe/berlin |  | Europe/Berlin (+01:00, DST +02:00) |   |  
europe/brussels |  | Europe/Brussels (+01:00, DST +02:00) |   |  
europe/bucharest |  | Europe/Bucharest (+02:00, DST +03:00) |   |  
europe/budapest |  | Europe/Budapest (+01:00, DST +02:00) |   |  
europe/chisinau |  | Europe/Chisinau (+02:00, DST +03:00) |   |  
europe/copenhagen |  | Europe/Copenhagen (+01:00, DST +02:00) |   |  
europe/dublin |  | Europe/Dublin (+00:00, DST +01:00) |   |  
europe/gibraltar |  | Europe/Gibraltar (+01:00, DST +02:00) |   |  
europe/helsinki |  | Europe/Helsinki (+02:00, DST +03:00) |   |  
europe/istanbul |  | Europe/Istanbul (+03:00, DST +03:00) |   |  
europe/kaliningrad |  | Europe/Kaliningrad (+02:00, DST +02:00) |   |  
europe/kiev |  | Europe/Kiev (+02:00, DST +03:00) |   |  
europe/kirov |  | Europe/Kirov (+03:00, DST +03:00) |   |  
europe/lisbon |  | Europe/Lisbon (+00:00, DST +01:00) |   |  
europe/london |  | Europe/London (+00:00, DST +01:00) |   |  
europe/luxembourg |  | Europe/Luxembourg (+01:00, DST +02:00) |   |  
europe/madrid |  | Europe/Madrid (+01:00, DST +02:00) |   |  
europe/malta |  | Europe/Malta (+01:00, DST +02:00) |   |  
europe/minsk |  | Europe/Minsk (+03:00, DST +03:00) |   |  
europe/monaco |  | Europe/Monaco (+01:00, DST +02:00) |   |  
europe/moscow |  | Europe/Moscow (+03:00, DST +03:00) |   |  
asia/nicosia |  | Asia/Nicosia (+02:00, DST +03:00) |   |  
europe/oslo |  | Europe/Oslo (+01:00, DST +02:00) |   |  
europe/paris |  | Europe/Paris (+01:00, DST +02:00) |   |  
europe/prague |  | Europe/Prague (+01:00, DST +02:00) |   |  
europe/riga |  | Europe/Riga (+02:00, DST +03:00) |   |  
europe/rome |  | Europe/Rome (+01:00, DST +02:00) |   |  
europe/samara |  | Europe/Samara (+04:00, DST +04:00) |   |  
europe/saratov |  | Europe/Saratov (+04:00, DST +04:00) |   |  
europe/simferopol |  | Europe/Simferopol (+03:00, DST +03:00) |   |  
europe/sofia |  | Europe/Sofia (+02:00, DST +03:00) |   |  
europe/stockholm |  | Europe/Stockholm (+01:00, DST +02:00) |   |  
europe/tallinn |  | Europe/Tallinn (+02:00, DST +03:00) |   |  
europe/tirane |  | Europe/Tirane (+01:00, DST +02:00) |   |  
europe/ulyanovsk |  | Europe/Ulyanovsk (+04:00, DST +04:00) |   |  
europe/uzhgorod |  | Europe/Uzhgorod (+02:00, DST +03:00) |   |  
europe/vienna |  | Europe/Vienna (+01:00, DST +02:00) |   |  
europe/vilnius |  | Europe/Vilnius (+02:00, DST +03:00) |   |  
europe/volgograd |  | Europe/Volgograd (+04:00, DST +04:00) |   |  
europe/warsaw |  | Europe/Warsaw (+01:00, DST +02:00) |   |  
europe/zaporozhye |  | Europe/Zaporozhye (+02:00, DST +03:00) |   |  
europe/zurich |  | Europe/Zurich (+01:00, DST +02:00) |   |  
indian/chagos |  | Indian/Chagos (+06:00, DST +06:00) |   |  
indian/christmas |  | Indian/Christmas (+07:00, DST +07:00) |   |  
indian/cocos |  | Indian/Cocos (+06:30, DST +06:30) |   |  
indian/kerguelen |  | Indian/Kerguelen (+05:00, DST +05:00) |   |  
indian/mahe |  | Indian/Mahe (+04:00, DST +04:00) |   |  
indian/maldives |  | Indian/Maldives (+05:00, DST +05:00) |   |  
indian/mauritius |  | Indian/Mauritius (+04:00, DST +04:00) |   |  
indian/reunion |  | Indian/Reunion (+04:00, DST +04:00) |   |  
pacific/apia |  | Pacific/Apia (+13:00, DST +14:00) |   |  
pacific/auckland |  | Pacific/Auckland (+12:00, DST +13:00) |   |  
pacific/bougainville |  | Pacific/Bougainville (+11:00, DST +11:00) |   |  
pacific/chatham |  | Pacific/Chatham (+12:45, DST +13:45) |   |  
pacific/chuuk |  | Pacific/Chuuk (+10:00, DST +10:00) |   |  
pacific/easter |  | Pacific/Easter (−06:00, DST −05:00) |   |  
pacific/efate |  | Pacific/Efate (+11:00, DST +11:00) |   |  
pacific/enderbury |  | Pacific/Enderbury (+13:00, DST +13:00) |   |  
pacific/fakaofo |  | Pacific/Fakaofo (+13:00, DST +13:00) |   |  
pacific/fiji |  | Pacific/Fiji (+12:00, DST +13:00) |   |  
pacific/funafuti |  | Pacific/Funafuti (+12:00, DST +12:00) |   |  
pacific/galapagos |  | Pacific/Galapagos (−06:00, DST −06:00) |   |  
pacific/gambier |  | Pacific/Gambier (−09:00, DST −09:00) |   |  
pacific/guadalcanal |  | Pacific/Guadalcanal (+11:00, DST +11:00) |   |  
pacific/guam |  | Pacific/Guam (+10:00, DST +10:00) |   |  
pacific/honolulu |  | Pacific/Honolulu (−10:00, DST −10:00) |   |  
pacific/kiritimati |  | Pacific/Kiritimati (+14:00, DST +14:00) |   |  
pacific/kosrae |  | Pacific/Kosrae (+11:00, DST +11:00) |   |  
pacific/kwajalein |  | Pacific/Kwajalein (+12:00, DST +12:00) |   |  
pacific/majuro |  | Pacific/Majuro (+12:00, DST +12:00) |   |  
pacific/marquesas |  | Pacific/Marquesas (−09:30, DST −09:30) |   |  
pacific/nauru |  | Pacific/Nauru (+12:00, DST +12:00) |   |  
pacific/niue |  | Pacific/Niue (−11:00, DST −11:00) |   |  
pacific/norfolk |  | Pacific/Norfolk (+11:00, DST +11:00) |   |  
pacific/noumea |  | Pacific/Noumea (+11:00, DST +11:00) |   |  
pacific/pago_pago |  | Pacific/Pago Pago (−11:00, DST −11:00) |   |  
pacific/palau |  | Pacific/Palau (+09:00, DST +09:00) |   |  
pacific/pitcairn |  | Pacific/Pitcairn (−08:00, DST −08:00) |   |  
pacific/pohnpei |  | Pacific/Pohnpei (+11:00, DST +11:00) |   |  
pacific/port_moresby |  | Pacific/Port Moresby (+10:00, DST +10:00) |   |  
pacific/rarotonga |  | Pacific/Rarotonga (−10:00, DST −10:00) |   |  
pacific/tahiti |  | Pacific/Tahiti (−10:00, DST −10:00) |   |  
pacific/tarawa |  | Pacific/Tarawa (+12:00, DST +12:00) |   |  
pacific/tongatapu |  | Pacific/Tongatapu (+13:00, DST +14:00) |   |  
pacific/wake |  | Pacific/Wake (+12:00, DST +12:00) |   |  
pacific/wallis |  | Pacific/Wallis (+12:00, DST +12:00) |   |  



### uuid

**kind**: schema\
**system**: jss\
**name**: uuid

#### Example 1

An example.

```json
"1ff9a681-092e-48ad-8d5a-1b0919ddb33b"
```


#### Schema


```json
{
  "type": "string",
  "j-documentation": "A universally unique 128 bit number formatted as 32 alphanumeric characters and defined by RFC 4122.",
  "pattern": "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
}
```



### webAddress

**kind**: schema\
**system**: jss\
**name**: webAddress

#### Example 1

A link to a site using HTTPS.

```json
"https://www.bbc.co.uk"
```

#### Example 2

A link to an secured site using HTTP.

```json
"http://www.simple.com"
```


#### Schema


```json
{
  "type": "string",
  "j-documentation": "A url that is prefixed with either https or https.",
  "pattern": "^http[s]?://[a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%_+.~#?&//=]*)$"
}
```



### what3words

**kind**: schema\
**system**: jss\
**name**: what3words

#### Example 1

This example locates an address near Charing Cross Station.

```json
[
  "daring",
  "lion",
  "race"
]
```

#### Example 2

This example is for an embassy in panama.

```json
[
  "science",
  "touted",
  "uplifted"
]
```


#### Schema


```json
{
  "type": "array",
  "j-documentation": "A 3-element array that captures an address based on the https://what3words.com geocoding system. The system allows you to specify any location on Earth, within a few metres, using just 3 words. Each element in the array is a shortString.",
  "minItems": 3,
  "maxItems": 3,
  "items": {
    "$ref": "shortString"
  }
}
```



### yesNo

**kind**: enum\
**system**: jss\
**name**: yesNo

A binary choice between yes or no.
This type can be used where a third option may be introduced in the future.  In that scenario a boolean field would be limiting, but a yesNo field could be replaced by a new enum without having to migrate existing data.

Value | Symbol | Text | Data | Documentation
--- | --- | --- | --- | ---
yes |  | Yes |   |  
no |  | No |   |  


    