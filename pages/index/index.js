//index.js
//获取应用实例
const app = getApp();
const mta = require('../../utils/mta_analysis.js');
const http = require('../../utils/wxhttp.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    leftmenu: false,
    ifleftmenu: false,//左边滑动
    code:'',
    t_img:'https://game.flyh5.cn/resources/game/sy_upload/sy_zbxcx/header_img/15615165845d12da2824902.png',//头像
    nickname:'孵画小子',
    viplog:'登录孵画器',
    is_vip:0,
    showModal: {
      isShow: false,
      title: "微信手机号授权",
      test: "为了更好的体验，请先授权登录",
      cancelText: "取消",
      confirmText: "授权",
      color_confirm: '#2EB3A4',
      pb_audio:"",
    },
   loginModal: {
      isShow:false,
      title: "微信登录授权",
      test: "为了更好的体验，请先授权登录",
      cancelText: "取消",
      confirmText: "授权",
      color_confirm: '#2EB3A4',
      pb_audio: "",
    },
    encryptedData:'',
    iv:'',
    listtxt:[
      {num:1,txt:'更换画芯'},
      {num:2,txt:'更换卡纸'},
      { num:3,txt:'更换画框'},
      { num:4,txt:'更换背景'}
    ],
    mycode:wx.getStorageSync('mycode'),
    listImg:[
      'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_19.png',
      'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_20.png',
      'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_21.png',
      'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_22.png',
      '#fff','#7ECDF4','#009A44',
      'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_23.png',
      'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_24.png',
      'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_25.png',
      'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_28.png',
      'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_27.png',
      'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_26.png'
    ],
    borImg:'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_19.png',
    borImg2:'#fff',
    borImg3: 'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_23.png',
    borImg4:'http://game.flyh5.cn/resources/game/wechat/file/zbtool/zbtool_25.png',
    cardNum:1,
    cardTxt:'更换画芯',
    checkPhone:'',
  },
  setImage(){
    if (!this.checkLogin()){
         return false; 
    }
    wx.chooseImage({
      count:1,success(res) {
        const tempFilePaths = res.tempFilePaths[0]
        wx.uploadFile({
          url:'https://game.flyh5.cn/game/wx7c3ed56f7f792d84/sy_zbxcx/public/api/index/img_upload_H5',
          filePath:tempFilePaths,
          name:'file',
          success(res) {
            console.log(res)
            let imgUrl = JSON.parse(res.data);
            imgUrl = JSON.stringify(imgUrl.data);
            wx.setStorageSync('imgUrl',imgUrl);
            wx.navigateTo({
              url:'/pages/webview/webview'
            })
          }
        })
        // http.Post('index/img_upload_base64',{file:res.tempFilePaths[0]},'post').then(res=>{
        //   console.log(res)
        // })
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  _getUserInfo(){
  //  获取会员信息
    let  name = '';
    let img = ''; 
    http.Post('index/get_user_info',{phone:wx.getStorageSync('phone')},'post').then((res)=>{
      // console.log(res)
      name = !res.data.data.nickname ? wx.getStorageSync('wechartName') : res.data.data.nickname;
      img = !res.data.data.header_img ? wx.getStorageSync('wechartImg') : res.data.data.header_img;
              this.setData({
                t_img: img ,
                nickname: name
              })
      if (res.data.data.is_vip==0&&this.data.mycode!=''){
          this.setData({
               viplog:'普通用户',
               is_vip: res.data.data.is_vip
          })
      } else if (res.data.data.is_vip == 1 && this.data.mycode != ''){
        this.setData({
              viplog: 'vip用户',
              is_vip: res.data.data.is_vip
        })
      }else{
        this.setData({
          viplog: '登录孵画器',
          is_vip: res.data.data.is_vip
        })
      }
      wx.setStorageSync('is_vip',res.data.data.is_vip);
      wx.setStorageSync('nickname',res.data.data.nickname);
      wx.setStorageSync('uid', res.data.data.id);
      wx.setStorageSync('header_img', res.data.data.header_img);
      wx.setStorageSync('vip_time',res.data.data.vip_time);
    })
  },
  onShow:function(){
    this._getUserInfo();
  },
  onLoad: function () {
    // 创建播放器
    const innerAudioContext = wx.createInnerAudioContext()
    this.setData({ pb_audio: innerAudioContext})
    this.setData({mycode:wx.getStorageSync('mycode')})
    this.bindPlay()//默认播放

    http.changeBorder(this, this.data.listImg, 1, this.data.listtxt);//首页轮播

    let _showModal = this.data.loginModal
    if (!wx.getStorageSync('wechartName') || wx.getStorageSync('wechartName')==null){//判断是否登录授权，获取微信头像
              _showModal.isShow = true;
              this.setData({
                loginModal: _showModal
              })
    }
    mta.Page.init()//腾讯统计

    this.getstroage((res)=>{
       console.log(res);
      this.setData({ checkPhone:res.data})
    })
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  moreStatus:function(e) {
    const $this = this;
    console.log(e.currentTarget.dataset.n)
    if (e.currentTarget.dataset.n == 1 && this.data.leftmenu){
       this.setData({ leftmenu: true, ifleftmenu:true });
       // $this.setData({ ifleftmenu: true });
       return ;
    }
   
    if ($this.data.leftmenu){
      $this.setData({ leftmenu: false });
      setTimeout(function () {
        $this.setData({ ifleftmenu: false });
      }, 650)
      return;
    }
    $this.setData({ leftmenu: true });
    $this.setData({ ifleftmenu: true });
    return; 
  },
  wxlogin: function () {//获取用户的openID和sessionKey
    console.log('hello')
    var that = this;
    wx.login({
      success: (res) => {
        console.log(res);
        that.setData({
          code:res.code
        })
        // this.getoppenId();
       }
      })
  },
  operation(e) {
    console.log(e);
    let that = this;
    let loginStatus = e.detail.even.detail.errMsg;
    let _showModal = this.data.showModal;
    let dat = {
      code:this.data.code,
      ency:'',
      iv:''
    }
    _showModal.isShow = false;
    this.setData({ showModal: _showModal });
    if (loginStatus && loginStatus === "getPhoneNumber:ok"){
        console.log('同意授权')
        this.setData({
          encryptedData: e.detail.even.detail.encryptedData,
          iv: e.detail.even.detail.iv
        })
        dat.ency = this.data.encryptedData;
        dat.iv = this.data.iv;
        // console.log(dat);
        that.getphoto(dat);
    }else{
      http.Post('index/get_openid',{code:this.data.code},'post').then((res)=>{  
             wx.setStorageSync('openid',res.data.data.openid)
      })
      wx.navigateTo({
          url: '/pages/login/login',
        })
    }
  }, 
  cancelBtn(e){
      let that = this;
      let _showModal = this.data.loginModal
      _showModal.isShow = false
      this.setData({
        loginModal: _showModal
      })
    if (!this.data.checkPhone) {
      let time = setTimeout(()=>{
          clearTimeout(time);
          this.wxlogin();
          let _showModal = this.data.showModal;
          _showModal.isShow = true;
          this.setData({ showModal: _showModal });
      },500)
    }
  },
  getphoto(dat){
    console.log(dat);
    http.Post('index/decrypt_data',dat,'post').then((res)=>{
      //  wx.setStorage({
      //    key: 'phone',
      //    data: res.data.data.phone,
      //  })
      wx.setStorageSync('phone', res.data.data.phone);
      wx.setStorageSync('openid',res.data.data.openid);
      // wx.setStorage({
      //   key: 'openid',
      //   data: res.data.data.openid,
      // })
      this._getUserInfo();
      wx.setStorageSync('mycode','yls');
      this.setData({mycode:'yls'})
      // wx.setStorage({
      //   key: 'u_id',
      //   data: 1,
      // })
      // wx.reLaunch({
      //   url: '/pages/login/login',
      // })
    })
  },
  getstroage(callback){
    wx.getStorage({
      key: 'phone',
      success(res) {
         callback(res);
      },
      fail(err){
         callback(err)
      }
    })
  },
  secander(){
   console.log(111)
  },
  goVip(){//跳转至vip
    if (!this.checkLogin()) {
      return false;
    }
    if(wx.getStorageSync('is_vip')==0){
          wx.navigateTo({
            url: '/pages/vipPages/vipIndex',
          })
    }else{
      wx.navigateTo({
        url: '/pages/Myvip/myVip',
      })
    }
    
  },
  goFeed(){//跳转至反馈页面
     wx.navigateTo({
       url: '/pages/feedback/feedback',
     })
  },
  goAbout(){
      wx.navigateTo({
        url: '/pages/about/about',
      })
  },
  goOrderlist(){
    if (!this.checkLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '/pages/order/orderlist/orderlist',
    })
  },
  goPerson(){
    if(!this.checkLogin()){
       return false;
    }
     wx.navigateTo({
       url: '/pages/personInfo/personinfo',
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
  },
  notOpen(){
      wx.showToast({
        icon:'none',
        title: '该功能尚未开放!'
      })
  },
  checkLogin(){
         console.log(wx.getStorageSync('mycode'))
        if (this.data.mycode == '') {
              wx.showToast({
                icon:'none',
                title: '请登录孵画器',
              })
              return false;
        }else{
              return true;
        }
  },
   goLogin(){
         wx.navigateTo({
           url: '/pages/login/login',
         })
   },
    bindPlay() {
      this.data.pb_audio.autoplay = true
      this.data.pb_audio.src = 'http://sc1.111ttt.cn:8282/2018/1/03m/13/396131226156.m4a?tflag=1546606800&pin=97bb2268ae26c20fe093fd5b0f04be80#.mp3';
      this.data.pb_audio.loop = true;
      this.data.pb_audio.onPlay(() => {
        console.log('开始播放')
      })
    },
  bindPause() {
    this.ctx.pause({
      success: res => {
        console.log('pause success')
      },
      fail: res => {
        console.log('pause fail')
      }
    })
  }
})
