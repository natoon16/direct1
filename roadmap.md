I have two CSVs, one is cities.csv:
Population Rank  Place name               Label         County           Zip Codes
1	               Jacksonville	            City	        Duval            32099-32234
2	               Miami	                  City	        Miami-Dade       33101-33299 
3	               Tampa	                  City	        Hillsborough     33559-33694 
4	               Orlando	                City	        Orange	         2789-32899 
5	               St. Petersburg	          City	        Pinellas	       33701-33784 
6	               Hialeah	                City	        Miami-Dade       33002-33167
7	               Port St. Lucie	          City	           St. Lucie	       34945-34990 
8	               Tallahassee	            City	        Leon	           32301-32399
9	               Cape Coral	              City	        Lee	             33903-33993 
10	             Fort Lauderdale          City	        Broward	         33301-33394 
11	             Pembroke Pines	          City	        Broward	         33023-33332 
12	             Hollywood	              City	        Broward	         33004-33316 
13	             Gainesville	            City	        Alachua	         32601-32667
14	             Miramar	                City	        Broward	         32023-33029
15	             Coral Springs	          City	        Broward	         33065-33076 
16	             Palm Bay	                City	        Brevard	         32901-32976 
17	             West Palm Beach	        City	        Palm Beach       33401-33422
18	             Clearwater	              City	        Pinellas	       3755-34698
19	             Lakeland	                City	        Polk	           33801-33815
20	             Pompano Beach	          City	        Broward	         33060-33097
21	             Miami Gardens	          City	        Miami-Dade       33014-33179
22	             Davie	                  City	        Broward	         33312-33355
23	             Boca Raton	              City	        Palm Beach       33427-33499
24	             Sunrise	                City	        Broward	         33313-33351
25	             Deltona	                City	        Volusia	         32725-32739
26	             Plantation	              City	        Broward	         33311-33388
27	             Palm Coast	              City	        Flagler	         32135-32164
28	             Deerfield Beach	        City	        Broward          33064-33443
29	             Fort Myers†	            City	        Lee	             33901-33994
30	             Melbourne	              City	        Brevard	         32901-32951
31	             Miami Beach	            City	        Miami-Dade       33109-33239
32	             Largo	                  City	        Pinellas	       33770-33779
33	             Homestead	              City	        Miami-Dade       33030–33092
34	             Boynton Beach	          City	        Palm Beach       33424–32474
35	             Kissimmee	              City	        Osceola	         34741–34759
36	             Doral	                  City	        Miami-Dade       33122–33222
37	             North Port	              City	        Sarasota	       34286–34291
38	             Lauderhill	              City	        Broward	         33311–33351
39	             Daytona Beach	          City	        Volusia  	       32114–32198
40	             Tamarac	                City	        Broward	         33309–33359
41	             Weston	                  City	        Broward	         33326–33332
42	             Delray Beach	            City	        Palm Beach       33444-33484
43	             Ocala	                  City	        Marion	         3423-32129
45	             Wellington	              City	        Palm Beach       33411-33470
46	             Sanford	                City	        Seminole         32746-32773
47	             Jupiter	                City	        Palm Beach       33458-33478
48	             North Miami	            City	        Miami-Dade       33160-33181
49	             Palm Beach Gardens       City	        Palm Beach       33403-33420
50	             St. Cloud	              City	        Osceola	         34744-34772
51	             Margate	                City	        Broward	         33063-33093
52	             Coconut Creek	          City	        Broward	         33063-33097
53	             Bradenton	              City	        Manatee	         34201-34282
54	             Apopka	                  City	        Orange	         32703-32776
55	             Sarasota	                City	        Sarasota	       34230-34277
56	             Pensacola	              City	        Escambia	       32501-32591
57	             Bonita Springs	          City	        Lee	             33928-34136
58	             Pinellas Park	          City	        Pinellas	       33702-33782
59	             Coral Gables	            City	        Miami-Dade       33114-33158
60	             Winter Haven	            City	        Polk	           33880-33888
61	             Titusville	              City	        Brevard	         32780-32796
62	             Fort Pierce	            City	        St. Lucie	       32703-34787
63	             Ocoee	                  City	        Orange	         32703-34787
64	             Winter Garden	          City	        Orange	         34761-34787
65	             Altamonte Springs	      City	        Seminole	       32701-32779
66	             Cutler Bay	              City	        Miami-Dade       33157-33190
67	             North Lauderdale	        City	        Broward	         33068-33319
68	             Oakland Park	            City	        Broward          33304-33334
69	             Greenacres	              City	        Palm Beach       33413-33467
70	             North Miami Beach        City	        Miami-Dade       33160-33181
71	             Ormond Beach	            City	        Volusia          32173-32176
72	             Clermont	                City	        Lake	           34711-34715
73	             Lake Worth Beach	        City	        Palm Beach       33460-33480
74	             Hallandale Beach	        City	        Broward	         33008-33009
75	             Aventura	                City	        Miami-Dade       33160-33180
76	             Oviedo	                  City	        Seminole	       32708-32766
77	             Plant City	              City	        Hillsborough     33563-33567
78	             Royal Palm Beach	        City	        Palm Beach       33411-33421
79	             Winter Springs	          City	        Seminole	       32708-32765
80	             Riviera Beach	          City	        Palm Beach       33403-33419
81	             DeLand	                  City	        Volusia	         32720-32724
82	             Estero	                  City	        Lee	             33928-34135
83	             Dunedin	                City	        Pinellas	       33763-34698
84	             Lauderdale Lakes	        City	        Broward	         33309-33319
85	             Parkland	                City	        Broward	         33067-33076
86               Cooper City	            City	        Broward	         33024-33330
87               Panama City	            City	        Bay	             32401-32461
88               Dania Beach	            City	        Broward	         33004-33316
89	             Miami Lakes	            City	        Miami-Dade       33014-33018
90	             New Smyrna Beach         City	        Volusia	         32168-32170
91	             Winter Park	            City	        Orange	         32789-32793
92	             Casselberry	            City	        Seminole	       32707-32730
93	             Rockledge	              City	        Brevard	         32922-32956
94	             Crestview	              City	        Okaloosa	       32536-32539
95	             Leesburg	                City	        Lake	           34731-34797
96	             Palm Springs	            City	        Palm Beach       33406-33461
97	             Temple Terrace	          City	        Hillsborough     33617-33637
98	             Haines City	            City	        Polk	           33837-33845
99	             Key West	                City	        Monroe	         33040-33045
100	             West Melbourne	          City	        Brevarid         32788-32789

