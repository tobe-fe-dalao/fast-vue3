const { COOKIE, USERID, RESULT_COUNT } = require('./config')
const { Game } = require('./lib/Game')
const { Maths } = require('./lib/Maths')
const { operatorArr } = require('./lib/utils')
const message = require('./lib/message')

//自动模式
const autoRunning = async () => {
    //1,拿到关卡数据
    const res = new Game(USERID, COOKIE)
    const resList = await res.openGame()

    //2,解析关卡数据
    const { nums, options } = operatorArr(resList.map)
    const target = resList.target;

    //3, 执行算法解析
    const getMatch = new Maths(nums, options, target)
    getMatch.calcSum()

    //查询正确答案和前50
    const objs = Object.values(getMatch.cache)
    let resArr = []
    objs.forEach(val => {
        //正确答案和前50
        if (val.value === target && resArr.length < RESULT_COUNT) {
            //尽可能过滤出正确的答案
            val.formula = val.formula.toString()
            if (nums.every(num => { return val.formula.indexOf(num) != -1 })) {
                resArr.push(val)
            }
        }
    })
    console.log(resArr)

    //封装到钉钉
    // message(resArr.toString())
}
//手动模式
const handleRunning = async (nums, options, target) => {
    const getMatch = new Maths(nums, options, target)
    getMatch.calcSum()
    //查询正确答案和前50
    const objs = Object.values(getMatch.cache)
    let resArr = []
    objs.forEach(val => {
        //正确答案和前50
        if (val.value === target && resArr.length < 50) {
            //尽可能过滤出正确的答案
            val.formula = val.formula.toString()
            if (nums.every(num => { return val.formula.indexOf(num) != -1 })) {
                resArr.push(val)
            }
        }
    })
    console.log(resArr)
}
// autoRunning()
handleRunning([2, 1], ['*'], 2)



