
let Config={
  "hosts":"https://api.hzyistar.com/",
  "imgHosts":"https://img.hzyistar.com/",
  "publicParams":{
    "sid":1,
    "localSession":4444
  },
  "shareData":{
    "index": {
      title: '微信小程序',
      desc: '最具人气的小程序',
      path: '/pages/index/index'
    },
    "activityDetail": {
      title: '微信小程序',
      desc: '最具人气的小程序',
      path: '/pages/activityDetail / activityDetail ? id= '
    }
  }
}

// 分享
const setShareData=(sharePage,pathParam='')=>{
  Config['shareData'][sharePage]['path'] = Config['shareData'][sharePage]['path']+pathParam
  return Config['shareData'][sharePage]
}

export{
  Config,
  setShareData
}