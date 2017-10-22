import {Ajax} from './../../utils/ajax'


Page({
    data: {
        addressName: '西湖区古墩路970号温州村装修市场4-01-32',
        addressTel: '40015018888',
        longitude: 120.102093,
        latitude: 30.321273,
        imgUrls: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDotsColor:'#F3F3F3',
        indicatorDotsActiveColor:'#F7AB00',
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        activityDataList:[{
            id:0,         img:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            title:'“金九银十”促销活动',
            time:'2017.9.20—2017.10.20'
        },{
            id:1,       img:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            title:'“金九银十”促销活动',
            time:'2017.9.20—2017.10.20'
        }]
    },
    onLoad(){
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.record']) {
            wx.authorize({
              scope: 'scope.record',
              success() {
                wx.startRecord()
              }
            })
          }
        }
      })

       Ajax({
        url:'',
        method:'get',
        data:{}
       }).then((res)=>{

       }).catch((error)=>{

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
