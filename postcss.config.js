module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // 'postcss-px-to-viewport': {
    //   // 需要转换的单位，默认为 px
    //   unitToConvert: 'px',
    //   // 视窗的宽度，对应的是我们设计稿的宽度
    //   viewportWidth: 750,
    //   // 指定 px 转换为视窗单位值的小数位数（很多时候无法整除）
    //   unitPrecision: 3,
    //   // 能转化为 vw 的属性列表
    //   propList: ['*'],
    //   // 指定需要转换成的视窗单位，建议使用 vw
    //   viewportUnit: 'vw',
    //   // 字体使用的视口单位
    //   fontViewportUnit: 'vw',
    //   // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
    //   selectorBlackList: [
    //     '.ignore'
    //   ],
    //   // 小于或等于 1px 不转换为视窗单位，你也可以设置为你想要的值
    //   minPixelValue: 1,
    //   // 允许在媒体查询中转换 px
    //   mediaQuery: false
    // }
  },
}
