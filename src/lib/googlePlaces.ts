export async function getGooglePlacesData(query: string) {
  const response = await fetch(
    `https://places.googleapis.com/v1/places:searchText`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY || '',
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.websiteUri,places.rating,places.userRatingCount,places.photos',
      },
      body: JSON.stringify({
        textQuery: query,
        rankPreference: 'RELEVANCE',
        maxResultCount: 10,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }

  return response.json();
} 