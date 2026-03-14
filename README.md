# 🌿 SafeMind — Mental Health First Response

A free, open-source mental health first-response tool designed for people affected by conflict and crisis.

## Features

- **Mood Check-in** — Emotional assessment with personalized guidance
- **Guided Breathing** — 4-4-6-2 breathing pattern with animated visual guide
- **5-4-3-2-1 Grounding** — Sensory grounding technique for acute anxiety and dissociation
- **PTSD Screening** — 8-question distress assessment with tiered results
- **Crisis Resources** — Curated international mental health organizations
- **Multi-language** — Scaffolded for Arabic, Ukrainian, Spanish, French, Turkish

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **Vercel** for deployment
- Zero external UI dependencies — lightweight and fast

## Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/safemind.git
cd safemind

# Install dependencies
npm install

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

### Option A: One-click (recommended)
1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the GitHub repo
4. Click **Deploy** — no configuration needed

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel
```

## Project Structure

```
safemind/
├── app/
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.js          # Root layout with SEO metadata
│   └── page.js            # Entry point
├── components/
│   ├── SafeMind.js        # Main app shell & navigation
│   ├── CheckIn.js         # Mood check-in flow
│   ├── BreatheExercise.js # Guided breathing animation
│   ├── GroundingExercise.js # 5-4-3-2-1 grounding
│   ├── Screening.js       # PTSD/distress screening
│   ├── ResourcesPanel.js  # Crisis resource links
│   └── constants.js       # Translations, styles, config
├── public/
│   └── favicon.svg
├── vercel.json            # Deployment config
├── next.config.js
└── package.json
```

## Roadmap

- [ ] Full translations (Arabic, Ukrainian, Spanish, French, Turkish)
- [ ] AI-powered conversational support
- [ ] Offline / PWA support for low-connectivity zones
- [ ] Session history & mood tracking over time
- [ ] Professional referral matching by region
- [ ] Accessibility audit (WCAG 2.1 AA)

## Contributing

This project exists to help people in crisis. Contributions are welcome — especially translations, accessibility improvements, and partnerships with humanitarian organizations.

## License

MIT — free for everyone, everywhere.

---

*SafeMind is not a substitute for professional mental health care. If you are in crisis, please contact local emergency services.*
