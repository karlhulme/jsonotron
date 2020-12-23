
# Jsonotron Standard Library

This document describes the types of the `https://jsonotron.org/jss` system.


## Contents

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

### Referenced Type Systems



  


## Address

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
  "countryCode": "gb"
}
```

### Example 2

This example is an address in the United States so it uses a zip code.

```json
{
  "addressLines": "1 Mansion Street\nBeverley Hills\nLos Angeles",
  "postalCode": "90210",
  "countryCode": "us"
}
```


### Schema as JSON


```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "addressLines": {
      "$ref": "hugeString"
    },
    "postalCode": {
      "$ref": "shortString"
    },
    "countryCode": {
      "$ref": "countryCode"
    }
  },
  "required": [
    "addressLines",
    "postalCode",
    "countryCode"
  ]
}
```


### Schema as YAML


```yaml
type: object
additionalProperties: false
properties:
  addressLines:
    $ref: hugeString
  postalCode:
    $ref: shortString
  countryCode:
    $ref: countryCode
required:
  - addressLines
  - postalCode
  - countryCode

```


  

## Boolean

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


### Schema as JSON


```json
{
  "type": "boolean"
}
```


### Schema as YAML


```yaml
type: boolean

```


  

## Calling Code

**kind**: enum\
**name**: callingCode\
**uri**: https://jsonotron.org/jss/callingCode

An international telephone calling code defined by the ITU-T in standards E.123 and E.164.  The data is taken from https://en.wikipedia.org/wiki/List_of_country_calling_codes.  Notice that the value is stored as a string.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
1 |  | Canada, United States and North American Numbering Plan (NANP) |  
20 |  | Egypt |  
211 |  | South Sudan |  
212 |  | Morocco |  
213 |  | Algeria |  
216 |  | Tunisia |  
218 |  | Libya |  
220 |  | Gambia |  
221 |  | Senegal |  
222 |  | Mauritania |  
223 |  | Mali |  
224 |  | Guinea |  
225 |  | Ivory Coast |  
226 |  | Burkina Faso |  
227 |  | Niger |  
228 |  | Togo |  
229 |  | Benin |  
230 |  | Mauritius |  
231 |  | Liberia |  
232 |  | Sierra Leone |  
233 |  | Ghana |  
234 |  | Nigeria |  
235 |  | Chad |  
236 |  | Central African Republic |  
237 |  | Cameroon |  
238 |  | Cape Verde |  
239 |  | São Tomé and Príncipe |  
240 |  | Equatorial Guinea |  
241 |  | Gabon |  
242 |  | Republic of the Congo |  
243 |  | Democratic Republic of the Congo |  
244 |  | Angola |  
245 |  | Guinea-Bissau |  
246 |  | British Indian Ocean Territory |  
247 |  | Ascension Island |  
248 |  | Seychelles |  
249 |  | Sudan |  
250 |  | Rwanda |  
251 |  | Ethiopia |  
252 |  | Somalia |  
253 |  | Djibouti |  
254 |  | Kenya |  
255 |  | Tanzania and Zanzibar |  
256 |  | Uganda |  
257 |  | Burundi |  
258 |  | Mozambique |  
260 |  | Zambia |  
261 |  | Madagascar |  
262 |  | Réunion and Moyette |  
263 |  | Zimbabwe |  
264 |  | Namibia |  
265 |  | Malawi |  
266 |  | Lesotho |  
267 |  | Botswana |  
268 |  | Eswatini |  
269 |  | Comoros |  
27 |  | South Africa |  
290 |  | Saint Helena and Tristan da Cunha |  
291 |  | Eritrea |  
297 |  | Aruba |  
298 |  | Faroe Islands |  
299 |  | Greenland |  
30 |  | Greece |  
31 |  | Netherlands |  
32 |  | Belgium |  
33 |  | France |  
34 |  | Spain |  
350 |  | Gibraltar |  
351 |  | Portugal |  
352 |  | Luxembourg |  
353 |  | Ireland |  
354 |  | Iceland |  
355 |  | Albania |  
356 |  | Malta |  
357 |  | Cyprus |  
358 |  | Finland and Åland Islands |  
359 |  | Bulgaria |  
36 |  | Hungary |  
370 |  | Lithuania |  
371 |  | Latvia |  
372 |  | Estonia |  
373 |  | Moldova |  
374 |  | Armenia and Artsakh |  
375 |  | Belarus |  
376 |  | Andorra |  
377 |  | Monaco |  
378 |  | San Marino |  
380 |  | Ukraine |  
381 |  | Serbia |  
382 |  | Montenegro |  
383 |  | Kosovo |  
385 |  | Croatia |  
386 |  | Slovenia |  
387 |  | Bosnia and Herzegovina |  
389 |  | North Macedonia |  
39 |  | Italy and Vatican City |  
40 |  | Romania |  
41 |  |  Switzerland |  
420 |  | Czech Republic |  
421 |  | Slovakia |  
423 |  | Liechtenstein |  
43 |  | Austria |  
44 |  | United Kingdom, Guernsey, Jersey and Isle of Man |  
45 |  | Denmark |  
46 |  | Sweden |  
47 |  | Norway and Svalbard |  
48 |  | Poland |  
49 |  | Germany |  
500 |  | Falkland Islands, South Georgia and the South Sandwich Islands |  
501 |  | Belize |  
502 |  | Guatemala |  
503 |  | El Salvador |  
504 |  | Honduras |  
505 |  | Nicaragua |  
506 |  | Costa Rica |  
507 |  | Panama |  
508 |  | Saint-Pierre and Miquelon |  
509 |  | Haiti |  
51 |  | Peru |  
52 |  | Mexico |  
53 |  | Cuba |  
54 |  | Argentina |  
55 |  | Brazil |  
56 |  | Chile |  
57 |  | Colombia |  
58 |  | Venezuela |  
590 |  | Guadeloupe, Saint Barthélemy and Saint Martin |  
591 |  | Bolivia |  
592 |  | Guyana |  
593 |  | Ecuador |  
594 |  | French Guiana |  
595 |  | Paraguay |  
596 |  | Martinique |  
597 |  | Suriname |  
598 |  | Uruguay |  
599 |  | Sint Eustatius, Saba, Bonaire, Curaçao |  
60 |  | Malaysia |  
61 |  | Australia, Cocos Islands and Christmas Island |  
62 |  | Indonesia |  
63 |  | Philippines |  
64 |  | New Zealand and Pitcairn Islands |  
65 |  | Singapore |  
66 |  | Thailand |  
670 |  | East Timor |  
672 |  | Australian External Territories, Australian Antarctic Territory and Norfolk Island |  
673 |  | Brunei |  
674 |  | Nauru |  
675 |  | Papua New Guinea |  
676 |  | Tonga |  
677 |  | Solomon Islands |  
678 |  | Vanuatu |  
679 |  | Fiji |  
680 |  | Palau |  
681 |  | Wallis and Futuna |  
682 |  | Cook Islands |  
683 |  | Niue |  
685 |  | Samoa |  
686 |  | Kiribati |  
687 |  | New Caledonia |  
688 |  | Tuvalu |  
689 |  | French Polynesia |  
690 |  | Tokelau |  
691 |  | Federated States of Micronesia |  
692 |  | Marshall Islands |  
7 |  | Russia, Kazakhstan and Abkhazia |  
800 |  | International Freephone (UIFN) |  
808 |  | Shared Cost Services |  
81 |  | Japan |  
82 |  | South Korea |  
84 |  | Vietnam |  
850 |  | North Korea |  
852 |  | Hong Kong |  
853 |  | Macau |  
855 |  | Cambodia |  
856 |  | Laos |  
86 |  | China |  
870 |  | Inmarsat (SNAC) Service |  
875 |  | Maritime Mobile Service |  
876 |  | Maritime Mobile Service |  
877 |  | Maritime Mobile Service |  
878 |  | Universal Personal Telecommunications Services |  
879 |  | National Non-Commercial Purposes |  
880 |  | Bangladesh |  
881 |  | Global Mobile Satellite System |  
882 |  | International Networks |  
883 |  | International Networks |  
886 |  | Taiwan |  
888 |  | Telecommunications for Disaster Relief by OCHA |  
90 |  | Turkey and Northern Cyprus |  
91 |  | India |  
92 |  | Pakistan, Azad Kashmir and Gilgit Baltistan |  
93 |  | Afghanistan |  
94 |  | Sri Lanka |  
95 |  | Myanmar |  
960 |  | Maldives |  
961 |  | Lebanon |  
962 |  | Jordan |  
963 |  | Syria |  
964 |  | Iraq |  
965 |  | Kuwait |  
966 |  | Saudi Arabia |  
967 |  | Yemen |  
968 |  | Oman |  
970 |  | Palestine |  
971 |  | United Arab Emirates |  
972 |  | Israel |  
973 |  | Bahrain |  
974 |  | Qatar |  
975 |  | Bhutan |  
976 |  | Mongolia |  
977 |  | Nepal |  
979 |  | International Premium Rate Service |  
98 |  | Iran |  
991 |  | International Telecommunications Public Correspondence Service Trial (ITPCS) |  
992 |  | Tajikistan |  
993 |  | Turkmenistan |  
994 |  | Azerbaijan |  
995 |  | Georgia, South Ossetia and Abkhazia |  
996 |  | Kyrgyzstan |  
997 |  | Unused | *Deprecated: This code is not used*<br /> 
998 |  | Uzbekistan |  
999 |  | Global service |  

  

## Country Code

**kind**: enum\
**name**: countryCode\
**uri**: https://jsonotron.org/jss/countryCode

A country designator from ISO 3166.  The data is taken from https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
af |  | Afghanistan |  
ax |  | Åland Islands |  
al |  | Albania |  
dz |  | Algeria |  
as |  | American Samoa |  
ad |  | Andorra |  
ao |  | Angola |  
ai |  | Anguilla |  
aq |  | Antarctica |  
ag |  | Antigua and Barbuda |  
ar |  | Argentina |  
am |  | Armenia |  
aw |  | Aruba |  
au |  | Australia |  
at |  | Austria |  
az |  | Azerbaijan |  
bs |  | Bahamas (the) |  
bh |  | Bahrain |  
bd |  | Bangladesh |  
bb |  | Barbados |  
by |  | Belarus |  
be |  | Belgium |  
bz |  | Belize |  
bj |  | Benin |  
bm |  | Bermuda |  
bt |  | Bhutan |  
bo |  | Bolivia (Plurinational State of) |  
ba |  | Bosnia and Herzegovina |  
bw |  | Botswana |  
bv |  | Bouvet Island |  
br |  | Brazil |  
io |  | British Indian Ocean Territory (the) |  
bn |  | Brunei Darussalam |  
bg |  | Bulgaria |  
bf |  | Burkina Faso |  
bi |  | Burundi |  
cv |  | Cabo Verde |  
kh |  | Cambodia |  
cm |  | Cameroon |  
ca |  | Canada |  
ky |  | Cayman Islands (the) |  
cf |  | Central African Republic (the) |  
td |  | Chad |  
cl |  | Chile |  
cn |  | China |  
cx |  | Christmas Island |  
cc |  | Cocos (Keeling) Islands (the) |  
co |  | Colombia |  
km |  | Comoros (the) |  
cd |  | Congo (the Democratic Republic of the) |  
cg |  | Congo (the) |  
ck |  | Cook Islands (the) |  
cr |  | Costa Rica |  
ci |  | Côte d"Ivoire |  
hr |  | Croatia |  
cu |  | Cuba |  
cw |  | Curaçao |  
cy |  | Cyprus |  
cz |  | Czechia |  
dk |  | Denmark |  
dj |  | Djibouti |  
dm |  | Dominica |  
do |  | Dominican Republic (the) |  
ec |  | Ecuador |  
eg |  | Egypt |  
sv |  | El Salvador |  
gq |  | Equatorial Guinea |  
er |  | Eritrea |  
ee |  | Estonia |  
sz |  | Eswatini |  
et |  | Ethiopia |  
fk |  | Falkland Islands (the) |  
fo |  | Faroe Islands (the) |  
fj |  | Fiji |  
fi |  | Finland |  
fr |  | France |  
gf |  | French Guiana |  
pf |  | French Polynesia |  
tf |  | French Southern Territories (the) |  
ga |  | Gabon |  
gm |  | Gambia (the) |  
ge |  | Georgia |  
de |  | Germany |  
gh |  | Ghana |  
gi |  | Gibraltar |  
gr |  | Greece |  
gl |  | Greenland |  
gd |  | Grenada |  
gp |  | Guadeloupe |  
gu |  | Guam |  
gt |  | Guatemala |  
gg |  | Guernsey |  
gn |  | Guinea |  
gw |  | Guinea-Bissau |  
gy |  | Guyana |  
ht |  | Haiti |  
hm |  | Heard Island and McDonald Islands |  
va |  | Holy See (the) |  
hn |  | Honduras |  
hk |  | Hong Kong |  
hu |  | Hungary |  
is |  | Iceland |  
in |  | India |  
id |  | Indonesia |  
ir |  | Iran (Islamic Republic of) |  
iq |  | Iraq |  
ie |  | Ireland |  
im |  | Isle of Man |  
il |  | Israel |  
it |  | Italy |  
jm |  | Jamaica |  
jp |  | Japan |  
je |  | Jersey |  
jo |  | Jordan |  
kz |  | Kazakhstan |  
ke |  | Kenya |  
ki |  | Kiribati |  
kp |  | Korea (the Democratic People"s Republic of) |  
kr |  | Korea (the Republic of) |  
kw |  | Kuwait |  
kg |  | Kyrgyzstan |  
la |  | Lao People"s Democratic Republic (the) |  
lv |  | Latvia |  
lb |  | Lebanon |  
ls |  | Lesotho |  
lr |  | Liberia |  
ly |  | Libya |  
li |  | Liechtenstein |  
lt |  | Lithuania |  
lu |  | Luxembourg |  
mo |  | Macao  |  
mk |  | North Macedonia |  
mg |  | Madagascar |  
mw |  | Malawi |  
my |  | Malaysia |  
mv |  | Maldives |  
ml |  | Mali |  
mt |  | Malta |  
mh |  | Marshall Islands (the) |  
mq |  | Martinique |  
mr |  | Mauritania |  
mu |  | Mauritius |  
yt |  | Mayotte |  
mx |  | Mexico |  
fm |  | Micronesia (Federated States of) |  
md |  | Moldova (the Republic of) |  
mc |  | Monaco |  
mn |  | Mongolia |  
me |  | Montenegro |  
ms |  | Montserrat |  
ma |  | Morocco |  
mz |  | Mozambique |  
mm |  | Myanmar |  
na |  | Namibia |  
nr |  | Nauru |  
np |  | Nepal |  
nl |  | Netherlands (the) |  
nc |  | New Caledonia |  
nz |  | New Zealand |  
ni |  | Nicaragua |  
ne |  | Niger (the) |  
ng |  | Nigeria |  
nu |  | Niue |  
nf |  | Norfolk Island |  
mp |  | Northern Mariana Islands (the) |  
no |  | Norway |  
om |  | Oman |  
pk |  | Pakistan |  
pw |  | Palau |  
ps |  | Palestine, State of |  
pa |  | Panama |  
pg |  | Papua New Guinea |  
py |  | Paraguay |  
pe |  | Peru |  
ph |  | Philippines (the) |  
pn |  | Pitcairn |  
pl |  | Poland |  
pt |  | Portugal |  
pr |  | Puerto Rico |  
qa |  | Qatar |  
re |  | Réunion |  
ro |  | Romania |  
ru |  | Russian Federation (the) |  
rw |  | Rwanda |  
bl |  | Saint Barthélemy |  
kn |  | Saint Kitts and Nevis |  
lc |  | Saint Lucia |  
mf |  | Saint Martin (French part) |  
pm |  | Saint Pierre and Miquelon |  
vc |  | Saint Vincent and the Grenadines |  
ws |  | Samoa |  
sm |  | San Marino |  
st |  | Sao Tome and Principe |  
sa |  | Saudi Arabia |  
sn |  | Senegal |  
rs |  | Serbia |  
sc |  | Seychelles |  
sl |  | Sierra Leone |  
sg |  | Singapore |  
sx |  | Sint Maarten (Dutch part) |  
sk |  | Slovakia |  
si |  | Slovenia |  
sb |  | Solomon Islands |  
so |  | Somalia |  
za |  | South Africa |  
gs |  | South Georgia and the South Sandwich Islands |  
ss |  | South Sudan |  
es |  | Spain |  
lk |  | Sri Lanka |  
sd |  | Sudan (the) |  
sr |  | Suriname |  
se |  | Sweden |  
ch |  | Switzerland |  
sy |  | Syrian Arab Republic (the) |  
tw |  | Taiwan (Province of China) |  
tj |  | Tajikistan |  
tz |  | Tanzania, the United Republic of |  
th |  | Thailand |  
tl |  | Timor-Leste |  
tg |  | Togo |  
tk |  | Tokelau |  
to |  | Tonga |  
tt |  | Trinidad and Tobago |  
tn |  | Tunisia |  
tr |  | Turkey |  
tm |  | Turkmenistan |  
tc |  | Turks and Caicos Islands (the) |  
tv |  | Tuvalu |  
ug |  | Uganda |  
ua |  | Ukraine |  
ae |  | United Arab Emirates (the) |  
gb |  | United Kingdom of Great Britain and Northern Ireland (the) |  
um |  | United States Minor Outlying Islands (the) |  
us |  | United States of America (the) |  
uy |  | Uruguay |  
uz |  | Uzbekistan |  
vu |  | Vanuatu |  
ve |  | Venezuela (Bolivarian Republic of) |  
vn |  | Viet Nam |  
vg |  | Virgin Islands (British) |  
vi |  | Virgin Islands (U.S.) |  
wf |  | Wallis and Futuna |  
eh |  | Western Sahara |  
ye |  | Yemen |  
zm |  | Zambia |  
zw |  | Zimbabwe |  

  

## Currency Code

**kind**: enum\
**name**: currencyCode\
**uri**: https://jsonotron.org/jss/currencyCode

A currency designator from ISO 4217.  The data is taken from https://en.wikipedia.org/wiki/ISO_4217.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
aed | د.إ | United Arab Emirates Dirham |  
afn | AFN | Afghan Afghani |  
all | ALL | Albanian Lek |  
amd | AMD | Armenian Dram |  
ang | ANG | Netherlands Antillean Guilder |  
aoa | AOA | Angolan Kwanza |  
ars | ARS | Argentine Peso |  
aud | $ | Australian Dollar |  
awg | AWG | Aruban Florin |  
azn | AZN | Azerbaijani Manat |  
bam | BAM | Bosnia and Herzegovina Convertible Mark |  
bbd | BBD | Barbados Dollar |  
bdt | ৳ | Bangladeshi Taka |  
bgn | лв | Bulgarian Lev |  
bhd | BHD | Bahraini Dinar |  
bif | BIF | Burundian Franc |  
bmd | BMD | Bermudian Dollar |  
bnd | BND | Brunei Dollar |  
bob | BOB | Boliviano |  
bov | BOV | Bolivian Mvdol (funds code) |  
brl | R$ | Brazilian Real |  
bsd | BSD | Bahamian Dollar |  
btc | ₿ | Bitcoin |  
btn | BTN | Bhutanese Ngultrum |  
bwp | BWP | Botswana Pula |  
byn | BYN | Belarusian Ruble |  
bzd | BZD | Belize Dollar |  
cad | $ | Canadian Dollar |  
cdf | CDF | Congolese Franc |  
che | € | WIR Euro |  
chf | CHF | Swiss Franc |  
chw | CHW | WIR Franc |  
clf | CLF | Unidad de Fomento (funds code) |  
clp | $ | Chilean Peso |  
cny | ¥ | Renminbi (Chinese) Yuan |  
cop | $ | Colombian Peso |  
cou | COU | Unidad de Valor Real (UVR) |  
crc | CRC | Costa Rican Colon |  
cuc | CUC | Cuban convertible Peso |  
cup | CUP | Cuban Peso |  
cve | CVE | Cape Verdean Escudo |  
czk | Kč | Czech Koruna |  
djf | DJF | Djiboutian Franc |  
dkk | kr | Danish Krone |  
dop | DOP | Dominican Peso |  
dzd | DZD | Algerian Dinar |  
egp | EGP | Egyptian Pound |  
ern | ERN | Eritrean Nakfa |  
etb | ETB | Ethiopian Birr |  
eth | Ξ | Etherium |  
eur | € | Euro |  
fjd | FJD | Fiji Dollar |  
fkp | FKP | Falkland Islands Pound |  
gbp | £ | Pound Sterling |  
gel | ₾ | Georgian Lari |  
ghs | GHS | Ghanaian Cedi |  
gip | GIP | Gibraltar Pound |  
gmd | GMD | Gambian Dalasi |  
gnf | GNF | Guinean Franc |  
gtq | GTQ | Guatemalan Quetzal |  
gyd | GYD | Guyanese Dollar |  
hkd | $ | Hong Kong Dollar |  
hnl | HNL | Honduran Lempira |  
hrk | kn | Croatian Kuna |  
htg | HTG | Haitian Gourde |  
huf | ft | Hungarian Forint |  
idr | Rp | Indonesian Rupiah |  
ils | ₪ | Israeli New Shekel |  
inr | ₹ | Indian Rupee |  
iqd | IQD | Iraqi Dinar |  
irr | IRR | Iranian Rial |  
isk | ISK | Icelandic Króna |  
jmd | JMD | Jamaican Dollar |  
jod | JOD | Jordanian Dinar |  
jpy | ¥ | Japanese Yen |  
kes | Ksh | Kenyan Shilling |  
kgs | KGS | Kyrgyzstani Som |  
khr | KHR | Cambodian Riel |  
kmf | KMF | Comoro Franc |  
kpw | $KPW | North Korean Won |  
krw | ₩ | South Korean Won |  
kwd | KWD | Kuwaiti Dinar |  
kyd | KYD | Cayman Islands Dollar |  
kzt | KZT | Kazakhstani Tenge |  
lak | LAK | Lao Kip |  
lbp | LBP | Lebanese Pound |  
lkr | Rs | Sri Lankan Rupee |  
lrd | LRD | Liberian Dollar |  
lsl | LDL | Lesotho Loti |  
ltc | Ł | Litecoin |  
lyd | LYD | Libyan Dinar |  
mad | .د.م | Moroccan Dirham |  
mdl | MDL | Moldovan Leu |  
mga | MGA | Malagasy Ariary |  
mkd | MKD | Macedonian Denar |  
mmk | MMK | Myanmar Kyat |  
mnt | MNT | Mongolian Tögrög |  
mop | MOP | Macanese Pataca |  
mru | MRU | Mauritanian Ouguiya |  
mur | MUR | Mauritian Rupee |  
mvr | MVR | Maldivian Rufiyaa |  
mwk | MWK | Malawian Kwacha |  
mxn | $ | Mexican Peso |  
mxv | MXV | Mexican Unidad de Inversion (UDI) |  
myr | RM | Malaysian Ringgit |  
mzn | MZN | Mozambican Metical |  
nad | NAD | Namibian Dollar |  
ngn | ₦ | Nigerian Naira |  
nio | NIO | Nicaraguan Córdoba |  
nok | kr | Norwegian Krone |  
npr | NPR | Nepalese Rupee |  
nzd | $ | New Zealand Dollar |  
omr | OMR | Omani Rial |  
pab | PAB | Panamanian Balboa |  
pen | S/. | Peruvian Sol |  
pgk | PGK | Papua New Guinean Kina |  
php | ₱ | Philippine Peso |  
pkr | Rs | Pakistani Rupee |  
pln | zł | Polish Złoty |  
pyg | PYG | Paraguayan Guaraní |  
qar | QAR | Qatari Riyal |  
ron | lei | Romanian Leu |  
rsd | RSD | Serbian Dinar |  
rub | ₽ | Russian Ruble |  
rwf | RWF | Rwandan Franc |  
sar | SAR | Saudi Riyal |  
sbd | SBD | Solomon Islands Dollar |  
scr | SCR | Seychelles Rupee |  
sdg | SDG | Sudanese Pound |  
sek | kr | Swedish Krona/Kronor |  
sgd | $ | Singapore Dollar |  
shp | SHP | Saint Helena Pound |  
sll | SLL | Sierra Leonean Leone |  
sos | SOS | Somali Shilling |  
srd | SRD | Surinamese Dollar |  
ssp | SSP | South Sudanese Pound |  
stn | STN | São Tomé and Príncipe Dobra |  
svc | SVC | Salvadoran Colón |  
syp | SYP | Syrian Pound |  
szl | SZL | Swazi Lilangeni |  
thb | ฿ | Thai Baht |  
tjs | TJS | Tajikistani Somoni |  
tmt | TMT | Turkmenistan Manat |  
tnd | TND | Tunisian Dinar |  
top | TOP | Tongan Paʻanga |  
try | ₺ | Turkish Lira |  
ttd | TTD | Trinidad and Tobago Dollar |  
twd | TWD | New Taiwan Dollar |  
tzs | TZS | Tanzanian Shilling |  
uah | ₴ | Ukrainian Hryvnia |  
ugx | UGX | Ugandan Shilling |  
usd | $ | United States Dollar |  
usn | $ | United States Dollar (next day) |  
uyi | UYI | Uruguay Peso en Unidades Indexadas (URUIURUI) |  
uyu | UYU | Uruguayan Peso |  
uyw | UYW | Unidad Previsional |  
uzs | UZS | Uzbekistan Som |  
ves | VES | Venezuelan Bolívar Soberano |  
vnd | ₫ | Vietnamese Dồng |  
vuv | VUV | Vanuatu Vatu |  
wst | WST | Samoan Tala |  
xaf | XAF | CFA franc BEAC |  
xag | XAG | Silver (one troy ounce) |  
xau | XAU | Gold (one troy ounce) |  
xba | XBA | European Composite Unit (EURCO) |  
xbb | XBB | European Monetary Unit (E.M.U.-6) |  
xbc | XBC | European Unit of Account 9 (E.U.A.-9) |  
xbd | XBD | European Unit of Account 17 (E.U.A.-17) |  
xcd | XCD | East Caribbean Dollar |  
xdr | XDR | Special Drawing Rights |  
xmr | ɱ | Monero |  
xof | XOF | CFA Franc BCEAO |  
xpd | XPD | Palladium (one troy ounce) |  
xpf | XPF | CFP Franc (franc Pacifique) |  
xpt | XPT | Platinum (one troy ounce) |  
xrp | XRP | Ripples |  
xsu | XSU | SUCRE |  
xts | XTS | Code Reserved for Testing |  
xua | XUA | ADB Unit of Account |  
xxx | XXX | No Currency |  
yer | YER | Yemeni Rial |  
zar | R | South African Rand |  
zmw | ZMW | Zambian Kwacha |  
zwl | ZWL | Zimbabwean Dollar |  

  

## Date

**kind**: schema\
**name**: date\
**uri**: https://jsonotron.org/jss/date

A string with the date components arranged using the YYYY-MM-DD pattern.  If the day or month component is a value less than 10 then a leading zero must be included.  This ensures that all stored dates are the same length.

### Example 1

An example.

```json
"2007-09-25"
```


### Schema as JSON


```json
{
  "type": "string",
  "format": "date"
}
```


### Schema as YAML


```yaml
type: string
format: date

