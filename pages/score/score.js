Page({
  data: {
    teams: [],
    teamA: '',
    teamB: '',
    scoreA: 0,
    scoreB: 0
  },
  onLoad() {
    wx.cloud.database().collection('teams').get({
      success: res => {
        this.setData({
          teams: res.data
        });
      }
    });
  },
  onTeamAChange(e) {
    this.setData({
      teamA: e.detail.value
    });
  },
  onTeamBChange(e) {
    this.setData({
      teamB: e.detail.value
    });
  },
  onScoreAChange(e) {
    this.setData({
      scoreA: parseInt(e.detail.value)
    });
  },
  onScoreBChange(e) {
    this.setData({
      scoreB: parseInt(e.detail.value)
    });
  },
  onSubmit() {
    const { teamA, teamB, scoreA, scoreB } = this.data;
    if (teamA && teamB && scoreA !== null && scoreB !== null) {
      wx.cloud.database().collection('matches').add({
        data: {
          teamA,
          teamB,
          scoreA,
          scoreB
        },
        success: res => {
          wx.showToast({
            title: '比分记录成功',
            icon: 'success'
          });
          wx.navigateBack();
        },
        fail: err => {
          wx.showToast({
            title: '比分记录失败',
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