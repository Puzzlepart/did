# Scoped agent context for ./webpack — see root AGENTS.md for global rules

## Config Structure

| File | Purpose |
|---|---|
| `config.js` | Entry point — assembles the full Webpack config |
| `constants.js` | Shared paths and build constants |
| `getRules.js` | Loader rules (ts-loader, SCSS modules, assets) |
| `getPluginsForEnvironment.js` | Plugin set varies by dev/prod environment |
| `getOptimizationForEnvironment.js` | Minification and splitting config per environment |
| `getResolves.js` | Module resolution aliases |
| `compileHooks.js` | Custom Webpack hooks for compile events |
| `exportedVarsPlugin.js` | Plugin that exports build vars to the bundle |

## Key Details

- Webpack 5 with `ts-loader` for TypeScript compilation
- SCSS modules via `css-loader` + `sass-loader` with CSS extraction in production
- Bundle analysis: pass `analyze=true` flag to generate a bundle report
- Hot reloading active in development mode

## Production Build

- Terser minification with custom config in `getOptimizationForEnvironment.js`
- CSS extracted and optimized (no inline styles in prod bundles)
- Source maps **disabled** in production
- Output is gzip-compressed via Express middleware at runtime (not at build time)
- `npm run package:client` builds client only; `npm run package` builds full app + archive
