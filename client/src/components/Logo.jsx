// FarmBridge AI mark: a two-leaf sprout with three signal arcs ("bridge" to knowledge).
// Pure SVG, so it stays sharp at any size and costs almost nothing to download.
export default function Logo({ size = 40, showWordmark = true, inverted = false }) {
  const arc = inverted ? '#9be3a8' : '#2f9e44';
  const leafA = inverted ? '#ffffff' : '#14532d';
  const leafB = inverted ? '#9be3a8' : '#2f9e44';
  const wordColor = inverted ? '#ffffff' : '#14532d';
  const aiColor = inverted ? '#9be3a8' : '#2f9e44';

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.22 }}>
      <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="FarmBridge AI">
        <g fill="none" stroke={arc} strokeWidth="3" strokeLinecap="round">
          <path d="M27.8 17.8A6 6 0 0 1 36.2 17.8" />
          <path d="M24.2 14.2A11 11 0 0 1 39.8 14.2" />
          <path d="M20.7 10.7A16 16 0 0 1 43.3 10.7" />
        </g>
        <circle cx="32" cy="22" r="2.4" fill={arc} />
        <path d="M32 56C14 54 8 40 12 30C26 32 34 42 32 56Z" fill={leafA} />
        <path d="M32 56C50 54 56 40 52 30C38 32 30 42 32 56Z" fill={leafB} />
      </svg>
      {showWordmark && (
        <span
          aria-hidden="true"
          style={{
            fontWeight: 800,
            fontSize: size * 0.52,
            letterSpacing: '-0.01em',
            color: wordColor,
            lineHeight: 1,
          }}
        >
          FarmBridge <span style={{ color: aiColor }}>AI</span>
        </span>
      )}
    </span>
  );
}
