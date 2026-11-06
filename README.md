# @socialdroids/design-tokens

The brand of the robot screen and the `sd_supervisor`, shared by the web
(`user_interface`) and the app (`sd_app`): purple `#9141ac`, dark purple
`#5b2370`, black `#0a0a0a`, white `#ffffff`, Manrope.

| File | For |
|---|---|
| `tokens.json` | The values. Edit here. |
| `tailwind.css` | Web (Tailwind 4): `@import "@socialdroids/design-tokens/tailwind.css";` gives `bg-brand-purple`, `text-brand-black`, `font-manrope`... Generated. |
| `semantic.css` | Web: semantic tokens (surface, foreground, primary, success/warning/danger/offline, radius, space), light and `.dark`. Generated. |
| `index.js` | App (NativeWind): `theme: { extend: require('@socialdroids/design-tokens').nativewindTheme }`, plus `nativewindVars` for the scheme. |

Only the font's name is here, not the font file: each app loads Manrope (or
falls back to the system font).

## Semantic tokens

`tokens.json › semantic` has the same names in `light` and `dark` (a test
fails if one scheme lacks a name). The names are for the role, not the hue:
`bg-surface`, `bg-surface-muted`, `border-border`, `text-foreground`,
`text-muted-foreground`, `bg-primary text-primary-foreground`,
`bg-destructive`, and the states as pairs: `bg-success-bg text-success-fg`
(also `warning`, `danger`, `offline`). `rounded-control|card|pill` and
`gap-tight|field|section` are named so they never replace Tailwind's own
`rounded-lg` or `p-4`.

Since v0.3.0 (interface review, etapa 9): `outline-focus-ring` (keyboard
focus, same value as `primary`), `bg-selected-bg` (selected row, active item
of the side panel), `bg-inverse-surface text-inverse-foreground` (toast) and
`bg-scrim/50` (the veil behind a dialog or sheet; the opacity goes on the
class, the token is a plain hex). The approved design system, with usage
notes for every token, is in Claude Design:
https://claude.ai/artifact/21aqkEsmrHMdSKBSPQFg6n

- **Web:** `@import "@socialdroids/design-tokens/semantic.css";` after
  `tailwind.css`. Put the class `dark` on `<html>` (or any ancestor) for the
  dark values.
- **App:** the root view gets `style={vars(nativewindVars[scheme])}`
  (`vars` from `nativewind`); the utilities read the variables.

## Using it

Each app pins a tag:

```json
"@socialdroids/design-tokens": "github:socialdroids/design_tokens#v0.3.0"
```

The repository is public, so `npm install` fetches the tag's tarball with no
GitHub credentials (developer machines, Docker builds, CI).

## Changing the brand

1. Edit `tokens.json`.
2. `npm run build` (rewrites `tailwind.css`).
3. `npm test` (fails while `tailwind.css` is out of date).
4. Commit, then tag a new version (`git tag v0.3.0 && git push --tags`).
5. Bump the tag in `user_interface/package.json` and `sd_app/package.json`
   and run `npm install` in each.
