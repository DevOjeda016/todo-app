# Arquitectura del Proyecto Angular

## 📁 Estructura de Carpetas

```
src/app/
├── components/          # Componentes de la aplicación
│   ├── header/
│   ├── footer/
│   └── main/
├── core/                # Funcionalidad core (singleton)
│   ├── enums/          # Enumeraciones
│   │   ├── importance.enum.ts
│   │   ├── status.enum.ts
│   │   └── index.ts    # Barrel export
│   ├── models/         # Interfaces y modelos de datos
│   │   ├── task.model.ts
│   │   ├── create-task.model.ts
│   │   └── index.ts    # Barrel export
│   └── services/       # Servicios singleton (providedIn: 'root')
│       ├── theme.service.ts
│       └── index.ts    # Barrel export
└── shared/             # Recursos compartidos y reutilizables
    ├── components/     # Componentes compartidos
    ├── directives/     # Directivas personalizadas
    └── pipes/          # Pipes personalizados
```

## 🎯 Convenciones

### Core Module
- **Propósito**: Contiene servicios singleton, guards, interceptors y configuración global
- **Regla**: Se importa una sola vez en la aplicación
- **Contenido**:
  - `enums/`: Enumeraciones usadas en toda la app
  - `models/`: Interfaces y tipos TypeScript
  - `services/`: Servicios con `providedIn: 'root'`

### Shared Module
- **Propósito**: Recursos reutilizables en múltiples módulos
- **Contenido**:
  - `components/`: Componentes standalone reutilizables
  - `directives/`: Directivas personalizadas
  - `pipes/`: Pipes personalizados

### Components
- Componentes standalone organizados por feature/página
- Cada componente tiene su carpeta con `.ts`, `.html`, `.spec.ts`

## 📝 Imports Simplificados

Gracias a los archivos `index.ts` (barrel exports), los imports son más limpios:

```typescript
// ❌ Antes
import { Task } from '../../interfaces/task';
import { CreateTask } from '../../interfaces/create-task';
import { Status } from '../../../enums/status.enums';
import { Importance } from '../../../enums/importance.enums';

// ✅ Ahora
import { Task, CreateTask } from '../../core/models';
import { Status, Importance } from '../../core/enums';
```

## 🔄 Próximos Pasos Recomendados

1. **Agregar más servicios**: API service, Auth service, etc. en `core/services/`
2. **Crear componentes compartidos**: Botones, modals, cards en `shared/components/`
3. **Implementar guards**: Authentication y authorization en `core/guards/`
4. **Agregar interceptors**: HTTP interceptors en `core/interceptors/`
5. **Crear pipes personalizados**: Date formats, filters en `shared/pipes/`

## 🏗️ Mejores Prácticas Aplicadas

- ✅ Separación clara de responsabilidades
- ✅ Imports consistentes y limpios
- ✅ Nomenclatura clara (.enum.ts, .model.ts, .service.ts)
- ✅ Uso de barrel exports (index.ts)
- ✅ Componentes standalone
- ✅ Estructura escalable
