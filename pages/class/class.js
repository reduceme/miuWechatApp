const utils = require('../../utils/util.js');

Page({
  data: {
    classroomList: [],
    index: 0
  },
  /**
   * 生命周期函数-监听页面显示
   */
  onLoad: function (options) {
    this.getClassRoomList()
  },
  bindClassroomChange: function (e) {
    var that = this;
    console.log(that.data.classroomList[that.data.index])
    this.setData({
      index: e.detail.value
    })
  },
  getClassRoomList: function () {
    var that = this;
    wx.request({
      url: utils.ipConfig + '/users/get_class_room',
      method: 'get',
      success: function (res) {
        if (res.data.code !== 0) {
          utils.openAlert('获取教室失败！');
          return;
        }
        let list = res.data.data;
        that.setData({
          classroomList: list
        })
      },
      fail: function () {

      }
    })
  },
  getTimetable: function () {
    
  }
})