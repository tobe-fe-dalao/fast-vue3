<template>
  <el-container class="home-container">
    <el-aside width="500px">
      <el-form ref="form" :model="form" :rules="formRule" label-width="80px" size="mini">
        <el-form-item label="UID" prop="uid">
          <el-input v-model="form.uid" @blur="saveLocal"></el-input>
        </el-form-item>
        <el-form-item label="TOKEN" prop="token">
          <el-input v-model="form.token" @blur="saveLocal"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="margin-top-20">
        <el-col :span="8">
          <el-button type="primary" @click="submitForm('start')">开始</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="submitForm('command')">发起指令</el-button>
        </el-col>
      </el-row>
    </el-aside>
    <el-main class="home-main">
      <div class="left-text log-basic">
        <el-row>
          <el-col :span="12">
            <p>
              数字：<span class="is-bold">{{ shuZiInfo.nums }}</span>
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              操作字符：<span class="is-bold">{{ shuZiInfo.options }}</span>
            </p>
          </el-col>
        </el-row>
        <div class="border-bottom"></div>
        <el-row>
          <el-col :span="12">
            <p>
              目标：<span class="is-bold">{{ shuZiInfo.target }}</span>
            </p>
          </el-col>
        </el-row>
        <div class="border-bottom"></div>
        <el-row>
          <el-col :span="12">
            <p>
              游戏共建者：<span class="is-bold">{{ author }}</span>
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              剩余BUG：<span class="is-bold">{{ bug }}</span>
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              当前关卡：<span class="is-bold">{{ round }}</span>
            </p>
          </el-col>
        </el-row>
      </div>
      <div class="log-container left-text">
        <h3 class="left-text">日志:</h3>
        <el-button class="btn-clear" type="primary" size="mini" @click="clearLog">清空</el-button>
        <div class="log-list">
          <p class="log-item" v-for="(item, index) in logData" :key="index">
            <label>{{ index + 1 }}:</label> {{ item.msg }}
          </p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { start } from '../api/juejin'
export default {
  name: 'home',
  components: {},
  data() {
    return {
      form: {
        uid: '',
        token: '',
      },
      answer: {
        values: '',
        formula: '',
      },
      formRule: {
        uid: [{ required: true, message: '请输入uid', trigger: 'blur' }],
        token: [{ required: true, message: '请输入token', trigger: 'blur' }],
      },
      logData: [],
      author: '', // 当前作者
      bug: '',
      round: 0,
      cache: {},
      shuZiInfo: {
        nums: [],
        options: [],
        target: 0,
      },
    }
  },
  created() {
    this.getLocal()
  },
  methods: {
    operatorArr(arr) {
      let nums = []
      let options = []
      arr.forEach((item) => {
        item.forEach((key) => {
          //整数为数字
          if (key % 1 === 0) {
            nums.push(key)
          } else {
            //运算符匹配
            switch (key) {
              case 0.3:
                options.push('+')
                break
              case 0.4:
                options.push('-')
                break
              case 0.5:
                options.push('*')
                break
              case 0.6:
                options.push('/')
                break
              case 0.4:
                options.push('-')
                break
            }
          }
        })
      })
      return { nums, options }
    },
    getLocal() {
      this.form.uid = localStorage.getItem('uid')
      this.form.token = localStorage.getItem('token')
      // this.saveLocal();
    },
    // 保存本地
    saveLocal() {
      localStorage.setItem('uid', this.form.uid)
      localStorage.setItem('token', this.form.token)
      if (this.form.uid && this.form.token) {
        this.getRecord()
      }
    },
    submitForm(funName) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this[funName]()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    calc(a, option, b) {
      let res
      let formula
      switch (option) {
        case '+':
          res = a.value + b.value
          formula = a.formula + '+' + b.formula
          break
        case '-':
          res = a.value - b.value
          formula = a.formula + '-' + b.formula
          break
        case '*':
          res = a.value * b.value
          formula = a.formula + '*' + b.formula
          break
        case '/':
          res = a.value / b.value
          formula = a.formula + '/' + b.formula
          break
        case '.':
          res = Number([a.value, b.value].join(''))
          formula = a.formula + '.' + b.formula
          break
      }

      if (res < 0 || res % 1 !== 0) {
        res = NaN
      }
      return {
        value: res,
        formula: '(' + formula + ')',
      }
    },
    calcSum(nums, options, target) {
      let cha = nums.length - 1 - options.length
      if (cha) {
        options.push(...'.'.repeat(cha))
      }
      options.sort()
      for (let i of nums) {
        this.cache[i] = {
          value: i,
          formula: i,
        }
      }
      this.calcLoop(nums, options, target)
    },
    calcLoop(nums, options, target) {
      if (nums.length === 1 && options.length == 0 && this.cache[nums[0]].value == target) {
        // console.log(nums[0]);
        return
      }
      nums.sort()
      let key = [...nums].join() + '|' + nums.join()
      if (this.cache[key]) {
        return
      }
      this.cache[key] = true
      for (let i of '*+-/.') {
        let index = options.indexOf(i)
        if (index >= 0) {
          let newOptions = [...options]
          newOptions.splice(index, 1)
          let len = nums.length
          for (let j = 0; j < len - 1; j++) {
            let newNums = [...nums]
            newNums.splice(nums.indexOf(nums[j]), 1)
            for (let k = j + 1; k < len; k++) {
              let newNums2 = [...newNums]
              newNums2.splice(newNums2.indexOf(nums[k]), 1)
              let newNum = this.calc(this.cache[nums[j]], i, this.cache[nums[k]])
              if (isNaN(newNum.value)) {
              } else {
                this.cache[newNum.formula] = newNum
                let t = [newNum.formula, ...newNums2]
                this.calcLoop(t, newOptions, target)
              }
              if (i != '+' && i != '*') {
                let newNum = this.calc(this.cache[nums[k]], i, this.cache[nums[j]])
                if (isNaN(newNum.value)) {
                } else {
                  this.cache[newNum.formula] = newNum
                  let t = [newNum.formula, ...newNums2]
                  this.calcLoop(t, newOptions, target)
                }
              }
            }
          }
        }
      }
    },
    start() {
      this.clearLog();
      const time = new Date().getTime()
      const params = {}
      start(params, this.form.uid, time, this.form.token).then(
        (res) => {
          const { data } = res
          this.logData.unshift({
            msg: res.message,
          })
          this.author = data.author
          this.bug = data.bug
          this.round = data.round
          this.shuZiInfo.target = data.target
          const { nums, options } = this.operatorArr(data.map)
          this.shuZiInfo.nums = nums
          this.shuZiInfo.options = options
        },
        () => {},
      )
    },
    // 发出指令
    command() {
      this.clearLog();
      const nums = this.shuZiInfo.nums 
      const options = this.shuZiInfo.options 
      const target = this.shuZiInfo.target
      this.calcSum(nums, options, target)
      const objs = Object.values(this.cache)
      let resArr = []
      objs.forEach((val) => {
        //正确答案和前50
        if (val.value === target && resArr.length < 50) {
          //尽可能过滤出正确的答案
          val.formula = val.formula.toString()
          if (
            nums.every((num) => {
              return val.formula.indexOf(num) != -1
            })
          ) {
            resArr.push(val)
          }
        }
      })
      resArr.forEach((element) => {
        this.answer = element
        this.logData.unshift({
          msg: this.answer.formula,
        })
      })
    },
    clearLog() {
      this.logData = []
    },
  },
}
</script>

<style></style>
