module.exports = {
    //解析运算符
    operatorArr(arr) {
        let nums = [];
        let options = [];
        arr.forEach(item => {
            item.forEach(key => {
                //整数为数字
                if (key % 1 === 0) {
                    nums.push(key)
                } else {
                    //运算符匹配
                    switch (key) {
                        case 0.3:
                            options.push('+')
                            break;
                        case 0.4:
                            options.push('-')
                            break;
                        case 0.5:
                            options.push('*')
                            break;
                        case 0.6:
                            options.push('/')
                            break;
                        case 0.4:
                            options.push('-')
                            break;
                    }
                }
            })
        });
        return { nums, options }
    },
}