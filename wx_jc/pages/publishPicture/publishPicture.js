var app = getApp()
import { Ajax } from './../../utils/ajax'
// import { Config } from './../../config/config.js'

Page({
  data: {
    Config:{},
    categoryList: [],
    categoryId:'',
    addPictureBtnShow:true,
    categoryValue:'',
    sizeValue:'',
    bindAddressValue: '',
    bindAddressLatitude:'',
    bindAddressLongitude:'',
    picList: [],
    errorMessageStatus: false,
    errorMessage: ''
  },
  onLoad(){
    this.setData({
      Config: {
        hosts: app.globalData.imageUrl
      }
    })
    
    this.getCate()
  },
  bindPickerCategoryChange(e){
    const categoryValue = this.data.categoryList[e.detail.value].cate
    const categoryId = this.data.categoryList[e.detail.value].id
    this.setData({
      categoryValue: categoryValue,
      categoryId: categoryId
    })
  },
  getCate() {
    Ajax({
      url: '/cate',
      method: 'get'
    }).then((res) => {
      if (res.data.code === 0) {
        this.setData({
          'categoryList': res.data.data
        })
      }
    }).catch((error) => {
      console.log(error)
    })
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
        const imgPath = res.tempFilePaths
        // const picArr = [...this.data.picList, ...imgPath];
        const imgSize = this.data.picList.length;
        if(imgSize>3){
          this.setData({
            errorMessage: '图片不能超过四张',
            errorMessageStatus: true
          })
          return
        }else{
          if(imgSize===3){
            this.setData({
              addPictureBtnShow: false
            })
          }
          // this.setData({
          //   picList: picArr
          // })
          this.uploadPicture(imgPath)
        }
        
      }
    })
  },
  uploadPicture(imgPath){
    const uploadUrl = Config.hosts + 'seller/upload';
    const { localSession } = app.globalData;
    const picObj={
      'imgPath': imgPath,
      'id':''
    }
    wx.uploadFile({
      url: uploadUrl,
      filePath: imgPath[0],
      name: 'file',
      header:{
        'sid': Config.publicParams.sid,
        'localSession': localSession
      },
      success:  (res)=> {
        const resData=JSON.parse(res.data);
        if (resData.code==0){
          const { id, relativePath } = resData.data;
          picObj['id'] = id;
          const picList = [...this.data.picList, picObj];
          this.setData({
            'picList': picList
          })
        }else{
          this.errorMessage(res.code)
        }
      },
      fail:(error)=>{
        this.errorMessage(error)
      }
    })
  },
  getAddress() {
    wx.chooseLocation({
      success: (res)=>{
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
    if (!this.showErrorMessage(picValue, '图片不为空')) {
      return
    }


    const { localSession } = app.globalData
    const imgIds = this.data.picList.map((item,value)=>{
      return item.id
    })
    const data = {
      imgIds: imgIds,
      placeLat: this.data.bindAddressLatitude,
      placeLong: this.data.bindAddressLongitude,
      placeName: this.data.sizeValue,
      produceId: this.data.categoryId
    }
    console.log(data)
    Ajax({
      url: '/seller/publish',
      method: 'post',
      header:{
        'localSession': localSession
      },
      data: data 
    }).then((res) => {
      if (res.data.code === 0) {
        this.setData({
          addPictureBtnShow: true,
          categoryValue: '',
          sizeValue: '',
          bindAddressValue: '',
          bindAddressLatitude: '',
          bindAddressLongitude: '',
          picList: [],
          errorMessage: '发布成功',
          errorMessageStatus: true
        })
        setTimeout(() => {
          this.setData({
            errorMessage: '',
            errorMessageStatus: false
          })
          wx.reLaunch({
            url: '../index/index'
          })
        }, 1000)
      }else{
        this.errorMessage(res.data.msg)
      }
    }).catch((error) => {
      this.errorMessage(error)
    })
    
  },
  errorMessage(msg){
    this.setData({
      errorMessage: msg,
      errorMessageStatus: true
    })
    setTimeout(() => {
      this.setData({
        errorMessage: '',
        errorMessageStatus: false
      })
    }, 1000)
  }
})
