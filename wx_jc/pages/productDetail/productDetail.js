var app = getApp()
import { Ajax } from './../../utils/ajax'
import { Config } from './../../config/config'
Page({
    data: {
      localSession:'',
      Config: Config,
      params:{},
      imgUrls: [],
      turnover:'',
      intro:'',
      indicatorDotsColor: '#F3F3F3',
      indicatorDotsActiveColor: '#F7AB00',
      indicatorDots: true,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      dialogShow:true,
      errorMessageStatus:false,
      errorMessage:'',
      buyList: [],
      iptNameValue:'',
      iptTelValue:'',
      iptCodeValue:'',
      btnCodeDisabled:'',
      btnCodeText:'获取验证码',
      initTime:60,
      totalTime:60
    },
    tapBanner(e){
      const currentPicture = e.currentTarget.dataset.picture;
      const pictureList = this.data.imgUrls;
      console.log(pictureList,currentPicture)
      wx.previewImage({
        current: currentPicture, // 当前显示图片的http链接
        urls: pictureList // 需要预览的图片http链接列表
      })
    },
    onLoad(option){
     
      this.getUrlParams(option)
      this.getDetailInfor(this.data.params.id)
      this.getBuyInfor(this.data.params.id)
      
    },
    getUrlParams(option){
      this.setData({
        params:{
          id:option.id
        }
      })
    },
    getDetailInfor(id) {
      const { localSession } = app.globalData
      Ajax({
        url: '/produce/' + id,
        method: 'get',
        header:{
          'localSession': localSession
        },
        data: {
          cateId: id
        }
      }).then((res) => {
        if (res.data.code === 0) {
          const resData = res.data.data;
          this.setData({
            imgUrls: resData.imgs,
            turnover: resData.turnover,
            intro: resData.intro
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getBuyInfor(id) {
      Ajax({
        url: '/produce/' + id+'/show',
        method: 'get',
        data: {
          pn: 10,
          ps:1000
        }
      }).then((res) => {
        if (res.data.code === 0) {
          const resData = res.data.data;
          this.setData({
            buyList:resData
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    submitReserve(id){
      const { localSession } = app.globalData
      wx.showLoading()
      wx.chooseAddress({
        success:(res)=>{
          wx.hideLoading()
          Ajax({
            url: '/reserve/' + id,
            method: 'post',
            header:{
              'localSession': localSession
            },
            data: {
              cityName: res.cityName,
              countyName: res.countyName,
              detailInfo: res.detailInfo,
              nationalCode: res.nationalCode,
              postalCode: res.postalCode,
              provinceName: res.provinceName,
              telNumber: res.telNumber,
              userName: res.userName
            }
          }).then((res) => {
            if (res.data.code === 0) {
              this.setData({
                errorMessage: '预订成功',
                errorMessageStatus: true
              })
              setTimeout(()=>{
                this.setData({
                  errorMessage: '',
                  errorMessageStatus: false
                })
              },1000)
            }
          }).catch((error) => {
            console.log(error)
          })
        }
          
      })
    },
    submitTap(){
      this.submitReserve(this.data.params.id)
      // this.setData({
      //   dialogShow:false
      // })
    },
    bindNameInput(e){
      this.setData({
        iptNameValue: e.detail.value
      })
    },
    bindTelInput(e){
      this.setData({
        iptTelValue: e.detail.value
      })
    },
    bindCodeInput(e){
      this.setData({
        iptCodeValue: e.detail.value
      })
    },
    showErrorMessage(value,text){
      if (value === '') {
        this.setData({
          errorMessage: text,
          errorMessageStatus:true
        })
        setTimeout(()=>{
          this.setData({
            errorMessageStatus: false
          })
        },1000)
        return false
      }
      return true
    },
    dialogOutTap(){
      this.setData({
        dialogShow: true
      })
    },
    codeTap(){
        this.setData({
          btnCodeDisabled: 'disabled',
          btnCodeText: '发送验证码'
        })
        this.interTimer = setInterval(() => {
          if (this.data.totalTime == 1) {
            this.setData({
              totalTime: this.data.initTime,
              btnCodeText: '获取验证码',
              btnCodeDisabled: ''
            })
            clearInterval(this.interTimer)
          }else{
            this.data.totalTime--
            this.setData({
              totalTime: this.data.totalTime,
              btnCodeText: this.data.totalTime,
            })
          }
        }, 1000)
    },
    registerSubmitTap(){
      const iptNameValue = this.data.iptNameValue,
            iptTelValue=this.data.iptTelValue,
            iptCodeValue=this.data.iptCodeValue;
      if (!this.showErrorMessage(iptNameValue, '用户名不能为空')) {
        return
      }
      if (!this.showErrorMessage(iptTelValue, '电话不能为空')) {
        return
      }
      if (!this.showErrorMessage(iptCodeValue, '验证码不能为空')){ 
        return 
      }
      this.setData({
        dialogShow:true
      })
    },
    onShareAppMessage() {
      return {
        title: '微信小程序',
        desc: '最具人气的小程序',
        path: '/pages/productDetail/productDetail?id=' + this.data.params.id
      }
    }
    
})
