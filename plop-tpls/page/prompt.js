/*
 * @GitHub: https://github.com/MaleWeb/fast-vue3
 * @version: 
 * @Author: 扫地盲僧
 * @Date: 2022-01-21 17:00:58
 * @LastEditors: your name
 * @LastEditTime: 2022-01-25 12:39:54
 */
const path = require('path')
const fs = require('fs')

function getFolder(path) {
    let components = []
    const files = fs.readdirSync(path)
    files.forEach(function (item) {
        let stat = fs.lstatSync(path + '/' + item)
        if (stat.isDirectory() === true && item != 'components') {
            components.push(path + '/' + item)
            components.push.apply(components, getFolder(path + '/' + item))
        }
    })
    return components
}

module.exports = {
    description: '创建页面',
    prompts: [
        {
            type: 'list',
            name: 'path',
            message: '请选择页面创建目录',
            choices: getFolder('src/pages')
        },
        {
            type: 'input',
            name: 'name',
            message: '请输入文件名',
            validate: v => {
                if (!v || v.trim === '') {
                    return '文件名不能为空'
                } else {
                    return true
                }
            }
        }
    ],
    actions: data => {
        let relativePath = path.relative('src/pages', data.path)
        const actions = [
            {
                type: 'add',
                path: `${data.path}/{{dotCase name}}.vue`,
                templateFile: 'plop-tpls/page/index.hbs',
                data: {
                    componentName: `${relativePath} ${data.name}`
                }
            }
        ]
        return actions
    }
}