```


  

## Date & Time Local

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
  "timeZone": "europe/london",
  "captured": 1563119540628
}
```


### Schema as JSON


```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "dateTime": {
      "type": "string",
      "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[+][0-9]{2}:[0-9]{2}$",
      "format": "jsonotron-dateTimeLocal"
    },
    "timeZone": {
      "$ref": "timeZone"
    },
    "captured": {
      "$ref": "timestamp"
    }
  },
  "required": [
    "dateTime",
    "timeZone",
    "captured"
  ]
}
```


### Schema as YAML


```yaml
type: object
additionalProperties: false
properties:
  dateTime:
    type: string
    pattern: >-
      ^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[+][0-9]{2}:[0-9]{2}$
    format: jsonotron-dateTimeLocal
  timeZone:
    $ref: timeZone
  captured:
    $ref: timestamp
required:
  - dateTime
  - timeZone
  - captured

```


  

## Date & Time UTC

**kind**: schema\
**name**: dateTimeUtc\
**uri**: https://jsonotron.org/jss/dateTimeUtc

A string with the date and time components arranged using the YYYY-MM-DDTHH:mm:ssZ pattern. Leading zeroes must be used to ensure that all values are the same length.

### Example 1

An example.

```json
"2014-09-15T23:59:25Z"
```


