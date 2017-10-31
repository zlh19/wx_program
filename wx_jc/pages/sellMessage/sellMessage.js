var app = getApp()
import { Ajax } from './../../utils/ajax'

Page({
    data: {
        messageListData:[{
        	id:0,
        	userName:'余先生',
        	userTel:'15889878909',
        	userTimer:'2017.9.1',
        	goodsText:'购买意向:  实木001',
        	goodsName:'合景天峻12-603'
        },{
        	id:1,
        	userName:'余先生',
        	userTel:'15889878909',
        	userTimer:'2017.9.1',
        	goodsText:'购买意向:  实木001',
        	goodsName:'合景天峻12-603'
        }]
    },
    onLoad(){
      this.getMessageInfor()
    },
    getMessageInfor(){
      Ajax({
        url: '/seller/reserves',
        method: 'get',
        data: {
          localSession:'111',
          pn:1,
          ps:10
        }
      }).then((res) => {
        if (res.data.code === 0) {
          const resData = res.data.data;
          this.setData({
            messageListData:resData
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    
})
