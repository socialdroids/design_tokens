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
