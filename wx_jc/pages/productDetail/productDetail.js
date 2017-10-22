var app = getApp()
Page({
    data: {
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
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