The other one is keyword.csv
Venues                                      
Catering
Dress
Tuxedos
Invitations
Budget
Photographer
Videographer
Flowers
Centerpiece
Cake
DJ
Band
Ceremony
Reception
Save-the-date
Bridesmaids
Groomsmen
Rehearsal dinner
Wedding planner
Registry
Engagement ring
Wedding bands
Seating chart
Menu
Bar
Decorations
Lighting
Wedding
Officiant
Transportation
Hair
Bridal
Wedding favors
Bachelor/bachelorette party
Destination wedding
Honeymoon
Vows
First dance
Wedding colors
Theme
Rentals
Tent
Wedding insurance
Guest list
RSVP
Wedding coordinator
Alterations
Rehearsal
Thank-you card


What I want you to do is to build a directory website that uses the <google_v1_places_documentation> in order to display search result for these terms. An example would be “wedding venues in Jacksonville Florida” - so make sure to add the word Wedding before each keyword.

Make sure to use a 6 month cache by storing the information found from google’s api in mongodb.

Then the website should be generated programmatically abusing the fact that Google tends to rank exact phrase match pages with queries, so ensure that the meta title and meta description, title, and short content on the page mentions the exact phrase match keyword.

Do not display images, display ten results at a time, create all pages programmatically using the two csvs above - use pagination as we’re going to have a lot of pages.

Create a sitemap, breadcrumbs, header, footer, and everything else needed to have this website running.

For the search bar, only allow people to select term from the csvs and not just search for stuff.
Create all index pages such as Best X in Y, we won’t do individual business pages. Use the term Top 10 Best X in Y city, in Z state” or “The Best 10 X in Y city, in Z state”

Create a clean looking UI/UX using modern modular blocks, taking into account the contrast between text vs background and being mobile friendly throughout, including the heading and the hero section. 

Let’s also create a mongodb powered form, to allow users to send submissions which will store the inquiry inside mongodb capturing as much information as possible from the user.

Index pages are like category pages and are a collection of towns or cities or businesses in cities.

<mongo_uri>
mongodb+srv://dbdirectory1:<db password>.dsxjw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
<mongo_uri>

<google_place_v1_documentation>
Text Search (New) 

bookmark_border
 
Select platform: Android iOS JavaScript Web Service
Text Search (New) returns information about a set of places based on a string — for example, "pizza in New York" or "shoe stores near Ottawa" or "123 Main Street". The service responds with a list of places matching the text string and any location bias that has been set.

The service is especially useful for making ambiguous address queries in an automated system, and non-address components of the string may match businesses as well as addresses. Examples of ambiguous address queries are poorly-formatted addresses or requests that include non-address components such as business names. Requests like the first two examples in the following table may return zero results unless a location — such as region, location restriction, or location bias — is set.

"10 High Street, UK" or "123 Main Street, US"	Multiple "High Street"s in the UK; multiple "Main Street"s in the US. Query doesn't return desirable results unless a location restriction is set.
"ChainRestaurant New York"	Multiple "ChainRestaurant" locations in New York; no street address or even street name.
"10 High Street, Escher UK" or "123 Main Street, Pleasanton US"	Only one "High Street" in the UK city of Escher; only one "Main Street" in the US city of Pleasanton CA.
"UniqueRestaurantName New York"	Only one establishment with this name in New York; no street address needed to differentiate.
"pizza restaurants in New York"	This query contains its location restriction, and "pizza restaurants" is a well-defined place type. It returns multiple results.
"+1 514-670-8700"	
This query contains a phone number. It returns multiple results for places associated with that phone number.

