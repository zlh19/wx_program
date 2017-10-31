import { Ajax } from './utils/ajax'
//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.getConfig()

    this.getUserInfo()

    this.getSetting()
  },
  getConfig(){
    Ajax({
      url: '/config',
      method: 'get'
    }).then((res) => {
      const resData=res.data.data;
      if(res.data.code==0){
        Object.keys(resData).map((value,index)=>{
          // wx.setStorage({
          //   key: value,
          //   data: resData[index]
          // })
          this.globalData[value] = resData[value]
        })
      }
      
    }).catch((error) => {

    })
  },
  getSetting(){
    // wx.getSetting({
    //   success(res) {
    //     console.log(res)
    //     if (!res.authSetting['scope.record']) {
    //       wx.authorize({
    //         scope: 'scope.record',
    //         success() {
              
    //         }
    //       })
    //     }
    //   }
    // })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success:(res)=> {
          if (res.code) {
            const resCode=res.code
            console.log(res.code,'=======')
            this.getLogin(resCode)
          }
        }
      })
    }
  },
  getLogin(resCode){
    Ajax({
      url: '/auth/login',
      method: 'get',
      data: {
        code: resCode
      }
    }).then((res) => {
      const {localSession}=res.data.data
      this.getAuthInfor(localSession)
      console.log(res,'++++')
    }).catch((error) => {

    })
  },
  getAuthInfor(localSession){
    wx.getUserInfo({
      success: (res) =>{
        const { encryptedData,iv,rawData,signature,userInfo}=res;
        console.log(res,'res')
        Ajax({
          url: '/auth/info',
          method: 'post',
          header:{
            localSession: localSession
          },
          data: { 
            encryptedData: encryptedData,
            iv:iv,
            rawData: rawData,
            signature: signature,
            userInfo: JSON.stringify(userInfo)
          }
        }).then((res) => {
          console.log(res, '=========')
        }).catch((error) => {

        })
      }
    })
    
  },
  // getUser(){
  //   wx.getUserInfo({
  //     success: function (res) {
  //       console.log(res)
  //       that.globalData.userInfo = res.userInfo
  //       typeof cb == "function" && cb(that.globalData.userInfo)
  //     }
  //   })
  // },
  globalData:{
    userInfo:null
  }
})