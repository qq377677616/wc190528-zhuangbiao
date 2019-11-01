const BASEIMG = "http://game.flyh5.cn/resources/game/wechat/file/zbtool/";
const _login=()=>{
	loading();
	let baseurl = 'https://game.flyh5.cn/game/wx7c3ed56f7f792d84/sy_zbxcx/public/api/index/get_openid';
	return new Promise((resolve, reject) => {
		wx.login({
			success(res){
				let dat = {
					code: res.code
				}
				wx.request({
					url: baseurl,
					data: dat,
					method: "post",
					dataType: 'json',
					success: res => {
						resolve(res);
						loading_h();
					},
					fail: res => {
						reject(res);
					}
				})
			}
		})
		
	})
}

const loading = (str = '加载中', mask = true) => {
	wx.showLoading({
		title: str,
		mask: mask
	})
}
//关闭loading提示框
const loading_h = () => {
	wx.hideLoading()
}
module.exports={
	_login,
	loading,
	loading_h,
}