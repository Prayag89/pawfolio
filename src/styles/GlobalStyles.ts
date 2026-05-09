import { createGlobalStyle } from 'styled-components';

/**
 * Global styles establish the Pawfolio visual identity:
 * - Warm, earthy palette with amber accents
 * - Playfair Display for headings (editorial feel)
 * - DM Sans for body text (clean readability)
 * - Smooth transitions and custom scrollbar
 */
const GlobalStyles = createGlobalStyle`
  :root {
    /* ── Core Palette ── */
    --color-bg: #FAF7F2;
    --color-bg-alt: #F2EDE4;
    --color-bg-card: #FFFFFF;
    --color-surface: #FFFDF9;
    --color-text: #1A1814;
    --color-text-secondary: #6B6356;
    --color-text-muted: #9C9488;
    --color-border: #E8E2D8;
    --color-border-hover: #D4CCC0;

    /* ── Accent ── */
    --color-accent: #C67D3A;
    --color-accent-hover: #B56D2A;
    --color-accent-light: rgba(198, 125, 58, 0.1);
    --color-accent-glow: rgba(198, 125, 58, 0.25);

    /* ── Semantic ── */
    --color-success: #4A7C59;
    --color-error: #C25450;
    --color-warning: #D4A843;

    /* ── Typography ── */
    --font-display: 'Playfair Display', Georgia, serif;
    --font-body: 'DM Sans', -apple-system, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    /* ── Spacing ── */
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    --space-2xl: 48px;
    --space-3xl: 64px;

    /* ── Radii ── */
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 16px;
    --radius-xl: 24px;

    /* ── Shadows ── */
    --shadow-sm: 0 1px 3px rgba(26, 24, 20, 0.04);
    --shadow-md: 0 4px 16px rgba(26, 24, 20, 0.06);
    --shadow-lg: 0 8px 32px rgba(26, 24, 20, 0.08);
    --shadow-xl: 0 16px 48px rgba(26, 24, 20, 0.12);
    --shadow-glow: 0 0 0 3px var(--color-accent-glow);

    /* ── Transitions ── */
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --duration-fast: 150ms;
    --duration-normal: 250ms;
    --duration-slow: 400ms;

    /* ── Layout ── */
    --nav-height: 72px;
    --max-width: 1320px;
    --selection-bar-height: 68px;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-body);
    background: var(--color-bg);
    color: var(--color-text);
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    line-height: 1.2;
    font-weight: 700;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    display: block;
    max-width: 100%;
  }

  button {
    font-family: var(--font-body);
    cursor: pointer;
    border: none;
    background: none;
  }

  input, select {
    font-family: var(--font-body);
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-bg-alt);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-border-hover);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-muted);
  }

  /* Page transition animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default GlobalStyles;
