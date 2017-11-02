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
      console.log('登陆成功',res.data)
      const { localSession, storeManager}=res.data.data
      this.getAuthInfor(localSession)

      wx.setStorage({
        key: 'storeManager',
        data: storeManager
      })
      wx.setStorage({
        key: 'localSession',
        data: localSession
      })
      this.globalData.storeManager = storeManager
      this.globalData.localSession = localSession
      
    }).catch((error) => {
        console.log(error,'++++')
    })
  },
  getAuthInfor(localSession){
    wx.getUserInfo({
      success: (res) =>{
        const { encryptedData,iv,rawData,signature,userInfo}=res;
        wx.setStorage({
          key: 'userInfo',
          data: userInfo
        })
        this.globalData.userInfo = userInfo
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
          console.log('授权成功')
        }).catch((error) => {
        })
      },
      fail:(error)=>{
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法正常使用此功能体验。',
          success: (res)=> {
            if (res.confirm) {
              wx.openSetting({
                success: (res)=> {
                  if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                    this.getAuthInfor()
                  }
                }
              })
              console.log('用户点击确定')
            }
          }
        })
        
        console.log(error)
      }
    })
    
  },
  globalData:{
    userInfo:null,
    localSession:null
  }
})