export interface Vendor {
  id: string;
  name: string;
  description: string;
  category: string;
  city: string;
  rating: number;
  reviews: number;
  photos: string[];
  website?: string;
  phone?: string;
  address?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export const vendors: Vendor[] = [
  {
    id: '1',
    name: 'Elegant Events by Sarah',
    description: 'Professional wedding planning services in Miami',
    category: 'Wedding Planners',
    city: 'Miami',
    rating: 4.8,
    reviews: 127,
    photos: [],
    website: 'https://elegantevents.com',
    phone: '(305) 555-0123',
    address: '123 Ocean Drive, Miami, FL 33139',
    location: {
      lat: 25.7865,
      lng: -80.1320
    }
  },
  {
    id: '2',
    name: 'Tropical Blooms Florist',
    description: 'Beautiful wedding floral arrangements in Orlando',
    category: 'Florists',
    city: 'Orlando',
    rating: 4.9,
    reviews: 89,
    photos: [],
    website: 'https://tropicalblooms.com',
    phone: '(407) 555-0456',
    address: '456 Lake Eola Drive, Orlando, FL 32801',
    location: {
      lat: 28.5383,
      lng: -81.3792
    }
  },
  {
    id: '3',
    name: 'Sunset Photography',
    description: 'Professional wedding photography in Tampa',
    category: 'Photographers',
    city: 'Tampa',
    rating: 4.7,
    reviews: 156,
    photos: [],
    website: 'https://sunsetphoto.com',
    phone: '(813) 555-0789',
    address: '789 Bayshore Boulevard, Tampa, FL 33606',
    location: {
      lat: 27.9506,
      lng: -82.4572
    }
  },
  {
    id: '4',
    name: 'Coastal Catering',
    description: 'Exquisite wedding catering in Jacksonville',
    category: 'Caterers',
    city: 'Jacksonville',
    rating: 4.6,
    reviews: 98,
    photos: [],
    website: 'https://coastalcatering.com',
    phone: '(904) 555-0123',
    address: '321 Riverwalk Place, Jacksonville, FL 32202',
    location: {
      lat: 30.3322,
      lng: -81.6557
    }
  },
  {
    id: '5',
    name: 'Melody Makers Band',
    description: 'Live wedding entertainment in Fort Lauderdale',
    category: 'Entertainment',
    city: 'Fort Lauderdale',
    rating: 4.8,
    reviews: 112,
    photos: [],
    website: 'https://melodymakers.com',
    phone: '(954) 555-0456',
    address: '654 Las Olas Boulevard, Fort Lauderdale, FL 33301',
    location: {
      lat: 26.1224,
      lng: -80.1373
    }
  },
  {
    id: '6',
    name: 'Sweet Dreams Bakery',
    description: 'Custom wedding cakes in St. Petersburg',
    category: 'Bakers',
    city: 'St. Petersburg',
    rating: 4.9,
    reviews: 145,
    photos: [],
    website: 'https://sweetdreams.com',
    phone: '(727) 555-0789',
    address: '987 Central Avenue, St. Petersburg, FL 33701',
    location: {
      lat: 27.7676,
      lng: -82.6403
    }
  },
  {
    id: '7',
    name: 'Luxury Limousine',
    description: 'Premium wedding transportation in West Palm Beach',
    category: 'Transportation',
    city: 'West Palm Beach',
    rating: 4.7,
    reviews: 78,
    photos: [],
    website: 'https://luxurylimo.com',
    phone: '(561) 555-0123',
    address: '147 Clematis Street, West Palm Beach, FL 33401',
    location: {
      lat: 26.7153,
      lng: -80.0534
    }
  },
  {
    id: '8',
    name: 'Venue Vista',
    description: 'Stunning wedding venues in Naples',
    category: 'Venues',
    city: 'Naples',
    rating: 4.8,
    reviews: 92,
    photos: [],
    website: 'https://venuevista.com',
    phone: '(239) 555-0456',
    address: '258 5th Avenue South, Naples, FL 34102',
    location: {
      lat: 26.1420,
      lng: -81.7948
    }
  }
]; 