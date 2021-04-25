module.exports = (api, options, rootOptions) => {
  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render('../template')
  // 修改 `package.json` 里的字段
  api.extendPackage({
    dependencies: {
      "bdjf_http": "^1.0.7",
      "core-js": "^3.6.5",
      "vant": "^3.0.9",
      "vue": "^3.0.0",
      "vue-router": "^4.0.0-0",
      "vuex": "^4.0.0-0"
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
      "@vue/compiler-sfc": "^3.0.0",
      "typescript": "~4.1.3"
    },
    scripts: {
      'serve': 'vue-cli-service serve',
      'build': 'vue-cli-service build'
    }
  })
}