Note: For best results when searching on a phone number, include the country code followed by a space, and set the regionCode parameter to correspond to the country code. Phone number formats vary by country and the API attempts to return a result for these different formats.
The APIs Explorer lets you make live requests so that you can get familiar with the API and the API options:

Try it!
Text Search requests
A Text Search request is an HTTP POST request of the following form:


https://places.googleapis.com/v1/places:searchText
Pass all parameters in the JSON request body or in headers as part of the POST request. For example:


curl -X POST -d '{
  "textQuery" : "Spicy Vegetarian Food in Sydney, Australia"
}' \
-H 'Content-Type: application/json' -H 'X-Goog-Api-Key: API_KEY' \
-H 'X-Goog-FieldMask: places.displayName,places.formattedAddress,places.priceLevel' \
'https://places.googleapis.com/v1/places:searchText'
Text Search (New) responses
Text Search (New) returns a JSON object as a response. In the response:

The places array contains all matching places.
Each place in the array is represented by a Place object. The Place object contains detailed information about a single place.
The FieldMask passed in the request specifies the list of fields returned in the Place object.
The complete JSON object is in the form:


{
  "places": [
    {
      object (Place)
    }
  ]
}
Note: Text Search (New) returns a maximum of 60 results across all pages, although this limit is subject to change.
Required parameters
FieldMask
Specify the list of fields to return in the response by creating a response field mask. Pass the response field mask to the method by using the URL parameter $fields or fields, or by using the HTTP header X-Goog-FieldMask. There is no default list of returned fields in the response. If you omit the field mask, the method returns an error.

Field masking is a good design practice to ensure that you don't request unnecessary data, which helps to avoid unnecessary processing time and billing charges.

Specify a comma-separated list of place data types to return. For example, to retrieve the display name and the address of the place.


X-Goog-FieldMask: places.displayName,places.formattedAddress
Note: Spaces are not allowed anywhere in the field list.
Use * to retrieve all fields.


X-Goog-FieldMask: *
Wildcard "*" selects all fields. However, while that wildcard is fine to use in development, Google discourage the use of the wildcard (*) response field mask in production because of the large amount of data that can be returned.
Further guidance for using places.iconMaskBaseUri and places.iconBackgroundColor can be found in Place Icons section.
Specify one or more of the following fields:

The following fields trigger the Text Search Essentials ID Only SKU:

places.attributions
places.id
places.name*
nextPageToken

* The places.name field contains the place resource name in the form: places/PLACE_ID. Use places.displayName to access the text name of the place.
The following fields trigger the Text Search Pro SKU:

places.accessibilityOptions
places.addressComponents
places.adrFormatAddress
places.businessStatus
places.containingPlaces
places.displayName
places.formattedAddress
places.googleMapsLinks*
places.googleMapsUri
places.iconBackgroundColor
places.iconMaskBaseUri
places.location
places.photos
places.plusCode
places.postalAddress
places.primaryType
places.primaryTypeDisplayName
places.pureServiceAreaBusiness
places.shortFormattedAddress
places.subDestinations
places.types
places.utcOffsetMinutes
places.viewport

* The places.googleMapsLinks field is in the pre-GA Preview stage and there is no charge, meaning billing is $0, for usage during Preview.
The following fields trigger the Text Search Enterprise SKU:

places.currentOpeningHours
places.currentSecondaryOpeningHours
places.internationalPhoneNumber
places.nationalPhoneNumber
places.priceLevel
places.priceRange
places.rating
places.regularOpeningHours
places.regularSecondaryOpeningHours
places.userRatingCount
places.websiteUri
The following fields trigger the Text Search Enterprise plus SKU:

places.allowsDogs
places.curbsidePickup
places.delivery
places.dineIn
places.editorialSummary
places.evChargeOptions
places.fuelOptions
places.goodForChildren
places.goodForGroups
places.goodForWatchingSports
places.liveMusic
places.menuForChildren
places.parkingOptions
places.paymentOptions
places.outdoorSeating
places.reservable
places.restroom
places.reviews
places.routingSummaries*
places.servesBeer
places.servesBreakfast
places.servesBrunch
places.servesCocktails
places.servesCoffee
places.servesDessert
places.servesDinner
places.servesLunch
places.servesVegetarianFood
places.servesWine
places.takeout

* Text Search and Nearby Search only
textQuery
The text string on which to search, for example: "restaurant", "123 Main Street", or "best place to visit in San Francisco". The API returns candidate matches based on this string and orders the results based on their perceived relevance.

Optional parameters
includedType
Restricts the results to places matching the specified type defined by Table A. Only one type may be specified. For example:

