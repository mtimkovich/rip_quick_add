import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const output_dir = 'chrome-extension';
const inputs = ['background.js', 'popup.js', 'options.js'];
const config = inputs.map(i => {
  return {
    input: `src/${i}`,
    output: {
      format: 'cjs',
      dir: output_dir,
    },
    plugins: [
      resolve(),
      commonjs({
        include: ['node_modules/**',]
      }),
    ],
  };
});

export default config;
