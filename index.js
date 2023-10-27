const squadButton = document.querySelector('#fetch-button');

const squadData = async () => {
  let mlsId = 253;
  const seasonId = 2023
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiToken,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
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

    for (let i = 0; i < teamIds.length; i++) {
      // Trying to grab player positions and numbers
      const squadUrl = `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${teamIds[i]}`;
      const squad = await fetch(squadUrl, options);
      const squadResult = await squad.json();
      const squadRes = squadResult.response[0];
      squadRes.players.sort((a,b) => a.id - b.id);

      for (let j = 0; j < squadRes.players.length; j++) {
        playersStats.push(squadRes.players[j]);
      }
    }

    let totalPlayerInfo = [];

    for (let i = 0; i < teamIds.length; i++) {
      const playersUrl = `https://api-football-v1.p.rapidapi.com/v3/players?team=${teamIds[0]}&season=${seasonId}&page=${page}`;
      const players = await fetch(playersUrl, options);
      const playersResult = await players.json();
      const playerInfo = await playersResult.response;

      if (page < playersResult.paging.total) {
        page++;
        i--;
      } else if (playersResult.paging.current === playersResult.paging.total) page = 1;

      for (let j = 0; j < playerInfo.length; j++) {
        totalPlayerInfo.push(playerInfo[j]);
      }

      totalPlayerInfo.sort((a,b) => a.player.id - b.player.id);
    }

    /*

    DEMO DATA

    {
      "firstName": "Alex",
      "lastName": "Ring",
      "nationality": "Finland",
      "team": "Austin FC",
      "height": "1.78m",
      "weight": "98kg",
      "injured": "false",
    }

    */

    for (let i = 0, j = 0; i < playersStats.length; i++, j++) {
      const objectInsertion = playersStats[i]
      const curPlayerInfo = totalPlayerInfo[j].player;
      const curPlayerStats = totalPlayerInfo[j].statistics[0];
      // console.log(playersStats[i].id)
      if (playersStats[i].id === totalPlayerInfo[j].player.id) {
        objectInsertion.firstName = curPlayerInfo.firstname;
        objectInsertion.lastName = curPlayerInfo.lastname;
        objectInsertion.nationality = curPlayerInfo.nationality;
        objectInsertion.team = curPlayerStats.team.name;
        objectInsertion.height = curPlayerInfo.height;
        objectInsertion.weight = curPlayerInfo.weight;
        objectInsertion.injured = curPlayerInfo.injured;
      } else {
        i--;
      }
    }

    // console.log(totalPlayerInfo);
    console.log(playersStats);
    } catch (e) {
    console.error(e);
  }
}

squadButton.addEventListener('click', squadData)