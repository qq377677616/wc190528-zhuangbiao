// pages/vipPages/vipIndex.js
const app = getApp();
const http = require('../../utils/wxhttp.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isOther: false,
        morebtn: '查看更多',
        imgs: ['http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_10.png',
            'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_11.png'],
        freeimg: false,
        showPrice: false,
        activeMy:0,
        vipMoney:[10,28,98],
        viptxt:[
               '月会员',
               '季度会员',
               '年会员'
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let is_vip = wx.getStorageSync('is_vip');
      if (is_vip==0){
           this.setData({freeimg:false})
      }else{
           this.setData({ freeimg: true })
      }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    pay() {
    //    支付
        let openid = wx.getStorageSync('openid');
        let uid = wx.getStorageSync('uid')
        console.log(openid)
        http.Post('good/pay',{
            openid:openid,
            order_id:'',
            order_price:this.data.activeMy*100,
            uid:uid
        },'post').then(res=>{
          console.log(res)
            let data = JSON.parse(res.data.data);
            wx.requestPayment({
                timeStamp: data.timeStamp,
                nonceStr: data.nonceStr,
                package: data.package,
                signType: data.signType,
                paySign: data.paySign,
                success(res) {
                    wx.showToast({
                        title:'支付成功',
                        icon:'success',
                        duration:2000
                    })
                    wx.navigateTo({
                      url: '/pages/index/index',
                    })
                },
                fail(res) {
                    wx.showToast({
                        title:'取消支付',
                        icon:'none',
                        duration:2000
                    })
                }
            })
        })
    },
    lookmore() {
        this.setData({
            isOther: !this.data.isOther
        })
        if (this.data.isOther) {
            this.setData({
                morebtn: '收起'
            })
        } else {
            this.setData({
                morebtn: '查看更多'
            })
        }
    },
    freebtn(e) {
        console.log(e)
        let type = e.currentTarget.dataset.type;
        if (type == 'free') {
            this.setData({
                freeimg: false,
                imgs: [
                    'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_10.png',
                    'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_11.png'
                ]
            })
        } else {
            this.setData({
                freeimg: true,
                imgs: [
                    'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_18.png',
                    'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_17.png'
                ]
            })
        }
    },
    closePay() {
        this.setData({
            showPrice: false
        })
    },
    selectPrice(e) {
        console.log(e.currentTarget.dataset.money);
        this.setData({
            showPrice: true,
            activeMy:e.currentTarget.dataset.money
        })
    },
  headerBack: function (e) {
    var pageNum = getCurrentPages().length
    if (e.detail.type === -1) {//返回到上一页
      wx.navigateBack({
        delta: 1
      })
    } else if (e.detail === 0) {//返回到首页
      wx.navigateBack({
        delta: pageNum
      })
    }
  }
})