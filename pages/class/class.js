const utils = require('../../utils/util.js');

Page({
  data: {
    classroomList: [],
    timetableList: [],
    index: 0,
    contentInfo: [{
      showTime: '',
      dataWeek: '',
      dataYear: '',
      select: 1
    }, {
      showTime: '',
      dataWeek: '',
      dataYear: '',
      select: 2
    }, {
      showTime: '',
      dataWeek: '',
      dataYear: '',
      select: 3
    }, {
      showTime: '',
      dataWeek: '',
      dataYear: '',
      select: 4
    }],
    catalogSelect: 1
  },
  /**
   * 生命周期函数-监听页面显示
   */
  onLoad: function (options) {
    var that = this;
    that.getClassRoomList();

    var firstShowTime = 'contentInfo[0].showTime';
    var firstDataWeek = 'contentInfo[0].dataWeek';
    var firstDataYear = 'contentInfo[0].dataYear';

    var secondShowTime = 'contentInfo[1].showTime';
    var secondDataWeek = 'contentInfo[1].dataWeek';
    var secondDataYear = 'contentInfo[1].dataYear';

    var thirdShowTime = 'contentInfo[2].showTime';
    var thirdDataWeek = 'contentInfo[2].dataWeek';
    var thirdDataYear = 'contentInfo[2].dataYear';

    var fourthShowTime = 'contentInfo[3].showTime';
    var fourthDataWeek = 'contentInfo[3].dataWeek';
    var fourthDataYear = 'contentInfo[3].dataYear';

    that.setData({
      [firstShowTime]: that.setTimepicker(new Date(), 0).time,
      [firstDataWeek]: that.setTimepicker(new Date(), 0).week,
      [firstDataYear]: that.setTimepicker(new Date(), 0).fullYear,

      [secondShowTime]: that.setTimepicker(new Date(), 1).time,
      [secondDataWeek]: that.setTimepicker(new Date(), 1).week,
      [secondDataYear]: that.setTimepicker(new Date(), 1).fullYear,

      [thirdShowTime]: that.setTimepicker(new Date(), 2).time,
      [thirdDataWeek]: that.setTimepicker(new Date(), 2).week,
      [thirdDataYear]: that.setTimepicker(new Date(), 2).fullYear,

      [fourthShowTime]: that.setTimepicker(new Date(), 3).time,
      [fourthDataWeek]: that.setTimepicker(new Date(), 3).week,
      [fourthDataYear]: that.setTimepicker(new Date(), 3).fullYear
    })
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
  setTimepicker: function (date, num) {
    var that = this;
    const weekMap = {
      '0': '周日',
      '1': '周一',
      '2': '周二',
      '3': '周三',
      '4': '周四',
      '5': '周五',
      '6': '周六'
    };
    var oneDay = 24 * 60 * 60 * 1000;
    date.setTime(date.getTime() + num * oneDay);

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var week = date.getDay();

    var hours = date.getHours();
    var minute = date.getMinutes();

    var fullYear = year + '-' + that.formatTime(month) + '-' + that.formatTime(day);
    var completeTime = year + '-' + that.formatTime(month) + '-' + that.formatTime(day) + ' ' + that.formatTime(hours) + ':' + that.formatTime(minute);

    var time = that.formatTime(month) + "-" + that.formatTime(day) + ' ' + weekMap[week];

    var format = {
      //2018-03-09
      fullYear: fullYear,
      //2018-03-09 14:00
      completeTime: completeTime,
      //03-09 周五
      time: time,
      //5
      week: week
    };
    return format;
  },
  formatTime: function (num) {
    if (num < 10) {
      num = '0' + num;
    }
    return num;
  },
  // 时间切换
  bindDateChange: function (e) {
    var that = this;
    var firstShowTime = 'contentInfo[0].showTime';
    var firstDataWeek = 'contentInfo[0].dataWeek';
    var firstDataYear = 'contentInfo[0].dataYear';

    var secondShowTime = 'contentInfo[1].showTime';
    var secondDataWeek = 'contentInfo[1].dataWeek';
    var secondDataYear = 'contentInfo[1].dataYear';

    var thirdShowTime = 'contentInfo[2].showTime';
    var thirdDataWeek = 'contentInfo[2].dataWeek';
    var thirdDataYear = 'contentInfo[2].dataYear';

    var fourthShowTime = 'contentInfo[3].showTime';
    var fourthDataWeek = 'contentInfo[3].dataWeek';
    var fourthDataYear = 'contentInfo[3].dataYear';

    that.setData({
      [firstShowTime]: that.setTimepicker(new Date(e.detail.value), 0).time,
      [firstDataWeek]: that.setTimepicker(new Date(e.detail.value), 0).week,
      [firstDataYear]: that.setTimepicker(new Date(e.detail.value), 0).fullYear,

      [secondShowTime]: that.setTimepicker(new Date(e.detail.value), 1).time,
      [secondDataWeek]: that.setTimepicker(new Date(e.detail.value), 1).week,
      [secondDataYear]: that.setTimepicker(new Date(e.detail.value), 1).fullYear,

      [thirdShowTime]: that.setTimepicker(new Date(e.detail.value), 2).time,
      [thirdDataWeek]: that.setTimepicker(new Date(e.detail.value), 2).week,
      [thirdDataYear]: that.setTimepicker(new Date(e.detail.value), 2).fullYear,

      [fourthShowTime]: that.setTimepicker(new Date(e.detail.value), 3).time,
      [fourthDataWeek]: that.setTimepicker(new Date(e.detail.value), 3).week,
      [fourthDataYear]: that.setTimepicker(new Date(e.detail.value), 3).fullYear
    });
    that.getTimetable(e);
  },
  changeActive: function (data) {
    var that = this;
    that.setData({//把选中值放入判断值
      catalogSelect: data.currentTarget.dataset.select
    });
  },
  getTimetable: function (e) {
    var that = this;

    var postData = {
      roomId: that.data.classroomList[that.data.index].roomId,
      week: e.currentTarget.dataset.week
    };

    wx.request({
      url: utils.ipConfig + '/users/get_timetable',
      method: 'post',
      data: postData,
      success: function (res) {
        if (res.data.code !== 0) {
          utils.openAlert('获取课程列表失败！');
          return;
        }
        that.changeActive(e);
        that.setData({//把选中值放入判断值
          timetableList: res.data.data
        });
      },
      fail: function () {

      }
    })
  }
})