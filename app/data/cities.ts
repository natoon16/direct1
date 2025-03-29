export interface City {
  id: string;
  name: string;
  county: string;
  population: number;
  slug: string;
  latitude: number;
  longitude: number;
}

export const cities: City[] = [
  {
    id: 'jacksonville',
    name: 'Jacksonville',
    county: 'Duval',
    population: 949611,
    slug: 'jacksonville',
    latitude: 30.3322,
    longitude: -81.6557
  },
  {
    id: 'miami',
    name: 'Miami',
    county: 'Miami-Dade',
    population: 442241,
    slug: 'miami',
    latitude: 25.7617,
    longitude: -80.1918
  },
  {
    id: 'tampa',
    name: 'Tampa',
    county: 'Hillsborough',
    population: 384959,
    slug: 'tampa',
    latitude: 27.9506,
    longitude: -82.4572
  },
  {
    id: 'orlando',
    name: 'Orlando',
    county: 'Orange',
    population: 307573,
    slug: 'orlando',
    latitude: 28.5383,
    longitude: -81.3792
  },
  {
    id: 'st-petersburg',
    name: 'St. Petersburg',
    county: 'Pinellas',
    population: 258308,
    slug: 'st-petersburg',
    latitude: 27.7676,
    longitude: -82.6403
  },
  {
    id: 'hialeah',
    name: 'Hialeah',
    county: 'Miami-Dade',
    population: 223109,
    slug: 'hialeah',
    latitude: 25.8576,
    longitude: -80.2781
  },
  {
    id: 'port-st-lucie',
    name: 'Port St. Lucie',
    county: 'St. Lucie',
    population: 204851,
    slug: 'port-st-lucie',
    latitude: 27.2939,
    longitude: -80.3503
  },
  {
    id: 'cape-coral',
    name: 'Cape Coral',
    county: 'Lee',
    population: 194016,
    slug: 'cape-coral',
    latitude: 26.5629,
    longitude: -81.9495
  },
  {
    id: 'tallahassee',
    name: 'Tallahassee',
    county: 'Leon',
    population: 196169,
    slug: 'tallahassee',
    latitude: 30.4383,
    longitude: -84.2807
  },
  {
    id: 'fort-lauderdale',
    name: 'Fort Lauderdale',
    county: 'Broward',
    population: 182760,
    slug: 'fort-lauderdale',
    latitude: 26.1224,
    longitude: -80.1373
  },
  {
    id: 'west-palm-beach',
    name: 'West Palm Beach',
    county: 'Palm Beach',
    population: 117415,
    slug: 'west-palm-beach',
    latitude: 26.7153,
    longitude: -80.0534
  },
  {
    name: 'Pembroke Pines',
    county: 'Broward',
    latitude: 26.0128,
    longitude: -80.3377
  },
  {
    name: 'Hollywood',
    county: 'Broward',
    latitude: 26.0112,
    longitude: -80.1495
  },
  {
    name: 'Gainesville',
    county: 'Alachua',
    latitude: 29.6516,
    longitude: -82.3248
  },
  {
    name: 'Miramar',
    county: 'Broward',
    latitude: 25.9860,
    longitude: -80.3035
  },
  {
    name: 'Coral Springs',
    county: 'Broward',
    latitude: 26.2707,
    longitude: -80.2706
  },
  {
    name: 'Clearwater',
    county: 'Pinellas',
    latitude: 27.9659,
    longitude: -82.8001
  },
  {
    name: 'Miami Gardens',
    county: 'Miami-Dade',
    latitude: 25.9420,
    longitude: -80.2456
  },
  {
    name: 'Palm Bay',
    county: 'Brevard',
    latitude: 27.9684,
    longitude: -80.6700
  },
  {
    name: 'Pompano Beach',
    county: 'Broward',
    latitude: 26.2379,
    longitude: -80.1247
  },
  {
    name: 'Lakeland',
    county: 'Polk',
    latitude: 28.0395,
    longitude: -81.9498
  },
  {
    name: 'Davie',
    county: 'Broward',
    latitude: 26.0765,
    longitude: -80.2521
  },
  {
    name: 'Miami Beach',
    county: 'Miami-Dade',
    latitude: 25.7907,
    longitude: -80.1300
  },
  {
    name: 'Sunrise',
    county: 'Broward',
    latitude: 26.1669,
    longitude: -80.2564
  },
  {
    name: 'Plantation',
    county: 'Broward',
    latitude: 26.1276,
    longitude: -80.2331
  },
  {
    name: 'Boca Raton',
    county: 'Palm Beach',
    latitude: 26.3683,
    longitude: -80.1289
  },
  {
    name: 'Deltona',
    county: 'Volusia',
    latitude: 28.9005,
    longitude: -81.2637
  },
  {
    name: 'Melbourne',
    county: 'Brevard',
    latitude: 28.0836,
    longitude: -80.6081
  },
  {
    name: 'Deerfield Beach',
    county: 'Broward',
    latitude: 26.3184,
    longitude: -80.0998
  },
  {
    name: 'Boynton Beach',
    county: 'Palm Beach',
    latitude: 26.5317,
    longitude: -80.0905
  },
  {
    name: 'Lauderhill',
    county: 'Broward',
    latitude: 26.1403,
    longitude: -80.2136
  },
  {
    name: 'Weston',
    county: 'Broward',
    latitude: 26.1004,
    longitude: -80.3998
  },
  {
    name: 'Fort Myers',
    county: 'Lee',
    latitude: 26.6406,
    longitude: -81.8723
  },
  {
    name: 'Kissimmee',
    county: 'Osceola',
    latitude: 28.2919,
    longitude: -81.4078
  },
  {
    name: 'Homestead',
    county: 'Miami-Dade',
    latitude: 25.4687,
    longitude: -80.4776
  },
  {
    name: 'Daytona Beach',
    county: 'Volusia',
    latitude: 29.2108,
    longitude: -81.0228
  },
  {
    name: 'Delray Beach',
    county: 'Palm Beach',
    latitude: 26.4615,
    longitude: -80.0728
  },
  {
    name: 'Tamarac',
    county: 'Broward',
    latitude: 26.2035,
    longitude: -80.2497
  },
  {
    name: 'Wellington',
    county: 'Palm Beach',
    latitude: 26.6593,
    longitude: -80.2697
  },
  {
    name: 'North Miami',
    county: 'Miami-Dade',
    latitude: 25.8900,
    longitude: -80.1867
  },
  {
    name: 'Jupiter',
    county: 'Palm Beach',
    latitude: 26.9342,
    longitude: -80.0942
  }
]; 