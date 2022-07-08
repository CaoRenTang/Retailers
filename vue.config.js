const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,

  devServer: {
    open: true,
    port: 8000,
    host: 'localhost'
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.join(__dirname, '/src/styles/variables.less')]
    }
  }
})
