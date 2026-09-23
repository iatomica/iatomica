export interface PortfolioProject {
  id: string;
  title: string;
  clientName: string;
  category: 'turismo' | 'salud' | 'legal' | 'realestate' | 'gourmet' | 'logistica';
  sectorLabel: string;
  badge: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  url: string;
  heroImage: string;
  accentColor: string;
  features: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
}

export const PORTFOLIO_CATEGORIES = [
  { id: 'todos', label: 'Todos los Sectores' },
  { id: 'turismo', label: 'Turismo & Rentals' },
  { id: 'salud', label: 'Salud & Medicina' },
  { id: 'legal', label: 'Legal & Contable (SaaS)' },
  { id: 'realestate', label: 'Arquitectura & Real Estate' },
  { id: 'gourmet', label: 'Gastronomía Gourmet' },
  { id: 'logistica', label: 'Comercio Exterior' }
] as const;

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'lexios',
    title: 'Lexios',
    clientName: 'Estudio Ferraro, Bianchi & Méndez S.C.',
    category: 'legal',
    sectorLabel: 'Legal & Contable (SaaS)',
    badge: 'Plataforma SaaS Integral',
    tagline: 'Soluciones jurídicas y contables para decisiones que importan',
    shortDesc: 'Sistema operativo integral para estudios profesionales, combinando web institucional, portal privado para clientes y ERP interno con gestión de causas, audiencias y facturación.',
    fullDesc: 'Lexios es una solución SaaS de nivel empresarial construida desde cero bajo principios de Taste Skill. Unifica en un solo entorno el sitio público de la firma, el portal seguro donde los clientes consultan el avance de sus trámites y suben documentación protegida, y un sistema interno de gestión con workspace de 9 pestañas por expediente, control de plazos fatales, matriz RBAC de 7 roles y facturación electrónica.',
    url: 'https://lexios.iatomica.com',
    heroImage: '/images/portfolio/lexios.jpg',
    accentColor: 'from-amber-600 to-amber-700',
    features: [
      'Workspace de 9 pestañas por causa judicial o contable',
      'Portal privado de clientes con firewall de confidencialidad',
      'Matriz RBAC granular con 7 perfiles profesionales',
      'Command Palette global (⌘K) con indexación ultrarrápida',
      'Time-tracking facturable y conciliación de tasas judiciales'
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Docker', 'Traefik SSL'],
    metrics: [
      { label: 'Roles Soportados', value: '7' },
      { label: 'Pestañas por Causa', value: '9' },
      { label: 'Tiempo de Carga', value: '<450ms' }
    ]
  },
  {
    id: 'grupovision',
    title: 'Grupo Visión',
    clientName: 'Grupo Visión Bariloche',
    category: 'turismo',
    sectorLabel: 'Turismo & Excursiones',
    badge: 'Receptivo & Reservas',
    tagline: 'Viví Bariloche todo el año con guías habilitados',
    shortDesc: 'Plataforma de catálogo interactivo, cotización y gestión operativa de excursiones tradicionales, lacustres y de alta montaña en Bariloche.',
    fullDesc: 'Desarrollo a medida para una de las empresas receptivas más prestigiosas de la Patagonia. Cuenta con catálogo categorizado de 23 excursiones, sistema dinámico de tickets de consulta, panel administrativo con autogestión de tarifas, banner de promociones en tiempo real y asistencia directa por WhatsApp.',
    url: 'https://grupovision.iatomica.com',
    heroImage: '/images/portfolio/grupovision.webp',
    accentColor: 'from-blue-600 to-cyan-600',
    features: [
      'Catálogo interactivo con 23 excursiones y fichas detalladas',
      'Sistema de cotización directa y checkout de consultas',
      'Panel de administración para actualización de tarifas y cupos',
      'Banner carrusel de descuentos y promociones destacadas',
      'Optimización de imágenes WebP para navegación móvil fluida'
    ],
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Docker'],
    metrics: [
      { label: 'Excursiones Activas', value: '23' },
      { label: 'Canal de Conversión', value: 'WhatsApp Directo' },
      { label: 'Disponibilidad', value: '100%' }
    ]
  },
  {
    id: 'aurasalud',
    title: 'AURA Salud',
    clientName: 'Centro Médico AURA',
    category: 'salud',
    sectorLabel: 'Salud & Policonsultorios',
    badge: 'Centro Médico Integral',
    tagline: 'Tu salud, con tiempo para vos',
    shortDesc: 'Portal institucional para policonsultorios médicos con cartilla de especialidades, cobertura de obras sociales y solicitud de turnos online.',
    fullDesc: 'Plataforma web médica pensada para simplificar el acceso a la atención de salud. Incluye directorio interactivo de especialidades (cardiología, pediatría, traumatología, etc.), validación de coberturas médicas y prepagas, perfiles de profesionales médicos y canal directo de agenda de turnos.',
    url: 'https://aurasalud.iatomica.com',
    heroImage: '/images/portfolio/aurasalud.jpg',
    accentColor: 'from-teal-600 to-emerald-600',
    features: [
      'Buscador y filtro interactivo de especialidades médicas',
      'Cartilla de obras sociales y empresas de medicina prepaga',
      'Flujo guiado para solicitud y reserva de turnos',
      'Directorio de médicos con credenciales y horarios de atención',
      'Diseño accesible y calmo enfocado en la experiencia del paciente'
    ],
    techStack: ['Next.js 14', 'React', 'Tailwind CSS', 'Docker', 'Phosphor Icons'],
    metrics: [
      { label: 'Especialidades', value: '20+' },
      { label: 'Obras Sociales', value: 'Principales' },
      { label: 'Turnos', value: 'Digitales' }
    ]
  },
  {
    id: 'baccio',
    title: 'Baccio Chocolatier',
    clientName: 'Baccio Chocolatier Bariloche',
    category: 'gourmet',
    sectorLabel: 'Gastronomía Gourmet',
    badge: 'Chocolatería Artesanal',
    tagline: 'Tradición Suiza y Cacao Fino de Aroma desde 1968',
    shortDesc: 'Vitrina digital y tienda de marca para chocolatería tradicional de San Carlos de Bariloche, con catálogo de bombones, tabletas y especialidades.',
    fullDesc: 'Diseño elegante y envolvente que refleja la historia, los ingredientes nobles y el proceso artesanal de Baccio Chocolatier. Permite recorrer las variedades de chocolate con leche, semiamargo, blanco, rellenos patagónicos, tortas heladas y cajas de regalo corporativas.',
    url: 'https://baccio.iatomica.com',
    heroImage: '/images/portfolio/baccio.webp',
    accentColor: 'from-amber-800 to-amber-950',
    features: [
      'Catálogo inmersivo de productos y especialidades artesanales',
      'Narrativa de marca e historia familiar patagónica',
      'Presentación de estuches de regalo y pedidos especiales',
      'Integración con puntos de venta físicos en Bariloche',
      'Microinteracciones y paleta de colores cacao gourmet'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Docker'],
    metrics: [
      { label: 'Años de Tradición', value: '56' },
      { label: 'Variedades', value: '40+' },
      { label: 'Calidad', value: '100% Artesanal' }
    ]
  },
  {
    id: 'rentaltrip',
    title: 'RentalTrip',
    clientName: 'RentalTrip Patagonia',
    category: 'turismo',
    sectorLabel: 'Turismo & Rentals',
    badge: 'Rent-a-Car & 4x4',
    tagline: 'Alquiler de vehículos y camionetas 4x4 en la Patagonia',
    shortDesc: 'Plataforma de reserva y cotización de flota de autos urbanos, SUVs y camionetas 4x4 equipadas para ripio y nieve con entrega en aeropuerto.',
    fullDesc: 'Desarrollada para brindar una experiencia de alquiler ágil y confiable a turistas y empresas en Bariloche y la región de los lagos. Presenta especificaciones detalladas de cada vehículo, condiciones claras de seguro, opcionales de temporada (cadenas, porta-esquís) y contacto inmediato.',
    url: 'https://rentaltrip.iatomica.com',
    heroImage: '/images/portfolio/rentaltrip.jpg',
    accentColor: 'from-orange-600 to-red-600',
    features: [
      'Flota clasificada por categorías: Económicos, SUVs y Pickups 4x4',
      'Cotizador de días de alquiler con equipamiento de montaña',
      'Coordinación de entregas directas en Aeropuerto Bariloche (BRC)',
      'Asistencia en ruta y asesoramiento para caminos de cordillera',
      'Diseño responsivo optimizado para reservas desde el celular'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Docker'],
    metrics: [
      { label: 'Flota', value: 'Multisegmento' },
      { label: 'Entrega', value: 'Aeropuerto BRC' },
      { label: 'Cobertura', value: 'Patagonia' }
    ]
  },
  {
    id: 'rentalride',
    title: 'Rentalride',
    clientName: 'Rentalride Patagonia',
    category: 'turismo',
    sectorLabel: 'Turismo & Rentals',
    badge: 'Motos Trail & Aventura',
    tagline: 'Alquiler de motos trail y travesías guiadas por la Ruta 40',
    shortDesc: 'Renta de motocicletas trail de media y alta cilindrada para recorrer los circuitos panorámicos de la Patagonia andina.',
    fullDesc: 'Plataforma especializada para motoviajeros y entusiastas del turismo en dos ruedas. Permite seleccionar modelos icónicos (BMW GS, Royal Enfield Himalayan, Honda), equipamiento técnico, rutas recomendadas (Siete Lagos, Paso Córdoba) y asistencia mecánica en viaje.',
    url: 'https://rentalride.iatomica.com',
    heroImage: '/images/portfolio/rentalride.jpg',
    accentColor: 'from-blue-700 to-indigo-800',
    features: [
      'Catálogo de motocicletas con ficha técnica y cilindrada',
      'Alquiler de indumentaria protectora y baúles de viaje',
      'Guías interactivas de rutas y caminos recomendados',
      'Sistema de cotización rápida y reserva de fechas',
      'Diseño visual impactante con espíritu de aventura'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Docker'],
    metrics: [
      { label: 'Modelos', value: 'Trail & Aventura' },
      { label: 'Rutas Guiadas', value: 'Siete Lagos / R40' },
      { label: 'Equipamiento', value: 'Completo' }
    ]
  },
  {
    id: 'rentalfit',
    title: 'Rentalfit',
    clientName: 'Rentalfit Bariloche',
    category: 'turismo',
    sectorLabel: 'Turismo & Rentals',
    badge: 'Equipos & Ropa de Nieve',
    tagline: 'Indumentaria técnica, esquís y tablas con delivery al hotel',
    shortDesc: 'Catálogo y reserva de trajes térmicos, enteritos, pantalones de esquí, tablas de snowboard y botas para la temporada invernal.',
    fullDesc: 'Solución integral para el turista que visita el Cerro Catedral y Bariloche en invierno. Ofrece selección de talles y modelos, entrega y recolección programada en el alojamiento y combos familiares para disfrutar de la nieve sin complicaciones logísticas.',
    url: 'https://rentalfit.iatomica.com',
    heroImage: '/images/portfolio/rentalfit.jpg',
    accentColor: 'from-cyan-600 to-blue-700',
    features: [
      'Reserva de combos completos: campera, pantalón, botas y guantes',
      'Equipos de esquí y snowboard calibrados por profesionales',
      'Servicio de entrega y retiro directo en hoteles y cabañas',
      'Tabla interactiva de equivalencia de talles para adultos y niños',
      'Proceso de checkout simplificado para grupos familiares'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Docker'],
    metrics: [
      { label: 'Puntos de Entrega', value: 'Todo Bariloche' },
      { label: 'Temporada', value: 'Invierno / Nieve' },
      { label: 'Calificación', value: '5.0 ★' }
    ]
  },
  {
    id: 'inmobify',
    title: 'Inmobify',
    clientName: 'Inmobify Bienes Raíces',
    category: 'realestate',
    sectorLabel: 'Arquitectura & Real Estate',
    badge: 'Propiedades Exclusivas',
    tagline: 'Casas de montaña, lotes frente al lago y desarrollos andinos',
    shortDesc: 'Portal inmobiliario boutique para compra, venta y tasación de propiedades residenciales, comerciales y campos en la Patagonia.',
    fullDesc: 'Plataforma inmobiliaria moderna con fotografía arquitectónica de alta resolución, filtros por zona geográfica (Circuito Chico, Arelauquen, Costa del Lago), cálculo de valor por metro cuadrado y contacto directo con tasadores matriculados.',
    url: 'https://inmobify.iatomica.com',
    heroImage: '/images/portfolio/inmobify.webp',
    accentColor: 'from-emerald-700 to-teal-800',
    features: [
      'Buscador avanzado con filtros por precio, ambientes y ubicación',
      'Fichas de propiedades con galerías inmersivas y mapas satelitales',
      'Módulo de solicitud de tasación online para propietarios',
      'Optimización de carga para imágenes arquitectónicas pesadas',
      'Estética editorial que resalta la materialidad andina'
    ],
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Vite', 'Docker'],
    metrics: [
      { label: 'Propiedades', value: 'Seleccionadas' },
      { label: 'Zonas', value: 'Lagos & Cordillera' },
      { label: 'Asesoramiento', value: 'Matriculado' }
    ]
  },
  {
    id: 'stefdesign',
    title: 'SENSE · Stefania Del Papa',
    clientName: 'Estudio Stefania Del Papa',
    category: 'realestate',
    sectorLabel: 'Arquitectura & Real Estate',
    badge: 'Interiorismo de Lujo',
    tagline: 'Arquitectura de interiores sensorial y consultoría espacial',
    shortDesc: 'Portfolio y plataforma de consultoría de diseño interior de alta gama, dirección de proyectos residenciales y renders 3D fotorrealistas.',
    fullDesc: 'Diseñado bajo la más estricta disciplina de Taste Skill, este sitio expone proyectos arquitectónicos en travertino romano, roble ahumado y texturas nobles. Funciona como carta de presentación ante desarrolladores y clientes residenciales internacionales de alto poder adquisitivo.',
    url: 'https://stefdesign.iatomica.com',
    heroImage: '/images/portfolio/delpapa.webp',
    accentColor: 'from-stone-700 to-stone-900',
    features: [
      'Diseño editorial minimalista con tipografías serif de alta gama',
      'Galería de proyectos con microinteracciones y zoom fotorrealista',
      'Desglose de metodologías de diseño y selección de materiales',
      'Canal de admisión privado para nuevos encargos y consultorías',
      'Rendimiento ultraoptimizado para imágenes en ultra alta definición'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Docker'],
    metrics: [
      { label: 'Estilo', value: 'Quiet Luxury' },
      { label: 'Visualización', value: '3D Fotorrealista' },
      { label: 'Alcance', value: 'Internacional' }
    ]
  },
  {
    id: 'nos-arq',
    title: 'NOS Arquitectura',
    clientName: 'Estudio NOS Arquitectura',
    category: 'realestate',
    sectorLabel: 'Arquitectura & Real Estate',
    badge: 'Estudio de Arquitectura',
    tagline: 'Diseño estructural, desarrollo urbano y dirección de obra',
    shortDesc: 'Web institucional y portfolio de obras para estudio de arquitectura contemporánea, proyectos residenciales y dirección constructiva.',
    fullDesc: 'Plataforma sobria y precisa que exhibe proyectos de vivienda unifamiliar y multifamiliar. Detalla las etapas proyectuales desde el croquis preliminar y cálculo estructural hasta la entrega de llave en mano.',
    url: 'https://nos-arq.iatomica.com',
    heroImage: '/images/portfolio/nos-arq.webp',
    accentColor: 'from-slate-700 to-slate-900',
    features: [
      'Presentación cronológica de obras concluidas y en construcción',
      'Fichas técnicas con planos, superficies cubiertas y memoria',
      'Contacto directo para desarrolladores e inversores inmobiliarios',
      'Diseño monocromático y estructural de inspiración suiza',
      'Carga ultrarrápida y navegación fluida entre proyectos'
    ],
    techStack: ['React', 'Tailwind CSS', 'Vite', 'Docker', 'Traefik'],
    metrics: [
      { label: 'Obras Realizadas', value: 'Multi-escala' },
      { label: 'Enfoque', value: 'Contemporáneo' },
      { label: 'Dirección', value: 'Integral' }
    ]
  },
  {
    id: 'vetify',
    title: 'Vetify',
    clientName: 'Vetify Clínica Veterinaria',
    category: 'salud',
    sectorLabel: 'Salud & Medicina',
    badge: 'Medicina Veterinaria',
    tagline: 'Cuidado clínico contemporáneo y bienestar para mascotas',
    shortDesc: 'Portal para clínica veterinaria con agenda de consultas, guardias de urgencia, cirugías, diagnóstico por imágenes y farmacia especializada.',
    fullDesc: 'Plataforma amigable y confiable orientada a dueños de mascotas y profesionales veterinarios. Permite solicitar turnos médicos, consultar especialidades veterinarias (oftalmología, cardiología, dermatología) y acceder a pautas de vacunación y cuidados preventivos.',
    url: 'https://vetify.iatomica.com',
    heroImage: '/images/portfolio/vetify.webp',
    accentColor: 'from-indigo-600 to-purple-700',
    features: [
      'Agendamiento de consultas clínicas y turnos de vacunación',
      'Guía de emergencias y servicios de guardia 24hs',
      'Información sobre cirugías complejas y laboratorio propio',
      'Catálogo de nutrición médica y farmacia veterinaria',
      'Diseño empático enfocado en la tranquilidad de la familia'
    ],
    techStack: ['React', 'Tailwind CSS', 'Vite', 'Docker', 'Traefik'],
    metrics: [
      { label: 'Atención', value: '24hs Guardias' },
      { label: 'Especialidades', value: 'Completas' },
      { label: 'Pacientes', value: 'Perros & Gatos' }
    ]
  },
  {
    id: 'yiwu',
    title: 'Yiwu Anhao',
    clientName: 'Yiwu Anhao Logistics & Trade',
    category: 'logistica',
    sectorLabel: 'Comercio Exterior',
    badge: 'Logística Internacional',
    tagline: 'Conectando fábricas de China con empresas de Latinoamérica',
    shortDesc: 'Plataforma de servicios de comercio exterior, sourcing en el mercado de Yiwu/Guangzhou, consolidación de cargas marítimas y despacho de aduana.',
    fullDesc: 'Solución integral para empresas importadoras. Facilita la búsqueda y negociación con proveedores en China, control de calidad en origen, consolidación en depósitos propios de Yiwu y gestión de fletes internacionales puerta a puerta hacia Sudamérica.',
    url: 'https://yiwu-web.iatomica.com',
    heroImage: '/images/portfolio/yiwu.jpg',
    accentColor: 'from-red-600 to-slate-800',
    features: [
      'Servicios de búsqueda y verificación de proveedores en China',
      'Inspección de calidad presencial en depósitos de Yiwu',
      'Consolidación de contenedores y fletes marítimos/aéreos',
      'Asesoramiento integral en normativa aduanera y aranceles',
      'Comunicación bilingüe (español y chino mandarín) para clientes'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Docker'],
    metrics: [
      { label: 'Hub Principal', value: 'Yiwu, China' },
      { label: 'Destino', value: 'Latinoamérica' },
      { label: 'Cargas', value: 'FCL & LCL' }
    ]
  }
];
