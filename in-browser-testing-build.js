import { build } from 'esbuild'

await Promise.all([
  build({
    entryPoints: ['./in-browser-testing-lib.ts'],
    outfile: './index.js',
    bundle: true,
    external: [],
    platform: 'browser',
    format: 'esm',
  }),
])