"includedType":"bar"
"includedType":"pharmacy"
Note: The values in Table B are only returned in the response. You cannot use values in Table B as a filter.
includePureServiceAreaBusinesses
If set to true, the response includes businesses that visit or deliver to customers directly, but don't have a physical business location. If set to false, the API returns only businesses with a physical business location.

languageCode
The language in which to return results.

See the list of supported languages. Google often updates the supported languages, so this list may not be exhaustive.
If languageCode is not supplied, the API defaults to en. If you specify an invalid language code, the API returns an INVALID_ARGUMENT error.
The API does its best to provide a street address that is readable for both the user and locals. To achieve that goal, it returns street addresses in the local language, transliterated to a script readable by the user if necessary, observing the preferred language. All other addresses are returned in the preferred language. Address components are all returned in the same language, which is chosen from the first component.
If a name is not available in the preferred language, the API uses the closest match.
The preferred language has a small influence on the set of results that the API chooses to return, and the order in which they are returned. The geocoder interprets abbreviations differently depending on language, such as the abbreviations for street types, or synonyms that may be valid in one language but not in another.
locationBias
Specifies an area to search. This location serves as a bias which means results around the specified location can be returned, including results outside the specified area.

You can specify locationRestriction or locationBias, but not both. Think of locationRestriction as specifying the region which the results must be within, and locationBias as specifying the region that the results will likely be inside or near but can be outside of the area.

Note: If you omit both locationBias and locationRestriction, then the API uses IP biasing by default. With IP biasing, the API uses the device's IP address to bias the results.
Note: The locationBias parameter can be overridden if the textQuery contains an explicit location such as Market in Barcelona. In this case, locationBias is ignored.
Specify the region as a rectangular Viewport or as a circle.

A circle is defined by center point and radius in meters. The radius must be between 0.0 and 50000.0, inclusive. The default radius is 0.0. For example:


"locationBias": {
  "circle": {
    "center": {
      "latitude": 37.7937,
      "longitude": -122.3965
    },
    "radius": 500.0
  }
}
A rectangle is a latitude-longitude viewport, represented as two diagonally opposite low and high points. The low point marks the southwest corner of the rectangle, and the high point represents the northeast corner of the rectangle.

A viewport is considered a closed region, meaning it includes its boundary. The latitude bounds must range between -90 to 90 degrees inclusive, and the longitude bounds must range between -180 to 180 degrees inclusive:

If low = high, the viewport consists of that single point.
If low.longitude > high.longitude, the longitude range is inverted (the viewport crosses the 180 degree longitude line).
If low.longitude = -180 degrees and high.longitude = 180 degrees, the viewport includes all longitudes.
If low.longitude = 180 degrees and high.longitude = -180 degrees, the longitude range is empty.
If low.latitude > high.latitude, the latitude range is empty.
Both low and high must be populated, and the represented box cannot be empty. An empty viewport results in an error.

For example, this viewport fully encloses New York City:


"locationBias": {
  "rectangle": {
    "low": {
      "latitude": 40.477398,
      "longitude": -74.259087
    },
    "high": {
      "latitude": 40.91618,
      "longitude": -73.70018
    }
  }
}
locationRestriction
Specifies an area to search. Results outside the specified area are not returned.

Specify the region as a rectangular Viewport. For an example of defining the Viewport, see the description of locationBias.

You can specify locationRestriction or locationBias, but not both. Think of locationRestriction as specifying the region which the results must be within, and locationBias as specifying the region that the results will likely be inside or near but can be outside of the area.

Note: If you omit both locationBias and locationRestriction, then the API uses IP biasing by default. With IP biasing, the API uses the IP address of the device to bias the results.
maxResultCount (deprecated)
Deprecated: This field is deprecated in favor of pageSize. If both maxResultCount and pageSize are specified, pageSize will be used and maxResultCount will be ignored.
Specifies the number of results (between 1 and 20) to display per page. For example, setting a maxResultCount value of 5 will return up to 5 results on the first page. If there are more results that can be returned from the query, the response includes a nextPageToken that you can pass into a subsequent request to access the next page.

Note: If maxResultCount is 0 or unspecified, the API will return 20 results per page by default. If maxResultCount is greater than 20, the API will return no more than 20 results per page.
evOptions
Specifies parameters for identifying available electric vehicle (EV) charging connectors and charging rates.

connectorTypes
Filters by the type of EV charging connector available at a place. A place that does not support any of the connector types will be filtered out. Supported EV charging connector types include combined (AC and DC) chargers, Tesla chargers, GB/T-compliant chargers (for EV fast charging in China), and wall outlet chargers. For more information, see the reference documentation.

