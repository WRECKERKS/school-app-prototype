/*  Flat 2D scenes for the screens that have nothing to show: sign-in, 404,
    crashes, empty lists.

    Inline SVG rather than image files so every shape can read the current theme
    tokens — the same illustration then works on the light canvas and the dark
    one without a second asset.

    Each shape is drawn with the same three-part trick as the clay surfaces: a
    base fill, a lighter band along the top edge, and a darker band underneath.
    That is what keeps flat vector art from looking like clip art. */

const clay = {
  hi: 'rgba(255,255,255,0.34)',
}

function Defs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--accent-soft)" />
        <stop offset="100%" stopColor="var(--hue-teal-soft)" />
      </linearGradient>
      <linearGradient id={`${id}-page`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="var(--paper-sunk)" />
      </linearGradient>
    </defs>
  )
}

/* ---- Sign-in: a desk with books, a clipboard and a plant --------------- */
export function SceneDesk({ className }) {
  const id = 'scene-desk'
  return (
    <svg className={className} viewBox="0 0 260 190" role="presentation" aria-hidden="true" focusable="false">
      <Defs id={id} />
      <rect x="8" y="8" width="244" height="174" rx="26" fill={`url(#${id}-sky)`} />

      {/* window + sun */}
      <rect x="30" y="28" width="62" height="52" rx="10" fill={`url(#${id}-page)`} />
      <rect x="30" y="28" width="62" height="52" rx="10" fill="none" stroke="var(--rule-strong)" strokeWidth="2" />
      <line x1="61" y1="28" x2="61" y2="80" stroke="var(--rule-strong)" strokeWidth="2" />
      <line x1="30" y1="54" x2="92" y2="54" stroke="var(--rule-strong)" strokeWidth="2" />
      <circle cx="76" cy="43" r="8" fill="var(--hue-amber)" opacity="0.85" />

      {/* plant */}
      <path d="M206 108c0-16 8-28 8-28s10 10 10 26" fill="var(--hue-teal)" />
      <path d="M198 108c-2-14-12-22-12-22s-6 12-4 22" fill="var(--hue-teal)" opacity="0.75" />
      <rect x="188" y="106" width="38" height="30" rx="8" fill="var(--hue-rose)" />
      <rect x="188" y="106" width="38" height="9" rx="4.5" fill={clay.hi} />

      {/* desk */}
      <rect x="26" y="136" width="208" height="12" rx="6" fill="var(--ink-soft)" opacity="0.9" />
      <rect x="26" y="136" width="208" height="5" rx="2.5" fill={clay.hi} />

      {/* book stack */}
      <rect x="40" y="112" width="74" height="24" rx="7" fill="var(--accent)" />
      <rect x="40" y="112" width="74" height="8" rx="4" fill={clay.hi} />
      <rect x="46" y="94" width="66" height="18" rx="6" fill="var(--hue-violet)" />
      <rect x="46" y="94" width="66" height="6" rx="3" fill={clay.hi} />
      <rect x="52" y="80" width="54" height="14" rx="5" fill="var(--hue-cyan)" />
      <rect x="52" y="80" width="54" height="5" rx="2.5" fill={clay.hi} />
      <rect x="112" y="106" width="6" height="30" rx="3" fill="var(--paper-raised)" opacity="0.9" />

      {/* clipboard */}
      <g transform="rotate(-7 168 74)">
        <rect x="138" y="34" width="62" height="80" rx="9" fill={`url(#${id}-page)`} stroke="var(--rule-strong)" strokeWidth="2" />
        <rect x="158" y="26" width="22" height="14" rx="5" fill="var(--hue-amber)" />
        <rect x="150" y="58" width="38" height="5" rx="2.5" fill="var(--rule-strong)" />
        <rect x="150" y="72" width="38" height="5" rx="2.5" fill="var(--rule-strong)" />
        <rect x="150" y="86" width="24" height="5" rx="2.5" fill="var(--accent)" />
      </g>
    </svg>
  )
}

