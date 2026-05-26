---
name: Portfolio media management
description: How the portfolio image management system works (DB overrides + Object Storage)
---

Portfolio images are statically generated from categories in Portfolio.tsx but can be overridden via the admin Media Manager.

## Architecture
- Static images live at `/assets/images/{folder}/{n}.webp` in the public dir
- `portfolio_overrides` DB table stores per-image overrides keyed by `image_path` (e.g. `club/1.webp`)
- `GET /api/portfolio/images` returns merged: static catalog + DB overrides
- `PATCH /api/portfolio/images/*imagePath` (admin Bearer token required) updates overrides
- `POST /api/portfolio/upload` (admin auth + multer) uploads to Object Storage (GCS), returns public URL
- Portfolio.tsx fetches from API on mount, falls back to static if API fails

## Override fields
- `hidden` (boolean) — remove from public portfolio
- `customTitle` (string) — replace auto-generated title
- `caption` (string) — alt text / caption
- `storagePath` (string) — GCS public URL replaces static src
- `sortOrder` (integer) — future drag-and-drop ordering

## Admin tabs
Admin.tsx at `/admin` has 3 tabs: Inquiries | Analytics & SEO | Media Manager

**Why:** Allows non-technical management without code changes; changes take effect immediately via API.
