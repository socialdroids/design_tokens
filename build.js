// Writes tailwind.css from tokens.json. Run after changing a token.
const { writeFileSync } = require('node:fs');
const { join } = require('node:path');
const { tailwindCss } = require('./index.js');

writeFileSync(join(__dirname, 'tailwind.css'), tailwindCss());
