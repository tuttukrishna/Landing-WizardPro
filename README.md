# WizardPRO — Next.js

> Your expert analyst on the go

A professional Next.js (App Router) refactor of the WizardPRO single-page trading community application. Identical UI, UX, animations, and functionality — enterprise-ready architecture.

---

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **CSS Modules / Global CSS** (original styles preserved exactly)

---

## Getting Started

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

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout (fonts, meta, CSS)
│   ├── page.tsx          # Home route → WizardApp
│   ├── profile/          # /profile route
│   ├── settings/         # /settings route
│   ├── news/             # /news route
│   ├── dashboard/        # /dashboard route
│   └── auth/             # /auth route
│
├── components/
│   ├── WizardApp.tsx     # Main app shell (renders full HTML + loads JS)
│   ├── navbar/           # Topbar, BottomNav
│   ├── feed/             # Feed, CommunitySection
│   ├── cards/            # PostCard
│   ├── charts/           # MarketOverview, TradingChart
│   ├── modals/           # AuthModal, CommentModal, ProfileModal
│   ├── buttons/          # LikeButton
│   └── ui/               # Toast, NotificationPanel, SettingsPanel
│
├── hooks/                # useAuth, useMarketData, usePosts, useSettings
├── services/             # authService, marketService
├── store/                # appStore (React Context + useReducer)
├── styles/               # globals.css (all 140KB of original CSS)
├── types/                # TypeScript interfaces
├── constants/            # App-wide constants
├── utils/                # Helper functions
└── lib/                  # appHtml.ts (extracted HTML markup)
```

---

## Architecture Notes

### Migration Strategy

The original app is a **683KB monolithic HTML file** with:
- ~140KB CSS
- ~233KB JavaScript (DOM manipulation, inline event handlers, localStorage state)
- ~310KB HTML markup

The migration preserves **100% of the original UI and behaviour** by:
1. Serving the full CSS via `src/styles/globals.css`
2. Rendering the full HTML via `dangerouslySetInnerHTML` in `WizardApp.tsx`
3. Loading the full JS bundle via `public/app-scripts.js`

All React components are **additive** — they provide the typed, modular foundation for future feature development without disrupting the existing app.

### Future Development

To incrementally replace sections with React components:
1. Extract a section from `src/lib/appHtml.ts`
2. Create/extend the corresponding component in `src/components/`
3. Import and render it in `WizardApp.tsx` in place of the raw HTML

---

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Environment Variables

Create a `.env.local` for production integrations:

```env
# Market data API
NEXT_PUBLIC_MARKET_API_URL=https://your-api.com

# Authentication (if using Supabase/Firebase)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Analytics
NEXT_PUBLIC_GA_ID=
```

---

## Roadmap

- [ ] Real-time NSE/BSE data via WebSocket
- [ ] Supabase Auth integration
- [ ] Supabase Realtime for community feed
- [ ] TradingView chart widget integration
- [ ] Push notifications (PWA)
- [ ] Copy trading backend
- [ ] AI-powered fundamental analysis
- [ ] React Native / Expo mobile app

---

*Built with ❤️ using OpenFi.Ltd infrastructure*
