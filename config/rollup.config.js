import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import dotenv from 'dotenv';

dotenv.config()

// babel-preset-react-app requires NODE_ENV or BABEL_ENV to be set
if (typeof process.env.NODE_ENV === 'undefined') {
  process.env.NODE_ENV = 'development'
}

const getBabelOptions = ({ useESModules }) => ({
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
  presets: [['react-app']],
  plugins: [
    ['@babel/transform-runtime', { regenerator: false, useESModules }]
  ],
});

export default {
  plugins: [
    replace({
      'process.env.REACT_APP_API_ROOT': JSON.stringify(process.env.REACT_APP_API_ROOT),
      'process.env.ORIOLE_PATRON_UI_ROOT': JSON.stringify(process.env.ORIOLE_PATRON_UI_ROOT)
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
      }
    }),
    babel(getBabelOptions({ useESModules: true })),
    uglify(),
  ],
  input: [
    'src/widgets/tags.js'
  ],
  external: [
    'react', 'react-dom'
  ],
  output: {
    format: 'iife',
    file: 'build/oriole-widgets.js',
    name: 'test',
    extend: true
  },
};