### Schema as JSON


```json
{
  "type": "string",
  "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$",
  "format": "jsonotron-dateTimeUtc"
}
```


### Schema as YAML


```yaml
type: string
pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$'
format: jsonotron-dateTimeUtc

```


  

## Day of Week

**kind**: enum\
**name**: dayOfWeek\
**uri**: https://jsonotron.org/jss/dayOfWeek

A day of the week.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
su |  | Sunday |  
mo |  | Monday |  
tu |  | Tuesday |  
we |  | Wednesday |  
th |  | Thursday |  
fr |  | Friday |  
sa |  | Saturday |  

  

## Email Address

**kind**: schema\
**name**: emailAddress\
**uri**: https://jsonotron.org/jss/emailAddress

An email address.

### Example 1

An example.

```json
"anon@gmail.com"
```


### Schema as JSON


```json
{
  "type": "string",
  "format": "email"
}
```


### Schema as YAML


```yaml
type: string
format: email

```


  

## Floating Point Number

**kind**: schema\
**name**: float\
**uri**: https://jsonotron.org/jss/float

A number with an integral and decimal part.

### Example 1

An example.

```json
3.14
```


### Schema as JSON


```json
{
  "type": "number"
}
```


### Schema as YAML


```yaml
type: number

```


  

## GeoJSON Point

**kind**: schema\
**name**: geoJsonPoint\
**uri**: https://jsonotron.org/jss/geoJsonPoint

A point on Earth.

### Example 1

A position on Earth recorded in GeoJSON format expressed as a longitude and latitude pair.
The properties should be supplied in the correct order, longitude first and latitude second.

```json
{
  "type": "Point",
  "coordinates": [
    31.9,
    -4.8
  ]
}
```


