var app = getApp()
import { Ajax } from './../../utils/ajax'
import { Config, setShareData } from './../../config/config'
import { formatTime } from './../../utils/util.js'
Page({
    data: {
      localSession:'',
      Config: Config,
      //url参数
      params:{},
      imgUrls: [],
      turnover:'',
      intro:'',
      indicatorDotsColor: '#F3F3F3',
      indicatorDotsActiveColor: '#F7AB00',
      indicatorDots: true,
      autoplay: false,
      interval: 5000,
      duration: 500,
      dialogShow:true,
      errorMessageStatus:false,
      errorMessage:'',
      detailOptions: {
        cateId: ''
      },
      buyShowOptions: {
        pn: 1,
        ps: 10
      },
      buyList: [],
      buyResponseData:{},
      iptNameValue:'',
      iptTelValue:'',
      iptCodeValue:'',
      btnCodeDisabled:'',
      btnCodeText:'获取验证码',
      initTime:60,
      totalTime:60,
      
    },
    tapBanner(e) {
      const currentPicture = e.currentTarget.dataset.picture;
      const pictureList = this.data.imgUrls||[];
      let newPictrueList = pictureList.map((item, index) => {
        return this.data.Config.imgHosts + item
      })
      console.log(newPictrueList, currentPicture)
      wx.previewImage({
        current: currentPicture, // 当前显示图片的http链接
        urls: newPictrueList // 需要预览的图片http链接列表
      })
    },
    tapBuyShowPicture(e) {
      const currentPicture = e.currentTarget.dataset.picture;
      let pictureList = [];
      this.data.buyList.map((item,index)=>{
        const hostImgs=item.imgs.map((items,indexs)=>{
          return this.data.Config.imgHosts+items
        });
        pictureList = [...pictureList, ...hostImgs]
      })

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
          // id:12//临时方案
        },
        detailOptions:{
          cateId:option.id
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
        data:this.data.detailOptions
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
        data:this.data.buyShowOptions
      }).then((res) => {
        if (res.data.code === 0) {
          const resData = res.data.data||[];
          resData.map((item, index) => {
            item.createtime = formatTime(new Date(item.createtime))
          })
          this.setData({
            'buyResponseData': res.data,
            'buyList': [...this.data.buyList, ...resData]
            
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
        complete:()=>{
          wx.hideLoading()
        },
        success:(res)=>{
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
                wx.navigateTo({
                  url: '../mineMessage/mineMessage'
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
    // 分享
    onShareAppMessage() {
      const sharePathParam = this.data.params.id
      return setShareData('productDetail', sharePathParam)
    },
    // 滚动至底部
    onReachBottom() {
      const buyLength = this.data.buyList.length;
      const buytotalCount = this.data.buyResposeData.tc;
      if (buyLength < buytotalCount) {
        this.data.buyShowOptions.pn++
        this.getBuyInfor(this.data.params.id)
      }
    }
    
})
