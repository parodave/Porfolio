export interface Country {
  code: string;
  lat: number;
  lng: number;
  name: {
    fr: string;
    en: string;
  };
  descriptionKey: string;
}

export const countries: Country[] = [
  {
    code: 'FR',
    lat: 46.2276,
    lng: 2.2137,
    name: { fr: 'France', en: 'France' },
    descriptionKey: 'countries.france'
  },
  {
    code: 'UK',
    lat: 55.3781,
    lng: -3.4360,
    name: { fr: 'Royaume-Uni', en: 'United Kingdom' },
    descriptionKey: 'countries.unitedKingdom'
  },
  {
    code: 'ES',
    lat: 40.4637,
    lng: -3.7492,
    name: { fr: 'Espagne', en: 'Spain' },
    descriptionKey: 'countries.spain'
  },
  {
    code: 'JP',
    lat: 36.2048,
    lng: 138.2529,
    name: { fr: 'Japon', en: 'Japan' },
    descriptionKey: 'countries.japan'
  },
  {
    code: 'CN',
    lat: 35.8617,
    lng: 104.1954,
    name: { fr: 'Chine', en: 'China' },
    descriptionKey: 'countries.china'
  },
  {
    code: 'SA',
    lat: 23.8859,
    lng: 45.0792,
    name: { fr: 'Arabie Saoudite', en: 'Saudi Arabia' },
    descriptionKey: 'countries.saudiArabia'
  },
  {
    code: 'TH',
    lat: 15.8700,
    lng: 100.9925,
    name: { fr: 'Thaïlande', en: 'Thailand' },
    descriptionKey: 'countries.thailand'
  },
  {
    code: 'MA',
    lat: 31.7917,
    lng: -7.0926,
    name: { fr: 'Maroc', en: 'Morocco' },
    descriptionKey: 'countries.morocco'
  },
  {
    code: 'BR',
    lat: -14.2350,
    lng: -51.9253,
    name: { fr: 'Brésil', en: 'Brazil' },
    descriptionKey: 'countries.brazil'
  },
  {
    code: 'CA',
    lat: 56.1304,
    lng: -106.3468,
    name: { fr: 'Canada', en: 'Canada' },
    descriptionKey: 'countries.canada'
  },
  {
    code: 'AU',
    lat: -25.2744,
    lng: 133.7751,
    name: { fr: 'Australie', en: 'Australia' },
    descriptionKey: 'countries.australia'
  },
  {
    code: 'DE',
    lat: 51.1657,
    lng: 10.4515,
    name: { fr: 'Allemagne', en: 'Germany' },
    descriptionKey: 'countries.germany'
  },
  {
    code: 'US',
    lat: 37.0902,
    lng: -95.7129,
    name: { fr: 'États-Unis', en: 'United States' },
    descriptionKey: 'countries.unitedStates'
  }
];
