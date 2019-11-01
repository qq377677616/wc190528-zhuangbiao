// pages/personInfo/personinfo.js
const http = require('../../utils/wxhttp.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
       isup:false,
       popshow:false,
       poptitle:'',
       type:'',
       region: ['广东省', '广州市', '海珠区'],
       birthday: '2018-05-17',
       personInfo:'',
       currSex: ['未知','男','女'],
       userId:'',
       nickName:'',
       sexVal:'1',
       phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'phone',
      success: function(res) {
         that.setData({
           phone:res.data
         })
        that.getpersonInfo();
      }
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
  openActionsheet() {
    let that = this;
    wx.showActionSheet({
      itemList: ['拍照', '选取现有的'],
      itemColor: '#000',
      success(res) {
        console.log(res.tapIndex);
        if (res.tapIndex === 0) {
          wx.chooseImage({
            sourceType: ['camera'],
            success(res) {
              // console.log();
              // console.log(res.tempFilePaths[0]);
              let url = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64");
              let dat = {
                file:url
              }
              http.Post('index/img_upload_base64',dat,'post').then((res)=>{
                let dat = {header_img:''};
                dat.header_img = res.data.data.img_url;
                that.upUserInfo(dat);
              })
              // console.log(http.getBase64Image(); 
            }
          })
        } else if (res.tapIndex === 1) {
          wx.chooseImage({
            count: 1, // 设置最多三张
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
              var tempFilePaths = res.tempFilePaths;
              // 图片预览
              wx.previewImage({
                current: res.tempFilePaths[0],
                urls: res.tempFilePaths
              })
              // console.log(tempFilePaths[0])
              let url = wx.getFileSystemManager().readFileSync(tempFilePaths[0], "base64");
              let dat = {
                file: url
              }
              http.Post('index/img_upload_base64', dat, 'post').then((res) => {
                let dat = { header_img: '' };
                dat.header_img = res.data.data.img_url;
                that.upUserInfo(dat);
              })
            }
          })
        }
      }
    })
  },
  // 时间处理 修改用户信息
  cancelEvent(){
        this.setData({
           isup:false,
          popshow:false
        })
  },
  comfirmEvent(){
    let dat = {};
    if (this.data.nickName){
       dat = {
            nickname: this.data.nickName
          }
     }else{
        dat ={
            sex: this.data.sexVal
        } 
     }
    this.upUserInfo(dat);
    this.setData({
           isup: true,
           popshow:false
    })
  },
  changeInfo(option){//修改昵称
   let that = this;
   let uptype = option.currentTarget.dataset.type;
    if (uptype==1){
      that.setData({
           poptitle:'修改昵称',
           popshow:true,
           type:1
       })
    } else if (uptype == 2){
      that.setData({
           poptitle: '修改性别',
           popshow: true,
           type: 2
        })
    } else if (uptype == 3){
      that.setData({
          poptitle: '修改常住地',
          popshow: true,
          type: 3
       })
    } else if (uptype == 4){
      that.setData({
          poptitle: '修改生日',
          popshow: true,
          type: 4
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
    this.upUserInfo(dat);
    // console.log(this.data.region);
  },
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let dat = {
      birthday: e.detail.value
    }
    this.upUserInfo(dat);
    this.setData({
      birthday: e.detail.value
    })
  },
  getPhoneNumber(e){
      console.log(e);
  },
  getpersonInfo(){//获取个人信息
    let dat = {
      phone: this.data.phone
    }
    http.Post('index/get_user_info',dat,'post').then((res)=>{
        // console.log(res.data);
      let region = '';
		res.data.data.header_img = !res.data.data.header_img ? wx.getStorageSync('user_info').avatarUrl : res.data.data.header_img;
		res.data.data.nickname = !res.data.data.nickname ? wx.getStorageSync('user_info').nickName : res.data.data.nickname;
      region = !res.data.data.province ? '' : res.data.data.province + ',' + res.data.data.city + ',' + res.data.data.region;
      res.data.data.birthday = !res.data.data.birthday ? '' : res.data.data.birthday;
        this.setData({
          personInfo:res.data.data,
          birthday: res.data.data.birthday,
          region: region,
          userId:res.data.data.id
        })
    })
  },
  upUserInfo(obj){//更新用户信息
      let dat = {
        uid:this.data.userId
      };
      dat = Object.assign(dat,obj);
      http.Post('index/edit_msg',dat,'post').then((res)=>{
          console.log(res.data)
          if(res.data.msg=='更新成功') this.getpersonInfo();
      })
  },
  getNick(e){//获取昵称
    this.setData({
       nickName:e.detail.value
    })
  },
  radioChange(e){// 获取单选框的值
    // console.log(e);
    this.setData({
      sexVal:e.detail.value
    })
  },
  upAddress(){
     wx.navigateTo({
       url: '/pages/shopAddress/shopAddress?type=center',
     })
  },
  goChangeiphone(){
       wx.navigateTo({
         url: '../changePhone/changePhone',
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