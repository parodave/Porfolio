export interface BlogSection {
  heading?: string;
  text: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  audioUrl?: string;
  pdfLinks?: Record<string, string>;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    title: 'Méthode 4D',
    slug: 'methode-4d',
    date: '2024-06-01',
    audioUrl:
      'https://supabase.example.com/storage/v1/object/public/blog/methode-4d.mp3',
    pdfLinks: {
      fr: '/methode-4d-fr.pdf',
      en: '/methode-4d-en.pdf'
    },
    sections: [
      {
        heading: 'Introduction',
        text:
          'La méthode 4D aide à clarifier, déléguer, différer puis faire disparaître les tâches inutiles.'
      },
      {
        heading: 'English',
        text:
          'The 4D method helps clarify, delegate, defer and finally delete useless tasks.'
      }
    ]
  }
];
