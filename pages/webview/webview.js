// pages/webview/webview.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //前端的h5链接地址
    h5Url: 'https://gameh5.flyh5.cn/resources/game/zx_game/2019/06/zb_tp/main.html'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
    let _userInfo = wx.getStorageSync('userInfo')
    let _open_session = wx.getStorageSync("openid")

    //let _userInfo = app.globalData.userInfo
    //let _open_session = app.globalData.open_session

    //_userInfo.openid = _open_session.openid
    //console.log("【从本地缓存中获取的用户信息:】")
    //console.log(_userInfo)

    //let _h5Url = this.data.h5Url + '?userInfo=' + JSON.stringify(_userInfo)
	  let _h5Url = this.data.h5Url + '?nickName=' + wx.getStorageSync('nickname') + '&img=' + decodeURIComponent(wx.getStorageSync('imgUrl')) + '&openid=' + _open_session + '&isVip=' + wx.getStorageSync('is_vip') +'&uid='+wx.getStorageSync('uid')
	  console.log(_h5Url)
    this.setData({
      h5Url: _h5Url
    })
    
  },
  bindmessage(e) {
    console.log(e.detail)
    this.setData({
      shareContent: e.detail
    })
    console.log("【从h5传到小程序的内容：】")
    console.log(this.data.shareContent.data[0])
    let _h5Url = this.data.h5Url + '#ShareOk'
    this.setData({
      h5Url: _h5Url
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) { //转发后执行 
    return this.data.shareContent.data[0]
  }
  // ,
  //  headerBack: function (e) {
  //   var pageNum = getCurrentPages().length
  //   if (e.detail.type === -1) {//返回到上一页
  //     wx.navigateBack({
  //       delta: 1
  //     })
  //   } else if (e.detail === 0) {//返回到首页
  //     wx.navigateBack({
  //       delta: pageNum
  //     })
  //   }
  // }
})