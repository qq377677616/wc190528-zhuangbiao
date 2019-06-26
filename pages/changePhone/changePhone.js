// pages/changePhone/changePhone.js
const http = require('../../utils/wxhttp.js');
var timer = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    currPhone: wx.getStorageSync("phone"),
    time:60,
    isshow: false,
    code: '',//验证码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.currPhone);
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
  getcode() {//获取验证逻辑
    let that = this;
    let dat = {
      phone: that.data.phone
    }
    if (!this.checkPhone(that.data.phone)) {
      wx.showToast({
        title: '请输入正确手机号!',
        icon: 'none',
        duration: 1500
      })
    } else {
      if(this.data.currPhone!=this.data.phone){
            http.Post('index/send_sms', dat, 'post').then((res) => {
              console.log(res);
            })
              that.setData({
                isshow: true,
                time: 60
              })
              timer = setInterval(function () {
                that.run();
              }, 1000)
      }else{
            wx.showToast({
              icon:'none',
              title: '请输入其他手机号!',
            }) 
      }
    }
  },
  run() {
    let that = this;
    if (that.data.time > 0) {
      that.setData({
        time: --that.data.time
      })
    } else {
      clearInterval(timer);
      that.setData({
        isshow: false
      })
    }
  },
  getvalue(e) {
    console.log(e.detail.value)
    let type = e.currentTarget.dataset.type;
    if (type == 'phone') {
      this.setData({
        phone: e.detail.value
      })
    } else {
      console.log(e.detail.value)
      this.setData({
        code: e.detail.value
      })
    }

  },
  checkPhone(phone) {//验证手机号
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
      console.log("手机号码有误，请重填");
      return false;
    } else {
      console.log('成功');
      return true;
    }
  },
  bindIphone(){
      let dat = {
           phone:this.data.phone,
           openid:wx.getStorageSync('openid'),
           verify_code: this.data.code
      }
    http.Post('index/login',dat,'post').then((res)=>{
        //  console.log(res.data);
      if (res.data.msg =="登录成功"){
             wx.setStorageSync('phone', this.data.phone);
             wx.showToast({
               icon:'none',
               title: '换绑成功!'
             })
             wx.navigateTo({
               url: '/pages/personInfo/personinfo',
             }) 
      }else{
          wx.showToast({
            icon: 'none',
            title: '换绑失败!'
          })
      }
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