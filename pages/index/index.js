//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    username: '',
    password: ''
  },
  bindUsernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  bindPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //登录函数
  loginFn: function (e) {
    console.log(this.data.username);
    console.log(this.data.password);
    wx.request({
      url: 'http://localhost:3000/users/login',
      data: {
        username: this.data.username,
        password: this.data.password
      },
      method: 'post',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {

      }
    })
  }
})
