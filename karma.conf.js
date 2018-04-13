import webpack from 'webpack';
import { resolve } from 'path';
import webpackConfig from './webpack.config';

const production = process.argv.indexOf('production') >= 0;
const development = !production;

const { module: configModule = {} } = webpackConfig;
const { rules = [] } = configModule;
rules.push({
  enforce: 'post',
  test: /\.(jsx?)$/,
  include: resolve(__dirname, 'src'),
  loader: 'sourcemap-istanbul-instrumenter-loader?force-sourcemap=true'
});

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine', 'es6-shim'],

    files: ['./src/test.jsx'],

    exclude: [],

    preprocessors: {
      './src/test.jsx': ['webpack']
    },

    webpack: {
      mode: production ? 'production' : 'development',
      devtool: 'inline-source-map',
      module: { rules },
      resolve: webpackConfig.resolve
    },

    webpackServer: {
      noInfo: true
    },

    remapIstanbulReporter: {
      remapOptions: {},
      eportOptions: {},
      reports: {
        html: 'coverage/html',
        'text-summary': null,
        lcovonly: 'coverage/lcov-report/lcov.info'
      },
    },

    reporters: ['progress', 'karma-remap-istanbul'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: development,

    browsers: ['PhantomJS2'],

    singleRun: production,

    concurrency: Infinity
  });
}