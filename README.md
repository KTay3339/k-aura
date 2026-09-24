# K Aura Salon

Full-stack K Aura Salon website for flexible booth and suite rentals, professional applications, provider profiles, salon events, tour inquiries, and event-newsletter subscriptions.

## Current stack

- Next.js 16 and React 19 through Vinext/Vite
- Cloudflare Workers runtime
- Cloudflare D1 with Drizzle ORM
- Cloudflare R2 for uploaded profile images and credentials
- Resend for the event-subscriber welcome email
- Acuity Scheduling for salon-space availability, booking, and payment

## Requirements

- Node.js 22.13 or newer
- npm
- A Cloudflare-compatible development environment for D1 and R2 bindings

## Run locally

1. Clone the repository and open its folder in Visual Studio Code.
2. Install the locked dependencies:

   ```bash
   npm ci
   ```

3. Copy `.env.example` to `.env` and add local-only values where needed.
4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local address displayed in the terminal, normally `http://localhost:3000`.

Never commit `.env`, `.dev.vars`, API keys, passwords, or production subscriber data.

## Commands

```bash
npm run dev          # local development
npm run build        # production build
npm test             # build and project tests
npm run lint         # lint the source
npm run db:generate  # generate a migration after schema edits
```

## Runtime configuration

The existing ChatGPT Site identity and Cloudflare bindings are declared in `.openai/hosting.json`:

- `DB` — D1 database binding
- `BUCKET` — R2 storage binding

Production secrets must be configured in the hosting environment rather than added to the repository.

| Variable | Purpose |
| --- | --- |
| `ADMIN_EMAILS` | Comma-separated emails allowed to use the admin pages |
| `RESEND_API_KEY` | Private Resend API key used only by the server route |
| `RESEND_FROM_EMAIL` | Verified sender, such as `K Aura Salon <events@kaurasalon.com>` |

## Main project areas

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Homepage, rentals, events, rates, and primary calls to action |
| `app/rental-card.tsx` | Auto-flipping booth and suite cards |
| `app/apply/` | Professional application flow |
| `app/professionals/` | Approved professional directory and profiles |
| `app/admin/` | Application, event, and tour management |
| `app/api/` | Server endpoints for applications, tours, events, subscribers, and files |
| `db/schema.ts` | D1 database schema |
| `drizzle/` | Database migrations |
| `public/` | Repository-owned static assets |

## Important implementation notes

- Rental booking currently opens K Aura's Acuity scheduler.
- Professional profiles store a professional's own booking URL. The planned embedded-or-external client booking option still needs to be implemented.
- Newsletter subscriptions are saved to D1 first. A welcome email is attempted only when `RESEND_API_KEY` is configured.
- Images currently used on the homepage are hosted by Acuity and referenced by URL; they are not local image files.
- Admin access depends on authenticated user headers supplied by the current Sites environment plus the `ADMIN_EMAILS` allowlist. Rework authentication before moving the admin area to unrelated hosting.

## GitHub upload

See [GITHUB_UPLOAD_GUIDE.md](./GITHUB_UPLOAD_GUIDE.md) for the safest first upload and VS Code workflow.
