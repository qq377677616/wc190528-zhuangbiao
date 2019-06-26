// component/my_header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '自定义标题'
    },
    btnIcon: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: '',
    titleHeight: ''
  },
  ready: function () {
    var _self = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        //_this.globalData.rpxR = 750 / res.windowWidth;
        //_this.globalData.statusBarHeight = res.statusBarHeight * _this.globalData.rpxR - 2;
        var _system = res.system
        var _statusBarHeight = res.statusBarHeight
        if (res.system.indexOf("iOS") != -1) {
          var _titleHeight = 40
        } else if (res.system.indexOf("Android") != -1) {
          var _titleHeight = 48
        }
        console.log("手机型号" + res.model)
        console.log("操作系统" + res.system)
        console.log("状态栏的高度" + res.statusBarHeight)
        console.log("---------------------------------")
        console.log("紫色部分" + _statusBarHeight)
        console.log("蓝色部分" + _titleHeight)
        wx.setStorageSync('_statusBarHeight', _statusBarHeight);
        wx.setStorageSync('_titleHeight', _titleHeight);
        _self.setData({
          statusBarHeight: _statusBarHeight,
          titleHeight: _titleHeight
        })
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back_one: function(e){
      this.triggerEvent("headerBack", {type: -1})
    },
    back_home: function (e) {
      this.triggerEvent("headerBack", { type: 0 })
    }
  }
})
