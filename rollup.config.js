import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const baseConfig = {
  input: 'src/index.js',
  external: ['react', /@babel\/runtime/],
  plugins: [
    nodeResolve({
      extensions: ['.ts', '.js'],
    }),
    typescript(),
    babel({
      babelHelpers: 'runtime',
    }),
    commonjs()
  ],
}

export default [
  // commonjs
  {

    output: [
      {
        file: 'lib/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.js',
        format: 'umd',
        name: 'Ppstore',
      },
      {
        file: 'es/index.js',
        format: 'es',
      },
    ],
    ...baseConfig
  },
  {
    output: [
      {
        file: 'lib/index.min.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.min.js',
        format: 'umd',
        name: 'ppStore',
      },
      {
        file: 'es/index.min.js',
        format: 'es',
      },
    ],
    ...baseConfig,
    plugins: [...baseConfig.plugins, terser()]
  },
];
