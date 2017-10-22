
Page({
  data: {
    categoryValue:'',
    sizeValue:'',
    bindAddressValue: '',
    picList: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    ],
    errorMessageStatus: false,
    errorMessage: ''
  },
  deletePictureTap(e){
    const index=e.target.dataset.index;
    this.data.picList.splice(index,1);
    this.setData({
      picList:this.data.picList
    })
  },
  addPictureTap(){
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success:(res)=>{
        console.log(res)
        const imgPath = res.tempFilePaths
        const picArr = [...this.data.picList, ...imgPath];
        this.setData({
          picList: picArr
        })
      }
    })
  },
  getAddress() {
    wx.chooseLocation({
      success: (res)=>{
        console.log(res.address)
        this.setData({
          bindAddressValue:res.address
        });
      }
    })
  },
  showErrorMessage(value, text) {
    if (value === '') {
      this.setData({
        errorMessage: text,
        errorMessageStatus: true
      })
      setTimeout(() => {
        this.setData({
          errorMessageStatus: false
        })
      }, 1000)
      return false
    }
    return true
  },
  bindCategoryInput(e){
    this.setData({
      categoryValue: e.detail.value
    })
  },
  bindSizeInput(e){
    this.setData({
      sizeValue: e.detail.value
    })
  },
  publishSubmitTap() {
    const categoryValue = this.data.categoryValue,
          sizeValue = this.data.sizeValue,
          addressValue = this.data.bindAddressValue;

    let picValue = this.data.picList;
    if (picValue.length<=0){
        picValue=''
    }
    if (!this.showErrorMessage(categoryValue, '产品分类为空')) {
      return
    }
    if (!this.showErrorMessage(sizeValue, '产品型号为空')) {
      return
    }
    if (!this.showErrorMessage(addressValue, '施工地址为空')) {
      return
    }
    if (!this.showErrorMessage(picValue, '施工地址为空')) {
      return
    }
    
  }
})
