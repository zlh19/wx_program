import {Config} from '../config/config.js'

const dialogShow=function(){
  wx.showModal({
    title: '提示',
    content: '您的小程序已过期',
    success: (res) => {
      if (res.confirm) {
        dialogShow()
      } else if (res.cancel) {
        dialogShow()
      }
    }
  })
}

const Ajax=function(obj){
    const url = (Config.hosts+obj.url)||'';
    const data=obj.data||{};
    const method=obj.method||'GET';
    const contentType=obj.contentType||'application/json';
    const headerInit={
      'sid': Config.publicParams.sid,
      'content-type': contentType
    }
    const header = Object.assign({}, obj.header, headerInit)
    

    const promiseAjax=new Promise(function(resolve,reject){
        wx.showLoading()
        wx.request({
            url:url, 
            data:data,
            method:method,
            header: header,
            success:(res)=>{
              if(res.data.code==1004){
                dialogShow()
              }else{
                resolve(res)
              }
            },
            fail:(error)=>{
              reject(error)
            },
            complete:()=>{
              wx.hideLoading()
            }
        })
    })
    return promiseAjax
}

module.exports={
  Ajax:Ajax
}