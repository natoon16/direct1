export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  keywords: string[];
}

export const categories: Category[] = [
  {
    id: 'wedding-venues',
    name: 'Wedding Venues',
    slug: 'wedding-venues',
    description: 'Beautiful locations for your wedding ceremony and reception.',
    keywords: ['wedding venue', 'reception venue', 'ceremony venue', 'banquet hall', 'event space']
  },
  {
    id: 'wedding-planners',
    name: 'Wedding Planners',
    slug: 'wedding-planners',
    description: 'Professional wedding planning and coordination services.',
    keywords: ['wedding planner', 'event planner', 'wedding coordinator', 'day-of coordinator']
  },
  {
    id: 'photographers',
    name: 'Wedding Photographers',
    slug: 'photographers',
    description: 'Professional photographers to capture your special moments.',
    keywords: ['wedding photographer', 'engagement photographer', 'bridal photographer']
  },
  {
    id: 'videographers',
    name: 'Wedding Videographers',
    slug: 'videographers',
    description: 'Professional videographers to film your wedding day.',
    keywords: ['wedding videographer', 'wedding cinematographer', 'wedding film']
  },
  {
    id: 'catering',
    name: 'Wedding Catering',
    slug: 'catering',
    description: 'Delicious food and beverage services for your wedding.',
    keywords: ['wedding catering', 'wedding food', 'wedding menu', 'wedding buffet']
  },
  {
    id: 'florists',
    name: 'Wedding Florists',
    slug: 'florists',
    description: 'Beautiful floral arrangements and decorations.',
    keywords: ['wedding florist', 'floral designer', 'wedding flowers', 'bouquets']
  },
  {
    id: 'djs',
    name: 'Wedding DJs',
    slug: 'djs',
    description: 'Professional DJs to keep your party going.',
    keywords: ['wedding dj', 'wedding music', 'reception music', 'dance music']
  },
  {
    id: 'bands',
    name: 'Wedding Bands',
    slug: 'bands',
    description: 'Live music entertainment for your wedding.',
    keywords: ['wedding band', 'live music', 'wedding entertainment', 'wedding singer']
  },
  {
    id: 'rentals',
    name: 'Wedding Rentals',
    slug: 'rentals',
    description: 'Furniture, decor, and equipment rentals.',
    keywords: ['wedding rentals', 'tent rental', 'chair rental', 'table rental', 'decor rental']
  },
  {
    id: 'beauty',
    name: 'Beauty & Makeup',
    slug: 'beauty',
    description: 'Hair styling and makeup services for your wedding day.',
    keywords: ['wedding makeup', 'bridal makeup', 'hair stylist', 'beauty services']
  },
  {
    id: 'transportation',
    name: 'Wedding Transportation',
    slug: 'transportation',
    description: 'Luxury transportation services for your wedding.',
    keywords: ['wedding limo', 'wedding transportation', 'luxury car service', 'party bus']
  },
  {
    id: 'cakes',
    name: 'Wedding Cakes',
    slug: 'cakes',
    description: 'Custom wedding cakes and desserts.',
    keywords: ['wedding cake', 'wedding desserts', 'custom cakes', 'bakery']
  },
  {
    id: 'invitations',
    name: 'Wedding Invitations',
    slug: 'invitations',
    description: 'Custom invitations and stationery.',
    keywords: ['wedding invitations', 'save the dates', 'wedding stationery', 'custom invites']
  },
  {
    id: 'dresses',
    name: 'Wedding Dresses',
    slug: 'dresses',
    description: 'Bridal gowns and wedding dresses.',
    keywords: ['wedding dress', 'bridal gown', 'wedding attire', 'bridal shop']
  },
  {
    id: 'tuxedos',
    name: 'Tuxedos & Suits',
    slug: 'tuxedos',
    description: 'Wedding suits and formal wear.',
    keywords: ['wedding tuxedo', 'suit rental', 'formal wear', 'mens attire']
  },
  {
    id: 'jewelry',
    name: 'Wedding Jewelry',
    slug: 'jewelry',
    description: 'Wedding rings and bridal jewelry.',
    keywords: ['wedding rings', 'engagement rings', 'bridal jewelry', 'wedding bands']
  },
  {
    id: 'officiants',
    name: 'Wedding Officiants',
    slug: 'officiants',
    description: 'Professional wedding officiants and ministers.',
    keywords: ['wedding officiant', 'minister', 'ceremony officiant', 'marriage officiant']
  },
  {
    id: 'decor',
    name: 'Wedding Decor',
    slug: 'decor',
    description: 'Wedding decorations and design services.',
    keywords: ['wedding decorations', 'event design', 'wedding styling', 'decor rental']
  },
  {
    id: 'favors',
    name: 'Wedding Favors',
    slug: 'favors',
    description: 'Custom wedding favors and gifts.',
    keywords: ['wedding favors', 'party favors', 'wedding gifts', 'guest gifts']
  },
  {
    id: 'lighting',
    name: 'Wedding Lighting',
    slug: 'lighting',
    description: 'Professional lighting design and services.',
    keywords: ['wedding lighting', 'event lighting', 'uplighting', 'lighting design']
  }
]; 