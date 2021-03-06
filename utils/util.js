const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const openAlert = msg => {
  wx.showModal({
    content: msg,
    showCancel: false,
    success: function (data) {
      if (data.confirm) {
      }
    }
  });
}

module.exports = {
  formatTime: formatTime,
  openAlert: openAlert,
  ipConfig: 'http://localhost:3000'
}
