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
    let playerData = [];

    let url = `https://api-football-v1.p.rapidapi.com/v3/players?league=${mlsId}&season=${seasonId}&page=1`;
    const fetchVar = await fetch(url, options);
    const playerInfo = await fetchVar.json();
    const playerInfoRes = await playerInfo.response
    let totalPage = playerInfo.paging.total

    

    console.log(playerInfoRes)

    for (let i = 0; i < playerInfoRes.length; i++) {
      const player = playerInfoRes[i].player
      const stats = playerInfoRes[i].statistics[0]
      const playObj = {
        apiId: player.id,
        firstName: player.firstname,
        lastName: player.lastname,
        displayName: player.name,
        age: player.age,
        img: player.photo,
        nationality: player.nationality,
        team: stats.team.name,
        height: player.height,
        weight: player.weight,
        injured: player.injured,
        position: stats.games.position
      }
      playerData.push(playObj);
    }

    for (let i = 2; i <= totalPage; i++) {
      url = `https://api-football-v1.p.rapidapi.com/v3/players?league=${mlsId}&season=${seasonId}&page=${i}`;
      const f = await fetch(url, options);
      const loopPlayer = await f.json();
      const res = await loopPlayer.response;

      for (let j = 0; j < res.length; j++) {
        const player = res[j].player;
        const stats = res[j].statistics[0];
        const playObj = {
          apiId: player.id,
          firstName: player.firstname,
          lastName: player.lastname,
          displayName: player.name,
          age: player.age,
          img: player.photo,
          nationality: player.nationality,
          team: stats.team.name,
          height: player.height,
          weight: player.weight,
          injured: player.injured,
          position: stats.games.position
        }
        playerData.push(playObj);
      }
    }

    console.log(playerData);
  } catch (e) {
    console.error(e);
  }
}

squadButton.addEventListener('click', squadData)