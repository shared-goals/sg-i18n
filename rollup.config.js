import babel from 'rollup-plugin-babel';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

let plugins = [
  babel({
    "babelrc": false,
    "presets": [
      ["@babel/preset-env", {
        "modules": false
      }],
    ]
  })
];

export default {
  input: 'index.js',
  plugins: plugins,
  external: external,
  output: [
    {
      format: 'umd',
      name: 'I18nS',
      file: 'dist/i18n-s.umd.js',
      sourcemap: true
    },
    {
      format: 'cjs',
      file: 'dist/i18n-s.common.js',
      sourcemap: true
    },
    {
      format: 'esm',
      file: 'dist/i18n-s.esm.js',
      sourcemap: true
    }
  ]
};
