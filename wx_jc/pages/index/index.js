import {Ajax} from './../../utils/ajax'


Page({
    data: {
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
          success: (res) => {
            console.log(res)
            /*
             * res.authSetting = {
             *   "scope.userInfo": true,
             *   "scope.userLocation": true
             * }
             */
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
    getAddress(){
      alert(0)
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: function(res) {
            var latitude = res.latitude
            var longitude = res.longitude
            wx.openLocation({
              latitude: latitude,
              longitude: longitude,
              scale: 28
            })
          }
        })
    },
    // 打电话
    tapPhone(){
        wx.makePhoneCall({
          phoneNumber: '13738052554'
        })
    }
    
})
