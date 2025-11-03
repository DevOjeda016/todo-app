# Backend (NestJS)

API REST para gestionar tareas (TODOs) usando NestJS + TypeORM + PostgreSQL.

## Requisitos

- Node.js 20+
- pnpm
- Docker y Docker Compose (para PostgreSQL local)

## Variables de entorno

Crea los archivos desde los ejemplos y ajusta valores:

```bash
cp .env.development.example .env.development
# Para e2e (solo DB del contenedor):
cp .env.testing.example .env.test
```

- El backend carga `.env.development` por defecto (salvo `NODE_ENV=production`).
- `docker-compose.dev.yml` usa `.env.development` para levantar PostgreSQL.

Campos clave en `.env.development`:
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `POSTGRES_PASSWORD` (para el contenedor de PostgreSQL)
- `TYPEORM_SYNCHRONIZE` (en dev `true`)

## Levantar con Docker Compose (monorepo)

Desde la raíz del proyecto puedes levantar DB+API+Frontend:

```bash
# En la raíz del repo
cp -n backend/.env.development.example backend/.env.development || true
docker compose up -d
```

- API: `http://localhost:3000/api`
- Swagger UI: `http://localhost:3000/api/docs`
- El servicio `backend` sobreescribe `DB_HOST=db` para conectarse al contenedor `db`.

## Solo base de datos (opcional, desarrollo)

Si prefieres correr solo la DB desde este directorio:

```bash
docker compose -f docker-compose.dev.yml up -d
```

Esto crea un contenedor PostgreSQL en `localhost:5432` (según tu `.env.development`).

## Instalar y ejecutar

```bash
pnpm install
pnpm start:dev
```

- Servidor: `http://localhost:3000`
- Prefijo global: `/api` (ej.: `http://localhost:3000/api/tasks`)
- CORS: permite `http://localhost:4200`

## Endpoints principales

- `POST   /api/tasks`
- `GET    /api/tasks?archived=all|true|false`
- `GET    /api/tasks/:id`
- `PATCH  /api/tasks/:id`
- `PATCH  /api/tasks/:id/archive`
- `DELETE /api/tasks/:id`

Puedes usar `requests.http` con la extensión REST Client para probarlos.

## Scripts

```bash
# Desarrollo
pnpm start         # sin watch
pnpm start:dev     # con watch
pnpm start:prod    # ejecuta dist/

# Build
pnpm build

# Calidad
pnpm lint
pnpm format

# Tests
pnpm test          # unit
pnpm test:cov      # cobertura
# e2e: levanta DB de pruebas y corre jest
# Asegúrate de que la app apunte a ese puerto (ver Nota e2e)
pnpm test:e2e
```

### Nota e2e
El script `test:e2e` levanta una DB en el puerto host `5433` (ver `docker-compose.test.yml`).
El backend, por defecto, lee `.env.development`. Asegúrate que la app apunte a esa DB durante e2e, por ejemplo:

```bash
# En la misma terminal (solo para e2e):
DB_PORT=5433 pnpm test:e2e
```

Alternativamente, ajusta temporalmente `DB_PORT=5433` en `.env.development`.
