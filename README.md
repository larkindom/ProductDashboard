# Product Status Dashboard

A proof-of-concept dashboard for quickly updating stakeholders on product status:
key product metrics, active projects, and open action items — all on one screen.

## What's here

- **Key product metrics** — MAU, MRR, churn, and NPS as stat tiles, plus trend
  charts for active users, revenue, and churn rate. A "Show as table" toggle
  exposes the same data as an accessible data table.
- **Active projects** — status (on track / at risk / blocked / done), owner,
  progress, and target date for each in-flight initiative.
- **Open action items** — owner, priority, status, and due date, sorted by
  what's due soonest.
- Light/dark theme toggle.

All data in `src/data/mockData.ts` is mock data for this proof of concept.

## Stack

React + TypeScript + Vite, Tailwind CSS v4, Recharts.

## Development

```bash
npm install
npm run dev      # start local dev server
npm run build     # type-check and build for production
```
