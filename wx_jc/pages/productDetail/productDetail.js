var app = getApp()
import { Ajax } from './../../utils/ajax'
Page({
    data: {
      params:{},
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_143912755726.jpg'
      ],
      indicatorDotsColor: '#F3F3F3',
      indicatorDotsActiveColor: '#F7AB00',
      indicatorDots: true,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      dialogShow:true,
      errorMessageStatus:false,
      errorMessage:'',
      buyList: [{
        title: 'asdf',
        time: '2017.8.10',
        imgs: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg']
      }, {
        title: 'asdf',
        time: '2017.8.10',
        imgs: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg']
      }],
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
    onLoad(){
      this.getUrlParams()
      this.getDetailInfor(this.data.params.id)
    },
    getUrlParams(){
      const urlParam = getCurrentPages()[1].options
      this.setData({
        params: urlParam
      })
    },
    getDetailInfor(id){
        Ajax({
          url: '/produce/' + id,
          method: 'get',
          data: {
            cateId: id
          }
        }).then((res) => {
          if (res.data.code === 0) {
            const resData=res.data.data;
            this.setData({
              imgUrls: resData.imgs,
              turnover: resData.turnover,
              intro:resData.intro
            })
          }
        }).catch((error) => {
          console.log(error)
        })
    },
    submitTap(){
      this.setData({
        dialogShow:false
      })
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
    }
    
})
