// The Socialdroids brand, the same on the robot screen, the web and the app.
// tokens.json is the source; tailwind.css (web) is generated from it by
// build.js, and nativewindTheme (app) is read from it here.
const tokens = require('./tokens.json');

/** `theme.extend` for the app's tailwind.config.js (NativeWind). */
const nativewindTheme = {
  colors: tokens.color,
  fontFamily: Object.fromEntries(
    Object.entries(tokens.font).map(([name, font]) => [name, [font.family, font.fallback]]),
  ),
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

module.exports = { tokens, nativewindTheme, tailwindCss };
