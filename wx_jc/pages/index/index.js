var app = getApp()
import {Ajax} from './../../utils/ajax'
import { formatTime } from './../../utils/util.js'
import { Config, setShareData } from './../../config/config'
Page({
    data: {
      Config: Config,
      addressName: '',
      addressTel: '',
      longitude: 0,
      latitude: 0,
      title:'',
      imgUrls: [],
      indicatorDotsColor:'#F3F3F3',
      indicatorDotsActiveColor:'#F7AB00',
      indicatorDots: true,
      autoplay: false,
      interval: 5000,
      duration: 500,
      // 活动传参
      activityOptions:{
        ps: 10,
        pn: 1
      },
      // 活动返回值
      activityResposeData: {},
      // 活动返回值列表
      activityDataList: [],
    },
    onLoad(){
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
            title: resData.title,
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
        data:this.data.activityOptions
      }).then((res) => {
        if (res.data.code === 0) {
          const resData = res.data.data;
          resData.map((item,index)=>{
            item.begintime = formatTime(new Date(item.begintime))
            item.endtime = formatTime(new Date(item.endtime))
          })
          this.setData({
            activityResposeData:res.data,
            activityDataList: [...this.data.activityDataList, ...resData]
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
        name: this.data.title,
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
    // 分享
    onShareAppMessage(){
      return setShareData('index')
    },
    // 滚动至底部
    onReachBottom(){
      const activityLength = this.data.activityDataList.length;
      const activitytotalCount=this.data.activityResposeData.tc;
      if (activityLength < activitytotalCount){
        this.data.activityOptions.pn++
        this.getActivityInfor()
      }  
    }
    
})
