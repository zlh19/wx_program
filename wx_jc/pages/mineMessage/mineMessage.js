var app = getApp()
import { Ajax } from './../../utils/ajax'
import { formatTime } from './../../utils/util.js'

Page({
    data: {
        messageListData:[]
    },
    onLoad(){
      this.getMessageInfor()
    },
    getMessageInfor(){
      const { localSession } = app.globalData
      Ajax({
        url: '/user/reserves',
        method: 'get',
        header:{
          'localSession': localSession
        },
        data: {
          pn:1,
          ps:1000
        }
      }).then((res) => {
        if (res.data.code === 0) {
          const resData = res.data.data;
          resData.map((item, index) => {
            item.createtime = formatTime(new Date(item.createtime))
          })
          this.setData({
            'messageListData': resData
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    
})
