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

If Three.js packages fail after a fresh install, run the helper script:

```bash
npm run fix:three
```
This reinstalls compatible versions, patches `three-stdlib` and replaces legacy example imports.

### `codex:fix` helper

If dependencies break inside the Codex workspace, use:

```bash
npm run codex:fix -- --start
```
This wipes `node_modules`, reinstalls packages with legacy peer deps, patches `three-stdlib` and fixes outdated example imports. Pass the `--start` flag to launch the dev server when the script finishes.
It also removes unsupported WebGPU/TSL imports from `react-globe.gl`, which resolves build errors caused by Three.js examples.

### Troubleshooting

Run the debug command if you keep seeing errors with Three.js or Vite:

```bash
npm run debug:all
```
This removes `node_modules`, reinstalls dependencies with the `three-stdlib` patch and then starts the development server. It replaces manually deleting the `node_modules` directory and often resolves common build issues.

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

This project uses [Vitest](https://vitest.dev/) for unit tests. Install dependencies first with `npm install` (run `npm run fix:three` if the install fails), then run the tests with:

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

## TravelMap Joystick Usage

To test the new on-screen joystick:

1. Start the development server with `npm run dev`.
2. Open the site on a mobile device or using the browser's device emulator.
3. Navigate to the component that renders `<TravelMap />`.
4. A translucent circle appears in the bottom-left corner.
5. Drag inside this circle to move the camera around the map.
6. Resize to a desktop viewport and confirm the joystick is hidden.

