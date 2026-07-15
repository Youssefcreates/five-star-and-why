# Five Star and Why

A production-ready Next.js and Supabase starter for a community review platform.

## Included

- Responsive cinematic/playful design
- Supabase email registration and sign-in
- Protected member profiles
- Review submission with moderation status
- Database row-level security
- Categories, discovery page, and author blog
- Vercel-ready configuration

## 1. Set up Supabase

Open your Supabase project, go to **SQL Editor**, create a new query, paste everything from `supabase/schema.sql`, and click **Run**.

In **Authentication > URL Configuration**, set:

- Site URL: your temporary Vercel URL initially
- Redirect URL: `https://fivestarandwhy.com/**` after the domain is connected

## 2. Local configuration

Copy `.env.example` to `.env.local` and enter the public Supabase publishable key. Never add a database password or service-role key.

## 3. Run locally

```bash
npm install
npm run dev
```

## 4. Deploy with Vercel

Import the GitHub repository in Vercel. Add these Environment Variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Deploy, then add `fivestarandwhy.com` under **Project Settings > Domains**. Vercel will show the DNS records to copy into GoDaddy.

## Moderation

New reviews use `pending` status. To publish the first submissions, open **Supabase > Table Editor > reviews** and change `status` to `published`. A custom admin dashboard can be added after the first deployment.

## Functional upgrade

After the original schema is installed, run `supabase/upgrade.sql` once in the Supabase SQL Editor. It enables the owner dashboard, moderation policies, and editable author blog.

## Important production note

The public publishable key is safe in browser code. Never commit a Supabase service-role key or database password.
