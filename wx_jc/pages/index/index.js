var app = getApp()
import {Ajax} from './../../utils/ajax'
Page({
    data: {
        addressName: '',
        addressTel: '',
        longitude: 0,
        latitude: 0,
        imgUrls: [],
        indicatorDotsColor:'#F3F3F3',
        indicatorDotsActiveColor:'#F7AB00',
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        activityDataList:[]
    },
    onLoad(){
      // wx.getSetting({
      //   success(res) {
      //     if (!res.authSetting['scope.record']) {
      //       wx.authorize({
      //         scope: 'scope.record',
      //         success() {
      //           wx.startRecord()
      //         }
      //       })
      //     }
      //   }
      // })

      this.getUserInfor()
      this.getActivityInfor()
    },
    getUserInfor(){
      Ajax({
        url: '/store',
        method: 'get',
        data: {}
      }).then((res) => {
        if (res.data.code === 0) {
          const resData = res.data.data;
          this.setData({
            addressName: resData.placeName,
            longitude: resData.placeLat,
            latitude: resData.placeLong,
            imgUrls: resData.imgs,
            addressTel: resData.tel
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getActivityInfor(){
      Ajax({
        url: '/store/activities',
        method: 'get',
        data: {}
      }).then((res) => {
        if (res.data.code === 0) {
          const resData = res.data.data;
          this.setData({
            activityDataList: resData
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 获取地图
    tapAddress(){
      wx.openLocation({
        longitude: this.data.longitude,
        latitude: this.data.latitude,
        name:this.data.addressName,
        scale: 28
      })
    },
    // 打电话
    tapPhone(){
        wx.makePhoneCall({
          phoneNumber:this.data.addressTel
        })
    }
    
})
