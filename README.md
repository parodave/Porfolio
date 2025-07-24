# Portfolio

## Requirements

* Node.js **18** or higher
* `three` **0.150.x** with `@react-three/fiber` **8.x**, `@react-three/drei` **9.x`
  and `@react-three/rapier` **1.x** – newer major versions of these
  packages require React 19

## Environment Variables

Copy `.env.example` to `.env` and populate your EmailJS configuration:

```bash
cp .env.example .env
```

## How the Globe Works

The site features a 3D globe rendered with `react-globe.gl`. Country markers are
defined in [`src/data/countries.ts`](src/data/countries.ts) (generated from
[`data/countries.json`](data/countries.json)), and the earth textures are stored
in [`public/textures/`](public/textures/).
Dark and light versions of the texture are swapped automatically based on the
current theme.

These images are tracked using **Git LFS**. Running `npm run clean:binaries` will delete binary files in `public/` and `assets/`, so make sure the globe textures are restored afterwards with `git checkout` or avoid cleaning them.
