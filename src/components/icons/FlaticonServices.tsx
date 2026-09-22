import React from 'react';

interface FlaticonProps {
  className?: string;
  size?: number;
}

/**
 * 1. Consultoría Tecnológica & Estrategia
 * Flat vector illustration: Target board, lightbulb of strategy, growth charts and compass.
 */
export const FlaticonConsulting: React.FC<FlaticonProps> = ({ className = '', size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Soft Shadow / Backglow */}
    <circle cx="60" cy="62" r="50" fill="url(#consulting_glow)" opacity="0.15" />

    {/* Base Dashboard / Document Slate */}
    <rect x="22" y="26" width="76" height="68" rx="14" fill="#1E293B" stroke="#334155" strokeWidth="2.5" />
    <rect x="28" y="32" width="64" height="12" rx="6" fill="#334155" />
    <circle cx="36" cy="38" r="3" fill="#EF4444" />
    <circle cx="45" cy="38" r="3" fill="#F59E0B" />
    <circle cx="54" cy="38" r="3" fill="#10B981" />

    {/* Analytics Bars with Warm Accents */}
    <rect x="34" y="66" width="10" height="20" rx="4" fill="#64748B" />
    <rect x="48" y="58" width="10" height="28" rx="4" fill="#F97316" />
    <rect x="62" y="50" width="10" height="36" rx="4" fill="#FB923C" />
    <rect x="76" y="60" width="10" height="26" rx="4" fill="#A855F7" />

    {/* Strategy Floating Compass / Target Badge */}
    <g filter="url(#drop_shadow_1)">
      <circle cx="82" cy="36" r="20" fill="url(#grad_orange)" />
      <circle cx="82" cy="36" r="14" fill="#FFFFFF" />
      <polygon points="82,27 86,36 82,34 78,36" fill="#EA580C" />
      <polygon points="82,45 86,36 82,38 78,36" fill="#64748B" />
      <circle cx="82" cy="36" r="2.5" fill="#1E293B" />
    </g>

    {/* Sparkle */}
    <path d="M26 20L28 14L34 16L28 18L26 20Z" fill="#FBBF24" />

    <defs>
      <radialGradient id="consulting_glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="grad_orange" x1="62" y1="16" x2="102" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FB923C" />
        <stop offset="1" stopColor="#EA580C" />
      </linearGradient>
      <filter id="drop_shadow_1" x="58" y="14" width="48" height="48" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.3" />
      </filter>
    </defs>
  </svg>
);

/**
 * 2. Desarrollo de Herramientas de IA
 * Flat vector illustration: Friendly AI Agent Bot, Neural circuits and glowing chat intelligence.
 */
export const FlaticonAiTools: React.FC<FlaticonProps> = ({ className = '', size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Soft Glow */}
    <circle cx="60" cy="60" r="50" fill="url(#ai_glow)" opacity="0.18" />

    {/* Neural Connection Circles */}
    <line x1="26" y1="44" x2="48" y2="34" stroke="#818CF8" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
    <line x1="94" y1="44" x2="72" y2="34" stroke="#F472B6" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
    <circle cx="26" cy="44" r="5" fill="#6366F1" />
    <circle cx="94" cy="44" r="5" fill="#EC4899" />

    {/* Robot Head Body */}
    <rect x="30" y="36" width="60" height="52" rx="18" fill="url(#grad_ai_body)" stroke="#4338CA" strokeWidth="2.5" />

    {/* Antenna */}
    <rect x="58" y="24" width="4" height="12" rx="2" fill="#818CF8" />
    <circle cx="60" cy="22" r="6" fill="#F43F5E" />

    {/* Visor Screen */}
    <rect x="40" y="48" width="40" height="24" rx="10" fill="#0F172A" />

    {/* Glowing Friendly Eyes */}
    <ellipse cx="49" cy="60" rx="4.5" ry="5.5" fill="#38BDF8" />
    <circle cx="50.5" cy="58.5" r="1.5" fill="#FFFFFF" />
    <ellipse cx="71" cy="60" rx="4.5" ry="5.5" fill="#38BDF8" />
    <circle cx="72.5" cy="58.5" r="1.5" fill="#FFFFFF" />

    {/* Smiling Wave */}
    <path d="M56 66C58 68 62 68 64 66" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />

    {/* Floating Chat / Sparkle Bubble */}
    <g filter="url(#drop_shadow_2)">
      <circle cx="86" cy="80" r="16" fill="url(#grad_sparkle)" />
      <path d="M86 70L88 77L95 79L88 81L86 88L84 81L77 79L84 77L86 70Z" fill="#FFFFFF" />
    </g>

    <defs>
      <radialGradient id="ai_glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="grad_ai_body" x1="30" y1="36" x2="90" y2="88" gradientUnits="userSpaceOnUse">
        <stop stopColor="#312E81" />
        <stop offset="1" stopColor="#1E1B4B" />
      </linearGradient>
      <linearGradient id="grad_sparkle" x1="70" y1="64" x2="102" y2="96" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F43F5E" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      <filter id="drop_shadow_2" x="66" y="62" width="40" height="40" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#0F172A" floodOpacity="0.4" />
      </filter>
    </defs>
  </svg>
);

