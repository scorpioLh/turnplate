Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 中奖结果
    winningResult: {
      type: Number,
      observer(newVal) {
        if (newVal && newVal < 9 && newVal > 0 && (newVal % 1 === 0)) {
          this.data.lotteryNum = parseInt(newVal)
        } else {
          wx.showToast({
            title: '中奖结果输入错误',
            icon: 'none'
          })
        }
      }
    },
    // 奖品图片
    prizeImgs: {
      type: Array,
      observer(newVal) {
        if (newVal.length === 8) {
          let awardList = this.data.awardList
          let imgArr = newVal
          for (let i = 0; i < awardList.length; i++) {
            awardList[i].imageAward = imgArr[i]
          }
          this.setData({
            awardList
          })
        } else {
          wx.showToast({
            title: '奖品图片输入错误',
            icon: 'none'
          })
        }
      }
    },
    // 转盘转的圈数
    times: {
      type: Number,
      observer(newVal) {
        if (newVal && newVal > 0) {
          this.data.circleTimes = newVal
        }
      }
    },
    speed: {
      type: Number,
      observer(newVal) {
        if (newVal && newVal > 0) {
          this.data.circleSpeed = newVal
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    circleList: [], //圆点数组
    awardList: [{
      topAward: 25,
      leftAward: 25,
      imageAward: "./images/under_img.png"
    }, {
      topAward: 25,
      leftAward: 206.6666,
      imageAward: "./images/under_img.png"
    }, {
      topAward: 25,
      leftAward: 388.3332,
      imageAward: "./images/under_img.png"
    }, {
      topAward: 190,
      leftAward: 388.3332,
      imageAward: "./images/under_img.png"
    }, {
      topAward: 355,
      leftAward: 388.3332,
      imageAward: "./images/under_img.png"
    }, {
      topAward: 355,
      leftAward: 206.6666,
      imageAward: "./images/under_img.png"
    }, {
      topAward: 355,
      leftAward: 25,
      imageAward: "./images/under_img.png"
    }, {
      topAward: 190,
      leftAward: 25,
      imageAward: "./images/under_img.png"
    }], //奖品数组
    colorCircleFirst: '#F56412', //圆点颜色1
    colorCircleSecond: '#FCF4DF', //圆点颜色2
    colorAwardDefault: '#FFEDA1', //奖品默认颜色
    colorAwardSelect: '#ffe400', //奖品选中颜色
    indexSelect: 0, // 渲染色块所用
    lotteryNum: 1, // 中奖号码 (1~9)
    isRunning: false, //是否正在抽奖
    imageAward: [], //奖品图片数组
    circleTimes: 3, // 轮盘转的圈数（默认3圈）
    circleSpeed: 100 // 转圈的速度
  },

  attached() {
    this.turnTableCircle()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /** 游戏界面圆点设置 */
    turnTableCircle() {
      let leftCircle = 7.5;
      let topCircle = 7.5;
      let circleList = [];
      for (let i = 0; i < 24; i++) {
        if (i == 0) {
          topCircle = 15;
          leftCircle = 15;
        } else if (i < 6) {
          topCircle = 7.5;
          leftCircle = leftCircle + 102.5;
        } else if (i == 6) {
          topCircle = 15
          leftCircle = 620;
        } else if (i < 12) {
          topCircle = topCircle + 94;
          leftCircle = 620;
        } else if (i == 12) {
          topCircle = 565;
          leftCircle = 620;
        } else if (i < 18) {
          topCircle = 570;
          leftCircle = leftCircle - 102.5;
        } else if (i == 18) {
          topCircle = 565;
          leftCircle = 15;
        } else if (i < 24) {
          topCircle = topCircle - 94;
          leftCircle = 7.5;
        } else {
          return
        }
        circleList.push({
          topCircle,
          leftCircle
        })
      }
      this.setData({
        circleList
      })
      // 圆点闪烁控制
      setInterval(() => {
        if (this.data.colorCircleFirst === '#FFDF2F') {
          this.setData({
            colorCircleFirst: '#FE4D32',
            colorCircleSecond: '#FFDF2F'
          })
        } else {
          this.setData({
            colorCircleFirst: '#FFDF2F',
            colorCircleSecond: '#FE4D32'
          })
        }
      }, 500)
    },

    /** 获取抽奖结果 */
    getLotteryRes() {
      
    },

    /** 开始游戏 */
    startGame() {
      if (this.data.isRunning) return
      this.setData({
        isRunning: true
      })
      let indexSelect = 0 // 控制色块显示位置
      let i = 0 // 计数器
      let timer = setInterval(() => {
        if (i > this.data.lotteryNum + 8 * this.data.circleTimes - 2) { // 24是格子移动次数，24为移动24格，如要更改需为8的倍数
          clearInterval(timer)
          this.setData({
            isRunning: false
          })
          this.triggerEvent('turnResultCallBack', {}, {})
        }
        indexSelect = indexSelect % 8
        this.setData({
          indexSelect
        }, _ => {
          indexSelect++
          i++
        })
      }, this.data.speed) // 100为移动速度
    }
  }
})