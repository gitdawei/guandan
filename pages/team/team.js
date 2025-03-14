Page({
  data: {
    players: [],
    teams: []
  },
  onLoad() {
    wx.cloud.database().collection('players').get({
      success: res => {
        this.setData({
          players: res.data
        });
      }
    });
  },
  onTeamUp() {
    const { players } = this.data;
    const teams = [];
    for (let i = 0; i < players.length; i += 2) {
      teams.push({
        teamName: `队伍${i / 2 + 1}`,
        players: [players[i], players[i + 1]]
      });
    }
    teams.forEach(team => {
      wx.cloud.database().collection('teams').add({
        data: team
      });
    });
    this.setData({
      teams
    });
    wx.showToast({
      title: '组队成功',
      icon: 'success'
    });
  }
});