To filter results for a specific supported connector, set connectorTypes to that value. For example, to find J1772 type 1 connectors, set connectorTypes to EV_CONNECTOR_TYPE_J1772.
To filter results for unsupported connectors, set connectorTypes to EV_CONNECTOR_TYPE_OTHER.
To filter results for any connector type that is a wall outlet, set connectorTypes to EV_CONNECTOR_TYPE_UNSPECIFIED_WALL_OUTLET.
To filter results for any connector type, either set connectorTypes to EV_CONNECTOR_TYPE_UNSPECIFIED or don't set a value for connectorTypes.
minimumChargingRateKw
Filters places by minimum EV charging rate in kilowatts (kW). Any places with charging a rate less than the minimum charging rate are filtered out. For example, to find EV chargers with charging rates that are at least 10 kW, you can set this parameter to "10."

minRating
Restricts results to only those whose average user rating is greater than or equal to this limit. Values must be between 0.0 and 5.0 (inclusive) in increments of 0.5. For example: 0, 0.5, 1.0, ... , 5.0 inclusive. Values are rounded up to the nearest 0.5. For example, a value of 0.6 eliminates all results with a rating less than 1.0.

openNow 
If true, return only those places that are open for business at the time the query is sent. If false, return all businesses regardless of open status. Places that don't specify opening hours in the Google Places database are returned if you set this parameter to false.

pageSize
Specifies the number of results (between 1 and 20) to display per page. For example, setting a pageSize value of 5 will return up to 5 results on the first page. If there are more results that can be returned from the query, the response includes a nextPageToken that you can pass into a subsequent request to access the next page.

Note: If pageSize is 0 or unspecified, the API will return 20 results per page by default. If pageSize is greater than 20, the API will return no more than 20 results per page.
pageToken
Specifies the nextPageToken from the response body of the previous page.

priceLevels
Restrict the search to places that are marked at certain price levels. The default is to select all price levels.

Price levels can be expected for places of the following types:

Food and Drink
Services
Shopping
Places of non-supported types won't be included in the response if priceLevels is specified.

Specify an array of one or more of values defined by PriceLevel.

For example:


"priceLevels":["PRICE_LEVEL_INEXPENSIVE", "PRICE_LEVEL_MODERATE"]
Note: PRICE_LEVEL_FREE is not allowed in a request. It is only used to populate the response.
rankPreference
Specifies how the results are ranked in the response based on the type of query:

For a categorical query such as "Restaurants in New York City", RELEVANCE (rank results by search relevance) is the default. You can set rankPreference to RELEVANCE or DISTANCE (rank results by distance).
For a non-categorical query such as "Mountain View, CA", we recommend that you leave rankPreference unset.
regionCode
The region code used to format the response, specified as a two-character CLDR code value. This parameter can also have a bias effect on the search results. There is no default value.

If the country name of the formattedAddress field in the response matches the regionCode, the country code is omitted from formattedAddress. This parameter has no effect on adrFormatAddress, which always includes the country name when available, or on shortFormattedAddress, which never includes it.

Most CLDR codes are identical to ISO 3166-1 codes, with some notable exceptions. For example, the United Kingdom's ccTLD is "uk" (.co.uk) while its ISO 3166-1 code is "gb" (technically for the entity of "The United Kingdom of Great Britain and Northern Ireland"). The parameter can affect results based on applicable law.

strictTypeFiltering
Used with the includedType parameter. When set to true, only places that match the specified types specified by includeType are returned. When false, the default, the response can contain places that don't match the specified types.

Text Search examples
Find a place by query string
The following example shows a Text Search request for "Spicy Vegetarian Food in Sydney, Australia":


curl -X POST -d '{
  "textQuery" : "Spicy Vegetarian Food in Sydney, Australia"
}' \
-H 'Content-Type: application/json' -H 'X-Goog-Api-Key: API_KEY' \
-H 'X-Goog-FieldMask: places.displayName,places.formattedAddress' \
'https://places.googleapis.com/v1/places:searchText'
Note that the X-Goog-FieldMask header specifies that the response contains the following data fields: places.displayName,places.formattedAddress. The response is then in the form:


{
  "places": [
    {
      "formattedAddress": "367 Pitt St, Sydney NSW 2000, Australia",
      "displayName": {
        "text": "Mother Chu's Vegetarian Kitchen",
        "languageCode": "en"
      }
    },
    {
      "formattedAddress": "175 First Ave, Five Dock NSW 2046, Australia",
      "displayName": {
        "text": "Veggo Sizzle - Vegan & Vegetarian Restaurant, Five Dock, Sydney",
        "languageCode": "en"
      }
    },
    {
      "formattedAddress": "29 King St, Sydney NSW 2000, Australia",
      "displayName": {
        "text": "Peace Harmony",
        "languageCode": "en"
      }
    },
    ...
  ]
}
Add more data types to the field mask to return additional information. For example, add places.types,places.websiteUri to include the restaurant type and Web address in the response:


curl -X POST -d '{
  "textQuery" : "Spicy Vegetarian Food in Sydney, Australia"
}' \
-H 'Content-Type: application/json' -H 'X-Goog-Api-Key: API_KEY' \
-H 'X-Goog-FieldMask: places.displayName,places.formattedAddress,places.types,places.websiteUri' \
'https://places.googleapis.com/v1/places:searchText'
The response is now in the form:


{
  "places": [
    {
      "types": [
        "vegetarian_restaurant",
        "vegan_restaurant",
        "chinese_restaurant",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "formattedAddress": "367 Pitt St, Sydney NSW 2000, Australia",
      "websiteUri": "http://www.motherchusvegetarian.com.au/",
      "displayName": {
        "text": "Mother Chu's Vegetarian Kitchen",
        "languageCode": "en"
      }
    },
    {
      "types": [
        "vegan_restaurant",
        "thai_restaurant",
        "vegetarian_restaurant",
        "indian_restaurant",
        "italian_restaurant",
        "american_restaurant",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "formattedAddress": "175 First Ave, Five Dock NSW 2046, Australia",
      "websiteUri": "http://www.veggosizzle.com.au/",
      "displayName": {
        "text": "Veggo Sizzle - Vegan & Vegetarian Restaurant, Five Dock, Sydney",
        "languageCode": "en"
      }
    },
    ...
  ]
}
Filter places by price level
Use the priceLevel option to filter the results to restaurants defined as inexpensive or moderately expensive:


curl -X POST -d '{
  "textQuery" : "Spicy Vegetarian Food in Sydney, Australia",
  "priceLevels":["PRICE_LEVEL_INEXPENSIVE", "PRICE_LEVEL_MODERATE"]
}' \
-H 'Content-Type: application/json' -H 'X-Goog-Api-Key: API_KEY' \
-H 'X-Goog-FieldMask: places.displayName,places.formattedAddress,places.priceLevel' \
'https://places.googleapis.com/v1/places:searchText'
This example also uses the X-Goog-FieldMask header to add the places.priceLevel data field to the response so it is in the form:


{
  "places": [
    {
      "formattedAddress": "367 Pitt St, Sydney NSW 2000, Australia",
      "priceLevel": "PRICE_LEVEL_MODERATE",
      "displayName": {
        "text": "Mother Chu's Vegetarian Kitchen",
        "languageCode": "en"
      }
    },
    {
      "formattedAddress": "115 King St, Newtown NSW 2042, Australia",
      "priceLevel": "PRICE_LEVEL_MODERATE",
      "displayName": {
        "text": "Green Mushroom",
        "languageCode": "en"
      }
    },
    ...
  ]
}
Add additional options to refine your search, such as includedType, minRating, rankPreference, openNow, and other parameters described in Optional parameters.

Note: These refinement parameters only apply to queries such as "Restaurants in New York City" where the parameters help to reduce the number of search results based on the specified option. Applying these parameters to other type of queries—for example, to geographical queries such as "Mountain View, CA" or "New York City"—can actually result in filtering out meaningful results or reducing the number of meaningful results.
Restrict search to a specified area
Use locationRestriction or locationBias, but not both, to restrict a search to an area. Think of locationRestriction as specifying the region which the results must be within, and locationBias as specifying the region that the results must be near but can be outside of the area.

Note: When using locationRestriction, you can only specify the region as a rectangular Viewport. When using locationBias, you can specify the region as a rectangular Viewport or as a circle.
Restrict area using locationRestriction
Use the locationRestriction parameter to restrict query results to a specified region. In your request body, specify the low and high latitude and longitude values that define the region boundary.

The following example shows a Text Search request for "vegetarian food" in New York City. This request only returns the first 10 results for places that are open.


curl -X POST -d '{
  "textQuery" : "vegetarian food",
  "pageSize" : "10",
  "locationRestriction": {
    "rectangle": {
      "low": {
        "latitude": 40.477398,
        "longitude": -74.259087
      },
      "high": {
        "latitude": 40.91618,
        "longitude": -73.70018
      }
    }
  }
}' \
  -H 'Content-Type: application/json' \
  -H 'X-Goog-Api-Key: API_KEY' \
  -H 'X-Goog-FieldMask: places.id,places.formattedAddress' \
  'https://places.googleapis.com/v1/places:searchText'
Bias to an area using locationBias
The following example shows a Text Search request for "vegetarian food" biased to a location within 500 meters of a point in downtown San Francisco. This request only returns the first 10 results for places that are open.


curl -X POST -d '{
  "textQuery" : "vegetarian food",
  "openNow": true,
  "pageSize": 10,
  "locationBias": {
    "circle": {
      "center": {"latitude": 37.7937, "longitude": -122.3965},
      "radius": 500.0
    }
  },
}' \
-H 'Content-Type: application/json' -H 'X-Goog-Api-Key: API_KEY' \
-H 'X-Goog-FieldMask: places.displayName,places.formattedAddress' \
'https://places.googleapis.com/v1/places:searchText'
Search for EV chargers with a minimum charging rate
Use minimumChargingRateKw and connectorTypes to search for places with available chargers that are compatible with your EV.

