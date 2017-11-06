var app = getApp()
import {Ajax} from './../../utils/ajax'
import { formatTime } from './../../utils/util.js'
// import { Config } from './../../config/config'
Page({
    data: {
      Config:{},
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
      duration: 500,
      activityDataList:[]
    },
    onLoad(){
      this.setData({
        Config:{
          hosts: app.globalData.imageUrl
        }
      })
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
            longitude: resData.placeLong,
            latitude: resData.placeLat,
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
        data: {
          ps:1000,
          pn:1
        }
      }).then((res) => {
        if (res.data.code === 0) {
          const resData = res.data.data;
          resData.map((item,index)=>{
            item.begintime = formatTime(new Date(item.begintime))
            item.endtime = formatTime(new Date(item.endtime))
          })
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
        longitude: this.data.longitude *1,
        latitude: this.data.latitude * 1,
        name:this.data.addressName,
        address: this.data.addressName,
        scale:15
      })
    },
    // 打电话
    tapPhone(){
        wx.makePhoneCall({
          phoneNumber:this.data.addressTel
        })
    },
    onShareAppMessage(){
      return {
        title: '微信小程序',
        desc: '最具人气的小程序',
        path: '/pages/index/index'
      }
    }
    
})
