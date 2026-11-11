// Small stroke icons (24x24). Decorative: the text next to each icon carries the meaning.
const PATHS = {
  chat: <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.8L3 21l1.9-5A8.4 8.4 0 1 1 21 11.5Z" />,
  camera: (
    <>
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4Z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </>
  ),
  expert: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 11l2 2 4-4" />
    </>
  ),
  bell: <path d="M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15ZM10 21h4" />,
  alert: <path d="M12 3 2.5 20h19ZM12 10v5M12 17.5v.5" />,
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l3 3 5-6" />
    </>
  ),
  save: <path d="M12 4v10m0 0-4-4m4 4 4-4M5 19h14" />,
};

export default function Icon({ name, size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
