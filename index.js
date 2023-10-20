const squadButton = document.querySelector('#fetch-button');

const squadData = async () => {
  let mlsId;
  const seasonId = 2023
  const leagueUrl = 'https://api-football-v1.p.rapidapi.com/v3/leagues';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiToken,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    const leagueResp = await fetch(leagueUrl, options);
    const leagueResult = await leagueResp.json();
    const leagueInfo = leagueResult.response; 

    for (let i = 0; i < leagueInfo.length; i++) {
      let cur = leagueInfo[i];
      if (cur.country.name === "USA" && cur.league.name === 'Major League Soccer') {
        // console.log(cur);
        mlsId = cur.league.id;
      }
    }

    const teamsUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${mlsId}&season=${seasonId}`;
    const teams = await fetch(teamsUrl, options);
    const teamResult = await teams.json();
    const teamInfo = await teamResult.response;
    const teamIds = [];
  
    for (let i = 0; i < teamInfo.length; i++) {
      teamIds.push(teamInfo[i].team.id);
    }

    const playersStats = [];

    for (let i = 0; i < 1; i++) {
      const playersUrl = `https://api-football-v1.p.rapidapi.com/v3/players?team=${teamIds[i]}&season=${seasonId}`;
      const players = await fetch(playersUrl, options);
      const playersResult = await players.json();
      const playerInfo = await playersResult.response;

      // for (let i = 0; i < playerInfo.length; i++) {

      // }

    }

    // console.log(leagueInfo);
    // console.log(`USA - ${mlsId}`);
    // console.log(teamInfo);
    // console.log(`Team ID's - ${teamIds}`);
    console.log(`Players - ${playersStats[0].player}`);
    } catch (e) {
    console.error(e);
  }
}

squadButton.addEventListener('click', squadData)