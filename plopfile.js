/*
 * @GitHub: https://github.com/MaleWeb/fast-vue3
 * @version: 
 * @Author: 扫地盲僧
 * @Date: 2022-01-21 17:04:55
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-21 21:13:07
 */
module.exports = function (plop) {
    plop.setWelcomeMessage('请选择需要创建的模式：')
    plop.setGenerator('page', require('./plop-tpls/page/prompt'))
    plop.setGenerator('component', require('./plop-tpls/component/prompt'))
    plop.setGenerator('store', require('./plop-tpls/store/prompt'))
}
