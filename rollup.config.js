import babel from 'rollup-plugin-babel';
import istanbul from 'rollup-plugin-istanbul';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

let plugins = [
  babel({
    "babelrc": false,
    "presets": [
      ["env", {
        "targets": {
          "browsers": ["> 1%", "not ie <= 8"]
        },
        "modules": false
      }],
      "stage-3"
    ],
    "plugins": [

    ]
  })
];

if (process.env.BUILD !== 'production') {
  plugins.push(istanbul({
    exclude: ['test/**/*', 'node_modules/**/*']
  }));
}

export default {
  entry: 'index.js',
  plugins: plugins,
  external: external,
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'i18n-s',
      sourceMap: true
    }
  ]
};