/**
 * 3. Software Dedicado & Sistemas a Medida
 * Flat vector illustration: Modular Code layers, browser interface, lightning execution.
 */
export const FlaticonSoftware: React.FC<FlaticonProps> = ({ className = '', size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Soft Glow */}
    <circle cx="60" cy="60" r="50" fill="url(#soft_glow)" opacity="0.18" />

    {/* Back Isometric Block */}
    <rect x="24" y="44" width="64" height="48" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="2.5" />

    {/* Front Coding Window */}
    <g filter="url(#drop_shadow_3)">
      <rect x="34" y="24" width="66" height="58" rx="14" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
      
      {/* Header window dots */}
      <circle cx="45" cy="34" r="2.5" fill="#EF4444" />
      <circle cx="53" cy="34" r="2.5" fill="#F59E0B" />
      <circle cx="61" cy="34" r="2.5" fill="#10B981" />

      {/* Code syntax tags */}
      <path d="M48 48L42 54L48 60" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 48L66 54L60 60" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="56" y1="46" x2="52" y2="62" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />

      {/* Terminal Mini Line */}
      <rect x="74" y="52" width="14" height="4" rx="2" fill="#64748B" />
      <rect x="42" y="68" width="46" height="3" rx="1.5" fill="#334155" />
    </g>

    {/* Floating Rocket / Lightning Launch Badge */}
    <g filter="url(#drop_shadow_launch)">
      <circle cx="86" cy="80" r="16" fill="url(#grad_launch)" />
      <path d="M84 70L80 79H86L84 88L92 78H86L89 70H84Z" fill="#FFFFFF" />
    </g>

    <defs>
      <radialGradient id="soft_glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0EA5E9" />
        <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="grad_launch" x1="70" y1="64" x2="102" y2="96" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B" />
        <stop offset="1" stopColor="#EA580C" />
      </linearGradient>
      <filter id="drop_shadow_3" x="28" y="20" width="78" height="70" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0284C7" floodOpacity="0.25" />
      </filter>
      <filter id="drop_shadow_launch" x="66" y="62" width="40" height="40" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#0F172A" floodOpacity="0.4" />
      </filter>
    </defs>
  </svg>
);

/**
 * 4. Mantenimiento & Control de Calidad (QA)
 * Flat vector illustration: Verified Shield, precision checkmark, radar audit & metrics.
 */
