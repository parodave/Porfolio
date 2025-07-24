export interface Continent {
  id: string;
  name: string;
  lat: number;
  lng: number;
  image: string;
  description: string;
}

export const continents: Continent[] = [
  {
    id: 'africa',
    name: 'Afrique',
    lat: 0,
    lng: 20,
    image: 'https://images.pexels.com/photos/1640257/pexels-photo-1640257.jpeg',
    description: "Berceau d'une culture riche et d'une biodiversité unique.",
  },
  {
    id: 'europe',
    name: 'Europe',
    lat: 48,
    lng: 8,
    image: 'https://images.pexels.com/photos/227798/pexels-photo-227798.jpeg',
    description: "Continent d'histoire, d'art et d'innovation.",
  },
  {
    id: 'asia',
    name: 'Asie',
    lat: 30,
    lng: 100,
    image: 'https://images.pexels.com/photos/237273/pexels-photo-237273.jpeg',
    description: "Mélange fascinant de traditions et de technologies modernes.",
  },
  {
    id: 'north-america',
    name: 'Amérique du Nord',
    lat: 40,
    lng: -100,
    image: 'https://images.pexels.com/photos/88270/pexels-photo-88270.jpeg',
    description: 'Des paysages variés entre grands espaces et métropoles.',
  },
  {
    id: 'south-america',
    name: 'Amérique du Sud',
    lat: -15,
    lng: -60,
    image: 'https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg',
    description: 'Culture chaleureuse au coeur de la nature tropicale.',
  },
  {
    id: 'oceania',
    name: 'Océanie',
    lat: -25,
    lng: 140,
    image: 'https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg',
    description: 'Îles paradisiaques et faune extraordinaire.',
  },
];
