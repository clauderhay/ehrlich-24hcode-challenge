import { defineConfig } from 'tsup';

const typeormsLinks = [
  'src/database/entities/*Entity.ts',
  'src/database/migrations/*.ts',
  'src/data-source.ts',
];

export default defineConfig([
  {
    platform: 'node',
    format: ['cjs'],
    bundle: true,
    sourcemap: true,
    minify: false,
    clean: true,
    entry: ['src/index.ts', ...typeormsLinks],
    outDir: 'dist/src',
  },
]);