/* ---- 404: a lost folder under a magnifier ------------------------------ */
export function SceneLost({ className }) {
  const id = 'scene-lost'
  return (
    <svg className={className} viewBox="0 0 260 190" role="presentation" aria-hidden="true" focusable="false">
      <Defs id={id} />
      <rect x="8" y="8" width="244" height="174" rx="26" fill={`url(#${id}-sky)`} />

      {/* scattered papers */}
      <rect x="30" y="126" width="46" height="32" rx="7" fill="var(--paper-raised)" opacity="0.85" />
      <rect x="196" y="132" width="38" height="26" rx="6" fill="var(--paper-raised)" opacity="0.7" />

      {/* folder */}
      <path d="M64 74h44l10 12h74a10 10 0 0 1 10 10v58a10 10 0 0 1-10 10H64a10 10 0 0 1-10-10V84a10 10 0 0 1 10-10z" fill="var(--hue-amber)" />
      <path d="M64 74h44l10 12h-74a10 10 0 0 0-10 10V84a10 10 0 0 1 10-10z" fill={clay.hi} />
      <path d="M54 100h148v8H54z" fill="var(--rule-strong)" opacity="0.35" />

      {/* magnifier */}
      <g transform="rotate(18 172 84)">
        <circle cx="172" cy="76" r="34" fill="var(--hue-cyan-soft)" stroke="var(--hue-cyan)" strokeWidth="7" />
        <circle cx="162" cy="66" r="12" fill="#fff" opacity="0.5" />
        <rect x="164" y="100" width="16" height="46" rx="8" fill="var(--ink-soft)" />
        <rect x="167" y="104" width="5" height="38" rx="2.5" fill={clay.hi} />
      </g>

      {/* question mark */}
      <text
        x="172" y="90"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontSize="40"
        fontWeight="800"
        fill="var(--hue-cyan)"
      >
        ?
      </text>
    </svg>
  )
}

/* ---- Crash: a cracked gear, unplugged ---------------------------------- */
export function SceneCrash({ className }) {
  const id = 'scene-crash'
  return (
    <svg className={className} viewBox="0 0 260 190" role="presentation" aria-hidden="true" focusable="false">
      <Defs id={id} />
      <rect x="8" y="8" width="244" height="174" rx="26" fill={`url(#${id}-sky)`} />

      {/* gear */}
      <g transform="translate(88 62)">
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x="-7"
            y="-56"
            width="14"
            height="20"
            rx="4"
            fill="var(--hue-rose)"
            transform={`rotate(${i * 45})`}
          />
        ))}
        <circle r="40" fill="var(--hue-rose)" />
        <circle r="40" fill="none" stroke="var(--rule-strong)" strokeWidth="2" opacity="0.5" />
        <circle cx="-12" cy="-14" r="12" fill={clay.hi} />
        <circle r="15" fill={`url(#${id}-page)`} stroke="var(--rule-strong)" strokeWidth="2" />
        {/* crack */}
        <path d="M0 -15 L7 -4 L-4 3 L5 15" stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.65" />
      </g>

      {/* unplugged cable */}
      <path d="M150 150c26 6 44-10 44-30" stroke="var(--ink-soft)" strokeWidth="7" fill="none" strokeLinecap="round" />
      <rect x="146" y="140" width="26" height="20" rx="6" fill="var(--ink-soft)" />
      <rect x="150" y="144" width="18" height="5" rx="2.5" fill={clay.hi} />
      <rect x="169" y="132" width="7" height="9" rx="3" fill="var(--ink-soft)" />
      <rect x="179" y="130" width="7" height="9" rx="3" fill="var(--ink-soft)" />

      {/* spark */}
      <path d="M204 60l6 14 14 6-14 6-6 14-6-14-14-6 14-6z" fill="var(--hue-amber)" />
    </svg>
  )
}

/* ---- Empty: an open tray with nothing in it ---------------------------- */
export function SceneEmpty({ className }) {
  const id = 'scene-empty'
  return (
    <svg className={className} viewBox="0 0 260 190" role="presentation" aria-hidden="true" focusable="false">
      <Defs id={id} />
      <rect x="8" y="8" width="244" height="174" rx="26" fill={`url(#${id}-sky)`} />

      {/* tray */}
      <path d="M62 84h136l-12 66a12 12 0 0 1-12 10H86a12 12 0 0 1-12-10z" fill="var(--paper-raised)" />
      <path d="M62 84h136l-4 22H66z" fill="var(--hue-violet)" opacity="0.9" />
      <path d="M62 84h136l-3 16H65z" fill={clay.hi} />
      <path d="M62 84h136l-12 66a12 12 0 0 1-12 10H86a12 12 0 0 1-12-10z" fill="none" stroke="var(--rule-strong)" strokeWidth="2" />

      {/* a couple of papers resting in */}
      <rect x="92" y="60" width="42" height="30" rx="7" fill="var(--hue-teal)" transform="rotate(-8 113 75)" />
      <rect x="134" y="66" width="34" height="24" rx="6" fill="var(--hue-amber)" transform="rotate(9 151 78)" />

      {/* dotted empty line */}
      <line
        x1="88"
        y1="128"
        x2="172"
        y2="128"
        stroke="var(--rule-strong)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="2 12"
      />
    </svg>
  )
}
