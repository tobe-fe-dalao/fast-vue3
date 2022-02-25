const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
module.exports = {
    COOKIE: process.env.COOKIE || '',
    // 自动玩游戏需要此参数，在掘金首页打开控制台输入这行代码`window.__NUXT__.state.auth.user.id`就可以得到
    USERID: process.env.USERID || '',
    DINGTALK_WEBHOOK: process.env.DINGTALK_WEBHOOK || '',
    DINGTALK_SECRET: process.env.DINGTALK_SECRET || '',
    RESULT_COUNT: process.env.RESULT_COUNT || ''
}