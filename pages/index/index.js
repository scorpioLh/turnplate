Page({
  data: {
    winningResults: 3,
    prizeImgs: [
      './images/money.png',
      './images/money.png',
      './images/money.png',
      './images/money.png',
      './images/money.png',
      './images/money.png',
      './images/money.png',
      './images/money.png'
    ]
  },

  /** 抽奖回调 */
  lotteryResult() {
    console.log('抽奖结束后的回调')
  }
})
