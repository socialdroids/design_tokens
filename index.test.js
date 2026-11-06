const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { nativewindTheme, tailwindCss } = require('./index.js');

test('tailwind.css is up to date with tokens.json', () => {
  assert.equal(readFileSync(join(__dirname, 'tailwind.css'), 'utf8'), tailwindCss());
});

test('the web gets the supervisor class names', () => {
  const css = tailwindCss();
  assert.match(css, /--color-brand-purple: #9141ac;/);
  assert.match(css, /--color-brand-purple-dark: #5b2370;/);
  assert.match(css, /--color-brand-black: #0a0a0a;/);
  assert.match(css, /--color-brand-white: #ffffff;/);
  assert.match(css, /--font-manrope: "Manrope", sans-serif;/);
});

test('the app gets the same values as a NativeWind theme', () => {
  assert.equal(nativewindTheme.colors.brand.purple, '#9141ac');
  assert.equal(nativewindTheme.colors.brand['purple-dark'], '#5b2370');
  assert.deepEqual(nativewindTheme.fontFamily.manrope, ['Manrope', 'sans-serif']);
});

const { readFileSync: read } = require('node:fs');
const { semanticCss, nativewindVars, tokens } = require('./index.js');

test('semantic.css is up to date with tokens.json', () => {
  assert.equal(read(join(__dirname, 'semantic.css'), 'utf8'), semanticCss());
});

test('every semantic token has a light and a dark value', () => {
  const light = Object.keys(tokens.semantic.light).sort();
  const dark = Object.keys(tokens.semantic.dark).sort();
  assert.deepEqual(dark, light);
  for (const state of ['success', 'warning', 'danger', 'offline']) {
    assert.ok(light.includes(`${state}-bg`) && light.includes(`${state}-fg`), state);
  }
  for (const scheme of ['light', 'dark']) {
    for (const value of Object.values(tokens.semantic[scheme])) assert.match(value, /^#[0-9a-f]{6}$/);
  }
});

test('the web gets both schemes and the utilities', () => {
  const css = semanticCss();
  assert.match(css, /:root \{[^}]*--sd-surface: #ffffff;/);
  assert.match(css, /\.dark \{[^}]*--sd-surface: #0f0f12;/);
  assert.match(css, /@custom-variant dark/);
  assert.match(css, /--color-success-bg: var\(--sd-success-bg\);/);
  assert.match(css, /--radius-card: 16px;/);
  assert.match(css, /--spacing-tight: 8px;/);
});

test('the app gets the same values as NativeWind variables', () => {
  assert.equal(nativewindVars.light['--sd-primary'], '#9141ac');
  assert.equal(nativewindVars.dark['--sd-primary'], '#b36ccb');
  assert.equal(nativewindTheme.colors.surface, 'var(--sd-surface)');
  assert.equal(nativewindTheme.colors.brand.purple, '#9141ac');
  assert.equal(nativewindTheme.borderRadius.card, '16px');
});

test('semantic tokens do not shadow Tailwind scale names', () => {
  // rounded-card / gap-tight must not replace rounded-lg / p-4 on existing screens.
  for (const name of [...Object.keys(tokens.radius), ...Object.keys(tokens.space)]) {
    assert.doesNotMatch(name, /^(xs|sm|md|lg|xl|\d+)$/);
  }
});

test('the tokens added for the interface review (etapa 9) exist in both schemes', () => {
  const added = ['focus-ring', 'selected-bg', 'inverse-surface', 'inverse-foreground', 'scrim'];
  for (const scheme of ['light', 'dark']) {
    for (const name of added) assert.ok(tokens.semantic[scheme][name], `${scheme} ${name}`);
  }
  assert.equal(tokens.semantic.light['focus-ring'], tokens.semantic.light.primary);
  assert.equal(tokens.semantic.dark['focus-ring'], tokens.semantic.dark.primary);
  assert.match(semanticCss(), /--color-selected-bg: var\(--sd-selected-bg\);/);
  assert.equal(nativewindVars.dark['--sd-selected-bg'], '#2a1a31');
  assert.equal(nativewindTheme.colors.scrim, 'var(--sd-scrim)');
});
