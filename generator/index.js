module.exports = (api, options, rootOptions) => {
  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render('../template')
  // 修改 `package.json` 里的字段
  api.extendPackage({
    dependencies: {
      "bdjf_http": "^1.1.3",
      "core-js": "^3.6.5",
      "vant": "^3.2.0",
      "vue": "^3.2.0",
      "vue-router": "^4.0.0-0",
      "vuex": "^4.0.0-0",
      "vconsole": "^3.9.1"
    },
    devDependencies: {
      'vconsole-webpack-plugin': '^1.5.2',
      "@typescript-eslint/eslint-plugin": "^4.18.0",
      "@typescript-eslint/parser": "^4.18.0",
      "@vue/cli-plugin-babel": "~4.5.0",
      "@vue/cli-plugin-eslint": "~4.5.0",
      "@vue/cli-plugin-router": "~4.5.0",
      "@vue/cli-plugin-typescript": "~4.5.0",
      "@vue/cli-plugin-vuex": "~4.5.0",
      "@vue/cli-service": "~4.5.0",
      "@vue/compiler-sfc": "^3.2.0",
      "typescript": "~4.1.3"
    },
    scripts: {
      "serve": "vue-cli-service serve",
      "serve-prod": "vue-cli-service serve --mode production",
      "build-test": "vue-cli-service build --mode test",
      "build-prod": "vue-cli-service build",
    }
  })
}
