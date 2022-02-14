module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16, // Vant 官方根字体大小是 37.5
      propList: ['*']
    }
  }
};
