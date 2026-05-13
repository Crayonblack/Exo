# EXO Energy Management System - Next.js Setup Guide

This guide provides detailed instructions for setting up this project in a Next.js environment.

## Project Structure for Next.js App Router

```
your-nextjs-project/
├── app/
│   ├── layout.tsx              # Root layout with ThemeProvider
│   ├── page.tsx                # Main dashboard page (uses App.tsx component)
│   ├── providers/
│   │   └── ThemeProvider.tsx   # Theme provider wrapper
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── MetricCard.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── PowerUsageChart.tsx
│   │   ├── DonutChart.tsx
│   │   ├── EnergyFlowChart.tsx
│   │   ├── ConsumptionBreakdown.tsx
│   │   ├── SystemStatus.tsx
│   │   ├── ActiveAlerts.tsx
│   │   ├── SideNav.tsx
│   │   ├── BottomNav.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── DesignSystemShowcase.tsx
│   ├── utils/
│   │   └── cn.ts               # Tailwind merge utility
│   └── globals.css             # Import all styles here
├── public/
│   └── fonts/                  # Optional: self-host Inter font
├── styles/
│   ├── theme.css               # Design tokens and CSS variables
│   └── fonts.css               # Font and Unovis imports
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Installation Steps

### 1. Create Next.js Project

```bash
npx create-next-app@latest exo-energy --typescript --tailwind --app
cd exo-energy
```

### 2. Install Dependencies

```bash
pnpm add @unovis/ts @unovis/react next-themes lucide-react class-variance-authority clsx tailwind-merge
```

### 3. Configure Tailwind CSS

Update `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

### 4. Setup Root Layout

Create `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./providers/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EXO - Energy Management System",
  description: "Real-time energy monitoring and analytics dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### 5. Setup Global Styles

Create `app/globals.css` and import all styles:

```css
@import '../styles/fonts.css';
@import '../styles/theme.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 6. Create Main Page

Create `app/page.tsx`:

```typescript
import App from "./App";

export default function Home() {
  return <App />;
}
```

### 7. Copy All Component Files

Copy all files from this project's structure:
- `app/components/*` → Your Next.js `app/components/`
- `app/providers/*` → Your Next.js `app/providers/`
- `app/utils/*` → Your Next.js `app/utils/`
- `app/App.tsx` → Your Next.js `app/App.tsx`
- `styles/*` → Your Next.js `styles/`

## Key Differences from Standard React

### 1. Client Components

All interactive components MUST have `'use client';` directive at the top:
- Components using hooks (useState, useEffect, useTheme, etc.)
- Components with event handlers (onClick, onChange, etc.)
- Components using browser APIs

### 2. Server Components (Default)

These components can remain as server components (no 'use client'):
- Static card components without interactivity
- Layout components without state
- Pure presentational components

### 3. Unovis Chart Components

Unovis components are client-side only and require `'use client';` directive.

## Next.js Specific Optimizations

### 1. Font Optimization

Instead of importing from Google Fonts CDN, use Next.js font optimization:

```typescript
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
```

### 2. Image Optimization

Replace `<img>` tags with Next.js `<Image>` component:

```typescript
import Image from "next/image";

<Image
  src="/assets/logo.png"
  alt="EXO Logo"
  width={120}
  height={40}
  priority
/>
```

### 3. Metadata

Use Next.js metadata API in page files:

```typescript
export const metadata = {
  title: "Dashboard | EXO",
  description: "Energy monitoring dashboard",
};
```

## Environment Variables

Create `.env.local` for API keys and configuration:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## Running the Project

```bash
# Development
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Deployment

### Vercel (Recommended)

```bash
pnpm add -g vercel
vercel
```

### Docker

```dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

## Additional Features for Production

### 1. Add Real-Time Data Fetching

```typescript
// app/lib/api.ts
export async function getEnergyMetrics() {
  const res = await fetch('https://api.example.com/metrics', {
    next: { revalidate: 10 } // Revalidate every 10 seconds
  });
  return res.json();
}

// app/page.tsx
import { getEnergyMetrics } from './lib/api';

export default async function Home() {
  const metrics = await getEnergyMetrics();
  return <App initialMetrics={metrics} />;
}
```

### 2. Add Error Boundaries

```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <button onClick={reset} className="btn-primary">
          Try again
        </button>
      </div>
    </div>
  );
}
```

### 3. Add Loading States

```typescript
// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>
  );
}
```

## Component Usage Examples

### MetricCard

```typescript
<MetricCard
  label="Solar Generation"
  value="4.8"
  unit="kW"
  change={12.3}
  trend="up"
  color="solar"
  icon={<Sun className="w-5 h-5" />}
  size="medium"
/>
```

### PowerUsageChart (Unovis)

```typescript
<PowerUsageChart
  data={powerUsageData}
  height={350}
  showLegend={true}
  dataKeys={[
    { key: 'solar', name: 'Solar', color: '#00D9FF' },
    { key: 'battery', name: 'Battery', color: '#FF6B9D' },
  ]}
/>
```

### DonutChart (Unovis)

```typescript
<DonutChart
  data={[
    { name: 'Solar', value: 4.8, color: '#00D9FF' },
    { name: 'Battery', value: 2.1, color: '#FF6B9D' },
  ]}
  size={200}
  title="Energy Sources"
  showValue={true}
/>
```

## Troubleshooting

### Hydration Errors

If you see hydration mismatches with theme:
- Ensure `suppressHydrationWarning` is on `<html>` tag
- Use `next-themes` properly with `enableSystem` option

### Unovis Not Rendering

Ensure you've imported the CSS:
```typescript
import '@unovis/ts/dist/styles.css';
```

### Theme Not Switching

Check that:
1. ThemeProvider wraps your app
2. Components using `useTheme()` have `'use client';`
3. CSS variables are properly defined in both light and dark modes

## Performance Tips

1. **Code Splitting**: Components with heavy dependencies (charts) are automatically code-split
2. **Dynamic Imports**: For rarely-used components, use dynamic imports:
   ```typescript
   const DesignSystemShowcase = dynamic(() => import('./components/DesignSystemShowcase'));
   ```
3. **Memoization**: Wrap expensive calculations with `useMemo()`
4. **Lazy Load Charts**: Load chart data on scroll or user interaction

## Support

For issues or questions:
- Check Next.js documentation: https://nextjs.org/docs
- Unovis documentation: https://unovis.dev/docs
- Open an issue in the project repository
