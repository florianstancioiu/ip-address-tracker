import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/app.ts',
  output: {
    dir: 'output',
    format: 'cjs',
  },
  plugins: [typescript(), babel({ babelHelpers: 'bundled' }), nodeResolve()],
};
