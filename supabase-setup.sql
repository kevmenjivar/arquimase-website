-- Ejecuta este archivo en Supabase Dashboard > SQL Editor.
-- El backend usa la service_role; las tablas permanecen protegidas para visitantes.
create table if not exists public.arquimase_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('turismo','tratamiento','remodelacion')),
  type text not null,
  location text,
  description text not null,
  format text not null check (format in ('beforeAfter','phases')),
  cover_image text,
  before_after jsonb,
  phases jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.arquimase_clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.arquimase_site_images (
  slot text primary key check (slot in ('hero','especialidades','portafolio','clientes','contacto')),
  url text not null,
  updated_at timestamptz not null default now()
);

alter table public.arquimase_projects enable row level security;
alter table public.arquimase_clients enable row level security;
alter table public.arquimase_site_images enable row level security;

-- Lectura pública solo para que el sitio pueda mostrar el contenido publicado.
drop policy if exists "Lectura pública de proyectos" on public.arquimase_projects;
create policy "Lectura pública de proyectos" on public.arquimase_projects for select using (true);
drop policy if exists "Lectura pública de clientes" on public.arquimase_clients;
create policy "Lectura pública de clientes" on public.arquimase_clients for select using (true);
drop policy if exists "Lectura pública de imágenes" on public.arquimase_site_images;
create policy "Lectura pública de imágenes" on public.arquimase_site_images for select using (true);

-- Crea el bucket privado para imágenes. El backend sube archivos con service_role.
insert into storage.buckets (id, name, public) values ('arquimase-media','arquimase-media',false)
on conflict (id) do nothing;
