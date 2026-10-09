# Bitácora: Rediseño Editorial Pop-Art / Neo-Brutalist con Tastemaker

**Fecha:** 2026-10-09  
**Objetivo:** Reconstrucción total de la propuesta en `/prueba` utilizando la metodología **Tastemaker** (CodesWithRoh) para coincidir con exactitud píxel a píxel con la imagen de referencia ("PROPUESTA DE REDISEÑO WEB - VERSIÓN DESKTOP Y MOBILE").

---

## 1. Contexto y Requerimiento
El usuario solicitó rehacer la página `/prueba` desde cero, descartando versiones previas genéricas y aplicando estrictamente:
1. Repositorio de referencia metodológica: `https://github.com/codeswithroh/tastemaker`
2. Imagen de diseño de referencia con los dos formatos:
   - **Formato Desktop (01 a 10):** Header, Hero con collage, Servicios (6 tarjetas), Proyectos (4 casos), Proceso (4 pasos), Beneficios (6 cajas), Testimonios (3 clientes con 5 estrellas), FAQ (4 acordeones), Contacto (bloque amarillo con excursionista y montañas de Bariloche), Footer (negro tinta con isotipo atómico y claim).
   - **Formato Mobile (01 a 06):** 6 mockups de iPhone lado a lado tal cual figuran en el afiche oficial (`MOBILE 01 HERO PRINCIPAL`, `MOBILE 02 SERVICIOS`, `MOBILE 03 PROYECTOS`, `MOBILE 04 PROCESO`, `MOBILE 05 FAQ Y CONTACTO`, `MOBILE 06 FOOTER / MENÚ`).

---

## 2. Aplicación de Tastemaker (`.tastemaker/style-lock.md`)
Se bloquearon los tokens de estilo para evitar desvíos:
- **Paleta de Color:**
  - Papel / Lienzo: `#F6F1E6` (Cream texturizado con grain sutil)
  - Tinta Editorial: `#131313` / `#000000`
  - Amarillo Pop Primario: `#FFE000`
  - Azul Eléctrico: `#168CF5`
  - Rosa Magenta: `#FF3D8D`
  - Verde Esmeralda: `#32C878`
  - Naranja / Coral: `#F04B36`
- **Tipografías:**
  - Títulos de Impacto: `Anton`, `Impact`, sans-serif uppercase
  - Cuerpo y UI: `Plus Jakarta Sans`, sans-serif
  - Anotaciones Manuscritas: `Caveat`, cursive
- **Casting Fotográfico Auténtico:**
  - `hero_woman_laptop.jpg`: Retrato idéntico de joven profesional con chaqueta oscura y laptop mirando hacia arriba-derecha.
  - `lake_bariloche.jpg`: Cordillera de Bariloche y lago andino con nieve.
  - `bariloche_hiker_contact.jpg`: Excursionista de espaldas con mochila mirando la cordillera y lago.

---

## 3. Componentes Implementados en `src/components/experimental/`
- `TastemakerNavbar.tsx`: Isotipo atómico poligonal `⚛ iAtomica`, navegación limpia y botón amarillo redondeado.
- `TastemakerHero.tsx`: Titular exacto "QUE LA IA TRABAJE POR TU NEGOCIO" con bloques negro y amarillo, collage superpuesto con sol amarillo, spray azul y sticker "MENOS TAREAS REPETITIVAS. MÁS RESULTADOS.".
- `TastemakerServices.tsx`: 6 tarjetas de servicio con iconos vectoriales en círculos negros, botones de acción `➔` y etiquetas.
- `TastemakerProjects.tsx`: 4 proyectos (Grupo Visión, Lexios, AURA, RentalTrip) con tags temáticos y modal de detalle.
- `TastemakerProcess.tsx`: Flujo de 4 pasos con círculos cromáticos numerados (01 Diagnóstico, 02 Diseño, 03 Desarrollo y QA, 04 Lanzamiento).
- `TastemakerBenefits.tsx`: 6 cajas de beneficios con iconos de línea.
- `TastemakerTestimonials.tsx`: Citas de María González, Juan Pérez y Carla Torres con 5 estrellas doradas.
- `TastemakerFAQ.tsx`: Acordeón interactivo con las 4 preguntas exactas del afiche.
- `TastemakerContact.tsx`: Bloque amarillo de impacto con fotomontaje de excursionista y nota manuscrita "IDEAS QUE SE CONVIERTEN EN SOLUCIONES REALES".
- `TastemakerFooter.tsx`: Footer oscuro con isotipo atómico, enlaces institucionales y copyright.
- `TastemakerMobileBoard.tsx`: Recreación fiel de la mitad derecha del afiche con los 6 celulares iPhone y sus respectivos estados de pantalla.
- `PruebaPage.tsx`: Vista interactiva con barra superior de cambio de formato:
  1. **Desktop Completo (Web en Vivo)**
  2. **6 Estados Mobile (Póster)**
  3. **Simulador Celular 390px**

---

## 4. Validación Técnica
- **Compilación Vite:** `npm run build` exitoso (`built in 5.14s`, 0 errores).
- **Inspección Chrome DevTools MCP:** Navegación en vivo a `http://localhost:5173/prueba`, console logs sin errores (0 errors), capturas de pantalla validadas en desktop y mobile.
