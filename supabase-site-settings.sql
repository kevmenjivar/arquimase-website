-- Ejecuta este archivo una sola vez en Supabase > SQL Editor.
create table if not exists public.arquimase_site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.arquimase_site_settings enable row level security;
drop policy if exists "Lectura pública de ajustes del sitio" on public.arquimase_site_settings;
create policy "Lectura pública de ajustes del sitio" on public.arquimase_site_settings for select using (true);
