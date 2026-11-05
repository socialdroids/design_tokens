// Writes tailwind.css and semantic.css from tokens.json. Run after changing a token.
const { writeFileSync } = require('node:fs');
const { join } = require('node:path');
const { tailwindCss, semanticCss } = require('./index.js');

writeFileSync(join(__dirname, 'tailwind.css'), tailwindCss());
writeFileSync(join(__dirname, 'semantic.css'), semanticCss());
