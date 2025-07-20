export interface Country {
  code: string;
  name: string;
  descriptionKey: string;
}

export const countries: Country[] = [
  { code: 'fr', name: 'France', descriptionKey: 'countries.france' },
  { code: 'uk', name: 'United Kingdom', descriptionKey: 'countries.unitedKingdom' },
  { code: 'es', name: 'Spain', descriptionKey: 'countries.spain' },
  { code: 'jp', name: 'Japan', descriptionKey: 'countries.japan' },
  { code: 'cn', name: 'China', descriptionKey: 'countries.china' },
  { code: 'sa', name: 'Saudi Arabia', descriptionKey: 'countries.saudiArabia' },
  { code: 'th', name: 'Thailand', descriptionKey: 'countries.thailand' },
];
