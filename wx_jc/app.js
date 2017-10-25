import { Ajax } from './utils/ajax'
//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.getUserInfo()
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success(res) {
          if (res.code) {
            const resCode=res.code
            console.log(res.code)
            Ajax({
              url: '/user/login',
              method: 'post',
              data: {
                code: resCode
              }
            }).then((res) => {
                console.log(res)
            }).catch((error) => {
              
            })
          }
        }
      })
    }
  },
  getUser(){
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
  },
  globalData:{
    userInfo:null
  }
})