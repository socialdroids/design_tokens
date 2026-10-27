# @socialdroids/design-tokens

The brand of the robot screen and the `sd_supervisor`, shared by the web
(`user_interface`) and the app (`sd_app`): purple `#9141ac`, dark purple
`#5b2370`, black `#0a0a0a`, white `#ffffff`, Manrope.

| File | For |
|---|---|
| `tokens.json` | The values. Edit here. |
| `tailwind.css` | Web (Tailwind 4): `@import "@socialdroids/design-tokens/tailwind.css";` gives `bg-brand-purple`, `text-brand-black`, `font-manrope`... Generated. |
| `index.js` | App (NativeWind): `theme: { extend: require('@socialdroids/design-tokens').nativewindTheme }`. |

Only the font's name is here, not the font file: each app loads Manrope (or
falls back to the system font).

## Using it

Each app pins a tag:

```json
"@socialdroids/design-tokens": "github:socialdroids/design_tokens#v0.1.0"
```

The repository is public, so `npm install` fetches the tag's tarball with no
GitHub credentials (developer machines, Docker builds, CI).

## Changing the brand

1. Edit `tokens.json`.
2. `npm run build` (rewrites `tailwind.css`).
3. `npm test` (fails while `tailwind.css` is out of date).
4. Commit, then tag a new version (`git tag v0.2.0 && git push --tags`).
5. Bump the tag in `user_interface/package.json` and `sd_app/package.json`
   and run `npm install` in each.
