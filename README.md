# Portfolio

## Requirements

* Node.js **18** or higher
* `three` **0.150.x** with `@react-three/fiber` **8.x**, `@react-three/drei` **9.x**
  and `@react-three/rapier` **1.x** – newer major versions of these
  packages require React 19

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

### `codex:fix` helper

If dependencies break inside the Codex workspace, use:

```bash
npm run codex:fix -- --reinstall --start
```
Add the `--reinstall` flag to wipe `node_modules` and reinstall packages with legacy peer deps. The script also patches `three-stdlib` and fixes outdated example imports.
It patches `three-globe` imports, removes unsupported WebGPU/TSL imports from `react-globe.gl` and ensures a proper `FrameTicker` export. Pass the `--start` flag to launch the dev server when the script finishes.

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

Always install dependencies before running the linter or test suite. Use the
standard install command or the custom fix script if packages break:

```bash
npm install
# or
npm run codex:fix
```

Missing packages will make `npm run lint` and `npm test` fail with "not found" errors.
`npm test` relies on the local `vitest` binary, so run `npm install` (or the fix script) before executing the tests, including in CI.

Run ESLint:

```bash
npm run lint
```

This project uses [Vitest](https://vitest.dev/) for unit tests. After installing dependencies, run:

```bash
npm test
```
Running the tests automatically creates a `dist/` directory using a setup script.

### Cleaning binary assets

Remove binary files from `public/` and `assets/` using:

```bash
npm run clean:binaries
```
The script respects `.gitignore`, logs each deleted file and prints a summary when finished.

## License

This project is licensed under the [MIT License](LICENSE).

## Interactive Globe

The site includes a `CountryGlobe` component powered by `react-globe.gl`. It
displays a 3D globe that focuses on selected countries.

```tsx
import CountryGlobe from './components/CountryGlobe';

export default function Example() {
  return <CountryGlobe />;
}
```

### Dark mode textures

You can swap the globe texture based on the current theme:

```tsx
const isDark = document.documentElement.classList.contains('dark');
const globeTexture = isDark
  ? '//unpkg.com/three-globe/example/img/earth-night.jpg'
  : '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg';

<CountryGlobe globeImageUrl={globeTexture} />;
```


