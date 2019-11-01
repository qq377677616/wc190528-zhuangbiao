// pages/realPage/realPage.js
const BASEIMG = "http://game.flyh5.cn/resources/game/wechat/file/zbtool/";
let time = "";
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		BASEIMG: BASEIMG,
		listImg: [BASEIMG + 'page2_6.png',
		BASEIMG + 'page2_7.png',
		BASEIMG + 'page2_8.png',
		BASEIMG + 'page2_9.png',
		BASEIMG + 'page1_4_10.png',
		BASEIMG + 'page1_4_8.png',
		BASEIMG + 'page1_4_88.png',
		BASEIMG + 'page1_4_9.png',
		BASEIMG + 'page3_7.png',
		BASEIMG + 'page3_8.png',
		BASEIMG + 'page3_9.png',
		BASEIMG + 'page5_jpg.jpg',
		BASEIMG + 'page5_2.png',
		BASEIMG + 'page5_6.png',
		BASEIMG + 'page5_3.png'
		],
		flag:0,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.run();
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
	run(){
	 let i=0;
	 let that = this;
	 let time=setInterval(()=>{
		 clearInterval(time);
		wx.reLaunch({
			url: '/pages/index/index',
		}) 
	},2500)
	}
})