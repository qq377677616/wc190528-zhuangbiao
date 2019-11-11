//index.js
//获取应用实例
const app = getApp();
const mta = require('../../utils/mta_analysis.js');
const http = require('../../utils/wxhttp.js');
const API = require("../../utils/api.js");
const BASEIMG = "http://game.flyh5.cn/resources/game/wechat/file/zbtool/"; 
const handBase = 'https://game.flyh5.cn/resources/game/sy_upload/sy_zbxcx/header_img/'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    leftmenu: false,
    ifleftmenu: false,//左边滑动
    code:'',
    t_img:'15615165845d12da2824902.png',//头像
    nickname:'孵画小子',
    viplog:'登录孵画器',
    is_vip:0,
    encryptedData:'',
    iv:'',
    listtxt:[
      {num:1,txt:'更换画芯'},
      {num:2,txt:'更换卡纸'},
      { num:3,txt:'更换画框'},
      { num:4,txt:'更换背景'}
    ],
    mycode:wx.getStorageSync('mycode'),
	  listImg: [[BASEIMG + 'page2_6.png',
		  BASEIMG + 'page2_7.png',
		  BASEIMG + 'page2_8.png',
		  BASEIMG + 'page2_9.png'],
		  [BASEIMG + 'page1_4_88.png',
		  BASEIMG + 'page1_4_8.png',
		  BASEIMG + 'page1_4_9.png',
		  BASEIMG + 'page1_4_10.png'],
		  [BASEIMG + 'page3_7.png',
		   BASEIMG + 'page3_8.png',
		   BASEIMG + 'page3_9.png',],
		  [BASEIMG + 'page5_jpg.jpg',
		   BASEIMG + 'page5_2.png',
		   BASEIMG + 'page5_6.png',
		   BASEIMG + 'page5_3.png']
    ],
	borImg: BASEIMG +'page2_6.png',
	borImg2: BASEIMG + 'page1_4_88.png',
	borImg3: BASEIMG+'zbtool_23.png',
	borImg4:'',
    cardNum:1,
    cardTxt:'更换画芯',
    checkPhone:'',
	isplay:true
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
	  if(res.data.code==404)return;
		name = res.data.data.nickname ? res.data.data.nickname : wx.getStorageSync("user_info") ? wx.getStorageSync("user_info").nickName:this.data.nickname;
		img = res.data.data.header_img ? res.data.data.header_img : wx.getStorageSync("user_info") ? wx.getStorageSync("user_info").avatarUrl :handBase+this.data.t_img;
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
	  wx.setStorageSync('nickname', name);
      wx.setStorageSync('uid', res.data.data.id);
	  wx.setStorageSync('header_img', img);
      wx.setStorageSync('vip_time',res.data.data.vip_time);
    })
  },
  onShow:function(){
	if (wx.getStorageSync('mycode'))
    this._getUserInfo();
  },
  onLoad: function () {
    // 创建播放器
	API._login().then((res) => {
		wx.setStorageSync("openid", res.data.data.openid);
		app.globalData.openid = res.data.data.openid;
		if (!wx.getStorageSync('phone'))
		this.setData({ 
			userInfo: wx.getStorageSync('user_info')||"",
			t_img: wx.getStorageSync('user_info') ? wx.getStorageSync('user_info').avatarUrl :handBase+this.data.t_img,
			nickname: wx.getStorageSync('user_info') ? wx.getStorageSync('user_info').nickName : this.data.nickname,
		})
	})
	this.setData({ mycode: wx.getStorageSync('mycode') })
    const innerAudioContext = wx.createInnerAudioContext()
    this.setData({ pb_audio: innerAudioContext})
	this.data.pb_audio.autoplay = true
	  this.data.pb_audio.src = `${BASEIMG}zb_mic.mp3`;
	this.data.pb_audio.loop = true;
    this.bindPlay()//默认播放

    http.changeBorder(this, this.data.listImg[0], 1, this.data.listtxt);//首页轮播
    mta.Page.init()//腾讯统计

    // this.getstroage((res)=>{
    //    console.log(res);
    //   this.setData({ checkPhone:res.data})
    // })
    
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
	  console.log(666)
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
	wx.setStorageSync("user_info",e.detail.userInfo);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
	  t_img: e.detail.userInfo.avatarUrl, 
		nickname: e.detail.userInfo.nickName
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
//   getphoto(dat){
//     console.log(dat);
//     http.Post('index/decrypt_data',dat,'post').then((res)=>{
//       //  wx.setStorage({
//       //    key: 'phone',
//       //    data: res.data.data.phone,
//       //  })
//       wx.setStorageSync('phone', res.data.data.phone);
//       wx.setStorageSync('openid',res.data.data.openid);
//       // wx.setStorage({
//       //   key: 'openid',
//       //   data: res.data.data.openid,
//       // })
//       this._getUserInfo();
//       wx.setStorageSync('mycode','yls');
//       this.setData({mycode:'yls'})
//       // wx.setStorage({
//       //   key: 'u_id',
//       //   data: 1,
//       // })
//       // wx.reLaunch({
//       //   url: '/pages/login/login',
//       // })
//     })
//   },
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
     if(!this.data.userInfo)
	 return;
	 if(!wx.getStorageSync('mycode')){
		 wx.navigateTo({
			 url: '/pages/login/login',
		 })
		 return;
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
			wx.navigateTo({
				url: '/pages/login/login',
			})
			//   wx.showToast({
            //     icon:'none',
            //     title: '请登录孵画器',
            //   })
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
    bindPlay(e) {
	  if (e)
	  this.setData({ isplay: true })
	  console.log("播放")
      this.data.pb_audio.play(() => {
          console.log('开始播放')
      })
    },
  bindPause() {
	  console.log("停止")
	  this.setData({ isplay: false })
	  this.data.pb_audio.pause({
      success: res => {
        console.log('pause success')
      },
      fail: res => {
        console.log('pause fail')
      }
    })
  },
	changeStyle(e){
		console.log(e,12)
		let page = e.detail.current;
		console.log(page)
		http.changeBorder(this, this.data.listImg[page], page+1, this.data.listtxt);//首页轮播
	}
})
