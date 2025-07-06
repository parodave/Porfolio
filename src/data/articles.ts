export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  audio: string;
}

// Audio and image files are stored on S3

export const articles: Article[] = [
  {
    id: '1',
    slug: 'premier-article',
    title: 'Bienvenue sur mon blog',
    content: `Ceci est le premier article de mon blog. Il contient un court extrait audio pour accompagner la lecture.`,
    audio: 'https://example-bucket.s3.amazonaws.com/audio/beep.wav'
  }
];
