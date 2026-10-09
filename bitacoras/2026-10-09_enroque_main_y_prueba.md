# Bitácora: Enroque de Rutas — Nuevo Diseño a Main y Home Anterior a /prueba

**Fecha:** 2026-10-09  
**Acción:** Enroque de rutas principales en `src/App.tsx`.

---

## 1. Objetivo
El usuario solicitó intercambiar las vistas principales:
- Convertir la nueva **Landing Maqueta** (con diseño editorial neo-brutalist, tarjetas de clientes reales y formulario conectado al CRM) en la página **Main / Home** del sitio (`/`).
- Mover el **Home anterior** (el sistema con `CinematicHero`, `ExperimentalHero`, `ServicesOverview`, `PortfolioSection`, `SolutionsShowcase`, `Methodology`, etc.) a la ruta de prueba **`/prueba`**.

---

## 2. Cambios Implementados en `src/App.tsx`
- **Ruta por defecto (`/`):** Renderiza directamente `<LandingMaqueta />` sin barras de debug, presentándolo como el sitio oficial en producción.
- **Ruta `/prueba` (y alias `/legacy`):** Renderiza el Home anterior con una barra superior informativa que permite retornar al sitio principal en cualquier momento (`← Volver al Sitio Principal (Nuevo Diseño)`).
- **Ruta `/admin`:** Mantiene el acceso seguro al portal administrativo y CRM.
- **Ruta `/linktree`:** Mantiene la página de enlaces rápidos institucionales.
- **Enlace cruzado en Footer:** Se agregó un botón discreto en el footer de la nueva Landing para acceder a la versión previa en `/prueba`.

---

## 3. Validación
- **Compilación Vite:** `npm run build` ejecutado y finalizado exitosamente (`built in 11.50s`, 0 errores).
- **Pruebas en vivo con Chrome DevTools MCP:**
  - `http://localhost:5173/`: Carga el nuevo diseño de forma instantánea y limpia (0 errores).
  - `http://localhost:5173/prueba`: Carga la versión anterior con la barra de navegación cruzada (0 errores).
