const colors = require('colors');
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});
class Maths {
    //解析算法部分-升级改造版   源地址：https://juejin.cn/post/7067862481800003591
    constructor(nums, options, target) {
        this.nums = nums;
        this.options = options;
        this.target = target;
        this.cache = {}
        this.type = 2;//第二代
        this.needNum = 5;//正确解的数量
    }
    calc(a, option, b) {
        let res;
        let formula;
        switch (option) {
            case '+':
                res = a.value + b.value;
                formula = a.formula + '+' + b.formula;
                break;
            case '-':
                res = a.value - b.value;
                formula = a.formula + '-' + b.formula;
                break;
            case '*':
                res = a.value * b.value;
                formula = a.formula + '*' + b.formula;
                break;
            case '/':
                res = a.value / b.value;
                formula = a.formula + '/' + b.formula;
                break;
            case '.':
                res = Number([a.value, b.value].join(""));
                formula = a.formula + '.' + b.formula;
                break;
        }

        if (res < 0 || res % 1 !== 0) {
            res = NaN;
        }
        return {
            value: res,
            formula: '(' + formula + ')',
        };;
    };
    calcSum = () => {
        let cha = this.nums.length - 1 - this.options.length;
        this.cache = {};
        if (cha) {
            this.options.push(...'.'.repeat(cha))
        }
        this.nowNum = 0
        this.options.sort()
        let len = this.nums.length
        this.nums.sort()
        for (let i = 0; i < len; i++) {
            let num = this.nums[i]
            this.nums[i] = {
                value: num,
                formula: '' + num,
            }
        }
        this.calcLoop(this.nums, this.options, this.target)
        this.cache = null;
    };
    calcLoop = (nums, options, target) => {
        let cache = this.cache
        if (nums.length === 1 && options.length == 0 && nums[0].value == target) {
            console.log(colors.warn(`算法破解：${nums[0].formula}`));
            this.nowNum++;
            if (this.nowNum >= this.needNum) {
                console.log(colors.info('扫地盲僧第三代算法--运行结束--!'))
                return true
            }
            return// nums[0]
        }

        let nums2 = nums.map((v) => v.value)
        nums2.sort()
        let key = nums2.join() + '|' + options.join();
        if (cache[key]) {
            return
        }
        cache[key] = true
        for (let i of '*+-/.') {
            let index = options.indexOf(i);
            if (index >= 0) {
                let newOptions = [...options];
                newOptions.splice(index, 1);
                let len = nums.length
                for (let j = 0; j < len - 1; j++) {
                    let newNums = [...nums];
                    newNums.splice(j, 1);
                    for (let k = j + 1; k < len; k++) {
                        let newNums2 = [...newNums];
                        //newNums2.splice(newNums2.indexOf(nums[k]), 1);
                        let newNum = this.calc(nums[j], i, nums[k])
                        if (isNaN(newNum.value)) {
                        }
                        else {
                            newNums2[k - 1] = newNum//[newNum.formula, ...newNums2]
                            if (this.calcLoop(newNums2, newOptions, target)) return true;
                        }
                        if (i != '+' && i != '*') {
                            let newNum = this.calc(nums[k], i, nums[j]);
                            if (isNaN(newNum.value)) {
                            }
                            else {
                                newNums2[k - 1] = newNum
                                if (this.calcLoop(newNums2, newOptions, target)) return true;
                            }
                        }
                    }
                }
            }
        }
    }
    run = (needNum = 5) => {
        this.needNum = needNum;
        this.calcSum(this.nums, this.options, this.target)

    }
}
exports.Maths = Maths