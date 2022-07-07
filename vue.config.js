const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  devServer: {
    open: true,
    port: 8000,
    host: 'localhost'
  }
})
