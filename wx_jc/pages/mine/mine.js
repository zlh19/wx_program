var app = getApp()
Page({
    data: {
      userInfo:{},
      storeManager:false,
        activityImg:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        activityTitle:'“金九银十”促销活动活动',
        activityDetail:'“金九银十”这一传统销售旺季历来是商家必争之机，当中秋促销的硝烟还未散尽时，国庆“黄金周”又接踵而至，各大家居建材卖场以低利润甚至零利润伴随诸多促销政策集中放量，一场特色鲜明、内容丰富的“十一”大促销拉开序幕。网易家居特意收集整理了各大家居品牌的“十一”促销信息，以帮助消费者在形形色色的活动中选购到自己最满意的产品。'
    },
    onLoad(){
      wx.getStorage({
        key: 'userInfo',
        success: (res) => {
          const resData = res.data
          this.setData({
            userInfo: resData
          })
        }
      })

      wx.getStorage({
        key: 'storeManager',
        success: (res) => {
          const resData = res.data
          console.log(resData)
          this.setData({
            storeManager: resData||false
          })
        }
      })
    }
    
})
