import {Config} from '../config/config.js'

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
              resolve(res)
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