### Schema as JSON


```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "type": {
      "enum": [
        "Point"
      ]
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
      ]
    }
  },
  "required": [
    "type",
    "coordinates"
  ]
}
```


### Schema as YAML


```yaml
type: object
additionalProperties: false
properties:
  type:
    enum:
      - Point
  coordinates:
    type: array
    minItems: 2
    maxItems: 2
    items:
      - type: number
        minimum: -180
        maximum: 180
      - type: number
        minimum: -90
        maximum: 90
required:
  - type
  - coordinates

```


  

## GeoJSON Polygon

**kind**: schema\
**name**: geoJsonPolygon\
**uri**: https://jsonotron.org/jss/geoJsonPolygon

A boundary of connected points that encompasses a region on Earth.  The co-ordinates must be specified in a counter-clockwise direction.  The last co-ordinate should be a duplicate of the first co-ordinate.  This means the minimum number of elements in the co-ordinate array is 4.

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


### Schema as JSON


```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "type": {
      "enum": [
        "Polygon"
      ]
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
      }
    }
  },
  "required": [
    "type",
    "coordinates"
  ]
}
```


### Schema as YAML


```yaml
type: object
additionalProperties: false
properties:
  type:
    enum:
      - Polygon
  coordinates:
    type: array
    minItems: 4
    items:
      type: array
      minItems: 2
      maxItems: 2
      items:
        - type: number
          minimum: -180
          maximum: 180
        - type: number
          minimum: -90
          maximum: 90
required:
  - type
  - coordinates

```


  

## Huge String

**kind**: schema\
**name**: hugeString\
**uri**: https://jsonotron.org/jss/hugeString

A string of 4000 characters or less.  An empty string is valid.

### Example 1

An example.

```json
"A very long paragraph about an interesting subject..."
```


### Schema as JSON


```json
{
  "type": "string",
  "maxLength": 4000
}
```


### Schema as YAML


```yaml
type: string
maxLength: 4000

```


  

## Integer

**kind**: schema\
**name**: integer\
**uri**: https://jsonotron.org/jss/integer

A whole number.

### Example 1

An example.

```json
365
```


### Schema as JSON


```json
{
  "type": "integer"
}
```


### Schema as YAML


```yaml
type: integer

```


  

## IP Version 4

**kind**: schema\
**name**: ipv4\
**uri**: https://jsonotron.org/jss/ipv4

A string of digits that identify a computer on a network in IP v4 format.

### Example 1

An example.

```json
"127.0.0.1"
```


### Schema as JSON


```json
{
  "type": "string",
  "format": "ipv4"
}
```


### Schema as YAML


```yaml
type: string
format: ipv4

```


  

## IP Version 6

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


### Schema as JSON


```json
{
  "type": "string",
  "format": "ipv6"
}
```


### Schema as YAML


```yaml
type: string
format: ipv6

```


  

## JSON Pointer

**kind**: schema\
**name**: jsonPointer\
**uri**: https://jsonotron.org/jss/jsonPointer

A JSON pointer.

### Example 1

An example.

```json
"/root/tree/branch/leaf"
```


### Schema as JSON


```json
{
  "type": "string",
  "format": "json-pointer"
}
```


### Schema as YAML


```yaml
type: string
format: json-pointer

```


  

## Language Code

**kind**: enum\
**name**: languageCode\
**uri**: https://jsonotron.org/jss/languageCode

A language code conforming to the from ISO 639-1 standard.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
af |  | Afrikaans |  
ar |  | Arabic |  
ar-dz |  | Arabic (Algeria) |  
ar-bh |  | Arabic (Bahrain) |  
ar-eg |  | Arabic (Egypt) |  
ar-iq |  | Arabic (Iraq) |  
ar-jo |  | Arabic (Jordan) |  
ar-kw |  | Arabic (Kuwait) |  
ar-lb |  | Arabic (Lebanon) |  
ar-ly |  | Arabic (Libya) |  
ar-ma |  | Arabic (Morocco) |  
ar-om |  | Arabic (Oman) |  
ar-qa |  | Arabic (Qatar) |  
ar-sa |  | Arabic (Saudi Arabia) |  
ar-sy |  | Arabic (Syria) |  
ar-tn |  | Arabic (Tunisia) |  
ar-ae |  | Arabic (U.A.E.) |  
ar-ye |  | Arabic (Yemen) |  
be |  | Belarusian |  
bg |  | Bulgarian |  
ca |  | Catalan |  
cy |  | Welsh |  
cs |  | Czech |  
da |  | Danish |  
de |  | German |  
de-at |  | German (Austria) |  
de-ch |  | German (Switzerland) |  
de-de |  | German (Germany) |  
de-li |  | German (Liechtenstein) |  
de-lu |  | German (Luxembourg) |  
el |  | Greek |  
en |  | English |  
en-au |  | English (Australia) |  
en-bz |  | English (Belize) |  
en-ca |  | English (Canada) |  
en-gb |  | English (United Kingdom) |  
en-ie |  | English (Ireland) |  
en-jm |  | English (Jamaica) |  
en-nz |  | English (New Zealand) |  
en-za |  | English (South Africa) |  
en-tt |  | English (Trinidad) |  
en-us |  | English (United States) |  
es |  | Spanish |  
es-ar |  | Spanish (Argentina) |  
es-bo |  | Spanish (Bolivia) |  
es-cl |  | Spanish (Chile) |  
es-co |  | Spanish (Colombia) |  
es-cr |  | Spanish (Costa Rica) |  
es-do |  | Spanish (Dominican Republic) |  
es-ec |  | Spanish (Ecuador) |  
es-es |  | Spanish (Spain) |  
es-gt |  | Spanish (Guatemala) |  
es-hn |  | Spanish (Honduras) |  
es-mx |  | Spanish (Mexico) |  
es-ni |  | Spanish (Nicaragua) |  
es-pa |  | Spanish (Panama) |  
es-py |  | Spanish (Paraguay) |  
es-pe |  | Spanish (Peru) |  
es-pr |  | Spanish (Puerto Rico) |  
es-sv |  | Spanish (El Salvador) |  
es-uy |  | Spanish (Uruguay) |  
es-ve |  | Spanish (Venezuela) |  
et |  | Estonian |  
eu |  | Basque |  
fa |  | Farsi |  
fi |  | Finnish |  
fo |  | Faeroese |  
fr |  | French |  
fr-be |  | French (Belgium) |  
fr-ca |  | French (Canada) |  
fr-ch |  | French (Switzerland) |  
fr-fr |  | French (France) |  
fr-lu |  | French (Luxembourg) |  
ga |  | Irish |  
gd |  | Gaelic |  
he |  | Hebrew |  
hi |  | Hindi |  
hr |  | Croatian |  
hu |  | Hungarian |  
is |  | Icelandic |  
id |  | Indonesian |  
it |  | Italian |  
it-ch |  | Italian (Switzerland) |  
it-it |  | Italian (Italy) |  
ja |  | Japanese |  
ko |  | Korean |  
ku |  | Kurdish |  
lv |  | Latvian |  
lt |  | Lithuanian |  
mk |  | Macedonian (FYROM) |  
ml |  | Malayalam |  
ms |  | Malaysian |  
mt |  | Maltese |  
nb |  | Norwegian (Bokmål) |  
nl |  | Dutch |  
nl-be |  | Dutch (Belgium) |  
nn |  | Norwegian (Nynorsk) |  
no |  | Norwegian |  
pl |  | Polish |  
pa |  | Punjabi |  
pt |  | Portuguese |  
pt-pt |  | Portuguese (Portugal) |  
pt-br |  | Portuguese (Brazil) |  
rm |  | Rhaeto-Romanic |  
ro |  | Romanian |  
ro-ro |  | Romanian (Romania) |  
ro-md |  | Romanian (Republic of Moldova) |  
ru |  | Russian |  
ru-ru |  | Russian (Russia) |  
ru-md |  | Russian (Republic of Moldova) |  
sb |  | Sorbian |  
sk |  | Slovak |  
sl |  | Slovenian |  
sq |  | Albanian |  
sr |  | Serbian |  
sv |  | Swedish |  
sv-sv |  | Swedish (Sweden) |  
sv-fi |  | Swedish (Finland) |  
th |  | Thai |  
ts |  | Tsonga |  
tn |  | Tswana |  
tr |  | Turkish |  
uk |  | Ukrainian |  
ur |  | Urdu |  
ve |  | Venda |  
vi |  | Vietnamese |  
xh |  | Xhosa |  
yi |  | Yiddish |  
zh-hk |  | Chinese (Hong Kong) |  
zh-cn |  | Chinese (PRC) |  
zh-sg |  | Chinese (Singapore) |  
zh-tw |  | Chinese (Taiwan) |  
zu |  | Zulu |  

  

## Long String

**kind**: schema\
**name**: longString\
**uri**: https://jsonotron.org/jss/longString

A string of 250 characters or less.  An empty string is valid.

### Example 1

An example.

```json
"A long string that contains a lot of characters"
```


### Schema as JSON


```json
{
  "type": "string",
  "maxLength": 250
}
```


### Schema as YAML


```yaml
type: string
maxLength: 250

```


  

## Medium String

**kind**: schema\
**name**: mediumString\
**uri**: https://jsonotron.org/jss/mediumString

A string of 50 characters or less.  An empty string is valid.

### Example 1

An example.

```json
"A string that contains some characters"
```


### Schema as JSON


```json
{
  "type": "string",
  "maxLength": 50
}
```


### Schema as YAML


```yaml
type: string
maxLength: 50

```


  

## Money

**kind**: schema\
**name**: money\
**uri**: https://jsonotron.org/jss/money

An amount of money designated in a specific currency.

The `amount` property stores an integral amount of money.  This should include the minor denomination.  For
example, in American the currency is dollars and cents.  Typically monetary values
should be recorded in cents.

The `scaler` property indicates how many places we
need to move the decimal place to convert from the minor to the major currency.  The
use of a scaler ensures that monetary amounts are stored as integers rather than
floats.  This makes it easier to work with monetary amounts; for example, equality
checks on integers are reliable whereas equality checks on floating point numbers
are subject to many intracies depending on the platform used.

The `currency` propertyis a currencyCode value.

