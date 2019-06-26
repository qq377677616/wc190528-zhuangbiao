// pages/orderlist/orderlist.js
const http = require('../../../utils/wxhttp.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderList: [],
        noorder:false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOrderList()
    },
    bankto(){
      wx.navigateBack()
    },
    getOrderList() {
        //获取订单列表
        http.Post('good/order_info', {uid: wx.getStorageSync('uid')}, 'Post').then(res => {
            console.log(res.data.data)
          if (res.data.msg =="无数据"){
                this.setData({
                    noorder:true
                })
                wx.showToast({
                  icon:'none',
                  title: '暂无订单',
                })
          }
            let data = res.data.data;
            for (let item of data) {
                item.order_price = this.returnFloat(item.order_price / 100); //处理返回金额的格式
            }
            this.setData({
                orderList: data
            })
        })
    },
    returnFloat(val) {
        //金额格式转换
        let value = Math.round(parseFloat(val) * 100) / 100;
        let xsd = value.toString().split(".");
        if (xsd.length === 1) {
            value = value.toString() + ".00";
            return value;
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                value = value.toString() + "0";
            }
            return value;
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
    goDetail(e) {//跳转至详情
      //  console.log(e);
        wx.navigateTo({
            url: '/pages/order/details/orderdetails?order='+e.currentTarget.dataset.order,
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