The following example shows a request for Tesla and J1772 type 1 EV charging connectors with a minimum charging rate of 10 kW in Mountain View, CA. Only four results are returned.


curl -X POST -d '{
    "textQuery": "EV Charging Station Mountain View",
    "pageSize": 4,
    "evOptions": {
      "minimumChargingRateKw": 10,
      "connectorTypes": ["EV_CONNECTOR_TYPE_J1772","EV_CONNECTOR_TYPE_TESLA"]
    }
  }' \
-H 'Content-Type: application/json' -H 'X-Goog-Api-Key: API_KEY' \
-H "X-Goog-FieldMask: places.displayName,places.evChargeOptions" \
'https://places.googleapis.com/v1/places:searchText'
The request returns the following response:


{
  "places": [
    {
      "displayName": {
        "text": "EVgo Charging Station",
        "languageCode": "en"
      },
      "evChargeOptions": {
        "connectorCount": 16,
        "connectorAggregation": [
          {
            "type": "EV_CONNECTOR_TYPE_CHADEMO",
            "maxChargeRateKw": 100,
            "count": 8,
            "availableCount": 5,
            "outOfServiceCount": 0,
            "availabilityLastUpdateTime": "2024-01-10T19:10:00Z"
          },
          {
            "type": "EV_CONNECTOR_TYPE_CCS_COMBO_1",
            "maxChargeRateKw": 100,
            "count": 2,
            "availableCount": 2,
            "outOfServiceCount": 0,
            "availabilityLastUpdateTime": "2024-01-10T19:10:00Z"
          },
          {
            "type": "EV_CONNECTOR_TYPE_CCS_COMBO_1",
            "maxChargeRateKw": 350,
            "count": 6,
            "availableCount": 3,
            "outOfServiceCount": 0,
            "availabilityLastUpdateTime": "2024-01-10T19:10:00Z"
          }
        ]
      }
    },
    {
      "displayName": {
        "text": "EVgo Charging Station",
        "languageCode": "en"
      },
      "evChargeOptions": {
        "connectorCount": 6,
        "connectorAggregation": [
          {
            "type": "EV_CONNECTOR_TYPE_CCS_COMBO_1",
            "maxChargeRateKw": 100,
            "count": 4,
            "availableCount": 3,
            "outOfServiceCount": 0,
            "availabilityLastUpdateTime": "2024-01-10T19:10:00Z"
          },
          {
            "type": "EV_CONNECTOR_TYPE_CCS_COMBO_1",
            "maxChargeRateKw": 350,
            "count": 2,
            "availableCount": 0,
            "outOfServiceCount": 2,
            "availabilityLastUpdateTime": "2024-01-10T19:10:00Z"
          }
        ]
      }
    },
    {
      "displayName": {
        "text": "EVgo Charging Station",
        "languageCode": "en"
      },
      "evChargeOptions": {
        "connectorCount": 5,
        "connectorAggregation": [
          {
            "type": "EV_CONNECTOR_TYPE_J1772",
            "maxChargeRateKw": 3.5999999046325684,
            "count": 1,
            "availableCount": 0,
            "outOfServiceCount": 1,
            "availabilityLastUpdateTime": "2024-01-10T19:10:00Z"
          },
          {
            "type": "EV_CONNECTOR_TYPE_CHADEMO",
            "maxChargeRateKw": 50,
            "count": 2,
            "availableCount": 0,
            "outOfServiceCount": 0,
            "availabilityLastUpdateTime": "2024-01-10T19:10:00Z"
          },
          {
            "type": "EV_CONNECTOR_TYPE_CCS_COMBO_1",
            "maxChargeRateKw": 50,
            "count": 2,
            "availableCount": 0,
            "outOfServiceCount": 0,
            "availabilityLastUpdateTime": "2024-01-10T19:10:00Z"
          }
        ]
      }
    },
    {
      "displayName": {
        "text": "Electric Vehicle Charging Station",
        "languageCode": "en"
      },
      "evChargeOptions": {
        "connectorCount": 10,
        "connectorAggregation": [
          {
            "type": "EV_CONNECTOR_TYPE_OTHER",
            "maxChargeRateKw": 210,
            "count": 10
          }
        ]
      }
    }
  ]
}
Search for service area businesses
Use the includePureServiceAreaBusinesses parameter to search for businesses without a physical service address (for example, a mobile cleaning service or a food truck).

The following example shows a request for plumbers in San Francisco:


curl -X POST -d '{
  "textQuery" : "plumber San Francisco",
  "includePureServiceAreaBusinesses": true
}' \
-H 'Content-Type: application/json' -H 'X-Goog-Api-Key: API_KEY' \
-H 'X-Goog-FieldMask: places.displayName,places.formattedAddress' \
'https://places.googleapis.com/v1/places:searchText'
In the response, businesses without a physical service address don't include the formattedAddress field:


