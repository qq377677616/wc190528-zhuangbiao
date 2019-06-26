var timer = '';
const http = require('../../utils/wxhttp.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        time: 300,//秒数
        isshow: false,
        phone: '',//电话
        code: '',//验证码
        isWhole: false,
      _statusBarHeight: wx.getStorageSync('_statusBarHeight'),
      _titleHeight: wx.getStorageSync('_titleHeight')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(wx.getStorageSync('phone'));
        let isReady = wx.getStorageSync('isready');
        let isPrivacy = wx.getStorageSync('isprivacy');
        this.setData({
            phone: wx.getStorageSync('phone')
        })
        if (isReady && isPrivacy) {
            this.setData({
                isWhole: true,

            })
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
    getcode() {//获取验证逻辑
        let that = this;
      if (this.data.isWhole){
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
                  http.Post('index/send_sms', dat, 'post').then((res) => {
                    console.log(res);
                  })
                  that.setData({
                    isshow: true,
                    time: 300
                  })
                  timer = setInterval(function () {
                    that.run();
                  }, 1000)
                }
      }else{
                wx.showToast({
                  icon:'none',
                  title: '请先阅读孵画器服务协议和隐私条款!',
                })
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
        let type = e.currentTarget.dataset.type;
        if (type == 'phone') {
            this.setData({
                phone: e.detail.value
            })
        } else {
            this.setData({
                code: e.detail.value
            })
        }

    },
    checkPhone(phone) {//验证手机号
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
            wx.showToast({
                icon: "none",
                title: "请正确输入手机号!"
            })
            return false;
        } else {
            console.log('成功');
            return true;
        }
    },
    goLogin() {
        this.checkPhone(this.data.phone);
        let dat = {
            phone: this.data.phone,
            verify_code: this.data.code,
            openid: wx.getStorageSync('openid')
        };
        if (this.checkPhone(this.data.phone)) {
            if (this.data.code != '') {
                http.Post('index/login', dat, 'post').then((res) => {
                    // console.log(res);
                    wx.showToast({
                      icon:'none',
                      title: res.data.msg,
                    })
                    if(res.data.msg=='登录成功'){
                    wx.setStorageSync('mycode','yls')
                    wx.setStorageSync('phone',this.data.phone);
                    wx.reLaunch({
                           url: '/pages/index/index',
                         })
                    }
                })
            } else {
                wx.showToast({
                    icon: 'none',
                    title: '请输入验证码',
                })
            }
        }
    },
    goReady() {
        if (!this.data.isWhole) {
            wx.navigateTo({
                url: '/pages/agreement/agreement',
            })
        }
    }
})
