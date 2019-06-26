const https = require('../../utils/wxhttp.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    areaTxt: '',
    collman: '',
    txtLen: 0,
    region: ['广东省', '广州市', '海珠区'],
    flag: false,
    iptcheck: '',
    user_id: '',
    ad_id:'',
    def:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      user_id: wx.getStorageSync("uid"),
      ad_id:options.addid,
      def:options.def
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
    this.getAddress();
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
  getvalue(e) {
    this.setData({
      phone: e.detail.value
    })
    if (this.checkInput()) {
      this.setData({
        iptcheck: true
      })
    } else {
      this.setData({
        iptcheck: false
      })
    }
  },
  getContain(e) {
    // console.log(e);
    this.setData({
      areaTxt: e.detail.value,
      txtLen: e.detail.value.length
    })
    if (this.checkInput()) {
      this.setData({
        iptcheck: true
      })
    } else {
      this.setData({
        iptcheck: false
      })
    }
  },
  searverAddress() {
    let that = this;
    let ipt1 = this.data.collman;
    let ipt2 = this.data.phone;
    let ipt3 = this.data.region.toString().split(',');
    let ipt4 = this.data.areaTxt;
    console.log(ipt3);
    if (this.checkInput()) {
      let dat = {
        id:this.data.ad_id,
        uid: this.data.user_id,
        recipient: ipt1,
        phone: ipt2,
        province: ipt3[0],
        city: ipt3[1],
        region: ipt3[2],
        detailed_address: ipt4,
        default: that.data.def
      }
      https.Post('index/edit_shopping_address', dat, 'post').then((res) => {
        //  console.log(res);
        if (res.data.msg == '修改成功') {
          wx.showToast({
            icon: 'none',
            title: '修改成功',
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请您正确填写信息！',
      })
    }
  },
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value.toString())
    let dat = {
      province: e.detail.value[0],
      city: e.detail.value[1],
      region: e.detail.value[2]
    }
    this.setData({
      region: e.detail.value.toString()
    })
    // console.log(this.data.region);
  },
  getName(e) {
    // console.log(this.checkInput())
    this.setData({
      collman: e.detail.value
    })
    if (this.checkInput()) {
      this.setData({
        iptcheck: true
      })
    } else {
      this.setData({
        iptcheck: false
      })
    }
  },
  checkInput() {
    let name = '', phone = '', areatxt = '';
    name = this.data.collman;
    phone = this.data.phone;
    areatxt = this.data.areaTxt;
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
      this.setData({ flag: false });
    } else {
      this.setData({
        flag: true
      })
    }
    if (name != '' && phone != '' && areatxt != '' && this.data.flag) {
      return true;
    } else {
      return false;
    }
  },
  getAddress(){
    let that = this;
    let dat = { 
      id:this.data.ad_id,
      uid: this.data.user_id
    }
    https.Post('index/shipping_address_one',dat,'post').then((res)=>{
         that.setData({
              addressdel:res.data.data,
              iptcheck:true,
              collman: res.data.data.recipient,
              areaTxt: res.data.data.detailed_address,
              txtLen: res.data.data.detailed_address.length,
              phone: res.data.data.phone,
             region: res.data.data.province + ',' + res.data.data.city + ',' + res.data.data.region
         })
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