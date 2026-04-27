# ForgeFlow X MVP Plan

## 1) Product north star

**One idea in → finished short out.**

ForgeFlow X should feel like an AI Director System that plans, generates, edits, and packages short-form content for Shorts/TikTok/Reels.

## 2) MVP outcomes

- Convert one idea prompt into a complete scene plan.
- Generate per-scene keyframes and short clips.
- Allow per-scene regenerate without rerendering entire project.
- Auto-generate captions and export in 1080x1920.

## 3) Target users

Primary:
- Solo creators
- Shorts/TikTok creators
- AI faceless channels
- Ad creators

Secondary:
- Agencies
- Ecommerce brands
- Concept artists

## 4) Build order

### Sprint 1
- Project setup
- Auth
- Home + Create Project screen
- Project CRUD + DB tables

### Sprint 2
- Director generation endpoint
- Director output UI tabs (Script/Scenes/Titles/Thumbnail)
- Persist scenes/titles/hashtags

### Sprint 3
- Storyboard keyframe generation
- Scene cards + regenerate image

### Sprint 4
- Scene clip generation jobs
- Render queue statuses

### Sprint 5
- Editor with quick scene actions
- Caption generation
- Export flow

### Sprint 6
- Billing plans
- Credits deduction and guards
- Character memory

### Sprint 7
- Analytics events
- Push notifications
- QA + launch prep

## 5) UX principles

- Dark premium visual system
- Fast, low-friction creation flow
- Escalating visual storytelling scene-to-scene
- Regenerate only the failing/weak scene

## 6) Core entities

- `profiles`
- `subscriptions`
- `projects`
- `characters`
- `character_assets`
- `scenes`
- `assets`
- `generations`
- `exports`
- `usage_events`

## 7) Queue model

Jobs:
- director_plan
- image_generation
- video_generation
- captions
- export

Statuses:
- queued
- running
- succeeded
- failed

Each job stores retries, timestamps, and error messages.

## 8) Analytics events

- signup_completed
- project_created
- director_plan_generated
- keyframe_generated
- clip_generated
- scene_regenerated
- export_started
- export_completed
- paywall_viewed
- subscription_started
- subscription_canceled

## 9) Safety baseline

- Moderate input before generation.
- Enforce ownership checks for all project resources.
- Rate-limit generation endpoints.
- Scope storage access by owner.

## 10) Configurable later (do not block MVP)

- AI provider choices
- Audio generation rollout
- Apple/Google auth launch timing
- Final pricing and monthly credits
- Caption style packs
