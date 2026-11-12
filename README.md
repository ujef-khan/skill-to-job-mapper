# SkillBridge — Skill-to-Job Mapper

A bilingual (English/Hindi), mobile-first skill gap and job matching prototype focused on **Firozabad, Uttar Pradesh**.

## Current MVP
- English / Hindi interface toggle.
- Candidate skill selector with instant search.
- Explainable role matching based on selected skills.
- Skill-gap priorities and a simple learning roadmap.
- Role profiles for glass/manufacturing, office operations, logistics and entry-level IT.
- Explicit demo-data labels and a data-transparency panel.

## Important data integrity note
The current role cards are **illustrative demo role profiles, not verified live vacancies**. Employer names, salary amounts, openings and application links are intentionally not fabricated. A live listing should be added only with its source URL, collection date, last verification date and status.

## Tech stack
- React
- Vite
- Lucide React
- Plain CSS (responsive, mobile-first)

## Run locally
```bash
npm install
npm run dev
```

Create a production build:
```bash
npm run build
npm run preview
```

## Deploy
This is a static Vite app and can be deployed on Vercel or Netlify using:
- Build command: `npm run build`
- Output directory: `dist`

## Matching logic
For each role profile:
`match score = (number of required skills selected / total required skills) × 100`

This is an explainable prototype heuristic, not a validated hiring prediction. It does not infer eligibility or guarantee employment.

## Planned next steps
1. Add a verified job-source ingestion layer (government and private sources).
2. Store original listing URL, source name, collected-at date, last-verified date and listing status.
3. Add candidate education, experience and preferred work-mode fields.
4. Validate matching weights with real local feedback.
5. Add learning resources with provider, cost, language and duration metadata.
6. Add tests and accessibility checks.

## Data-source policy
Potential source discovery can include National Career Service, relevant government portals, employer career pages and private job platforms, subject to their terms and permitted access. No public API or scraping permission is assumed. Official labour statistics must be shown separately from individual job vacancies, with geography and survey limitations clearly stated.

## Pilot scope
Firozabad district, Uttar Pradesh. Initial sector hypotheses include glass and manufacturing, quality inspection, production support, logistics/warehousing, office operations and entry-level digital work. These are discovery categories, not evidence of current openings.
