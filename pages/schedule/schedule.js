Page({
  data: {
    schedules: []
  },
  onLoad() {
    wx.cloud.database().collection('matches').get({
      success: res => {
        const schedules = res.data.map(match => ({
          match: `${match.teamA} vs ${match.teamB}`
        }));
        this.setData({
          schedules
        });
      }
    });
  }
});