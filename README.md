# Porfolio

## Requirements

* Node.js **18** or higher

## Environment Variables

Copy `.env.example` to `.env` and populate the values for EmailJS and Supabase:

```bash
cp .env.example .env
```

Required variables:

- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### AWS S3 Variables

To enable file uploads you also need AWS credentials in `.env`:

- `VITE_AWS_REGION`
- `VITE_AWS_S3_BUCKET`
- `VITE_AWS_ACCESS_KEY_ID`
- `VITE_AWS_SECRET_ACCESS_KEY`

Create the bucket using the AWS CLI:

```bash
aws s3 mb s3://$VITE_AWS_S3_BUCKET --region $VITE_AWS_REGION
```

The IAM user used by the upload interface must have `s3:PutObject`,
`s3:GetObject` and `s3:ListBucket` permissions on the bucket.

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

### Upload Interface

Once the server is running, navigate to `/upload` to launch the interface for
sending files to S3. The script uses the AWS variables defined above. Ensure the
IAM user has the necessary permissions before uploading.

Example of linking to an uploaded file:

```html
<img src="https://$VITE_AWS_S3_BUCKET.s3.$VITE_AWS_REGION.amazonaws.com/example.jpg" alt="Example" />
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
