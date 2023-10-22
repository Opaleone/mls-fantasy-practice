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
    let page = 1;

    for (let i = 0; i < 1; i++) {
      // const playersUrl = `https://api-football-v1.p.rapidapi.com/v3/players?team=${teamIds[0]}&season=${seasonId}&page=${page}`;
      // const players = await fetch(playersUrl, options);
      // const playersResult = await players.json();
      // const playerInfo = await playersResult.response;


      // Trying to grab player positions and numbers
      const squadUrl = `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${teamIds[i]}`;
      const squad = await fetch(squadUrl, options);
      const squadResult = await squad.json();
      console.log(squadResult);

      // console.log(playersResult);

      // if (page < playersResult.paging.total) {
      //   page++;
      //   i--;
      // } else if (playersResult.paging.current === playersResult.paging.total) page = 1;

      // console.log(page);

      // // console.log(playerInfo);

      // for (let j = 0; j < playerInfo.length; j++) {
      //   const playerObject = {
      //     name: [playerInfo[j].player.firstname, playerInfo[j].player.lastname],
      //     playerInfo: playerInfo[j].player,
      //     playerStats: playerInfo[j].statistics[0],
      //     team: playerInfo[j].statistics[0].team.name
      //   }

      //   playersStats.push(playerObject);
      // }
    }

    console.log(leagueInfo);
    console.log('USA - ' + mlsId);
    console.log(teamInfo);
    console.log('Team ID\'s -' + teamIds);
    console.log(playersStats);
    } catch (e) {
    console.error(e);
  }
}

squadButton.addEventListener('click', squadData)