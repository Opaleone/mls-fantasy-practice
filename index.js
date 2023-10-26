const squadButton = document.querySelector('#fetch-button');
const apiToken = '6a563d7cf3msh4c701a8a48ee5fcp122fa8jsne2418614c152';


/*

DEMO DATA

{
  "firstName": "Alex",
  "lastName": "Ring",
  "displayName": "A. Ring",
  "number": "9",
  "age": "32",
  "img": "https://b.fssta.com/uploads/application/soccer/headshots/23292.png",
  "nationality": "Finland",
  "team": "Austin FC",
  "height": "1.78m",
  "weight": "98kg",
  "injured": "false",
  "position": "Midfielder"
}

*/

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

    for (let i = 0; i < 1; i++) {
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

    for (let i = 0; i < 1; i++) {
      const playersUrl = `https://api-football-v1.p.rapidapi.com/v3/players?team=${teamIds[0]}&season=${seasonId}&page=${page}`;
      const players = await fetch(playersUrl, options);
      const playersResult = await players.json();
      const playerInfo = await playersResult.response;

      if (page < playersResult.paging.total) {
        page++;
        i--;
      } else if (playersResult.paging.current === playersResult.paging.total) page = 1;
    

      console.log(playerInfo);

      playerInfo.sort((a,b) => a.player.id - b.player.id);
      console.log(playerInfo);

      let idx = 0;

      for (let j = 0; j < playerInfo.length; j++) {
        const playerData = playerInfo[j].player;
        const playerStat = playerInfo[j].statistics;
        console.log(playerData.id);
        console.log(playersStats[idx].id);

        console.log(playersStats[j]);

        if (playerData.id === playersStats[idx].id) {
          playersStats[j].firstName = playerData.firstname;
          playersStats[j].lastName = playerData.lastname;
          playersStats[j].nationality = playerData.nationality;
          playersStats[j].team = playerStat[0].team.name;
          playersStats[j].height = playerData.height;
          playersStats[j].weight = playerData.weight;
          playersStats[j].injured = playerData.injured;
        } else {
          j--;
        }
        idx++;
      }
    }

    // console.log(leagueInfo);
    // console.log('USA - ' + mlsId);
    // console.log(teamInfo);
    // console.log('Team ID\'s -' + teamIds);
    console.log(playersStats);
    } catch (e) {
    console.error(e);
  }
}

squadButton.addEventListener('click', squadData)