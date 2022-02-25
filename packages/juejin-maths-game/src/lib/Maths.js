
class Maths {
    //解析算法部分-升级改造版   源地址：https://juejin.cn/post/7067862481800003591
    constructor(nums, options, target) {
        this.nums = nums;
        this.options = options;
        this.target = target;
        this.cache = {}
    }
    calc(a, option, b) {
        let res;
        let formula;
        if (option == '+') {
            res = a.value + b.value;
            formula = a.formula + '+' + b.formula;
        }
        else if (option == '-') {
            res = a.value - b.value;
            formula = a.formula + '-' + b.formula;
        }
        else if (option == '*') {
            res = a.value * b.value;
            formula = a.formula + '*' + b.formula;
        }
        else if (option == '/') {
            res = a.value / b.value;
            formula = a.formula + '/' + b.formula;
        }
        else if (option == '.') {
            res = Number([a.value, b.value].join(""));
            formula = a.formula + '.' + b.formula;
        }
        if (res < 0) {
            res = NaN;
        }
        else if (res % 1 !== 0) {
            res = NaN
        }
        return {
            value: res,
            formula: '(' + formula + ')',
        };;
    };
    calcSum() {
        let cha = this.nums.length - 1 - this.options.length;
        if (cha) {
            this.options.push(...'.'.repeat(cha))
        }
        this.options.sort()
        for (let i of this.nums) {
            this.cache[i] = {
                value: i,
                formula: i,
            }
        }
        this.calcLoop(this.nums, this.options, this.target)

    };
    calcLoop(nums, options, target) {
        if (nums.length === 1 && options.length == 0 && this.cache[nums[0]].value == target) {
            // console.log(nums[0]);
            return;
        }
        nums.sort()
        let key = [...nums].join() + '|' + nums.join();
        if (this.cache[key]) {
            return
        }
        this.cache[key] = true
        for (let i of '*+-/.') {
            let index = options.indexOf(i);
            if (index >= 0) {
                let newOptions = [...options];
                newOptions.splice(index, 1);
                let len = nums.length
                for (let j = 0; j < len - 1; j++) {
                    let newNums = [...nums];
                    newNums.splice(nums.indexOf(nums[j]), 1);
                    for (let k = j + 1; k < len; k++) {
                        let newNums2 = [...newNums];
                        newNums2.splice(newNums2.indexOf(nums[k]), 1);
                        let newNum = this.calc(this.cache[nums[j]], i, this.cache[nums[k]])
                        if (isNaN(newNum.value)) {
                        }
                        else {
                            this.cache[newNum.formula] = newNum;
                            let t = [newNum.formula, ...newNums2];
                            this.calcLoop(t, newOptions, target);
                        }
                        if (i != '+' && i != '*') {
                            let newNum = this.calc(this.cache[nums[k]], i, this.cache[nums[j]]);
                            if (isNaN(newNum.value)) {
                            }
                            else {
                                this.cache[newNum.formula] = newNum;
                                let t = [newNum.formula, ...newNums2];
                                this.calcLoop(t, newOptions, target);
                            }
                        }
                    }
                }
            }
        }
    }

}
exports.Maths = Maths