{
  "places": [
    {
      "formattedAddress": "3450 Sacramento St #204, San Francisco, CA 94118, USA",
      "displayName": {
        "text": "Advanced Plumbing & Drain",
        "languageCode": "en"
      }
    },
    {
      "formattedAddress": "1455 Bancroft Ave, San Francisco, CA 94124, USA",
      "displayName": {
        "text": "Magic Plumbing Heating & Cooling",
        "languageCode": "en"
      }
    },
    /.../
    {
      "displayName": {
        "text": "Starboy Plumbing Inc.",
        "languageCode": "en"
      }
    },
    {
      "formattedAddress": "78 Dorman Ave, San Francisco, CA 94124, USA",
      "displayName": {
        "text": "Cabrillo Plumbing, Heating & Air",
        "languageCode": "en"
      }
    },
    {
      "formattedAddress": "540 Barneveld Ave # D, San Francisco, CA 94124, USA",
      "displayName": {
        "text": "Mr. Rooter Plumbing of San Francisco",
        "languageCode": "en"
      }
    },
    /.../
    {
      "displayName": {
        "text": "Pipeline Plumbing",
        "languageCode": "en"
      }
    },
    {
      "formattedAddress": "350 Bay St #100-178, San Francisco, CA 94133, USA",
      "displayName": {
        "text": "One Source Plumbing and Rooter",
        "languageCode": "en"
      }
    },
    /.../
  ]
}
Specify a number of results to return per page
Use the pageSize parameter to specify a number of results to return per page. The nextPageToken parameter in the response body provides a token that can be used in subsequent calls to access the next page of results.

The following example shows a request for "pizza in New York" limited to 5 results per page:


 curl -X POST -d '{
  "textQuery": "pizza in New York",
  "pageSize": 5
  }' \
-H 'Content-Type: application/json' -H 'X-Goog-Api-Key: API_KEY' \
-H "X-Goog-FieldMask: places.id,nextPageToken" \
'https://places.googleapis.com/v1/places:searchText'

{
  "places": [
    {
      "id": "ChIJifIePKtZwokRVZ-UdRGkZzs"
    },
    {
      "id": "ChIJPxPd_P1YwokRfzLhSiACEoU"
    },
    {
      "id": "ChIJrXXKn5NZwokR78g0ipCnY60"
    },
    {
      "id": "ChIJ6ySICVZYwokR9rIK8HjXhzE"
    },
    {
      "id": "ChIJ6xvs94VZwokRnT1D2lX2OTw"
    }
  ],
  "nextPageToken": "AeCrKXsZWzNVbPzO-MRWPu52jWO_Xx8aKwOQ69_Je3DxRpfdjClq8Ekwh3UcF2h2Jn75kL6PtWLGV4ecQri-GEUKN_OFpJkdVc-JL4Q"
}
To access the next page of results, use pageToken to pass in the nextPageToken in the request body:


 curl -X POST -d '{
  "textQuery": "pizza in New York",
  "pageSize": 5,
  "pageToken": "AeCrKXsZWzNVbPzO-MRWPu52jWO_Xx8aKwOQ69_Je3DxRpfdjClq8Ekwh3UcF2h2Jn75kL6PtWLGV4ecQri-GEUKN_OFpJkdVc-JL4Q"
  }' \
-H 'Content-Type: application/json' -H 'X-Goog-Api-Key: API_KEY' \
-H "X-Goog-FieldMask: places.id,nextPageToken" \
'https://places.googleapis.com/v1/places:searchText'

{
  "places": [
    {
      "id": "ChIJL-LN1N1ZwokR8K2jACu6Ydw"
    },
    {
      "id": "ChIJjaD94kFZwokR-20CXqlpy_4"
    },
    {
      "id": "ChIJ6ffdpJNZwokRmcafdROM5q0"
    },
    {
      "id": "ChIJ8Q2WSpJZwokRQz-bYYgEskM"
    },
    {
      "id": "ChIJ8164qwFZwokRhplkmhvq1uE"
    }
  ],
  "nextPageToken": "AeCrKXvPd6uUy-oj96W2OaqEe2pUD8QTxOM8-sKfUcFsC9t2Wey5qivrKGoGSxcZnyc7RPmaFfAktslrKbUh31ZDTkL0upRmaxA7c_c"
}
Note: All parameters other than maxResultCount, pageSize, and pageToken must be the same as the previous request. Otherwise, the API returns an INVALID_ARGUMENT error.
Try it!
The APIs Explorer lets you make sample requests so that you can get familiar with the API and the API options.

Select the API icon api on the right side of the page.

Optionally edit the request parameters.

Select the Execute button. In the dialog, choose the account that you want to use to make the request.

In the APIs Explorer panel, select the fullscreen icon fullscreen to expand the APIs Explorer window.

Open API Explorer
<google_places_v1_documentation>

<GOOGLE_API_KEY>
Key
<GOOGLE_API_KEY>