### Example 1

In this example the scaler of 2 means that we shift the decimal point 2 places to the left.  So 9999 becomes 99.99 for display.

```json
{
  "amount": 9999,
  "scaler": 2,
  "currency": "gbp"
}
```


### Schema as JSON


```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "amount": {
      "$ref": "integer"
    },
    "scaler": {
      "$ref": "integer"
    },
    "currency": {
      "$ref": "currencyCode"
    }
  },
  "required": [
    "amount",
    "scaler",
    "currency"
  ]
}
```


### Schema as YAML


```yaml
type: object
additionalProperties: false
properties:
  amount:
    $ref: integer
  scaler:
    $ref: integer
  currency:
    $ref: currencyCode
required:
  - amount
  - scaler
  - currency

```


  

## Month of Year

**kind**: enum\
**name**: monthOfYear\
**uri**: https://jsonotron.org/jss/monthOfYear

A calendar month.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
jan |  | January |  
feb |  | February |  
mar |  | March |  
apr |  | April |  
may |  | May |  
jun |  | June |  
jul |  | July |  
aug |  | August |  
sep |  | September |  
oct |  | October |  
nov |  | November |  
dec |  | December |  

  

## Negative Floating Point Number

**kind**: schema\
**name**: negativeFloat\
**uri**: https://jsonotron.org/jss/negativeFloat

A number with an integral and decimal part that is less than zero.

### Example 1

An example.

```json
-21.09
```


### Schema as JSON


```json
{
  "type": "number",
  "exclusiveMaximum": 0
}
```


### Schema as YAML


```yaml
type: number
exclusiveMaximum: 0

```


  

## Negative Floating Point Number or Zero

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


### Schema as JSON


```json
{
  "type": "number",
  "maximum": 0
}
```


### Schema as YAML


```yaml
type: number
maximum: 0

```


  

## Negative Integer

**kind**: schema\
**name**: negativeInteger\
**uri**: https://jsonotron.org/jss/negativeInteger

A whole number that is equal to -1 or less.

### Example 1

An example.

```json
-9
```


### Schema as JSON


```json
{
  "type": "integer",
  "maximum": -1
}
```


### Schema as YAML


```yaml
type: integer
maximum: -1

```


  

## Negative Integer or Zero

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


### Schema as JSON


```json
{
  "type": "integer",
  "maximum": 0
}
```


### Schema as YAML


```yaml
type: integer
maximum: 0

```


  

## Object

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


### Schema as JSON


```json
{
  "type": "object"
}
```


### Schema as YAML


```yaml
type: object

```


  

## Payment Card Number

**kind**: schema\
**name**: paymentCardNo\
**uri**: https://jsonotron.org/jss/paymentCardNo

A value that uniquely identifies a payment card, such as a credit or debit card.  Any stored value will need to satisfy the LUHN algorithm.

### Example 1

An example.

```json
"4111111111111111"
```


### Schema as JSON


```json
{
  "type": "string",
  "format": "jsonotron-luhn"
}
```


### Schema as YAML


```yaml
type: string
format: jsonotron-luhn

```


  

## Positive Floating Point Number

**kind**: schema\
**name**: positiveFloat\
**uri**: https://jsonotron.org/jss/positiveFloat

A number with an integral and decimal part that is greater than zero.

### Example 1

An example.

```json
12.34
```


### Schema as JSON


```json
{
  "type": "number",
  "exclusiveMinimum": 0
}
```


### Schema as YAML


```yaml
type: number
exclusiveMinimum: 0

```


  

## Positive Floating Point Number or Zero

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


### Schema as JSON


```json
{
  "type": "number",
  "minimum": 0
}
```


### Schema as YAML


```yaml
type: number
minimum: 0

```


  

## Positive Integer

**kind**: schema\
**name**: positiveInteger\
**uri**: https://jsonotron.org/jss/positiveInteger

A whole number that is equal to 1 or greater.

### Example 1

An example.

```json
7
```


### Schema as JSON


```json
{
  "type": "integer",
  "minimum": 1
}
```


### Schema as YAML


```yaml
type: integer
minimum: 1

```


  

## Positive Integer or Zero

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


### Schema as JSON


```json
{
  "type": "integer",
  "minimum": 0
}
```


### Schema as YAML


```yaml
type: integer
minimum: 0

```


  

## Short String

**kind**: schema\
**name**: shortString\
**uri**: https://jsonotron.org/jss/shortString

A string of 20 characters or less.  An empty string is valid.

### Example 1

A short text string.

```json
"A terse string"
```


### Schema as JSON


```json
{
  "type": "string",
  "maxLength": 20
}
```


### Schema as YAML


```yaml
type: string
maxLength: 20

```


  

## String

**kind**: schema\
**name**: string\
**uri**: https://jsonotron.org/jss/string

A string of characters of any length.  Care should be taken not to supply a string of such great length that the underlying data store cannot save it.  An empty string is valid.

### Example 1

An example.

```json
"A string"
```


### Schema as JSON


```json
{
  "type": "string"
}
```


### Schema as YAML


```yaml
type: string

```


  

## Telephone Number

**kind**: schema\
**name**: telephoneNo\
**uri**: https://jsonotron.org/jss/telephoneNo

A telephone number that comprises of a dialling code and a number.

The `isd` property is a callingCode.

The `number` property is a shortString.

### Example 1

In this example we have a UK mobile number.

```json
{
  "isd": "44",
  "number": "7834111222"
}
```

### Example 2

In this example we have a US landline number with an extension.

```json
{
  "isd": "1",
  "number": "5550172",
  "ext": "2209"
}
```


### Schema as JSON


```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "isd": {
      "$ref": "callingCode"
    },
    "number": {
      "$ref": "shortString"
    },
    "ext": {
      "$ref": "shortString"
    }
  },
  "required": [
    "isd",
    "number"
  ]
}
```


### Schema as YAML


```yaml
type: object
additionalProperties: false
properties:
  isd:
    $ref: callingCode
  number:
    $ref: shortString
  ext:
    $ref: shortString
required:
  - isd
  - number

```


  

## Time

**kind**: schema\
**name**: time\
**uri**: https://jsonotron.org/jss/time

A string with the time components arranged using the HH:mm:ss pattern.  If the hours, minutes or seconds component is a value less than 10 then a leading zero must be included.  This ensures that all stored times are the same length.

### Example 1

An example.

```json
"23:14:56"
```


### Schema as JSON


```json
{
  "type": "string",
  "format": "time"
}
```


### Schema as YAML


```yaml
type: string
format: time

```


  

## Timestamp

**kind**: schema\
**name**: timestamp\
**uri**: https://jsonotron.org/jss/timestamp

The number of milliseconds that have elapsed since 00:00:00 Thursday, 1 January 1970.

### Example 1

An example.

```json
1595354428000
```


### Schema as JSON


```json
{
  "type": "integer",
  "minimum": 0
}
```


### Schema as YAML


```yaml
type: integer
minimum: 0

```


  

## Time Zone

**kind**: enum\
**name**: timeZone\
**uri**: https://jsonotron.org/jss/timeZone

