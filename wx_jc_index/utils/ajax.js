const Ajax=function(obj){
    const url=obj.url||'';
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