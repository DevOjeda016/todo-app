# Frontend (Angular)

SPA en Angular 20 + Tailwind que consume la API del backend.

## Requisitos

- Node.js 20+
- pnpm

## Instalación y ejecución

```bash
pnpm install
pnpm start
```

- App: `http://localhost:4200`
- La API consumida por defecto es `http://localhost:3000/api` (ver `src/app/core/config/api.config.ts`).

## Scripts

```bash
pnpm start      # servidor de desarrollo
pnpm build      # build de producción a dist/
pnpm test       # unit tests (Karma)
pnpm lint       # lint
pnpm format     # prettier sobre src/**/*.ts
```

## Configuración de API

Edita `src/app/core/config/api.config.ts` para cambiar `BASE_URL` o rutas si el backend corre en otra URL/puerto.
