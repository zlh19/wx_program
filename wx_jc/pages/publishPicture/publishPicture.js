var app = getApp()
import { Ajax } from './../../utils/ajax'

Page({
  data: {
    addPictureBtnShow:true,
    categoryValue:'',
    sizeValue:'',
    bindAddressValue: '',
    bindAddressLatitude:'',
    bindAddressLongitude:'',
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
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count: 1,
      success:(res)=>{
        console.log(res)
        const imgPath = res.tempFilePaths
        const picArr = [...this.data.picList, ...imgPath];
        const picArrLength=picArr.length;
        console.log(picArrLength)
        if(picArrLength>4){
          this.setData({
            errorMessage: '图片不能超过四张',
            errorMessageStatus: true
          })
          return
        }else{
          if(picArrLength===4){
            this.setData({
              addPictureBtnShow: false
            })
          }
          this.setData({
            picList: picArr
          })
          this.uploadPicture(imgPath,imgPath)
        }
        
      }
    })
  },
  uploadPicture(imgPath,picName){
    wx.uploadFile({
      url: '/seller/upload',
      filePath: imgPath[0],
      name: 'file',
      header:{
        'content-type':'multipart/form-data'
      },
      formData: {
        'file': picName[0]
      },
      success:  (res)=> {
        console.log(res)
      }
    })
  },
  getAddress() {
    wx.chooseLocation({
      success: (res)=>{
        console.log(res)
        this.setData({
          bindAddressValue:res.address,
          bindAddressLatitude: res.latitude,
          bindAddressLongitude: res.longitude
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

    Ajax({
      url: '/seller/publish',
      method: 'post',
      data: {
        publish: {
          imgIds: [],
          placeLat: this.data.bindAddressLatitude,
          placeLong: this.data.bindAddressLongitude,
          placeName: this.data.categoryValue,
          produceId: this.data.sizeValue
        }
      }
    }).then((res) => {
      if (res.data.code === 0) {
        const resData = res.data.data;
        this.setData({
          addressName: resData.placeName,
          longitude: resData.placeLat,
          latitude: resData.placeLong,
          imgUrls: resData.imgs,
          addressTel: resData.tel
        })
      }
    }).catch((error) => {
      console.log(error)
    })
    
  }
})
