# Auzi Homes PTY LTD – Website

Next.js 14 website with built-in CMS for Auzi Homes PTY LTD.

## Tech Stack

- **Next.js 14** (App Router) – React framework
- **Tailwind CSS** – Styling
- **Supabase** – Database, Auth & File Storage (free tier)
- **Vercel** – Hosting

---

## Setup Instructions

### Step 1 – Install Dependencies

```bash
npm install
```

### Step 2 – Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **SQL Editor** → paste and run `supabase-schema.sql`
4. Go to **Storage** → confirm the `project-images` bucket was created as public

### Step 3 – Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Supabase credentials:
   - Go to your Supabase project → **Settings → API**
   - Copy the **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy the **anon key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy the **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Step 4 – Enquiry Email Notifications

Contact-form enquiries are always saved to Supabase and visible in the admin
dashboard. To also get them emailed to you:

1. Sign up free at [resend.com](https://resend.com) — use the inbox you want
   enquiries delivered to
2. **API Keys → Create API Key**, then put it in `.env.local` as `RESEND_API_KEY`
3. Set `CONTACT_EMAIL` to the destination inbox
4. To send from your own domain, add `auzihomes.com.au` under **Domains** in
   Resend, add the DNS records it gives you, then set
   `RESEND_FROM="Auzi Homes <enquiries@auzihomes.com.au>"`

Until the domain is verified, `onboarding@resend.dev` works but can **only**
deliver to the address you registered with Resend.

If `RESEND_API_KEY` is empty the form still works — the enquiry is saved and the
visitor sees a success message; only the email notification is skipped.

### Step 5 – Create Admin User

1. In Supabase → **Authentication → Users**
2. Click **"Add User"** → **"Create new user"**
3. Enter an email and password for your admin (e.g. `admin@auzihomes.com.au`)
4. This is the login you'll use at `/admin`

### Step 6 – Add Your Logo

Replace `/public/logo.svg` with your actual logo file. The logo from the business card works best as a PNG at ~400×100px. Name it `logo.png` and update the `src` in:
- `components/Navbar.tsx` → change `/logo.svg` to `/logo.png`
- `components/Footer.tsx` → change `/logo.svg` to `/logo.png`
- `app/admin/page.tsx` → change `/logo.svg` to `/logo.png`
- `app/admin/dashboard/page.tsx` → change `/logo.svg` to `/logo.png`

### Step 7 – Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **New Project** → import from GitHub
3. In the **Environment Variables** section, add all variables from `.env.local`
4. Click **Deploy**

That's it! Vercel auto-deploys on every git push.

---

## Using the CMS

1. Go to `https://yourdomain.com/admin`
2. Log in with your Supabase admin email and password
3. **Dashboard** – view all projects and enquiries
4. **Add Project** – fill in title, description, address, images, video
5. **Star icon** – toggle a project as "featured" (shows on home page)
6. **Enquiries tab** – view all contact form submissions

---

## Pages

| Page | URL |
|------|-----|
| Home | `/` |
| Services | `/services` |
| Projects | `/projects` |
| Project Detail | `/projects/[id]` |
| About | `/about` |
| Contact | `/contact` |
| Admin Login | `/admin` |
| Admin Dashboard | `/admin/dashboard` |
| Add Project | `/admin/projects/new` |
| Edit Project | `/admin/projects/[id]/edit` |

---

## Contact Details in Use

- **Director:** Faizan Tayyab
- **Office:** 02 8361 0375
- **Mobile:** 0424 870 667
- **Licence:** 466481
- **ACN:** 673 861 893
