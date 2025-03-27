export interface Vendor {
  id: string;
  name: string;
  category: string;
  city: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  reviews: number;
}

export const vendors: Vendor[] = [
  // Jacksonville DJs
  {
    id: 'jax-dj-1',
    name: 'Elite Entertainment',
    category: 'Wedding DJs',
    city: 'Jacksonville',
    description: 'Professional DJ services for weddings and special events. We bring the perfect mix of music and entertainment to make your celebration unforgettable.',
    phone: '(904) 555-0123',
    email: 'info@eliteentertainment.com',
    website: 'www.eliteentertainment.com',
    rating: 4.8,
    reviews: 156
  },
  {
    id: 'jax-dj-2',
    name: 'Soundwave Productions',
    category: 'Wedding DJs',
    city: 'Jacksonville',
    description: 'Award-winning DJ services with state-of-the-art equipment and professional MC services.',
    phone: '(904) 555-0456',
    email: 'book@soundwaveproductions.com',
    website: 'www.soundwaveproductions.com',
    rating: 4.7,
    reviews: 98
  },

  // Jacksonville Photographers
  {
    id: 'jax-photo-1',
    name: 'Captured Moments Photography',
    category: 'Wedding Photographers',
    city: 'Jacksonville',
    description: 'Professional wedding photography capturing your special moments with artistic style and attention to detail.',
    phone: '(904) 555-0789',
    email: 'info@capturedmoments.com',
    website: 'www.capturedmoments.com',
    rating: 4.9,
    reviews: 203
  },

  // Jacksonville Transportation
  {
    id: 'jax-trans-1',
    name: 'Luxury Wedding Cars',
    category: 'Wedding Transportation',
    city: 'Jacksonville',
    description: 'Luxury transportation services for weddings with a fleet of elegant vehicles and professional chauffeurs.',
    phone: '(904) 555-0124',
    email: 'book@luxuryweddingcars.com',
    website: 'www.luxuryweddingcars.com',
    rating: 4.8,
    reviews: 167
  },

  // Miami Venues
  {
    id: 'miami-venue-1',
    name: 'Oceanview Estate',
    category: 'Wedding Venues',
    city: 'Miami',
    description: 'Stunning oceanfront venue with panoramic views and elegant indoor/outdoor spaces perfect for weddings.',
    phone: '(305) 555-0123',
    email: 'events@oceanviewestate.com',
    website: 'www.oceanviewestate.com',
    rating: 4.9,
    reviews: 245
  },
  {
    id: 'miami-venue-2',
    name: 'Tropical Gardens',
    category: 'Wedding Venues',
    city: 'Miami',
    description: 'Beautiful garden venue with tropical landscaping and multiple ceremony and reception spaces.',
    phone: '(305) 555-0456',
    email: 'info@tropicalgardens.com',
    website: 'www.tropicalgardens.com',
    rating: 4.7,
    reviews: 189
  },

  // Cape Coral DJs
  {
    id: 'cape-coral-dj-1',
    name: 'Coastal Beats Entertainment',
    category: 'Wedding DJs',
    city: 'Cape Coral',
    description: 'Professional DJ services specializing in weddings and special events in the Cape Coral area.',
    phone: '(239) 555-0123',
    email: 'info@coastalbeats.com',
    website: 'www.coastalbeats.com',
    rating: 4.8,
    reviews: 134
  }
]; 