# ⚽ Album Mundial — Figuritas

App de muestra del album de stickers del Mundial, estilo Panini:
catalogo de figuritas por seleccion + tracking personal de **tenés / te falta / repetidas**.

- **backend/** — API REST con Express + Prisma + Postgres
- **frontend/** — SPA con Vite + React + TypeScript

> Identidad visual: *"Album Foil"*. El brillo holografico solo se
> enciende en las figuritas que TENÉS; las que faltan son siluetas
> fantasma. Coleccionar le da vida a la pagina.

---

## Arquitectura

```
┌────────────┐      HTTPS/JSON      ┌───────────────┐      Prisma      ┌──────────────┐
│  Frontend  │  ───────────────▶    │   Backend     │  ─────────────▶  │  Postgres    │
│  Vite+React│                      │  Express API  │                  │  (Supabase)  │
│  (Vercel)  │  ◀───────────────    │   (Render)    │  ◀─────────────  │              │
└────────────┘                      └───────────────┘                  └──────────────┘
```

### Modelo de datos

- **Team** — seleccion (codigo, grupo, bandera)
- **Sticker** — figurita (numero, nombre, tipo, rareza foil, seleccion opcional)
- **User** — perfil liviano (solo nombre, sin password)
- **UserSticker** — estado por usuario: `count` (0 = falta, 1 = tenés, 2+ = repetidas)

---

## Correr en local

### 1. Backend

```bash
cd backend
cp env.example .env          # completar con tus connection strings de Supabase
npm install
npm run prisma:migrate       # crea las tablas (necesita DIRECT_URL)
npm run seed                 # carga selecciones y figuritas de muestra
npm run dev                  # API en http://localhost:4000
```

Probar: `http://localhost:4000/api/health` debe responder `{ "status": "ok" }`.

### 2. Frontend

```bash
cd frontend
cp env.example .env          # VITE_API_URL=http://localhost:4000/api
npm install
npm run dev                  # app en http://localhost:5173
```

---

## API

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/api/health` | Healthcheck |
| GET | `/api/teams` | Selecciones con sus figuritas |
| GET | `/api/stickers?team=ARG&type=PLAYER` | Catalogo filtrable |
| POST | `/api/users` | Crear perfil `{ name }` |
| GET | `/api/users/:id` | Datos del perfil |
| GET | `/api/users/:id/album` | Catalogo completo con el estado del usuario |
| GET | `/api/users/:id/progress` | Resumen: total, tenés, faltan, repes, % |
| PATCH | `/api/users/:id/stickers/:stickerId` | Actualizar estado `{ action }` o `{ count }` |

`action`: `have` · `missing` · `increment` · `decrement`

---

## Deploy (Fase 7)

Orden recomendado: **Supabase → Render → Vercel** (cada uno necesita datos del anterior).

### A. Base de datos — Supabase

1. Crear proyecto en [supabase.com](https://supabase.com).
2. **Project Settings → Database → Connection string**. Copiar las DOS:
   - **Transaction (pooler, puerto 6543)** → va en `DATABASE_URL`, agregarle `?pgbouncer=true`.
   - **Session / Direct (puerto 5432)** → va en `DIRECT_URL`.

   > ⚠️ **Gotcha clasico:** Prisma necesita LAS DOS. El pooler (6543) para las
   > queries en runtime, y la conexion directa (5432) para las migraciones.
   > Sin `DIRECT_URL` las migraciones fallan.

### B. Backend — Render

1. Subir el repo a GitHub.
2. En [render.com](https://render.com): **New → Blueprint** apuntando al repo
   (usa `backend/render.yaml`), o **New → Web Service** manual con:
   - Root Directory: `backend`
   - Build: `npm install && npm run build && npm run prisma:deploy`
   - Start: `npm start`
   - Health Check Path: `/api/health`
3. Cargar las env vars (secretas): `DATABASE_URL`, `DIRECT_URL`, `FRONTEND_URL`, `NODE_ENV=production`.
4. (Una vez deployado) correr el seed desde la Shell de Render: `npm run seed`.

   > ⚠️ **Plan free de Render duerme** tras ~15 min de inactividad. La primera
   > request despues tarda 30-50s (cold start). El `/api/health` sirve para pinguearlo.

### C. Frontend — Vercel

1. En [vercel.com](https://vercel.com): **Add New → Project**, importar el repo.
2. Root Directory: `frontend`. Vercel detecta Vite solo.
3. Env var: `VITE_API_URL = https://TU-API.onrender.com/api`
4. Deploy. Despues copiar la URL final de Vercel y ponerla en
   `FRONTEND_URL` del backend en Render (para que CORS la deje entrar).

---

## Stack

**Backend:** Express · Prisma · PostgreSQL · Zod · TypeScript
**Frontend:** Vite · React · React Router · TanStack Query · TypeScript
**Infra:** Supabase (DB) · Render (API) · Vercel (web)
