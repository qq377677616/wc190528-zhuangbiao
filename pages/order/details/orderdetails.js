// pages/order/details/orderdetails.js
const https = require('../../../utils/wxhttp.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
       order_id:'',
       orderDel:'',
       usename:'',
       usephone:'',
       useaddress:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
         this.setData({
              order_id:options.order
         })
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
    this.getDetail()
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
  getDetail(){
      let dat = {
            order_id:this.data.order_id
      }
       https.Post('good/order_info_one',dat,'post').then((res)=>{
            // console.log(res)
        //  res.data.data.address_name = res.data.data.address_name
        
         this.setData({ orderDel:res.data.data,
           usename: res.data.data.address_name.split('$')[0],
           usephone: res.data.data.address_name.split('$')[1],
           useaddress: res.data.data.address_name.split('$')[2]
                                })
       });
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
  },
  payMoney(){
    // console.log(66)
    let dat ={
      openid: wx.getStorageSync('openid'),
      order_id: this.data.orderDel.order_id
    }
    https.Post('good/pay',dat,'post').then((res)=>{
        console.log(res);
        this.requestPay(res.data);
    })
  },
  requestPay(data){
    let res = JSON.parse(data.data);
    console.log(res);
      wx.requestPayment({
        timeStamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: res.package,
        signType: res.signType,
        paySign: res.paySign,
        success(res) { 
            console.log('支付成功');
            console.log(res);
            wx.navigateTo({
              url: '/pages/Pay/succeed/succeed',
            })
        },
        fail(res) { 
            console.log(res);
        }
      })
  }
})