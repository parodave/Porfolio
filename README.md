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
loaded from [`src/data/visitedCountries.json`](src/data/visitedCountries.json)
and the earth textures are stored in [`public/textures/`](public/textures/).
Dark and light versions of the texture are swapped automatically based on the
current theme.
