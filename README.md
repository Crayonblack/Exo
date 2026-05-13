# EXO - Energy Management System

A premium, modern energy monitoring dashboard built with React, Vite, and Tailwind CSS v4. Features comprehensive real-time analytics, responsive glassmorphic design, and a robust semantic theme system.

Note: Generative AI was used to create this README.md file.

## ✨ Features

- 🎨 **Modern Design System** - Premium glassmorphic UI with consistent semantic tokens.
- 🌓 **Dynamic Theme Support** - Full light/dark mode integration with instant switching.
- 📊 **Advanced Data Visualization** - Interactive, high-performance charts powered by Unovis.
- 📱 **Mobile-First Approach** - Fully responsive layouts with optimized navigation for all screen sizes.
- ⚡ **Optimized Performance** - Lightning-fast builds and HMR with Vite.
- 🏗️ **Modular Architecture** - Clean component hierarchy (Core, Layout, Widgets, Charts).

## 🏗️ Tech Stack

- **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Charts**: [Unovis](https://unovis.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Vanilla CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

## 📦 Installation

### Prerequisites

- Node.js 20.x or higher
- npm or pnpm

### Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎨 Theme System

The project utilizes a modern **Tailwind CSS v4** configuration. All brand, data, and semantic colors are defined as CSS variables within the `@theme` block in `src/styles/index.css`.

### Semantic Tokens

| Token | Description | Use Case |
|-------|-------------|----------|
| `--color-solar` | Cyan | Solar production data |
| `--color-battery` | Amber/Gold | Battery state of charge |
| `--color-load` | Purple | Home consumption |
| `--color-grid-import` | Blue | Grid power usage |
| `--color-success` | Green | Positive trends / Healthy status |

### Usage Example

```tsx
// Using theme colors in components
<div className="text-solar shadow-solar-glow">...</div>

// Using theme variables in charts
const color = 'var(--color-solar)';
```

## 🚢 Deployment (Vercel)

This project is optimized for deployment on **Vercel**.

### Deployment Steps

1. **Push to GitHub**: Push your local repository to a new GitHub/GitLab/Bitbucket repo.
2. **Import to Vercel**: Go to the [Vercel Dashboard](https://vercel.com/new) and import the project.
3. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Deploy**: Click "Deploy".

Vercel will automatically detect the Vite configuration and handle the static site generation.

## 📁 Project Structure

```
exoems/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── core/         # Atomic UI elements (Button, Card, Badge)
│   │   │   ├── layout/       # Navigation and Layout components
│   │   │   ├── widgets/      # Dashboard-specific widgets (MetricCard, Status)
│   │   │   └── charts/       # Unovis-powered data visualizations
│   │   ├── pages/            # Application routes (Dashboard, Usage, Health)
│   │   ├── hooks/            # Custom React hooks
│   │   └── router.tsx        # Route definitions
│   ├── styles/
│   │   └── index.css         # Tailwind v4 configuration and global styles
│   ├── main.tsx              # Application entry point
│   └── App.tsx               # Root component
├── vite.config.ts            # Vite configuration
└── package.json
```

## 📄 License

This project is licensed under the MIT License.

---

Built with ⚡ by the EXO Team
