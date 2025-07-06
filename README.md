# Porfolio

## Requirements

* Node.js **18** or higher

## Environment Variables

Copy `.env.example` to `.env` and populate the values for EmailJS:

```bash
cp .env.example .env
```

Required variables:

- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`

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
