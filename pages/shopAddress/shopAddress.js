// pages/shopAddress/shopAddress.js
const https = require('../../utils/wxhttp.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      user_id:'',
      addressList:'',
      selectId:'',
      type:'',
      addLength:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //  console.log(options) 
   this.setData({
     user_id: wx.getStorageSync('uid'),
     type:options.type
   })
    this.getAddress();
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
  onShareAppMessage: function(){

  },
  setDefault(e){
    console.log(e.currentTarget.dataset.addid);
    let dat = {
      id: e.currentTarget.dataset.addid,
      uid:this.data.user_id,
      default:1
    }
    https.Post('index/default_shopping_address',dat,'post').then((res)=>{
         if(res.data.msg == '修改成功'){
           this.getAddress();
           wx.showToast({
             icon:'none',
             title: '设置成功'
           })  
         }
           
    })
    //  console.log('设置默认') 
  },
  newAddress(){
     wx.navigateTo({
       url: '/pages/shopAddress/newAddress',
     })
  },
  getAddress(){
    let dat = {
       uid:this.data.user_id
    }
    https.Post('index/shipping_address',dat,'post').then((res)=>{
         this.setData({
           addressList:res.data.data,
           addLength:res.data.data.length
         })
    })
  },
  delAddress(e){ 
      let that = this;
      wx.showModal({
        title: '删除',
        content: '确定要删除该地址吗?',
        success(res){
           let dat = {
             id: e.currentTarget.dataset.addid
           }
           if(res.confirm){
             https.Post('index/del_shopping_address',dat,'post').then((res)=>{
                 if(res.data.msg == '删除成功'){
                   that.getAddress();
                   wx.showToast({
                     icon:'none',
                     title: '删除成功',
                   })
                 }
             })
           }
        }
      })
  },
  ediAddress(e){
     wx.navigateTo({
       url: './editAddress?addid=' + e.currentTarget.dataset.addid + '&def=' + e.currentTarget.dataset.default,
     })
  },
  selectAddress(e){
    if(this.data.type!="center"){
      this.setData({
        selectId: e.currentTarget.dataset.addid
      })
    }
    //  console.log(e.currentTarget.dataset.addid)
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