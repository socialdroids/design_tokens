// The Socialdroids brand, the same on the robot screen, the web and the app.
// tokens.json is the source; tailwind.css and semantic.css (web) are generated
// from it by build.js, and nativewindTheme / nativewindVars (app) are read
// from it here.
const tokens = require('./tokens.json');

const semanticNames = Object.keys(tokens.semantic.light);

/** `--sd-surface`: the CSS variable holding a semantic color. */
const cssVar = (name) => `--sd-${name}`;

/** `theme.extend` for the app's tailwind.config.js (NativeWind). */
const nativewindTheme = {
  colors: {
    ...tokens.color,
    // bg-surface, text-foreground, bg-success-bg... resolve through the
    // variables set by nativewindVars, so they follow light/dark.
    ...Object.fromEntries(semanticNames.map((name) => [name, `var(${cssVar(name)})`])),
  },
  fontFamily: Object.fromEntries(
    Object.entries(tokens.font).map(([name, font]) => [name, [font.family, font.fallback]]),
  ),
  borderRadius: tokens.radius,
  spacing: tokens.space,
};

/**
 * The semantic colors as NativeWind variables, per scheme. The app passes
 * `vars(nativewindVars[scheme])` as the style of its root view.
 */
const nativewindVars = {
  light: Object.fromEntries(semanticNames.map((n) => [cssVar(n), tokens.semantic.light[n]])),
  dark: Object.fromEntries(semanticNames.map((n) => [cssVar(n), tokens.semantic.dark[n]])),
};

/** The web's Tailwind 4 theme: `--color-brand-purple`, `--font-manrope`... */
function tailwindCss() {
  const lines = [];
  for (const [group, colors] of Object.entries(tokens.color)) {
    for (const [name, value] of Object.entries(colors)) {
      lines.push(`  --color-${group}-${name}: ${value};`);
    }
  }
  for (const [name, font] of Object.entries(tokens.font)) {
    lines.push(`  --font-${name}: "${font.family}", ${font.fallback};`);
  }
  return [
    '/* Generated from tokens.json by build.js: do not edit. */',
    '@theme {',
    ...lines,
    '}',
    '',
  ].join('\n');
}

/**
 * The web's semantic layer: variables per scheme (`.dark` on any ancestor
 * turns the dark values on) and the utilities that read them: `bg-surface`,
 * `text-muted-foreground`, `bg-success-bg`, `rounded-card`, `gap-tight`...
 */
function semanticCss() {
  const block = (selector, values) => [
    `${selector} {`,
    ...semanticNames.map((n) => `  ${cssVar(n)}: ${values[n]};`),
    '}',
  ];
  return [
    '/* Generated from tokens.json by build.js: do not edit. */',
    '@custom-variant dark (&:where(.dark, .dark *));',
    '',
    ...block(':root', tokens.semantic.light),
    '',
    ...block('.dark', tokens.semantic.dark),
    '',
    '@theme inline {',
    ...semanticNames.map((n) => `  --color-${n}: var(${cssVar(n)});`),
    ...Object.entries(tokens.radius).map(([n, v]) => `  --radius-${n}: ${v};`),
    ...Object.entries(tokens.space).map(([n, v]) => `  --spacing-${n}: ${v};`),
    '}',
    '',
  ].join('\n');
}

module.exports = { tokens, nativewindTheme, nativewindVars, tailwindCss, semanticCss };
