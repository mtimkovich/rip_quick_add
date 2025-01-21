import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const output = {
  format: 'iife',
  dir: 'chrome-extension',
};

const plugins = [
  resolve(),
  commonjs({
    include: ['node_modules/**',]
  }),
];

const inputs = ['background.js', 'popup.js', 'options.js'];
const config = inputs.map(i => {
  return {
    input: `src/${i}`,
    output,
    plugins
  };
});

export default config;
