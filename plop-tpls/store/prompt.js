/*
 * @GitHub: https://github.com/MaleWeb/fast-vue3
 * @version: 
 * @Author: 扫地盲僧
 * @Date: 2022-01-21 17:03:13
 * @LastEditors: your name
 * @LastEditTime: 2022-01-25 12:39:41
 */
module.exports = {
    description: '创建全局状态',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: '请输入模块名称',
            validate: v => {
                if (!v || v.trim === '') {
                    return '模块名称不能为空'
                } else {
                    return true
                }
            }
        }
    ],
    actions: () => {
        const actions = [
            {
                type: 'add',
                path: 'src/store/modules/{{camelCase name}}.js',
                templateFile: 'plop-tpls/store/index.hbs'
            }
        ]
        return actions
    }
}