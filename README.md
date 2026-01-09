# Jersey Jumpy - Website Rebuild

A modern Next.js 15 website for Jersey Jumpy, New Jersey's premier bounce house and inflatable rental company.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (customized)
- **Animations**: Framer Motion
- **Database**: Neon PostgreSQL via Drizzle ORM
- **Image Storage**: Vercel Blob
- **Email**: Elastic Email
- **Authentication**: NextAuth.js v5
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Environment Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in the environment variables (from Vercel dashboard after connecting):
   - `DATABASE_URL` - From Vercel's Neon integration
   - `BLOB_READ_WRITE_TOKEN` - From Vercel's Blob integration
   - `NEXTAUTH_SECRET` - Generate a secure random string
   - `ELASTIC_EMAIL_API_KEY` - Your Elastic Email API key

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Database Commands

```bash
# Generate migrations
npm run db:generate

# Push schema changes (development)
npm run db:push

# Open Drizzle Studio
npm run db:studio

# Run seed script
npm run db:seed
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── (public)/       # Public-facing pages
│   ├── admin/          # Admin panel pages
│   └── api/            # API routes
├── components/         # React components
│   ├── ui/            # Base UI components (shadcn)
│   ├── layout/        # Header, Footer, etc.
│   ├── home/          # Homepage sections
│   ├── inflatables/   # Inflatable-related components
│   └── admin/         # Admin panel components
├── lib/               # Utilities and configurations
│   ├── db/           # Database schema and client
│   ├── auth.ts       # NextAuth configuration
│   ├── email.ts      # Email helpers
│   └── utils.ts      # Utility functions
└── scripts/          # Migration and seed scripts
```

## Contact

JerseyJumpy.com LLC
- Toll Free: 866-597-6625
- Local: 732-750-8810
- Email: info@jerseyjumpy.com
