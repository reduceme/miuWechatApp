//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js');

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
    wx.request({
      url: 'http://localhost:3000/users/login',
      data: {
        username: this.data.username,
        password: this.data.password
      },
      method: 'post',
      success: function (res) {
        if (res.data.code === 0) {
          utils.openAlert('登录成功');
        } else {
          utils.openAlert('登录失败');
        }
      },
      fail: function (res) {
        utils.openAlert('登录失败');
      }
    })
  },
})
