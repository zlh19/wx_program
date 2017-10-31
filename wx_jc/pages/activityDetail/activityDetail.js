var app = getApp()
import { Ajax } from './../../utils/ajax'
Page({
    data: {
      params:{},        
      begintime: '',
      endtime: '',
      id:0,
      imgs:[],
      intro: '',
      title: ''
    },
    onLoad() {
      this.getUrlParams()
      this.getDetailInfor(this.data.params.id)
    },
    getUrlParams() {
      const urlParam = getCurrentPages()[1].options
      this.setData({
        params: urlParam
      })
    },
    getDetailInfor(id) {
      Ajax({
        url: '/store/activities/' + id,
        method: 'get',
        data: {
        }
      }).then((res) => {
        if (res.data.code === 0) {
          const resData = res.data.data;
          this.setData({
            begintime: resData.begintime,
            endtime: resData.endtime,
            id:resData.id,
            imgs:resData.imgs[0],
            intro: resData.intro,
            title: resData.title
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    
})
