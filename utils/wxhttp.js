let time = '';
const BASEIMG = "http://game.flyh5.cn/resources/game/wechat/file/zbtool/"; 
function Post(url, param, method){
  let baseurl = 'https://game.flyh5.cn/game/wx7c3ed56f7f792d84/sy_zbxcx/public/api/';
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseurl+url,
      data: param,
      method: method,
      dataType: 'json',
      success: res => {
        resolve(res);
      },
      fail: res => {
        reject(res);
      }
    })
  })
}
const shareEvent = (option, obj) => {
  let shareObj = {
    title: obj.title,
    path: obj.path,
    imgUrl: obj.imgUrl,
    success(res) {
      // 转发成功之后的回调
      if (res.errMsg == 'shareAppMessage:ok') { }
    },
    fail(res) {
      // 转发失败之后的回调
      if (res.errMsg == 'shareAppMessage:fail cancel'){
        // 用户取消转发
      } else if (res.errMsg == 'shareAppMessage:fail'){
        // 转发失败，其中 detail message 为详细失败信息
      　　　　}
    },
    complete() {
      // 转发结束之后的回调（转发成不成功都会执行）
    }
  };
  if (option.from === 'button') {
    // 来自页面内转发按钮
    console.log(option.target)
  }
  return shareObj;
};
function changeBorder(that, arr, num,listtxt){
    clearInterval(time);
//   console.log("num",num)
	that.setData({
		borImg: BASEIMG + 'page2_6.png',
		borImg2: BASEIMG + 'page1_4_88.png',
		borImg3: BASEIMG + 'zbtool_23.png',
		borImg4: '',
		cardNum: num,
		cardTxt: listtxt[num - 1].txt
	})
  return new Promise((resolve, reject)=>{
       let i = 0;
       let type = num;
       time = setInterval(() => {
		//    console.log(type);
         if (type==1){
              that.setData({
                borImg: arr[i],
				borImg2: BASEIMG + 'page1_4_88.png', 
				borImg3: BASEIMG + 'zbtool_23.png',
				borImg4: ''
              }) 
        }else if(type==2){
			 that.setData({
				 borImg: BASEIMG + 'page2_6.png',
				 borImg2: arr[i],
				 borImg3: BASEIMG + 'zbtool_23.png',
	  			 borImg4: '',
			 }) 
		 } else if (type == 3){
			 that.setData({
				 borImg: BASEIMG + 'page2_6.png',
				 borImg2: BASEIMG + 'page1_4_88.png',
				 borImg3: arr[i],
				 borImg4: ''
			 }) 
		 } else if (type == 4) {
			 that.setData({
				 borImg: BASEIMG + 'page2_6.png',
				 borImg2: BASEIMG + 'page1_4_88.png',
				 borImg3: BASEIMG + 'zbtool_23.png',
				 borImg4: arr[i],
			 })
		 }
        i++;
        if(i==arr.length){
           i = 0;
        } 
       }, 1500)
  })
}

module.exports ={
    Post : Post,
    shareEvent:shareEvent,
    changeBorder: changeBorder,
    // getBase64Image: getBase64Image
}