var app = getApp()
import { Ajax } from './../../utils/ajax'
import { Config } from './../../config/config'
Page({
    data: {
      Config: Config,
      params:{},        
      begintime: '',
      endtime: '',
      id:0,
      imgs:[],
      intro: '',
      title: ''
    },
    onLoad(option) {
      this.getUrlParams(option)
      this.getDetailInfor(this.data.params.id)
    },
    getUrlParams(option) {
      this.setData({
        params: {
          id:option.id
        }
      })
    },
    getDetailInfor(id) {
      Ajax({
        url: '/store/activities/' + id,
        method: 'get',
        data: {}
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
    },
    // 分享
    onShareAppMessage() {
      const sharePathParam =this.data.params.id
      return setShareData('activityDetail', sharePathParam)
    }
    
})
