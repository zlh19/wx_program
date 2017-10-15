import {Ajax} from './../../utils/ajax'


Page({
    data: {
        title:'丁丁当儿童成长中心',
        desc:'教育学校·培训',
        address:'浙江省杭州市余杭区文一西路大华海派风范大街201',
        time:'08:00 -  21:00',
        tel:'0571 - 8870007',
        housePicture:[{
            id:0,
            img:'./imgs/upload/pic_0.png',
        },{
            id:1,
            img:'./imgs/upload/pic_1.jpg',
        },{
            id:2,
            img:'./imgs/upload/pic_2.png',
        },{
            id:3,
            img:'./imgs/upload/pic_3.png',
        },{
            id:4,
            img:'./imgs/upload/pic_4.png',
        },{
            id:5,
            img:'./imgs/upload/pic_5.png',
        },{
            id:6,
            img:'./imgs/upload/pic_6.png',
        },{
            id:7,
            img:'./imgs/upload/pic_7.png',
        },{
            id:8,
            img:'./imgs/upload/pic_8.png',
        }],
    },
    onLoad(){
        
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
