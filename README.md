# Porfolio

## Requirements

* Node.js **18** or higher

## Environment Variables

Copy `.env.example` to `.env` and populate your EmailJS configuration:

```bash
cp .env.example .env
```

Required variables:

- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_LIBRETRANSLATE_URL`
- `VITE_GA_ID`

`VITE_LIBRETRANSLATE_URL` should point to a LibreTranslate instance. You can
use the public instance at `https://libretranslate.com/translate`, or run your
own server by following the instructions at
<https://github.com/LibreTranslate/LibreTranslate>.

## Installation

Install dependencies with:

```bash
npm install
```

## Development

Start the Vite development server:

```bash
npm run dev
```

## Production Build

Create an optimized production build in the `dist/` directory:

```bash
npm run build
```

## Linting and Tests

Run ESLint:

```bash
npm run lint
```

This project does not yet include automated tests, but you can add your
preferred framework and run them with `npm test` once configured.

## Adding Blog Articles

Blog posts are defined in `src/data/blogData.ts`. Each entry is keyed by its
slug and contains French and English fields. To add a new article, append an
object with the following structure:

```ts
export const blogData = {
  'my-new-post': {
    slug: 'my-new-post',
    title: { fr: 'Titre FR', en: 'English title' },
    summary: { fr: 'Résumé...', en: 'Summary...' },
    content: { fr: 'Contenu...', en: 'Content...' },
    date: '2025-01-01',
    audio: '/path/to/audio.mp3',
    pdf: { fr: '/post-fr.pdf', en: '/post-en.pdf' },
  },
};
```

Simply add your article to the exported object and restart the development
server.

## License

This project is licensed under the [MIT License](LICENSE).
