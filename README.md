# Todo App

Monorepo con un backend en NestJS + PostgreSQL y un frontend en Angular.

## Estructura

- `backend/` API REST (NestJS, TypeORM, PostgreSQL)
- `frontend/` SPA (Angular 20, Tailwind)

## Requisitos

- Node.js 20+
- pnpm
- Docker y Docker Compose (para la base de datos local)

## Puesta en marcha rápida

1) Backend
- Copia variables: `cp backend/.env.development.example backend/.env.development`
- (Opcional e2e) `cp backend/.env.testing.example backend/.env.test`
- Levanta PostgreSQL: `cd backend && docker compose -f docker-compose.dev.yml up -d`
- Instala y corre: `pnpm -C backend install` y `pnpm -C backend start:dev`

2) Frontend
- Instala y corre: `pnpm -C frontend install` y `pnpm -C frontend start`

3) Navega a `http://localhost:4200`. El frontend consume `http://localhost:3000/api`.

## Scripts útiles

- Backend: ver `backend/README.md`
- Frontend: ver `frontend/README.md`

## Notas

- CORS en backend permite `http://localhost:4200` por defecto.
- Endpoints principales: `GET/POST /api/tasks`, `GET/PATCH/DELETE /api/tasks/:id`, `PATCH /api/tasks/:id/archive`.