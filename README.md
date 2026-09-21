# Junko Golf Club

Sitio web oficial de **Junko Golf Club**: sitio público premium, panel administrativo, sistema de reservas, gestión de torneos, galería y contenido editable — construido íntegramente con tecnologías gratuitas.

## Stack tecnológico

| Capa | Tecnología |
| --- | --- |
| Frontend | Next.js 15 (App Router) + TypeScript + TailwindCSS |
| Backend | Next.js Server Actions |
| Base de datos | Supabase PostgreSQL (plan gratuito) |
| Autenticación | Supabase Auth |
| Almacenamiento de imágenes | Supabase Storage |
| Animaciones | Framer Motion |
| Validación | Zod |

No se utilizan APIs ni servicios de pago.

## Decisiones profesionales tomadas

- **Autenticación real vía Supabase Auth** en lugar de una tabla `users` con contraseñas propias: es más seguro (hashing, recuperación de contraseña, tokens) y evita reinventar un sistema de auth. Cada usuario autenticado tiene un `profile` en `public.profiles` con su `role` (`admin`).
- **Server Actions** en vez de API Routes para todas las mutaciones (reservas, CRUD de torneos/galería/membresías/contenido), aprovechando la seguridad de ejecución en servidor y evitando boilerplate de rutas.
- **Row Level Security (RLS)** en todas las tablas: lectura pública para contenido del sitio, escritura únicamente para usuarios con `role = 'admin'`; inserción pública solo permitida en `reservations` y `contact_messages`.
- **No se inventaron precios de membresías** ni datos de contacto reales, tal como se solicitó. Quedan como "Información y tarifas a solicitud" / "Por confirmar", editables desde `/admin/dashboard/contenido` y `/admin/dashboard/membresias`.
- **Tabla adicional `contact_messages`**, no listada explícitamente en el pedido original pero necesaria para que el formulario de contacto sea "funcional" (se guarda y es visible en el resumen del panel admin).
- **Subida de imágenes real** a un bucket público de Supabase Storage (`media`) desde el panel admin, en vez de solo campos de texto para URLs.

## Estructura del proyecto

```
app/
  page.tsx              → Home
  club/                  → Página institucional
  membresias/            → Tipos de membresía
  reservas/              → Formulario de reservas
  torneos/               → Calendario de torneos
  galeria/               → Galería pública
  contacto/              → Formulario de contacto
  admin/
    login/               → Login administrativo
    dashboard/
      page.tsx            → Resumen
      reservas/           → Gestión de reservas
      torneos/            → CRUD de torneos
      galeria/            → Subida y orden de imágenes
      membresias/         → CRUD de membresías
      contenido/          → Edición de textos del sitio
      configuracion/      → Cuenta / contraseña
components/              → Componentes públicos (Navbar, Hero, Gallery, etc.)
components/admin/        → Componentes del panel administrativo
lib/
  actions/                → Server Actions (reservas, torneos, galería, membresías, contenido, auth)
  supabase/               → Clientes Supabase (browser, server, middleware)
  database.types.ts       → Tipos generados desde el esquema real de Supabase
  types.ts                → Tipos de dominio de la app
public/images/            → Carpetas preparadas para fotografía real (hero, gallery, club, tournaments, memberships)
```

## Base de datos (Supabase)

Tablas: `profiles`, `reservations`, `tournaments`, `gallery`, `memberships`, `pages`, `contact_messages`.

Todas las tablas tienen RLS activado. Un trigger (`handle_new_user`) crea automáticamente un `profile` con `role = 'admin'` cuando se registra un nuevo usuario en Supabase Auth — este proyecto está pensado para un único equipo administrador del club.

El bucket de Storage `media` es público para lectura; solo administradores pueden subir, actualizar o eliminar archivos.

## Variables de entorno

Copiar `.env.example` a `.env.local` y completar con los datos de tu proyecto Supabase (Project Settings → API):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

## Instalación y desarrollo local

```bash
npm install
cp .env.example .env.local   # y completar las variables
npm run dev
```

La app queda disponible en `http://localhost:3000`.

## Crear el primer usuario administrador

1. En el dashboard de Supabase → **Authentication → Users → Add user**, crear un usuario con email y contraseña.
2. El trigger de base de datos le asignará automáticamente `role = 'admin'` en `public.profiles`.
3. Ingresar en `/admin/login` con esas credenciales.

## Scripts

```bash
npm run dev     # Desarrollo
npm run build   # Build de producción
npm run start   # Servir build de producción
npm run lint    # ESLint
```

## Despliegue

El proyecto está listo para desplegarse en cualquier plataforma compatible con Next.js (por ejemplo, el plan gratuito de **Vercel**):

1. Conectar el repositorio.
2. Configurar las variables de entorno del paso anterior.
3. Desplegar. El middleware, las Server Actions y las rutas de SEO (`/sitemap.xml`, `/robots.txt`) funcionan sin configuración adicional.

## Pendiente antes de salir a producción

Todo lo funcional está construido. Solo falta contenido real:

1. Agregar fotografías reales en `public/images/*` o subirlas desde el panel admin (galería, torneos) — hasta entonces se muestran placeholders elegantes de marca.
2. Confirmar datos institucionales reales (dirección, teléfono) desde `/admin/dashboard/contenido`.
3. Revisar y ajustar tarifas/condiciones de membresías desde `/admin/dashboard/membresias`.
