export interface City {
  name: string;
  county: string;
  latitude: number;
  longitude: number;
}

export const cities: City[] = [
  {
    name: 'Miami',
    county: 'Miami-Dade',
    latitude: 25.7617,
    longitude: -80.1918
  },
  {
    name: 'Orlando',
    county: 'Orange',
    latitude: 28.5383,
    longitude: -81.3792
  },
  {
    name: 'Tampa',
    county: 'Hillsborough',
    latitude: 27.9506,
    longitude: -82.4572
  },
  {
    name: 'Jacksonville',
    county: 'Duval',
    latitude: 30.3322,
    longitude: -81.6557
  },
  {
    name: 'Fort Lauderdale',
    county: 'Broward',
    latitude: 26.1224,
    longitude: -80.1373
  },
  {
    name: 'West Palm Beach',
    county: 'Palm Beach',
    latitude: 26.7153,
    longitude: -80.0534
  },
  {
    name: 'Sarasota',
    county: 'Sarasota',
    latitude: 27.3364,
    longitude: -82.5307
  },
  {
    name: 'Naples',
    county: 'Collier',
    latitude: 26.1420,
    longitude: -81.7948
  },
  {
    name: 'St Petersburg',
    county: 'Pinellas',
    latitude: 27.7676,
    longitude: -82.6403
  },
  {
    name: 'Clearwater',
    county: 'Pinellas',
    latitude: 27.9659,
    longitude: -82.8001
  }
]; 