import {Config} from '../config/config.js'

const Ajax=function(obj){
  const url = (Config.hosts+obj.url)||'';
    const data=obj.data||{};
    const method=obj.method||'GET';
    const contentType=obj.contentType||'application/json';

    const promiseAjax=new Promise(function(resolve,reject){
        wx.showLoading()
        wx.request({
            url:url, 
            data:data,
            method:method,
            header: {
               'sid': Config.publicParams.sid,
               'content-type':contentType
            },
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