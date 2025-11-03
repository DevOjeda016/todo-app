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

Opción A) Todo con Docker Compose (recomendada)

```bash
# 1) Variables de entorno
test -f backend/.env.development || cp backend/.env.development.example backend/.env.development

# 2) Levantar todo (db + backend + frontend)
docker compose up -d

# 3) Abrir la app
xdg-open http://localhost:4200 || open http://localhost:4200 || true
```

- Frontend: http://localhost:4200
- API: http://localhost:3000/api
- Swagger UI: http://localhost:3000/api/docs

### Verificar estado de servicios

```bash
# Ver servicios corriendo
docker compose ps

# Ver logs de todos los servicios
docker compose logs

# Ver logs de un servicio específico
docker compose logs backend
docker compose logs frontend

# Si algún servicio no está corriendo, levantarlo:
docker compose up -d backend frontend

# Reiniciar todo
docker compose restart
```

Opción B) Manual (sin contenedores)

1) Backend
- Copia variables: `cp backend/.env.development.example backend/.env.development`
- Levanta PostgreSQL: `cd backend && docker compose -f docker-compose.dev.yml up -d`
- Instala y corre: `pnpm -C backend install` y `pnpm -C backend start:dev`

2) Frontend
- Instala y corre: `pnpm -C frontend install` y `pnpm -C frontend start`

3) Navega a `http://localhost:4200`. El frontend consume `http://localhost:3000/api`.

## Scripts útiles

- Backend: ver `backend/README.md`
- Frontend: ver `frontend/README.md`

## Variables de entorno

El backend requiere configurar `backend/.env.development`. Campos importantes:
- `URL_FRONTEND`: origen permitido para CORS (ej: `http://localhost:4200` o `*` para desarrollo)
- Variables de base de datos: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

## Notas

- CORS en backend se configura desde `URL_FRONTEND` en `.env.development`.
- En Docker Compose, el backend usa `DB_HOST=db` (override) y carga variables desde `backend/.env.development`.
- Endpoints principales: `GET/POST /api/tasks`, `GET/PATCH/DELETE /api/tasks/:id`, `PATCH /api/tasks/:id/archive`.
- Documentación interactiva disponible en Swagger UI.
