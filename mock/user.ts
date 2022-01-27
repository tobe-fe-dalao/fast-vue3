import { MockMethod } from "vite-plugin-mock"
export default [
    {
        url: '/v1/user/profile',
        method: 'get',
        response: () => {
            return {
                code: 1,
                data: {
                    name: '扫地盲僧',
                    profileBio: '达摩深寺扫地僧，盲崖盘坐思人生',
                    devLanguages: 'JavaScript/Vue/React/Node/PHP',
                    blogGithub: 'https://github.com/MaleWeb',
                    blogJuejin: 'https://juejin.cn/user/3016715636842622',
                    blogZhihu: 'https://www.zhihu.com/people/blind_monk'
                }
            }
        }
    },
    {
        url: '/api/text',
        method: 'post',
        rawResponse: async (req, res) => {
            let reqbody = ''
            await new Promise((resolve) => {
                req.on('data', (chunk) => {
                    reqbody += chunk
                })
                req.on('end', () => resolve(undefined))
            })
            res.setHeader('Content-Type', 'text/plain')
            res.statusCode = 200
            res.end(`hello, ${reqbody}`)
        },
    },
] as MockMethod[]