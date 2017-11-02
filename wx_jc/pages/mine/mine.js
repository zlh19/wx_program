var app = getApp()
Page({
    data: {
      userInfo:{},
      storeManager:false
    },
    onLoad(){
      const { userInfo, storeManager } = app.globalData;
      this.setData({
        'userInfo': userInfo,
        'storeManager': storeManager
      })
    }
    
})
