# OneWay.Cab - Next.js Migration

This is the Next.js version of [OneWay.Cab](https://oneway.cab), India's leading one-way inter-city cab service.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📁 Project Structure

```
oneway-nextjs/
├── app/
│   ├── layout.tsx      # Root layout with Header/Footer
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── BookingForm.tsx # City selection form
│   ├── FeatureCards.tsx# USP feature cards
│   └── AppStoreButtons.tsx
├── lib/
│   ├── api.ts          # API utilities
│   └── constants.ts    # Site configuration
├── public/             # Static assets
└── ...config files
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🌐 Deployment to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Next.js and deploy

### Domain Setup

After deployment, configure your custom domain:

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add `beta.oneway.cab`
3. Configure DNS:
   - Add CNAME record: `beta` → `cname.vercel-dns.com`
   - Or A record: `76.76.19.19`

## 📝 Configuration

### Environment Variables

No environment variables required for basic setup. The API credentials are in `lib/constants.ts`.

For production, consider moving sensitive data to environment variables:

```env
NEXT_PUBLIC_API_URL=https://api.oneway.cab/third
NEXT_PUBLIC_BOOKING_URL=https://book.oneway.cab
```

### Analytics

Analytics are pre-configured in `app/layout.tsx`:
- Google Analytics: `UA-44427050-2`
- Google Tag Manager: `GTM-PXCX28C`
- Facebook Pixel: `905067014695257`

## 🔗 Booking Flow

All booking actions redirect to the existing booking microsite:

```
https://book.oneway.cab/check/{from}/{to}
```

Example: `https://book.oneway.cab/check/ahmedabad/vadodara`

## 📱 Features

- ✅ Responsive design (mobile-first)
- ✅ SEO optimized with meta tags
- ✅ Server-side rendering
- ✅ City autocomplete from API
- ✅ Analytics integration
- ✅ Fast performance (Edge deployment)

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#008bd2` | Main brand color |
| Accent Yellow | `#f1d40e` | CTAs, highlights |
| Gray | `#9d9d9c` | Secondary elements |
| Surface | `#EFF0F1` | Backgrounds |

## 📄 License

Copyright © 2013-2024 Baroda Taxi Cabs Pvt Ltd. All Rights Reserved.

## 🤝 Support

For support, contact: support@oneway.cab or call 08000 320 320