A time zone from the IANA tz database.  The data is taken from https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
africa/abidjan |  | Africa/Abidjan (+00:00, DST +00:00) |  
africa/accra |  | Africa/Accra (+00:00, DST +00:00) |  
africa/algiers |  | Africa/Algiers (+01:00, DST +01:00) |  
africa/bissau |  | Africa/Bissau (+00:00, DST +00:00) |  
africa/cairo |  | Africa/Cairo (+02:00, DST +02:00) |  
africa/casablanca |  | Africa/Casablanca (+01:00, DST +01:00) |  
africa/ceuta |  | Africa/Ceuta (+01:00, DST +02:00) |  
africa/el_aaiun |  | Africa/El_Aaiun (+00:00, DST +01:00) |  
africa/johannesburg |  | Africa/Johannesburg (+02:00, DST +02:00) |  
africa/juba |  | Africa/Juba (+03:00, DST +03:00) |  
africa/khartoum |  | Africa/Khartoum (+02:00, DST +02:00) |  
africa/lagos |  | Africa/Lagos (+01:00, DST +01:00) |  
africa/maputo |  | Africa/Maputo (+02:00, DST +02:00) |  
africa/monrovia |  | Africa/Monrovia (+00:00, DST +00:00) |  
africa/nairobi |  | Africa/Nairobi (+03:00, DST +03:00) |  
africa/ndjamena |  | Africa/Ndjamena (+01:00, DST +01:00) |  
africa/tripoli |  | Africa/Tripoli (+02:00, DST +02:00) |  
africa/tunis |  | Africa/Tunis (+01:00, DST +01:00) |  
africa/windhoek |  | Africa/Windhoek (+02:00, DST +02:00) |  
america/adak |  | America/Adak (−10:00, DST −09:00) |  
america/anchorage |  | America/Anchorage (−09:00, DST −08:00) |  
america/araguaina |  | America/Araguaina (−03:00, DST −03:00) |  
america/argentina/buenos_aires |  | America/Argentina/Buenos_Aires (−03:00, DST −03:00) |  
america/argentina/catamarca |  | America/Argentina/Catamarca (−03:00, DST −03:00) |  
america/argentina/cordoba |  | America/Argentina/Cordoba (−03:00, DST −03:00) |  
america/argentina/jujuy |  | America/Argentina/Jujuy (−03:00, DST −03:00) |  
america/argentina/la_rioja |  | America/Argentina/La_Rioja (−03:00, DST −03:00) |  
america/argentina/mendoza |  | America/Argentina/Mendoza (−03:00, DST −03:00) |  
america/argentina/rio_gallegos |  | America/Argentina/Rio_Gallegos (−03:00, DST −03:00) |  
america/argentina/salta |  | America/Argentina/Salta (−03:00, DST −03:00) |  
america/argentina/san_juan |  | America/Argentina/San_Juan (−03:00, DST −03:00) |  
america/argentina/san_luis |  | America/Argentina/San_Luis (−03:00, DST −03:00) |  
america/argentina/tucuman |  | America/Argentina/Tucuman (−03:00, DST −03:00) |  
america/argentina/ushuaia |  | America/Argentina/Ushuaia (−03:00, DST −03:00) |  
america/asuncion |  | America/Asuncion (−04:00, DST −03:00) |  
america/atikokan |  | America/Atikokan (−05:00, DST −05:00) |  
america/bahia |  | America/Bahia (−03:00, DST −03:00) |  
america/bahia_banderas |  | America/Bahia_Banderas (−06:00, DST −05:00) |  
america/barbados |  | America/Barbados (−04:00, DST −04:00) |  
america/belem |  | America/Belem (−03:00, DST −03:00) |  
america/belize |  | America/Belize (−06:00, DST −06:00) |  
america/blanc-sablon |  | America/Blanc-Sablon (−04:00, DST −04:00) |  
america/boa_vista |  | America/Boa_Vista (−04:00, DST −04:00) |  
america/bogota |  | America/Bogota (−05:00, DST −05:00) |  
america/boise |  | America/Boise (−07:00, DST −06:00) |  
america/cambridge_bay |  | America/Cambridge_Bay (−07:00, DST −06:00) |  
america/campo_grande |  | America/Campo_Grande (−04:00, DST −03:00) |  
america/cancun |  | America/Cancun (−05:00, DST −05:00) |  
america/caracas |  | America/Caracas (−04:00, DST −04:00) |  
america/cayenne |  | America/Cayenne (−03:00, DST −03:00) |  
america/chicago |  | America/Chicago (−06:00, DST −05:00) |  
america/chihuahua |  | America/Chihuahua (−07:00, DST −06:00) |  
america/costa_rica |  | America/Costa_Rica (−06:00, DST −06:00) |  
america/creston |  | America/Creston (−07:00, DST −07:00) |  
america/cuiaba |  | America/Cuiaba (−04:00, DST −03:00) |  
america/curacao |  | America/Curacao (−04:00, DST −04:00) |  
america/danmarkshavn |  | America/Danmarkshavn (+00:00, DST +00:00) |  
america/dawson |  | America/Dawson (−08:00, DST −07:00) |  
america/dawson_creek |  | America/Dawson_Creek (−07:00, DST −07:00) |  
america/denver |  | America/Denver (−07:00, DST −06:00) |  
america/detroit |  | America/Detroit (−05:00, DST −04:00) |  
america/edmonton |  | America/Edmonton (−07:00, DST −06:00) |  
america/eirunepe |  | America/Eirunepe (−05:00, DST −05:00) |  
america/el_salvador |  | America/El_Salvador (−06:00, DST −06:00) |  
america/fort_nelson |  | America/Fort_Nelson (−07:00, DST −07:00) |  
america/fortaleza |  | America/Fortaleza (−03:00, DST −03:00) |  
america/glace_bay |  | America/Glace_Bay (−04:00, DST −03:00) |  
america/godthab |  | America/Godthab (−03:00, DST −02:00) |  
america/goose_bay |  | America/Goose_Bay (−04:00, DST −03:00) |  
america/grand_turk |  | America/Grand_Turk (−05:00, DST −04:00) |  
america/guatemala |  | America/Guatemala (−06:00, DST −06:00) |  
america/guayaquil |  | America/Guayaquil (−05:00, DST −05:00) |  
america/guyana |  | America/Guyana (−04:00, DST −04:00) |  
america/halifax |  | America/Halifax (−04:00, DST −03:00) |  
america/havana |  | America/Havana (−05:00, DST −04:00) |  
america/hermosillo |  | America/Hermosillo (−07:00, DST −07:00) |  
america/indiana/indianapolis |  | America/Indiana/Indianapolis (−05:00, DST −04:00) |  
america/indiana/knox |  | America/Indiana/Knox (−06:00, DST −05:00) |  
america/indiana/marengo |  | America/Indiana/Marengo (−05:00, DST −04:00) |  
america/indiana/petersburg |  | America/Indiana/Petersburg (−05:00, DST −04:00) |  
america/indiana/tell_city |  | America/Indiana/Tell_City (−06:00, DST −05:00) |  
america/indiana/vevay |  | America/Indiana/Vevay (−05:00, DST −04:00) |  
america/indiana/vincennes |  | America/Indiana/Vincennes (−05:00, DST −04:00) |  
america/indiana/winamac |  | America/Indiana/Winamac (−05:00, DST −04:00) |  
america/inuvik |  | America/Inuvik (−07:00, DST −06:00) |  
america/iqaluit |  | America/Iqaluit (−05:00, DST −04:00) |  
america/jamaica |  | America/Jamaica (−05:00, DST −05:00) |  
america/juneau |  | America/Juneau (−09:00, DST −08:00) |  
america/kentucky/louisville |  | America/Kentucky/Louisville (−05:00, DST −04:00) |  
america/kentucky/monticello |  | America/Kentucky/Monticello (−05:00, DST −04:00) |  
america/la_paz |  | America/La_Paz (−04:00, DST −04:00) |  
america/lima |  | America/Lima (−05:00, DST −05:00) |  
america/los_angeles |  | America/Los_Angeles (−08:00, DST −07:00) |  
america/maceio |  | America/Maceio (−03:00, DST −03:00) |  
america/managua |  | America/Managua (−06:00, DST −06:00) |  
america/manaus |  | America/Manaus (−04:00, DST −04:00) |  
america/martinique |  | America/Martinique (−04:00, DST −04:00) |  
america/matamoros |  | America/Matamoros (−06:00, DST −05:00) |  
america/mazatlan |  | America/Mazatlan (−07:00, DST −06:00) |  
america/menominee |  | America/Menominee (−06:00, DST −05:00) |  
america/merida |  | America/Merida (−06:00, DST −05:00) |  
america/metlakatla |  | America/Metlakatla (−09:00, DST −08:00) |  
america/mexico_city |  | America/Mexico_City (−06:00, DST −05:00) |  
america/miquelon |  | America/Miquelon (−03:00, DST −02:00) |  
america/moncton |  | America/Moncton (−04:00, DST −03:00) |  
america/monterrey |  | America/Monterrey (−06:00, DST −05:00) |  
america/montevideo |  | America/Montevideo (−03:00, DST −03:00) |  
america/nassau |  | America/Nassau (−05:00, DST −04:00) |  
america/new_york |  | America/New_York (−05:00, DST −04:00) |  
america/nipigon |  | America/Nipigon (−05:00, DST −04:00) |  
america/nome |  | America/Nome (−09:00, DST −08:00) |  
america/noronha |  | America/Noronha (−02:00, DST −02:00) |  
america/north_dakota/beulah |  | America/North_Dakota/Beulah (−06:00, DST −05:00) |  
america/north_dakota/center |  | America/North_Dakota/Center (−06:00, DST −05:00) |  
america/north_dakota/new_salem |  | America/North_Dakota/New_Salem (−06:00, DST −05:00) |  
america/ojinaga |  | America/Ojinaga (−07:00, DST −06:00) |  
america/panama |  | America/Panama (−05:00, DST −05:00) |  
america/pangnirtung |  | America/Pangnirtung (−05:00, DST −04:00) |  
america/paramaribo |  | America/Paramaribo (−03:00, DST −03:00) |  
america/phoenix |  | America/Phoenix (−07:00, DST −07:00) |  
america/port_of_spain |  | America/Port_of_Spain (−04:00, DST −04:00) |  
america/port-au-prince |  | America/Port-au-Prince (−05:00, DST −04:00) |  
america/porto_velho |  | America/Porto_Velho (−04:00, DST −04:00) |  
america/puerto_rico |  | America/Puerto_Rico (−04:00, DST −04:00) |  
america/punta_arenas |  | America/Punta_Arenas (−03:00, DST −03:00) |  
america/rainy_river |  | America/Rainy_River (−06:00, DST −05:00) |  
america/rankin_inlet |  | America/Rankin_Inlet (−06:00, DST −05:00) |  
america/recife |  | America/Recife (−03:00, DST −03:00) |  
america/regina |  | America/Regina (−06:00, DST −06:00) |  
america/resolute |  | America/Resolute (−06:00, DST −05:00) |  
america/rio_branco |  | America/Rio_Branco (−05:00, DST −05:00) |  
america/santarem |  | America/Santarem (−03:00, DST −03:00) |  
america/santiago |  | America/Santiago (−04:00, DST −03:00) |  
america/santo_domingo |  | America/Santo_Domingo (−04:00, DST −04:00) |  
america/sao_paulo |  | America/Sao_Paulo (−03:00, DST −02:00) |  
america/scoresbysund |  | America/Scoresbysund (−01:00, DST +00:00) |  
america/sitka |  | America/Sitka (−09:00, DST −08:00) |  
america/st_johns |  | America/St_Johns (−03:30, DST −02:30) |  
america/swift_current |  | America/Swift_Current (−06:00, DST −06:00) |  
america/tegucigalpa |  | America/Tegucigalpa (−06:00, DST −06:00) |  
america/thule |  | America/Thule (−04:00, DST −03:00) |  
america/thunder_bay |  | America/Thunder_Bay (−05:00, DST −04:00) |  
america/tijuana |  | America/Tijuana (−08:00, DST −07:00) |  
america/toronto |  | America/Toronto (−05:00, DST −04:00) |  
america/vancouver |  | America/Vancouver (−08:00, DST −07:00) |  
america/whitehorse |  | America/Whitehorse (−08:00, DST −07:00) |  
america/winnipeg |  | America/Winnipeg (−06:00, DST −05:00) |  
america/yakutat |  | America/Yakutat (−09:00, DST −08:00) |  
america/yellowknife |  | America/Yellowknife (−07:00, DST −06:00) |  
antarctica/casey |  | Antarctica/Casey (+11:00, DST +11:00) |  
antarctica/davis |  | Antarctica/Davis (+07:00, DST +07:00) |  
antarctica/dumontdurville |  | Antarctica/DumontDUrville (+10:00, DST +10:00) |  
antarctica/macquarie |  | Antarctica/Macquarie (+11:00, DST +11:00) |  
antarctica/mawson |  | Antarctica/Mawson (+05:00, DST +05:00) |  
antarctica/palmer |  | Antarctica/Palmer (−03:00, DST −03:00) |  
antarctica/rothera |  | Antarctica/Rothera (−03:00, DST −03:00) |  
antarctica/syowa |  | Antarctica/Syowa (+03:00, DST +03:00) |  
antarctica/troll |  | Antarctica/Troll (+00:00, DST +02:00) |  
antarctica/vostok |  | Antarctica/Vostok (+06:00, DST +06:00) |  
asia/almaty |  | Asia/Almaty (+06:00, DST +06:00) |  
asia/amman |  | Asia/Amman (+02:00, DST +03:00) |  
asia/anadyr |  | Asia/Anadyr (+12:00, DST +12:00) |  
asia/aqtau |  | Asia/Aqtau (+05:00, DST +05:00) |  
asia/aqtobe |  | Asia/Aqtobe (+05:00, DST +05:00) |  
asia/ashgabat |  | Asia/Ashgabat (+05:00, DST +05:00) |  
asia/atyrau |  | Asia/Atyrau (+05:00, DST +05:00) |  
asia/baghdad |  | Asia/Baghdad (+03:00, DST +03:00) |  
asia/baku |  | Asia/Baku (+04:00, DST +04:00) |  
asia/bangkok |  | Asia/Bangkok (+07:00, DST +07:00) |  
asia/barnaul |  | Asia/Barnaul (+07:00, DST +07:00) |  
asia/beirut |  | Asia/Beirut (+02:00, DST +03:00) |  
asia/bishkek |  | Asia/Bishkek (+06:00, DST +06:00) |  
asia/brunei |  | Asia/Brunei (+08:00, DST +08:00) |  
asia/chita |  | Asia/Chita (+09:00, DST +09:00) |  
asia/choibalsan |  | Asia/Choibalsan (+08:00, DST +08:00) |  
asia/colombo |  | Asia/Colombo (+05:30, DST +05:30) |  
asia/damascus |  | Asia/Damascus (+02:00, DST +03:00) |  
asia/dhaka |  | Asia/Dhaka (+06:00, DST +06:00) |  
asia/dili |  | Asia/Dili (+09:00, DST +09:00) |  
asia/dubai |  | Asia/Dubai (+04:00, DST +04:00) |  
asia/dushanbe |  | Asia/Dushanbe (+05:00, DST +05:00) |  
asia/famagusta |  | Asia/Famagusta (+02:00, DST +02:00) |  
asia/gaza |  | Asia/Gaza (+02:00, DST +03:00) |  
asia/hebron |  | Asia/Hebron (+02:00, DST +03:00) |  
asia/ho_chi_minh |  | Asia/Ho_Chi_Minh (+07:00, DST +07:00) |  
asia/hong_kong |  | Asia/Hong_Kong (+08:00, DST +08:00) |  
asia/hovd |  | Asia/Hovd (+07:00, DST +07:00) |  
asia/irkutsk |  | Asia/Irkutsk (+08:00, DST +08:00) |  
asia/jakarta |  | Asia/Jakarta (+07:00, DST +07:00) |  
asia/jayapura |  | Asia/Jayapura (+09:00, DST +09:00) |  
asia/jerusalem |  | Asia/Jerusalem (+02:00, DST +03:00) |  
asia/kabul |  | Asia/Kabul (+04:30, DST +04:30) |  
asia/kamchatka |  | Asia/Kamchatka (+12:00, DST +12:00) |  
asia/karachi |  | Asia/Karachi (+05:00, DST +05:00) |  
asia/kathmandu |  | Asia/Kathmandu (+05:45, DST +05:45) |  
asia/khandyga |  | Asia/Khandyga (+09:00, DST +09:00) |  
asia/kolkata |  | Asia/Kolkata (+05:30, DST +05:30) |  
asia/krasnoyarsk |  | Asia/Krasnoyarsk (+07:00, DST +07:00) |  
asia/kuala_lumpur |  | Asia/Kuala_Lumpur (+08:00, DST +08:00) |  
asia/kuching |  | Asia/Kuching (+08:00, DST +08:00) |  
asia/macau |  | Asia/Macau (+08:00, DST +08:00) |  
asia/magadan |  | Asia/Magadan (+11:00, DST +11:00) |  
asia/makassar |  | Asia/Makassar (+08:00, DST +08:00) |  
asia/manila |  | Asia/Manila (+08:00, DST +08:00) |  
asia/novokuznetsk |  | Asia/Novokuznetsk (+07:00, DST +07:00) |  
asia/novosibirsk |  | Asia/Novosibirsk (+07:00, DST +07:00) |  
asia/omsk |  | Asia/Omsk (+06:00, DST +06:00) |  
asia/oral |  | Asia/Oral (+05:00, DST +05:00) |  
asia/pontianak |  | Asia/Pontianak (+07:00, DST +07:00) |  
asia/pyongyang |  | Asia/Pyongyang (+09:00, DST +09:00) |  
asia/qatar |  | Asia/Qatar (+03:00, DST +03:00) |  
asia/qyzylorda |  | Asia/Qyzylorda (+05:00, DST +05:00) |  
asia/riyadh |  | Asia/Riyadh (+03:00, DST +03:00) |  
asia/sakhalin |  | Asia/Sakhalin (+11:00, DST +11:00) |  
asia/samarkand |  | Asia/Samarkand (+05:00, DST +05:00) |  
asia/seoul |  | Asia/Seoul (+09:00, DST +09:00) |  
asia/shanghai |  | Asia/Shanghai (+08:00, DST +08:00) |  
asia/singapore |  | Asia/Singapore (+08:00, DST +08:00) |  
asia/srednekolymsk |  | Asia/Srednekolymsk (+11:00, DST +11:00) |  
asia/taipei |  | Asia/Taipei (+08:00, DST +08:00) |  
asia/tashkent |  | Asia/Tashkent (+05:00, DST +05:00) |  
asia/tbilisi |  | Asia/Tbilisi (+04:00, DST +04:00) |  
asia/tehran |  | Asia/Tehran (+03:30, DST +04:30) |  
asia/thimphu |  | Asia/Thimphu (+06:00, DST +06:00) |  
asia/tokyo |  | Asia/Tokyo (+09:00, DST +09:00) |  
asia/tomsk |  | Asia/Tomsk (+07:00, DST +07:00) |  
asia/ulaanbaatar |  | Asia/Ulaanbaatar (+08:00, DST +08:00) |  
asia/urumqi |  | Asia/Urumqi (+06:00, DST +06:00) |  
asia/ust-nera |  | Asia/Ust-Nera (+10:00, DST +10:00) |  
asia/vladivostok |  | Asia/Vladivostok (+10:00, DST +10:00) |  
asia/yakutsk |  | Asia/Yakutsk (+09:00, DST +09:00) |  
asia/yangon |  | Asia/Yangon (+06:30, DST +06:30) |  
asia/yekaterinburg |  | Asia/Yekaterinburg (+05:00, DST +05:00) |  
asia/yerevan |  | Asia/Yerevan (+04:00, DST +04:00) |  
atlantic/azores |  | Atlantic/Azores (−01:00, DST +00:00) |  
atlantic/bermuda |  | Atlantic/Bermuda (−04:00, DST −03:00) |  
atlantic/canary |  | Atlantic/Canary (+00:00, DST +01:00) |  
atlantic/cape_verde |  | Atlantic/Cape_Verde (−01:00, DST −01:00) |  
atlantic/faroe |  | Atlantic/Faroe (+00:00, DST +01:00) |  
atlantic/madeira |  | Atlantic/Madeira (+00:00, DST +01:00) |  
atlantic/reykjavik |  | Atlantic/Reykjavik (+00:00, DST +00:00) |  
atlantic/south_georgia |  | Atlantic/South_Georgia (−02:00, DST −02:00) |  
atlantic/stanley |  | Atlantic/Stanley (−03:00, DST −03:00) |  
australia/adelaide |  | Australia/Adelaide (+09:30, DST +10:30) |  
australia/brisbane |  | Australia/Brisbane (+10:00, DST +10:00) |  
australia/broken_hill |  | Australia/Broken_Hill (+09:30, DST +10:30) |  
australia/currie |  | Australia/Currie (+10:00, DST +11:00) |  
australia/darwin |  | Australia/Darwin (+09:30, DST +09:30) |  
australia/eucla |  | Australia/Eucla (+08:45, DST +08:45) |  
australia/hobart |  | Australia/Hobart (+10:00, DST +11:00) |  
australia/lindeman |  | Australia/Lindeman (+10:00, DST +10:00) |  
australia/lord_howe |  | Australia/Lord_Howe (+10:30, DST +11:00) |  
australia/melbourne |  | Australia/Melbourne (+10:00, DST +11:00) |  
australia/perth |  | Australia/Perth (+08:00, DST +08:00) |  
australia/sydney |  | Australia/Sydney (+10:00, DST +11:00) |  
etc/gmt |  | Etc/GMT (+00:00, DST +00:00) |  
etc/gmt+1 |  | Etc/GMT+1 (−01:00, DST −01:00) |  
etc/gmt+10 |  | Etc/GMT+10 (−10:00, DST −10:00) |  
etc/gmt+11 |  | Etc/GMT+11 (−11:00, DST −11:00) |  
etc/gmt+12 |  | Etc/GMT+12 (−12:00, DST −12:00) |  
etc/gmt+2 |  | Etc/GMT+2 (−02:00, DST −02:00) |  
etc/gmt+3 |  | Etc/GMT+3 (−03:00, DST −03:00) |  
etc/gmt+4 |  | Etc/GMT+4 (−04:00, DST −04:00) |  
etc/gmt+5 |  | Etc/GMT+5 (−05:00, DST −05:00) |  
etc/gmt+6 |  | Etc/GMT+6 (−06:00, DST −06:00) |  
etc/gmt+7 |  | Etc/GMT+7 (−07:00, DST −07:00) |  
etc/gmt+8 |  | Etc/GMT+8 (−08:00, DST −08:00) |  
etc/gmt+9 |  | Etc/GMT+9 (−09:00, DST −09:00) |  
etc/gmt-1 |  | Etc/GMT-1 (+01:00, DST +01:00) |  
etc/gmt-10 |  | Etc/GMT-10 (+10:00, DST +10:00) |  
etc/gmt-11 |  | Etc/GMT-11 (+11:00, DST +11:00) |  
etc/gmt-12 |  | Etc/GMT-12 (+12:00, DST +12:00) |  
etc/gmt-13 |  | Etc/GMT-13 (+13:00, DST +13:00) |  
etc/gmt-14 |  | Etc/GMT-14 (+14:00, DST +14:00) |  
etc/gmt-2 |  | Etc/GMT-2 (+02:00, DST +02:00) |  
etc/gmt-3 |  | Etc/GMT-3 (+03:00, DST +03:00) |  
etc/gmt-4 |  | Etc/GMT-4 (+04:00, DST +04:00) |  
etc/gmt-5 |  | Etc/GMT-5 (+05:00, DST +05:00) |  
etc/gmt-6 |  | Etc/GMT-6 (+06:00, DST +06:00) |  
etc/gmt-7 |  | Etc/GMT-7 (+07:00, DST +07:00) |  
etc/gmt-8 |  | Etc/GMT-8 (+08:00, DST +08:00) |  
etc/gmt-9 |  | Etc/GMT-9 (+09:00, DST +09:00) |  
etc/utc |  | Etc/UTC (+00:00, DST +00:00) |  
europe/amsterdam |  | Europe/Amsterdam (+01:00, DST +02:00) |  
europe/andorra |  | Europe/Andorra (+01:00, DST +02:00) |  
europe/astrakhan |  | Europe/Astrakhan (+04:00, DST +04:00) |  
europe/athens |  | Europe/Athens (+02:00, DST +03:00) |  
europe/belgrade |  | Europe/Belgrade (+01:00, DST +02:00) |  
europe/berlin |  | Europe/Berlin (+01:00, DST +02:00) |  
europe/brussels |  | Europe/Brussels (+01:00, DST +02:00) |  
europe/bucharest |  | Europe/Bucharest (+02:00, DST +03:00) |  
europe/budapest |  | Europe/Budapest (+01:00, DST +02:00) |  
europe/chisinau |  | Europe/Chisinau (+02:00, DST +03:00) |  
europe/copenhagen |  | Europe/Copenhagen (+01:00, DST +02:00) |  
europe/dublin |  | Europe/Dublin (+00:00, DST +01:00) |  
europe/gibraltar |  | Europe/Gibraltar (+01:00, DST +02:00) |  
europe/helsinki |  | Europe/Helsinki (+02:00, DST +03:00) |  
europe/istanbul |  | Europe/Istanbul (+03:00, DST +03:00) |  
europe/kaliningrad |  | Europe/Kaliningrad (+02:00, DST +02:00) |  
europe/kiev |  | Europe/Kiev (+02:00, DST +03:00) |  
europe/kirov |  | Europe/Kirov (+03:00, DST +03:00) |  
europe/lisbon |  | Europe/Lisbon (+00:00, DST +01:00) |  
europe/london |  | Europe/London (+00:00, DST +01:00) |  
europe/luxembourg |  | Europe/Luxembourg (+01:00, DST +02:00) |  
europe/madrid |  | Europe/Madrid (+01:00, DST +02:00) |  
europe/malta |  | Europe/Malta (+01:00, DST +02:00) |  
europe/minsk |  | Europe/Minsk (+03:00, DST +03:00) |  
europe/monaco |  | Europe/Monaco (+01:00, DST +02:00) |  
europe/moscow |  | Europe/Moscow (+03:00, DST +03:00) |  
asia/nicosia |  | Asia/Nicosia (+02:00, DST +03:00) |  
europe/oslo |  | Europe/Oslo (+01:00, DST +02:00) |  
europe/paris |  | Europe/Paris (+01:00, DST +02:00) |  
europe/prague |  | Europe/Prague (+01:00, DST +02:00) |  
europe/riga |  | Europe/Riga (+02:00, DST +03:00) |  
europe/rome |  | Europe/Rome (+01:00, DST +02:00) |  
europe/samara |  | Europe/Samara (+04:00, DST +04:00) |  
europe/saratov |  | Europe/Saratov (+04:00, DST +04:00) |  
europe/simferopol |  | Europe/Simferopol (+03:00, DST +03:00) |  
europe/sofia |  | Europe/Sofia (+02:00, DST +03:00) |  
europe/stockholm |  | Europe/Stockholm (+01:00, DST +02:00) |  
europe/tallinn |  | Europe/Tallinn (+02:00, DST +03:00) |  
europe/tirane |  | Europe/Tirane (+01:00, DST +02:00) |  
europe/ulyanovsk |  | Europe/Ulyanovsk (+04:00, DST +04:00) |  
europe/uzhgorod |  | Europe/Uzhgorod (+02:00, DST +03:00) |  
europe/vienna |  | Europe/Vienna (+01:00, DST +02:00) |  
europe/vilnius |  | Europe/Vilnius (+02:00, DST +03:00) |  
europe/volgograd |  | Europe/Volgograd (+04:00, DST +04:00) |  
europe/warsaw |  | Europe/Warsaw (+01:00, DST +02:00) |  
europe/zaporozhye |  | Europe/Zaporozhye (+02:00, DST +03:00) |  
europe/zurich |  | Europe/Zurich (+01:00, DST +02:00) |  
indian/chagos |  | Indian/Chagos (+06:00, DST +06:00) |  
indian/christmas |  | Indian/Christmas (+07:00, DST +07:00) |  
indian/cocos |  | Indian/Cocos (+06:30, DST +06:30) |  
indian/kerguelen |  | Indian/Kerguelen (+05:00, DST +05:00) |  
indian/mahe |  | Indian/Mahe (+04:00, DST +04:00) |  
indian/maldives |  | Indian/Maldives (+05:00, DST +05:00) |  
indian/mauritius |  | Indian/Mauritius (+04:00, DST +04:00) |  
indian/reunion |  | Indian/Reunion (+04:00, DST +04:00) |  
pacific/apia |  | Pacific/Apia (+13:00, DST +14:00) |  
pacific/auckland |  | Pacific/Auckland (+12:00, DST +13:00) |  
pacific/bougainville |  | Pacific/Bougainville (+11:00, DST +11:00) |  
pacific/chatham |  | Pacific/Chatham (+12:45, DST +13:45) |  
pacific/chuuk |  | Pacific/Chuuk (+10:00, DST +10:00) |  
pacific/easter |  | Pacific/Easter (−06:00, DST −05:00) |  
pacific/efate |  | Pacific/Efate (+11:00, DST +11:00) |  
pacific/enderbury |  | Pacific/Enderbury (+13:00, DST +13:00) |  
pacific/fakaofo |  | Pacific/Fakaofo (+13:00, DST +13:00) |  
pacific/fiji |  | Pacific/Fiji (+12:00, DST +13:00) |  
pacific/funafuti |  | Pacific/Funafuti (+12:00, DST +12:00) |  
pacific/galapagos |  | Pacific/Galapagos (−06:00, DST −06:00) |  
pacific/gambier |  | Pacific/Gambier (−09:00, DST −09:00) |  
pacific/guadalcanal |  | Pacific/Guadalcanal (+11:00, DST +11:00) |  
pacific/guam |  | Pacific/Guam (+10:00, DST +10:00) |  
pacific/honolulu |  | Pacific/Honolulu (−10:00, DST −10:00) |  
pacific/kiritimati |  | Pacific/Kiritimati (+14:00, DST +14:00) |  
pacific/kosrae |  | Pacific/Kosrae (+11:00, DST +11:00) |  
pacific/kwajalein |  | Pacific/Kwajalein (+12:00, DST +12:00) |  
pacific/majuro |  | Pacific/Majuro (+12:00, DST +12:00) |  
pacific/marquesas |  | Pacific/Marquesas (−09:30, DST −09:30) |  
pacific/nauru |  | Pacific/Nauru (+12:00, DST +12:00) |  
pacific/niue |  | Pacific/Niue (−11:00, DST −11:00) |  
pacific/norfolk |  | Pacific/Norfolk (+11:00, DST +11:00) |  
pacific/noumea |  | Pacific/Noumea (+11:00, DST +11:00) |  
pacific/pago_pago |  | Pacific/Pago_Pago (−11:00, DST −11:00) |  
pacific/palau |  | Pacific/Palau (+09:00, DST +09:00) |  
pacific/pitcairn |  | Pacific/Pitcairn (−08:00, DST −08:00) |  
pacific/pohnpei |  | Pacific/Pohnpei (+11:00, DST +11:00) |  
pacific/port_moresby |  | Pacific/Port_Moresby (+10:00, DST +10:00) |  
pacific/rarotonga |  | Pacific/Rarotonga (−10:00, DST −10:00) |  
pacific/tahiti |  | Pacific/Tahiti (−10:00, DST −10:00) |  
pacific/tarawa |  | Pacific/Tarawa (+12:00, DST +12:00) |  
pacific/tongatapu |  | Pacific/Tongatapu (+13:00, DST +14:00) |  
pacific/wake |  | Pacific/Wake (+12:00, DST +12:00) |  
pacific/wallis |  | Pacific/Wallis (+12:00, DST +12:00) |  

  

