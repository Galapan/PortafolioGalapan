# AGENTS.md

## Comandos

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo Vite |
| `npm run build` | `tsc -b && vite build` (typecheck + producción) |
| `npm run lint` | ESLint (config flat, `eslint.config.js`) |
| `npx tsc -b` | Typecheck sin build (usa project references) |

- No hay script de `typecheck` separado; usar `npx tsc -b` para verificar tipos.
- No hay framework de testing configurado. No intentar correr tests.
- No hay formateador (Prettier, etc.) configurado.

## TypeScript — restricciones importantes

- **`verbatimModuleSyntax: true`** — usar `import type` para importar tipos, nunca `import`.
- **`erasableSyntaxOnly: true`** — no usar `enum`, `namespace`, ni parameter properties. Preferir `const` objects + `as const`.
- **`noUnusedLocals` / `noUnusedParameters`** — el build falla si hay variables o parámetros sin usar.
- **`strict: true`** — modo estricto completo.

## Tailwind CSS v4

- Usa `@tailwindcss/vite` como plugin de Vite (no PostCSS).
- Importación en CSS: `@import "tailwindcss"` (no `@tailwind base/components/utilities`).
- No existe `tailwind.config.js`. La configuración se hace en CSS con `@theme`.
- Utilidad `cn()` en `src/utils.ts` combina `clsx` + `tailwind-merge`.

## Arquitectura

SPA de una sola página (portafolio personal). Sin router.

- **Entrada:** `src/main.tsx` → `src/App.tsx`
- **Secciones** (en `src/components/`): `Navbar`, `Hero`, `AboutMe`, `Tech`, `Projects`, `Contact`
- **Estilos globales:** `src/index.css`
- **Iconos:** `lucide-react` y `react-icons`
- **Animaciones:** `framer-motion`
