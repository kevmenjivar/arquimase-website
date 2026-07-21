# Conexión de Arquimase con Supabase

1. Crea un proyecto en Supabase o abre el proyecto existente.
2. En **SQL Editor**, ejecuta el contenido de `supabase-setup.sql`.
3. En **Project Settings → API**, copia:
   - Project URL
   - `service_role` key (se usa solo en el backend)
4. Copia `.env.example` como `.env` y completa esos tres valores.

No expongas `SUPABASE_SERVICE_ROLE_KEY` en el sitio público ni la pegues en JavaScript del navegador. Es exclusiva del servidor y permite cargar imágenes al bucket privado.

El backend ya usa Supabase cuando se inicia con `node server.js`. Abre `http://localhost:3000/admin.html` para administrar el contenido.
