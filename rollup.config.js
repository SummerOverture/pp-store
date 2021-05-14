import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default [
  // commonjs
  {
    input: 'src/index.js',
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
    external: ['react', /@babel\/runtime/],
    plugins: [
      nodeResolve({
        extensions: ['.ts', '.js'],
      }),
      commonjs(),
      typescript(),
      babel({
        plugins: [['@babel/plugin-transform-runtime']],
        babelHelpers: 'runtime',
      }),
    ],
  },
  {
    input: 'src/index.js',
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
    external: ['react', /@babel\/runtime/],
    plugins: [
      nodeResolve({
        extensions: ['.ts', '.js'],
      }),
      commonjs(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      babel({
        plugins: ['@babel/plugin-transform-runtime'],
        babelHelpers: 'runtime',
      }),
      terser(),
    ],
  },
];
