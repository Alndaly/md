const isProd = process.env.NODE_ENV === `production`

module.exports = {
  lintOnSave: true,
  // 注意如果项目不是在服务器的根路径上，那么此处publicPath必须修改成对应的项目路径
  publicPath: process.env.SERVER_ENV === `NETLIFY` ? `/` : `/editor/`, // 基本路径, 建议以绝对路径跟随访问目录
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.(txt|md)$/i,
      use: [
        {
          loader: `raw-loader`,
        },
      ],
    })
  },
  productionSourceMap: !isProd,
  css: {
    sourceMap: !isProd,
  },
}
