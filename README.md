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

### Syncing with GitHub

Use the `codex-sync.sh` script to push your changes from Codex to GitHub:

```bash
npm run codex:sync
```

Running the script performs the following steps:

1. Stages all modified files.
2. Prompts you for a commit message.
3. Commits your changes with that message.
4. Switches to the `main` branch and pulls the latest commits.
5. Merges the `codex-base` branch.
6. Pushes the updated `main` branch to GitHub.

When prompted, enter a concise commit message describing your work.

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

This project uses [Vitest](https://vitest.dev/) for unit tests. Run them with:

```bash
npm test
```

## License

This project is licensed under the [MIT License](LICENSE).
