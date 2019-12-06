const path = require('path')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin')
const {override, fixBabelImports, addLessLoader} = require('customize-cra')


const options = {
  stylesDir: path.join(__dirname, './src/styles'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/styles/variables.less'),
  mainLessFile: path.join(__dirname, './src/styles/index.less'),
  themeVariables: [
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@heading-color',
    '@nav-dark-bg',
    '@header-text-color',
    '@layout-header-background',
    '@layout-footer-background',
    '@nav-dark-text-color',
    '@hor-nav-text-color',
    '@nav-header-selected-text-color'
  ],
  indexFileName: 'sagas.js.html',
  generateOnce: false // generate color.less on each compilation
}


const overrideProcessEnv = value => config => {
  config.resolve.modules = [
    path.join(__dirname, 'src')
  ].concat(config.resolve.modules)
  config.plugins.push(new AntDesignThemePlugin(options))
  return config
}

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#eb7f2c',
      '@secondary-color': '#F1D065',
      '@text-color': '#666',
      '@heading-color': '#333',
      '@nav-dark-bg': '#0d253e',
      '@header-text-color': '#bcbcbc',
      '@layout-header-background': '#0d253e',
      '@layout-footer-background': '#07131f',
      '@nav-dark-text-color': '#ffffff',
      '@hor-nav-text-color': '#bcbcbc',
      '@nav-header-selected-text-color': '#fff'
    }
  }),
  overrideProcessEnv({
    VERSION: JSON.stringify(require('./package.json').version)
  })
)
