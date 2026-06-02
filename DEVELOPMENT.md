# Development Guide - Adrien Peinture

## 🛠️ Setup & Installation

### 1. Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- Git
- Code editor (VS Code recommended)

### 2. Initial Setup

```bash
# Clone repository
git clone https://github.com/adcaritey-dev/adrien-peinture.git
cd adrien-peinture

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the site live.

---

## 📁 Project Structure Explained

```
src/
├── app/                    # Next.js App Router (file-based routing)
│   ├── layout.tsx          # Root layout (Nav + Footer wrapper)
│   ├── page.tsx            # / - Homepage
│   ├── globals.css         # Global Tailwind styles
│   ├── gallery/
│   │   └── page.tsx        # /gallery - Gallery with filters
│   ├── about/
│   │   └── page.tsx        # /about - About page
│   ├── contact/
│   │   └── page.tsx        # /contact - Contact form
│   └── legal/
│       └── page.tsx        # /legal - Legal notices
├── components/             # Reusable React components
│   ├── Navigation.tsx      # Header navigation
│   └── Footer.tsx          # Footer with links
└── data/
    └── artworks.ts         # Artwork data structure
```

### Key Files

| File | Purpose |
|------|---------|
| `layout.tsx` | Root wrapper, metadata, global structure |
| `page.tsx` | File-based routing (each folder = route) |
| `globals.css` | Tailwind @layer directives |
| `tailwind.config.ts` | Color scheme, theme customization |
| `next.config.ts` | Next.js configuration |
| `package.json` | Dependencies & scripts |

---

## 🎨 Customization Guide

### 1. Change Colors

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#2E7D32',           // Green
      'primary-light': '#66BB6A',   // Light green
      secondary: '#FFFFFF',         // White
      accent: '#F5F5F5',           // Light gray
      'text-dark': '#222222',      // Dark text
    },
  },
},
```

### 2. Add Artworks

Edit `src/data/artworks.ts`:

```typescript
export const artworks: Artwork[] = [
  {
    id: '1',
    title: 'Mon Tableau',
    description: 'Description courte',
    image: '/images/artwork-1.jpg',
    category: 'Abstrait',
    technique: 'Acrylique',
    year: 2024,
    dimensions: '80 x 60 cm',
    price: 1200,
  },
  // Add more...
]
```

### 3. Update Personal Info

**Navigation/Header:**
```typescript
// src/components/Navigation.tsx
<Link href="/" className="font-serif text-2xl font-bold text-primary">
  Adrien  {/* Change name here */}
</Link>
```

**Footer:**
```typescript
// src/components/Footer.tsx
<h3 className="text-2xl font-serif font-bold">
  Adrien Peinture  {/* Brand name */}
</h3>

{/* Contact info */}
<p>contact@adrienpeinture.com</p>
<p>+33 (0) 1 23 45 67 89</p>
```

**About Page:**
```typescript
// src/app/about/page.tsx
<p className="text-lg text-gray-600">
  Votre bio ici...
</p>
```

---

## 🖼️ Working with Images

### Adding Artwork Images

1. **Place images in:** `public/images/`
2. **Recommended format:** JPG or WebP
3. **Minimum size:** 1920x1080px
4. **Aspect ratio:** 16:9 or 4:3

### Using Next.js Image Component

```typescript
import Image from 'next/image'

export default function Gallery() {
  return (
    <Image
      src="/images/artwork-1.jpg"
      alt="Artwork title"
      width={400}
      height={300}
      priority // for above-fold images
    />
  )
}
```

**Benefits:**
- ✨ Automatic optimization
- 📦 Format conversion (WebP, AVIF)
- ⚡ Lazy loading by default
- 🔍 Responsive images

---

## 📧 Email Integration

### Option 1: Formspree (Easiest)

1. Go to [formspree.io](https://formspree.io)
2. Create account & form
3. Update form in `src/app/contact/page.tsx`:

```typescript
<form action="https://formspree.io/f/YOUR_ID" method="POST">
  {/* fields */}
</form>
```

### Option 2: SendGrid (Professional)

1. Install SendGrid:
```bash
npm install @sendgrid/mail
```

2. Create API route `src/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    await sgMail.send({
      to: 'contact@adrienpeinture.com',
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: `Nouveau message: ${subject}`,
      html: `
        <h2>${subject}</h2>
        <p><strong>De:</strong> ${name} (${email})</p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
```

3. Add `.env.local`:
```
SENDGRID_API_KEY=your_api_key
SENDGRID_FROM_EMAIL=noreply@adrienpeinture.com
```

---

## 🔍 SEO Optimization

### 1. Meta Tags (Already done in `layout.tsx`)

```typescript
export const metadata: Metadata = {
  title: 'Adrien Peinture - Portfolio Artistique',
  description: 'Découvrez les œuvres de peinture artistique...',
  keywords: 'peinture, art, galerie, portfolio',
}
```

### 2. Per-Page Metadata

```typescript
// src/app/gallery/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galerie d\'Art | Adrien Peinture',
  description: 'Découvrez notre collection complète...',
}
```

### 3. Open Graph Images

Create `public/og-image.jpg` (1200x630px) for social sharing.

### 4. Sitemap (Future)

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://adrien.peinture.com</loc>
    <priority>1.0</priority>
  </url>
  <!-- Add more URLs -->
</urlset>
```

---

## 🎯 Adding New Pages

1. **Create folder:** `src/app/your-page/`
2. **Create file:** `src/app/your-page/page.tsx`
3. **URL becomes:** `/your-page`

Example:

```typescript
// src/app/blog/page.tsx
export default function Blog() {
  return (
    <main className="min-h-screen bg-secondary">
      <section className="container-custom py-32">
        <h1 className="section-title">Blog</h1>
        {/* Content */}
      </section>
    </main>
  )
}
```

---

## 🧪 Testing

### Build Test
```bash
npm run build
npm start
# Test at http://localhost:3000
```

### Lighthouse Audit
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Click "Analyze page load"
4. Target: 90+/100

---

## 📦 Deployment

### Deploy to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "Your message"
git push origin main

# 2. Go to vercel.com
# 3. Import this repository
# 4. Vercel auto-detects Next.js
# 5. Add environment variables if needed
# 6. Click "Deploy"
```

**Auto-redeploy:** Every push to `main` auto-deploys!

### Custom Domain

1. On Vercel dashboard → Settings → Domains
2. Add your domain: `adrien.peinture.com`
3. Update DNS records (instructions from Vercel)

---

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module not found errors
```bash
# Clear cache & reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styling not applied
- Check `globals.css` is imported in `layout.tsx`
- Restart dev server: `npm run dev`
- Clear browser cache (Ctrl+Shift+Delete)

### Image optimization errors
- Ensure image exists in `public/` folder
- Use proper file extensions (.jpg, .png, .webp)
- Check image dimensions aren't too small

---

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 🚀 Next Steps

1. ✅ Add artwork images to `public/images/`
2. ✅ Update `src/data/artworks.ts` with real data
3. ✅ Add personal bio and photos
4. ✅ Setup email integration (Formspree or SendGrid)
5. ✅ Test on mobile device
6. ✅ Deploy to Vercel
7. ✅ Set up custom domain
8. ✅ Configure Google Analytics

---

**Happy coding! 🎨**
