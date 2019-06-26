const http = require('../../utils/wxhttp.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'',//内容
    textSize:0,//长度
    user_id:''
  },
  textInput:function (e){
    if (this.data.text.length>300){
      return false;
    }
    this.setData({ text : e.detail.value})
    this.setData({ textSize : this.data.text.length} );
  },
  updata:function(){
    let dat = {
       uid:this.data.user_id,
      opinion: this.data.text  
    }
    if(this.data.textSize<=0){
      return;
    }else{
      http.Post('index/save_opinion',dat,'post').then((res)=>{
            // console.log(res.data)
        if (res.data.msg == '反馈成功'){
              wx.showToast({
                icon:'none',
                title: '反馈成功'
              })
              this.setData({
                 text:'',
                textSize:0
              })
              wx.reLaunch({
                url: '/pages/index/index'
              })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  console.log(wx.getStorageSync('u_id'));
    this.setData({
      user_id: wx.getStorageSync('uid')
    })
  },
  bankto: function () {
    wx.navigateBack({
      delta: 1
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