export const FlaticonQaTesting: React.FC<FlaticonProps> = ({ className = '', size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Soft Glow */}
    <circle cx="60" cy="60" r="50" fill="url(#qa_glow)" opacity="0.18" />

    {/* Concentric Scanner Rings */}
    <circle cx="60" cy="60" r="42" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />

    {/* Main Security Shield */}
    <g filter="url(#drop_shadow_4)">
      <path
        d="M60 22L88 34V58C88 77 76 93 60 98C44 93 32 77 32 58V34L60 22Z"
        fill="url(#grad_shield)"
        stroke="#059669"
        strokeWidth="2.5"
      />

      {/* Internal Shield Contrast Plate */}
      <path
        d="M60 30L80 39V58C80 72 71 84 60 88C49 84 40 72 40 58V39L60 30Z"
        fill="#064E3B"
        opacity="0.85"
      />

      {/* Giant Verified Checkmark */}
      <path
        d="M50 58L57 65L72 48"
        stroke="#34D399"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>

    {/* Bug Hunter Badge / Magnifier */}
    <g filter="url(#drop_shadow_bug)">
      <circle cx="86" cy="80" r="16" fill="url(#grad_bug)" />
      {/* Search Lens */}
      <circle cx="84" cy="78" r="6" stroke="#FFFFFF" strokeWidth="2.5" />
      <line x1="88.5" y1="82.5" x2="94" y2="88" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    <defs>
      <radialGradient id="qa_glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="grad_shield" x1="32" y1="22" x2="88" y2="98" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="grad_bug" x1="70" y1="64" x2="102" y2="96" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#1D4ED8" />
      </linearGradient>
      <filter id="drop_shadow_4" x="26" y="18" width="68" height="86" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#047857" floodOpacity="0.3" />
      </filter>
      <filter id="drop_shadow_bug" x="66" y="62" width="40" height="40" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#0F172A" floodOpacity="0.4" />
      </filter>
    </defs>
  </svg>
);

/**
 * 5. Desarrollo de Contenido & Marketing
 * Flat vector illustration: Megaphone broadcast, creative brush palette, viral reach sparkles.
 */
export const FlaticonContent: React.FC<FlaticonProps> = ({ className = '', size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Soft Glow */}
    <circle cx="60" cy="60" r="50" fill="url(#content_glow)" opacity="0.18" />

    {/* Megaphone Sound Waves */}
    <path d="M78 38C84 44 86 52 84 62" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    <path d="M86 32C94 40 96 56 92 68" stroke="#FB7185" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

    {/* Main Megaphone Speaker */}
    <g filter="url(#drop_shadow_5)">
      {/* Cone Body */}
      <path
        d="M34 50L64 36V76L34 62V50Z"
        fill="url(#grad_megaphone)"
        stroke="#E11D48"
        strokeWidth="2.5"
      />
      
      {/* Front Bell Ring */}
      <ellipse cx="64" cy="56" rx="6" ry="20" fill="#BE123C" stroke="#E11D48" strokeWidth="2" />

      {/* Handle */}
      <path d="M42 62V78C42 82 46 84 50 82V66" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />

      {/* Back Grip Button */}
      <rect x="24" y="52" width="10" height="8" rx="3" fill="#FB7185" />
    </g>

    {/* Floating Star Rocket / Creative Palette Badge */}
    <g filter="url(#drop_shadow_star)">
      <circle cx="86" cy="78" r="16" fill="url(#grad_star)" />
      {/* Star / Like Heart */}
      <path
        d="M86 69L88.5 75.5L95.5 76L90 80.5L92 87.5L86 83.5L80 87.5L82 80.5L76.5 76L83.5 75.5L86 69Z"
        fill="#FFFFFF"
      />
    </g>

    <defs>
      <radialGradient id="content_glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="grad_megaphone" x1="34" y1="36" x2="64" y2="76" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FB7185" />
        <stop offset="1" stopColor="#E11D48" />
      </linearGradient>
      <linearGradient id="grad_star" x1="70" y1="62" x2="102" y2="94" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B" />
        <stop offset="1" stopColor="#EC4899" />
      </linearGradient>
      <filter id="drop_shadow_5" x="20" y="32" width="54" height="56" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#881337" floodOpacity="0.3" />
      </filter>
      <filter id="drop_shadow_star" x="66" y="60" width="40" height="40" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#0F172A" floodOpacity="0.4" />
      </filter>
    </defs>
  </svg>
);
