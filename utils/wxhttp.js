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
  let time = '';
  return new Promise((resolve, reject)=>{
       let i = 0;
      //  let j = 0;
       let type = num;
      //  let start = 0;
      // console.log(arr.length);
       time = setInterval(() => {
        //  console.log(arr[i]);
         if (i<=3){
              that.setData({
                borImg: arr[i]
              })
         } else if (i>3&&i<=6){
              that.setData({
                borImg2: arr[i]
              })
        }else if(i>6&&i<=8){
              that.setData({
                borImg3: arr[i]
              })
        } else if (i>8&&i<=12) {
              that.setData({
                borImg4: arr[i]
              })
        }
        i++;
        if(i==13){
           i = 0;
        } 
        //  that.setData({
        //    cardNum: listtxt[j].num,
        //    cardTxt: listtxt[j].txt
        //  })
       }, 1500)
  })
}

module.exports ={
    Post : Post,
    shareEvent:shareEvent,
    changeBorder: changeBorder,
    // getBase64Image: getBase64Image
}