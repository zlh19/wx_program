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
      dialogShow:false,
      iptNameValue:'',
      iptTelValue:'',
      iptCodeValue:''
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
        dialogShow:true
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
        wx.showToast({
          title: text,
          icon: 'loading',
          duration: 1500
        })
        return false
      }
      return true
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
        dialogShow:false
      })
    }
    
})
