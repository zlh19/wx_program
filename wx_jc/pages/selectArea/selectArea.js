var model = require('../../model/model.js')

var show = false;
var item = {};

Page({
  data: {
    province:'',
    city:'',
    county:'',
    addressDetailValue:'',
    errorMessageStatus: false,
    errorMessage: '',
    item: {
      show: show
    }
  },
  //生命周期函数--监听页面初次渲染完成
  onReady (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },
  //点击选择城市按钮显示picker-view
  translate (e) {
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView (e) {
    model.animationEvents(this, 200, false, 400);
  },
  //滑动事件
  bindChange (e) {
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name
    });
  },
  onReachBottom() {
  },
  nono() { },
  bindAddressDetailInput(e){
    this.setData({
      addressDetailValue: e.detail.value
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
  submitSave(){
    const province = this.data.province,
      city = this.data.city,
      county = this.data.county,
      addressDetailValue = this.data.addressDetailValue;
    if (!this.showErrorMessage(province, '省份不能为空')) {
      return
    }
    if (!this.showErrorMessage(city, '市不能为空')) {
      return
    }
    if (!this.showErrorMessage(county, '区不能为空')) {
      return
    }
    if (!this.showErrorMessage(addressDetailValue, '详细地址不能为空')) {
      return
    }
  }
})
