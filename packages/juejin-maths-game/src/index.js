const { COOKIE, USERID, RESULT_COUNT } = require('./config')
const { Game } = require('./lib/Game')
const { Maths } = require('./lib/Maths')
const { operatorArr } = require('./lib/utils')
const message = require('./lib/message')

//自动模式
const autoRunning = async (needNum) => {
    //1,拿到关卡数据
    const res = new Game(USERID, COOKIE)
    const resList = await res.openGame()

    //2,解析关卡数据
    const { nums, options } = operatorArr(resList.map)
    const target = resList.target;

    //3, 执行算法解析
    const getMatch = new Maths(nums, options, target)

    //5,前五个答案
    getMatch.run(needNum)
}
//手动模式
const handleRunning = async (nums, options, target) => {
    const getMatch = new Maths(nums, options, target)
    getMatch.run(5)
}
autoRunning(5)

// handleRunning([1, 4, 5], ['+', '*'], 21)



