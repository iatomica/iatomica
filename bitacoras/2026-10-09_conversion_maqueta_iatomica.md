# Bitácora: Conversión y Adaptación Integral de la Maqueta IAtomica_Landing

**Fecha:** 2026-10-09  
**Origen:** `C:\Users\Luiti\Desktop\IAtomica\repositories\iatomica\scratch\IAtomica_Landing`  
**Destino:** `src/components/landing/LandingMaqueta.tsx` y `src/styles/landing-maqueta.css`

---

## 1. Análisis de la Maqueta Original
La maqueta en `scratch/IAtomica_Landing/index.html` constaba de:
- **Estilo Visual:** Neo-brutalismo editorial sobre fondo texturizado con ruido fractal SVG (`#f2efe5`), tinta negra `#171715`, acentos amarillo `#ffe526`, azul `#008ded` y magenta `#ff4b83`.
- **Tipografía:** Títulos en `Impact` / `Arial Narrow` con resaltador amarillo (`.highlight`), textos en `Arial`.
- **Identidad:** Isotipo atómico original transparente (`iatomica-logo-original.png`).
- **Hero:** Collage editorial multicapa con recortes de papel rasgado, cinta adhesiva, semitonos y la imagen compuesta `hero-collage-v4.png`.
- **Servicios:** 6 tarjetas con símbolos SVG vectoriales (`#bulb`, `#bot`, `#code`, `#link`, `#check`, `#megaphone`) sobre círculos punteados de colores.
- **Proyectos / Clientes en la maqueta:**
  1. *Grupo Visión* (Turismo · Proyecto en desarrollo): recortado con sprite `mountain`.
  2. *Gestión de consultorios* (Salud · Solución ilustrativa): recortado con sprite `health`.
  3. *Reservas más simples* (Servicios · Solución ilustrativa): recortado con sprite `rent`.

---

## 2. Adaptación de las Tarjetas de Clientes al Sistema Real de iAtomica
Se cruzó la información de la maqueta con el catálogo real en `src/data/portfolioData.ts`:
1. **Grupo Visión (`grupovision`):**
   - *Cliente real:* Grupo Visión Bariloche.
   - *Sector / Tag:* Turismo · Receptivo & Reservas.
   - *Solución:* Rediseño web, catálogo interactivo de 23 excursiones, sistema de cotización directa y checkout de consultas por WhatsApp.
   - *Imagen:* `/images/portfolio/grupovision.webp` (con soporte para el sprite de montaña de la maqueta).
   - *Métricas reales:* 23 Excursiones Activas, WhatsApp Directo, 100% Disponibilidad.
2. **AURA Salud (`aurasalud` - adaptado de "Gestión de consultorios"):**
   - *Cliente real:* Centro Médico AURA.
   - *Sector / Tag:* Salud & Policonsultorios Médicos.
   - *Solución:* Portal institucional con cartilla de más de 20 especialidades, validación de obras sociales y solicitud de turnos online.
   - *Imagen:* `/images/portfolio/aurasalud.jpg` (con soporte para el sprite de la profesional de salud de la maqueta).
   - *Métricas reales:* 20+ Especialidades, Obras Sociales Principales, Turnos Digitales.
3. **RentalTrip (`rentaltrip` - adaptado de "Reservas más simples"):**
   - *Cliente real:* RentalTrip Patagonia.
   - *Sector / Tag:* Servicios & Turismo · Rent-a-Car 4x4.
   - *Solución:* Plataforma de reserva y cotización de flota para ripio y nieve con entrega directa en Aeropuerto de Bariloche (BRC).
   - *Imagen:* `/images/portfolio/rentaltrip.jpg` (con soporte para el sprite de cabañas de la maqueta).
   - *Métricas reales:* Flota Multisegmento, Entrega Aeropuerto BRC, Cobertura Patagonia.
4. **Lexios (`lexios` - proyecto SaaS insignia agregado):**
   - *Cliente real:* Estudio Ferraro, Bianchi & Méndez S.C.
   - *Sector / Tag:* Legal & Contable · Plataforma SaaS.
   - *Solución:* Sistema operativo integral con workspace de 9 pestañas por expediente, control de plazos fatales, matriz RBAC de 7 roles y facturación electrónica.
   - *Imagen:* `/images/portfolio/lexios.jpg`.
5. **Baccio Chocolatier (`baccio` - proyecto gourmet insignia agregado):**
   - *Cliente real:* Baccio Chocolatier Bariloche (desde 1968).
   - *Sector / Tag:* Gastronomía Gourmet · Tienda de Marca.
   - *Solución:* Vitrina digital inmersiva de bombones y tabletas patagónicas con estuches de regalo.
   - *Imagen:* `/images/portfolio/baccio.webp`.
6. **Rentalride (`rentalride` - proyecto trail agregado):**
   - *Cliente real:* Rentalride Patagonia.
   - *Sector / Tag:* Turismo & Aventura · Motos Trail.
   - *Solución:* Alquiler de motos trail y travesías guiadas por la Ruta 40 con reserva online.
   - *Imagen:* `/images/portfolio/rentalride.jpg`.

---

## 3. Funcionalidades del Sistema Integradas
- **Ficha Técnica Modal (`PortfolioModal`):** Cada tarjeta es clickeable y abre el modal completo de la plataforma con stack tecnológico, métricas y enlace en vivo.
- **Filtros por Sector:** Pestañas interactivas para filtrar por *Todos*, *Turismo & Rentals*, *Salud*, *Legal (SaaS)* y *Gastronomía*.
- **Toggle de Proyectos:** Botón para alternar entre la vista destacada (3 tarjetas como en la maqueta) y la vista ampliada (6 casos de éxito reales).
- **Formulario de Contacto Funcional:**
  - Persistencia directa en SQLite mediante `createLead()` (`/api/leads`) conectado al CRM y Jira.
  - Copia automática al portapapeles con mensaje formateado.
  - Botón de contacto directo por WhatsApp.
- **Navegación Fluida:** Anclas `#inicio`, `#servicios`, `#proyectos`, `#proceso`, `#nosotros`, `#faq`, `#contacto`.
- **Menú Responsive:** Panel móvil deslizante con fondo tinta `#171715` y cierre automático.

---

## 4. Validación Técnica
- Assets copiados a `public/landing-assets/` (`hero-collage-v4.png`, `iatomica-logo-original.png`, `referencia.png`).
- Compilación Vite verificada exitosamente (`built in 13.81s`, 0 errores).
- Inspección en vivo mediante **Chrome DevTools MCP** en `http://localhost:5173/prueba`:
  - 0 errores en consola.
  - Verificación visual de Header, Hero collage, Servicios SVG, Tarjetas de clientes, Modal interactivo, Proceso, FAQ y Formulario.
