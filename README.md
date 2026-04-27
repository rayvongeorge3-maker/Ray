# ForgeFlow X

**Tagline:** From idea to final cut.

ForgeFlow X is a mobile-first AI Director app that turns one rough idea into a polished short-form vertical video workflow.

## What is included in this repo

This initial commit provides an implementation-ready foundation for the MVP:

- Product and sprint blueprint (`docs/forgeflowx-mvp-plan.md`)
- API contract (`src/api/openapi.yaml`)
- Director output JSON schema (`src/contracts/director-output.schema.json`)
- Credits and plan config (`src/config/*.json`)
- Supabase/PostgreSQL migration (`supabase/migrations/0001_init.sql`)

## MVP scope (v1)

- Email auth
- Project creation
- AI Director plan generation
- Scene storyboard keyframes
- Scene clip generation
- Scene-level regenerate
- Captions
- Vertical export (9:16)
- Credit metering + plan gating

## Next step

Use this contract-first foundation to implement:

1. Expo app screens
2. Edge Functions + queue workers
3. AI provider adapters behind internal orchestration endpoints
