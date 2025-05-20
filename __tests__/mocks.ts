// Mock data for contests
export const mockContestList = [
    {
        contestName: 'AtCoder Beginner Contest 999',
        isRated: true,
        contestTime: 'Sunday, May 21, 2025 21:00:00+0900',
        contestDuration: '01:40',
        contestType: 'Algorithm',
        contestUrl: 'https://atcoder.jp/contests/abc999',
        contestId: 'abc999'
    },
    {
        contestName: 'AtCoder Regular Contest 999',
        isRated: true,
        contestTime: 'Saturday, May 27, 2025 21:00:00+0900',
        contestDuration: '02:00',
        contestType: 'Algorithm',
        contestUrl: 'https://atcoder.jp/contests/arc999',
        contestId: 'arc999'
    }
];

// Mock data for user profile
export const mockUserInfo = {
    userName: 'tourist',
    currentRank: 'Master',
    userAvatar: 'https://atcoder.jp/images/avatar.png',
    userRank: 1,
    userRating: 3800,
    userMaxRating: 4000,
    userLastCompeted: '2025-05-01',
    userContestCount: 150,
    userContests: []
};

// Mock data for user contests
export const mockUserContests = [
    {
        userRank: 1,
        userOldRating: 3790,
        userNewRating: 3800,
        userRatingChange: 10,
        contestName: 'AtCoder Beginner Contest 998',
        userPerformance: 4000,
        contestEndTime: '2025-05-01T21:40:00+0900',
        isRated: true,
        contestId: 'abc998'
    },
    {
        userRank: 3,
        userOldRating: 3800,
        userNewRating: 3790,
        userRatingChange: -10,
        contestName: 'AtCoder Regular Contest 998',
        userPerformance: 3700,
        contestEndTime: '2025-04-24T23:00:00+0900',
        isRated: true,
        contestId: 'arc998'
    }
];

// Mock HTML responses for scraping tests
export const mockContestPageHtml = `
<!DOCTYPE html>
<html>
<head><title>AtCoder Contests</title></head>
<body>
  <div id="main-container">
    <div class="row">
      <div class="col-sm-12">
        <h2>Active Contests</h2>
        <table id="contest-table-upcoming" class="table">
          <thead>
            <tr><th>Start Time</th><th>Contest Name</th><th>Duration</th><th>Rated Range</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Sunday, May 21, 2025 21:00:00+0900</td>
              <td><a href="/contests/abc999">AtCoder Beginner Contest 999</a> <span>Ⓐ</span></td>
              <td>01:40</td>
              <td>~ 1999</td>
            </tr>
            <tr>
              <td>Saturday, May 27, 2025 21:00:00+0900</td>
              <td><a href="/contests/arc999">AtCoder Regular Contest 999</a> <span>Ⓐ</span></td>
              <td>02:00</td>
              <td>~ 2799</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const mockUserPageHtml = `
<!DOCTYPE html>
<html>
<head><title>tourist - AtCoder</title></head>
<body>
  <div id="main-container">
    <div class="row">
      <div class="col-md-3 col-sm-12">
        <h3><b>Master</b> <span class="username"><span>tourist</span></span></h3>
        <img class="avatar" src="https://atcoder.jp/images/avatar.png">
      </div>
      <div class="col-md-9 col-sm-12">
        <div class="dl-table">
          <table class="dl-table">
            <tbody>
              <tr>
                <td>Rank</td>
                <td>1st</td>
              </tr>
              <tr>
                <td>Rating</td>
                <td><span>Current:</span> <span>3800</span></td>
              </tr>
              <tr>
                <td>Highest Rating</td>
                <td><span>Highest:</span> <span>4000</span></td>
              </tr>
              <tr>
                <td>Rated Matches</td>
                <td>150</td>
              </tr>
              <tr>
                <td>Last Competed</td>
                <td>2025-05-01</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;
