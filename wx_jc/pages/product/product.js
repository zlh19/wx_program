var app = getApp()
import { Ajax } from './../../utils/ajax'
import { Config } from './../../config/config'
Page({
    data: {
      Config: Config,
      cateList:[],
      productList:[]
    },
    onLoad() {
      // this.setData({
      //   Config: {
      //     hosts: app.globalData.imageUrl
      //   }
      // })

      this.getCate((id)=>{
        this.getProduct(id)
      })
    },
    getProduct(id){
      Ajax({
        url: '/produce/',
        method: 'get',
        data: {
          cateId: id,
          keyword:'',
          pn:1,
          ps:100
        }
      }).then((res) => {
        if (res.data.code === 0) {
          this.setData({
            productList: res.data.data
          })
        }
      }).catch((error) => {
        console.log(error)
      })

      // Ajax({
      //   url: '/cate/' + id,
      //   method: 'get',
      //   data: {
      //     cateId: id
      //   }
      // }).then((res) => {
      //   if (res.data.code === 0) {
      //     this.setData({
      //       productList: res.data.data
      //     })
      //   }
      // }).catch((error) => {
      //   console.log(error)
      // })
    },
    getCate(callback){
      Ajax({
        url: '/cate',
        method: 'get',
        data: {
          sid: 1
        }
      }).then((res) => {
        if (res.data.code === 0) {
          this.renderCate(res.data.data)
          callback && callback(res.data.data[0].id)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    renderCate(res){
      const resData = res;
      const arr = []
      resData.map((item, index) => {
        const obj = {}
        index === 0 ? obj['current'] = 'current' : obj['current'] = ''
        obj['cate'] = item.cate
        obj['id']=item.id
        arr.push(obj)
      })
      this.setData({
        cateList: arr
      })
    },
    switchCate(currentIndex){
      let newList = this.data.cateList;
      newList.map((item, index) => {
        if (index === currentIndex) {
          item.current = 'current'
        } else {
          item.current = ''
        }
      })
      this.setData({
        cateList: newList
      })
    },
    cateTap(e){
      const currentIndex=e.currentTarget.dataset.index
      const currentId = e.currentTarget.dataset.id
      this.switchCate(currentIndex)
      this.getProduct(currentId)
    },
    onShareAppMessage() {
      return {
        title: '微信小程序',
        desc: '最具人气的小程序',
        path: '/pages/product/product'
      }
    }
    
})
