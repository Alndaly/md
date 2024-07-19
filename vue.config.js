const isProd = process.env.NODE_ENV === `production`

const crypto = require(`crypto`)

/**
 * md4 algorithm is not available anymore in NodeJS 17+ (because of lib SSL 3).
 * In that case, silently replace md4 by md5 algorithm.
 */
try {
  crypto.createHash(`md4`)
} catch (e) {
  const origCreateHash = crypto.createHash
  crypto.createHash = (alg, opts) => {
    return origCreateHash(alg === `md4` ? `md5` : alg, opts)
  }
}

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
