Page({
  data: {
    rankings: []
  },
  onLoad() {
    wx.cloud.database().collection('matches').get({
      success: res => {
        const matches = res.data;
        const teamPoints = {};
        matches.forEach(match => {
          const { teamA, teamB, scoreA, scoreB } = match;
          if (scoreA > scoreB) {
            teamPoints[teamA] = (teamPoints[teamA] || 0) + 3;
            teamPoints[teamB] = (teamPoints[teamB] || 0);
          } else if (scoreA < scoreB) {
            teamPoints[teamB] = (teamPoints[teamB] || 0) + 3;
            teamPoints[teamA] = (teamPoints[teamA] || 0);
          } else {
            teamPoints[teamA] = (teamPoints[teamA] || 0) + 1;
            teamPoints[teamB] = (teamPoints[teamB] || 0) + 1;
          }
        });
        const rankings = Object.keys(teamPoints).map(teamName => ({
          teamName,
          points: teamPoints[teamName]
        })).sort((a, b) => b.points - a.points);
        this.setData({
          rankings
        });
      }
    });
  }
});