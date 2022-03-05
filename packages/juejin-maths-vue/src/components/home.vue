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
          <el-button type="primary" @click="submitForm('start')">自动开始</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="submitForm('command')">发起指令</el-button>
        </el-col>
      </el-row>
      <el-form
        ref="form"
        :model="form"
        :rules="formRule"
        label-width="80px"
        size="mini"
        class="margin-top-20"
      >
        <el-form-item label="数字" prop="manualNumber">
          <el-input v-model="manualForm.manualNumber"></el-input>
        </el-form-item>
        <el-form-item label="操作" prop="manualOptions">
          <el-input v-model="manualForm.manualOptions"></el-input>
        </el-form-item>
        <el-form-item label="目标值" prop="manualTarget">
          <el-input v-model="manualForm.manualTarget"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="margin-top-20">
        <el-col :span="8">
          <el-button type="primary" @click="submitForm('manual')">手动开始</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="submitForm('test')">测试案例</el-button>
        </el-col>
      </el-row>
    </el-aside>
    <el-main class="home-main">
      <div class="left-text log-basic">
        <el-row>
          <el-col :span="12">
            <p>
              数字：<span class="is-bold">{{ mathInfo.nums }}</span>
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              操作字符：<span class="is-bold">{{ mathInfo.options }}</span>
            </p>
          </el-col>
        </el-row>
        <div class="border-bottom"></div>
        <el-row>
          <el-col :span="12">
            <p>
              目标：<span class="is-bold">{{ mathInfo.target }}</span>
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              游戏共建者：<span class="is-bold">{{ author }}</span>
            </p>
          </el-col>
        </el-row>
        <div class="border-bottom"></div>
        <el-row>
          <el-col :span="12">
            <p>
              当前关卡：<span class="is-bold">{{ round }}</span>
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              剩余BUG：<span class="is-bold">{{ bug }}</span>
            </p>
          </el-col>
        </el-row>
        <div class="border-bottom"></div>
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
      manualForm: {
        manualNumber: '',
        manualOptions: '',
        manualTarget: '',
      },
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
      author: 'wangscaler', // 当前作者
      bug: 0,
      round: 0,
      cache: {},
      type: 2, //第二代
      needNum: 5, //正确解的数量
      result: '',
      nowNum: 0,
      mathInfo: {
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
      this.nowNum = 0
      options.sort()
      let len = nums.length
      nums.sort()
      for (let i = 0; i < len; i++) {
        let num = nums[i]
        nums[i] = {
          value: num,
          formula: '' + num,
        }
      }
      this.calcLoop(nums, options, target)
      this.cache = {}
    },
    calcLoop(nums, options, target) {
      if (nums.length === 1 && options.length == 0 && nums[0].value == target) {
        this.logData.unshift({
          msg: '答案：' + nums[0].formula,
        })
        this.nowNum++
        if (this.nowNum >= this.needNum) {
          this.logData.unshift({
            msg: '扫地盲僧第三代算法--运行结束--!',
          })
          return true
        }
        return // nums[0]
      }
      let nums2 = nums.map((v) => v.value)
      nums2.sort()
      let key = nums2.join() + '|' + options.join()
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
            newNums.splice(j, 1)
            for (let k = j + 1; k < len; k++) {
              let newNums2 = [...newNums]
              //newNums2.splice(newNums2.indexOf(nums[k]), 1);
              let newNum = this.calc(nums[j], i, nums[k])
              if (isNaN(newNum.value)) {
              } else {
                newNums2[k - 1] = newNum //[newNum.formula, ...newNums2]
                if (this.calcLoop(newNums2, newOptions, target)) return true
              }
              if (i != '+' && i != '*') {
                let newNum = this.calc(nums[k], i, nums[j])
                if (isNaN(newNum.value)) {
                } else {
                  newNums2[k - 1] = newNum
                  if (this.calcLoop(newNums2, newOptions, target)) return true
                }
              }
            }
          }
        }
      }
    },
    start() {
      this.clearLog()
      const time = new Date().getTime()
      const params = {}
      start(params, this.form.uid, time, this.form.token).then(
        (res) => {
          const { data } = res
          this.logData.unshift({
            msg: '成功获取游戏数据',
          })
          this.author = data.author
          this.bug = data.bug
          this.round = data.round
          this.mathInfo.target = data.target
          this.manualForm.manualTarget = data.target
          const { nums, options } = this.operatorArr(data.map)
          this.mathInfo.nums = nums
          this.manualForm.manualNumber = nums
          this.mathInfo.options = options
          this.manualForm.manualOptions = options
        },
        () => {},
      )
    },
    test() {
      this.clearLog()
      this.manualForm.manualNumber = '4,14,24,34,44,54'
      this.manualForm.manualOptions = '+/*-+'
      this.manualForm.manualTarget = 24
      this.mathInfo.nums = '4,14,24,34,44,54'
      this.mathInfo.options = '+/*-+'
      this.mathInfo.target = 24
    },
    manual() {
      this.clearLog()
      let manualNums = []
      let manualOptions = []
      manualNums = String(this.manualForm.manualNumber).trim().split(',')
      var numArr = []
      var optionsArr = []
      for (var i = 0; i < manualNums.length; i++) {
        numArr.push(Number(manualNums[i]))
      }
      this.mathInfo.nums = numArr
      manualOptions = String(this.manualForm.manualOptions).trim().split('')
      for (var i = 0; i < manualOptions.length; i++) {
        var currChar = manualOptions[i]
        if (currChar === '+' || currChar === '-' || currChar === '*' || currChar === '/') {
          optionsArr.push(currChar)
        }
      }
      this.mathInfo.options = optionsArr
      this.mathInfo.target = Number(this.manualForm.manualTarget)
      this.command()
    },
    // 发出指令
    command() {
      this.clearLog()
      let nums = JSON.parse(JSON.stringify(this.mathInfo.nums))
      let options = JSON.parse(JSON.stringify(this.mathInfo.options))
      let target = JSON.parse(JSON.stringify(this.mathInfo.target))
      console.log(nums)
      this.calcSum(nums, options, target)
    },
    clearLog() {
      this.logData = []
    },
  },
}
</script>

<style></style>
