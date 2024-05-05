import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  open: false,
  preserveSymlinks: true,
  nodeResolve: true,
  plugins: [esbuildPlugin({ ts: true })],
};
