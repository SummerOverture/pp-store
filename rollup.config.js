import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const baseConfig = {
  input: 'src/index.js',
  external: [
    'react',
    'react-dom',
    'hoist-non-react-statics',
    /@babel\/runtime/,
  ],
  plugins: [
    nodeResolve({
      extensions: ['.ts', '.js'],
    }),
    typescript(),
    babel({
      babelHelpers: 'runtime',
      skipPreflightCheck: true,
    }),
    commonjs(),
  ],
};

export default [
  // commonjs
  {
    output: [
      {
        file: 'lib/index.js',
        format: 'cjs',
      },
      {
        file: 'es/index.js',
        format: 'es',
      },
    ],
    ...baseConfig,
  },
  {
    ...baseConfig,
    plugins: [
      ...baseConfig.plugins,
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
    external: ['react', 'react-dom'],
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'ppStore',
    },
  },
  {
    ...baseConfig,
    plugins: [
      ...baseConfig.plugins,
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser(),
    ],
    external: ['react', 'react-dom'],
    output: {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'ppStore',
    },
  },
];
