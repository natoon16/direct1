// Define our known cities and categories
const CITIES = [
  'jacksonville',
  'miami',
  'tampa',
  'orlando',
  'st. petersburg',
  'hialeah',
  'port st. lucie',
  'tallahassee',
  'cape coral',
  'fort lauderdale',
  'pembroke pines',
  'hollywood',
  'gainesville',
  'miramar',
  'coral springs',
  'palm bay',
  'west palm beach',
  'clearwater',
  'lakeland',
  'pompano beach',
  'miami beach',
  'davie',
  'boca raton',
  'sunrise',
  'deltona',
  'plantation',
  'palm coast',
  'fort myers',
  'melbourne',
  'miami gardens',
  'largo',
  'homestead',
  'boynton beach',
  'kissimmee',
  'doral',
  'north port',
  'lauderhill',
  'daytona beach',
  'tamarac',
  'weston',
  'delray beach',
  'ocala',
  'port orange',
  'wellington',
  'jupiter',
  'north miami',
  'palm beach gardens',
  'margate',
  'coconut creek',
  'bradenton',
  'sanford',
  'sarasota',
  'pensacola',
  'bonita springs',
  'pinellas park',
  'coral gables',
  'winter haven',
  'titusville',
  'fort pierce',
  'winter garden',
  'altamonte springs',
  'cutler bay',
  'north lauderdale',
  'oakland park',
  'greenacres',
  'north miami beach',
  'ormond beach',
  'clermont',
  'lake worth beach',
  'hallandale beach',
  'aventura',
  'plant city',
  'royal palm beach',
  'winter springs',
  'riviera beach',
  'estero',
  'dunedin',
  'lauderdale lakes',
  'parkland',
  'cooper city',
  'panama city',
  'dania beach',
  'miami lakes',
  'new smyrna beach',
  'tarpon springs',
  'casselberry',
  'rockledge',
  'crestview',
  'leesburg',
  'palm springs',
  'marco island',
  'haines city',
  'key west',
  'west melbourne'
];

const CATEGORIES = [
  'coordinators',
  'dance-lessons',
  'alterations',
  'decor',
  'djs',
  'florists',
  'venues',
  'catering',
  'photography',
  'videography',
  'makeup',
  'hair',
  'transportation',
  'rentals'
];

export default function CategoryPage({
  params: { city, category }
}: {
  params: { city: string; category: string }
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {category} in {city}
      </h1>
      {/* Vendor list will be added here */}
    </div>
  );
}

// Generate static params for all known cities and categories
export async function generateStaticParams() {
  const params = [];
  
  for (const cityName of CITIES) {
    for (const category of CATEGORIES) {
      params.push({
        city: cityName,
        category: category
      });
    }
  }
  
  return params;
} 