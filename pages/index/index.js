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
    let username = this.data.username;
    let password = this.data.password;
    if (username !== '' && password !== '') {
      wx.showToast({
        title: '请稍后',
        icon: 'loading',
        duration: 500
      });
      wx.request({
        url: utils.ipConfig + '/users/login',
        data: {
          username: username,
          password: password
        },
        method: 'post',
        success: function (res) {
          if (res.data.code === 0) {
            wx.navigateTo({
              url: '../class/class'
            })
          } else {
            utils.openAlert('登录失败');
          }
        },
        fail: function (res) {
          utils.openAlert('登录失败');
        }
      })
    }
    if (username === '') {
      utils.openAlert('请填写用户名！');
    } else if (password === '') {
      utils.openAlert('请填写登录密码！');
    }
  },
})
