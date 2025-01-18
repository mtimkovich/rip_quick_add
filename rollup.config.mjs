import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs'

export default {
  plugins: [
    resolve(),
    commonJS({
      include: ['node_modules/**',]
    }),
  ],
};
