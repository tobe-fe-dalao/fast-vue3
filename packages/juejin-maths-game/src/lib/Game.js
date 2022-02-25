const got = require('got')

const GET_TOKEN_URL = 'https://juejin.cn/get/token'
const HEADER = {
    'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edg/92.0.902.67'
}

const HOST_BASE = 'https://juejin-game.bytedance.com/game/num-puzz'
const GET_USER = 'https://api.juejin.cn/user_api/v1/user/get'
const START_GAME_URL = HOST_BASE + '/ugc/start?'
const LOGIN_GAME_URL = HOST_BASE + '/user/login?'
const OVER_GAME_URL = HOST_BASE + '/game/over?'

class Game {
    #uid
    #username
    #cookie
    #authorization

    constructor(uid, cookie) {
        this.#uid = uid
        this.#cookie = cookie
    }

    /**
     * @desc 获取authorization授权
     * @returns
     */
    #getToken = () => {
        const cookie = this.#cookie
        return got.post(GET_TOKEN_URL, {
            hooks: {
                beforeRequest: [
                    options => {
                        Object.assign(options.headers, {
                            ...HEADER,
                            cookie
                        })
                    }
                ]
            }
        })
    }

    /**
     * @desc 获取用户信息
     * @returns
     */
    #getInfo = () => {
        const URL = GET_USER
        const cookie = this.#cookie
        return got.get(URL, {
            hooks: {
                beforeRequest: [
                    options => {
                        Object.assign(options.headers, {
                            ...HEADER,
                            cookie
                        })
                    }
                ]
            }
        })
    }

    /**
     * @desc 登录游戏
     * @returns
     */
    #loginGame = () => {
        const URL = LOGIN_GAME_URL + `uid=${this.#uid}&time=` + new Date().getTime()
        const body = { name: this.#username }
        const authorization = this.#authorization
        return got.post(URL, {
            hooks: {
                beforeRequest: [
                    options => {
                        Object.assign(options.headers, {
                            ...HEADER,
                            authorization: authorization
                        })
                    }
                ]
            },
            json: body
        })
    }

    /**
     * @desc 开始游戏
     * @param {Number} name 角色id
     */
    #startGame = () => {
        const URL = START_GAME_URL + `uid=${this.#uid}&time=` + new Date().getTime()
        const body = {}
        const authorization = this.#authorization
        return got.post(URL, {
            hooks: {
                beforeRequest: [
                    options => {
                        Object.assign(options.headers, {
                            ...HEADER,
                            authorization: authorization
                        })
                    }
                ]
            },
            json: body
        })
    }

    /**
     * @desc 结束游戏
     */
    outGame = () => {
        const URL = OVER_GAME_URL + `uid=${this.#uid}&time=` + new Date().getTime()
        const body = { isButton: 1 }
        const authorization = this.#authorization
        return got.post(URL, {
            hooks: {
                beforeRequest: [
                    options => {
                        Object.assign(options.headers, {
                            ...HEADER,
                            authorization: authorization
                        })
                    }
                ]
            },
            json: body
        })
    }



    /**
     * @desc 启动游戏
     * @returns {Boolean} 是否启动成功
     */
    openGame = async () => {
        // 1.获取授权
        let res = await this.#getToken().json()
        this.#authorization = 'Bearer ' + res.data

        // 2.获取用户名
        res = await this.#getInfo().json()
        this.#username = res.data.user_name

        // 3.登录游戏
        // res = await this.#loginGame().json()


        // 4.开始游戏，获得关卡数据
        res = await this.#startGame().json()


        // 5.游戏启动成功返回游戏信息
        return res.code === 0 ? res.data : undefined
    }
}

exports.Game = Game
