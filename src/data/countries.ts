export interface Country {
  code: string;
  lat: number;
  lng: number;
  name: {
    fr: string;
    en: string;
  };
}

export const countries: Country[] = [
  { code: 'FR', lat: 46.2276, lng: 2.2137, name: { fr: 'France', en: 'France' } },
  { code: 'US', lat: 37.0902, lng: -95.7129, name: { fr: 'États-Unis', en: 'United States' } },
  { code: 'MA', lat: 31.7917, lng: -7.0926, name: { fr: 'Maroc', en: 'Morocco' } },
  { code: 'JP', lat: 36.2048, lng: 138.2529, name: { fr: 'Japon', en: 'Japan' } },
  { code: 'BR', lat: -14.2350, lng: -51.9253, name: { fr: 'Brésil', en: 'Brazil' } },
  { code: 'CA', lat: 56.1304, lng: -106.3468, name: { fr: 'Canada', en: 'Canada' } },
  { code: 'ES', lat: 40.4637, lng: -3.7492, name: { fr: 'Espagne', en: 'Spain' } },
  { code: 'TH', lat: 15.8700, lng: 100.9925, name: { fr: 'Thaïlande', en: 'Thailand' } },
  { code: 'AU', lat: -25.2744, lng: 133.7751, name: { fr: 'Australie', en: 'Australia' } },
  { code: 'DE', lat: 51.1657, lng: 10.4515, name: { fr: 'Allemagne', en: 'Germany' } },
];
