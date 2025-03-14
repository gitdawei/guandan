Page({
  data: {
    name: '',
    phone: ''
  },
  onNameChange(e) {
    this.setData({
      name: e.detail.value
    });
  },
  onPhoneChange(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  onSubmit() {
    const { name, phone } = this.data;
    if (name && phone) {
      wx.cloud.database().collection('players').add({
        data: {
          name,
          phone
        },
        success: res => {
          wx.showToast({
            title: '报名成功',
            icon: 'success'
          });
          wx.navigateBack();
        },
        fail: err => {
          wx.showToast({
            title: '报名失败',
            icon: 'none'
          });
        }
      });
    } else {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
    }
  }
});