## UUID

**kind**: schema\
**name**: uuid\
**uri**: https://jsonotron.org/jss/uuid

A universally unique 128 bit number formatted as 32 alphanumeric characters and defined by RFC 4122.

### Example 1

An example.

```json
"1ff9a681-092e-48ad-8d5a-1b0919ddb33b"
```


### Schema as JSON


```json
{
  "type": "string",
  "pattern": "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
}
```


### Schema as YAML


```yaml
type: string
pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'

```


  

## Web Address

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


### Schema as JSON


```json
{
  "type": "string",
  "pattern": "^http[s]?://[a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%_+.~#?&//=]*)$"
}
```


### Schema as YAML


```yaml
type: string
pattern: >-
  ^http[s]?://[a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%_+.~#?&//=]*)$

```


  

## What 3 Words

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


### Schema as JSON


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


### Schema as YAML


```yaml
type: array
minItems: 3
maxItems: 3
items:
  $ref: shortString

```


  

## Yes or No

**kind**: enum\
**name**: yesNo\
**uri**: https://jsonotron.org/jss/yesNo

A binary choice between yes or no.
This type can be used where a third option may be introduced in the future.  In that scenario a boolean field would be limiting, but a yesNo field could be replaced by a new enum without having to migrate existing data.

Value | Symbol | Text | Documentation
--- | --- | --- | ---
yes |  | Yes |  
no |  | No |  

  
  