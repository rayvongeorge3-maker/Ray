-- ForgeFlow X MVP schema
-- PostgreSQL + Supabase

create extension if not exists pgcrypto;

create type public.plan_tier as enum ('free', 'creator', 'pro');
create type public.project_status as enum ('draft', 'planning', 'storyboarding', 'rendering', 'ready', 'failed');
create type public.generation_type as enum ('director_plan', 'image_generation', 'video_generation', 'captions', 'export');
create type public.job_status as enum ('queued', 'running', 'succeeded', 'failed');
create type public.asset_type as enum ('reference_image', 'generated_image', 'generated_video', 'caption_file', 'thumbnail', 'final_export');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan public.plan_tier not null default 'free',
  is_active boolean not null default true,
  credits_monthly integer not null default 120,
  credits_remaining integer not null default 120,
  period_start timestamptz,
  period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.characters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  description text,
  face_notes text,
  body_notes text,
  clothing_notes text,
  mood_style_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  character_id uuid references public.characters(id) on delete set null,
  title text not null,
  idea_prompt text not null,
  platform text not null check (platform in ('shorts', 'tiktok', 'reels')),
  style_preset text not null,
  duration_target integer not null check (duration_target between 10 and 90),
  intensity integer not null check (intensity between 1 and 10),
  status public.project_status not null default 'draft',
  hook text,
  creative_angle text,
  thumbnail_prompt text,
  caption_style text default 'bold_kinetic',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.scenes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  scene_number integer not null,
  scene_title text,
  scene_goal text,
  script_line text,
  visual_prompt text,
  camera_notes text,
  duration_sec integer not null default 4,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id, scene_number)
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  scene_id uuid references public.scenes(id) on delete cascade,
  character_id uuid references public.characters(id) on delete cascade,
  type public.asset_type not null,
  storage_bucket text not null,
  storage_path text not null,
  mime_type text,
  created_at timestamptz not null default now()
);

create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  scene_id uuid references public.scenes(id) on delete cascade,
  type public.generation_type not null,
  status public.job_status not null default 'queued',
  retry_count integer not null default 0,
  error_message text,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.exports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  format text not null default 'vertical_1080x1920',
  include_captions boolean not null default true,
  include_audio boolean not null default true,
  watermark_enabled boolean not null default true,
  status public.job_status not null default 'queued',
  output_asset_id uuid references public.assets(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  event_name text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Suggested storage buckets (create via Supabase dashboard/CLI):
-- avatars
-- character-references
-- project-references
-- generated-images
-- generated-videos
-- final-exports
-- thumbnails

create index if not exists idx_projects_user on public.projects(user_id);
create index if not exists idx_scenes_project on public.scenes(project_id, scene_number);
create index if not exists idx_assets_project_scene on public.assets(project_id, scene_id);
create index if not exists idx_generations_project_status on public.generations(project_id, status);
create index if not exists idx_usage_events_user_created on public.usage_events(user_id, created_at desc);
