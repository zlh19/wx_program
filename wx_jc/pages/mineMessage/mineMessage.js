var app = getApp()
import { Ajax } from './../../utils/ajax'
import { formatTime } from './../../utils/util.js'

Page({
    data: {
      messageOptions: {
        pn: 1,
        ps: 10
      },
      messageResponseData:{},
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
        data: this.data.messageOptions
      }).then((res) => {
        if (res.data.code === 0) {
          const resData = res.data.data;
          resData.map((item, index) => {
            item.createtime = formatTime(new Date(item.createtime))
          })
          this.setData({
            'messageResponseData':res.data,
            'messageListData': [...this.data.messageListData, ...resData]
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 滚动至底部
    onReachBottom() {
      const messageLength = this.data.messageListData.length;
      const messagetotalCount = this.data.messageResponseData.tc;
      if (messageLength < messagetotalCount) {
        this.data.messageOptions.pn++
        this.getMessageInfor()
      }
    }
    
})
