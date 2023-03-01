const squadButton = document.querySelector('#fetch-button')

const squadData = async () => {
  const apiToken = '?api_token=75KeS8f6rQcokyxsLBRdsXkuMgIOVoYJrKZFLMkmIs3kj1dgsktz826ebTpm'
  const seasonId = 20901
  const teamIdResponse = await axios.get(`https://soccer.sportmonks.com/api/v2.0/teams/season/${seasonId}${apiToken}`)

  
  const teams = teamIdResponse.data.data
  
  const teamIdArr = []
  
  teams.map((team) => {
    teamIdArr.push(team.id)
  })
  
  const teamPlayersResponse = await axios.get(`https://soccer.sportmonks.com/api/v2.0/teams/${teamIdArr[0]}${apiToken}&include=squad.player`)

  // const squad = response.data.data.squad.data

  // for(let i = 0; i < squad.length; i++) {
  //   const newP = document.createElement('p')

  //   newP.textContent = squad[i].player.data.display_name

  //   document.body.append(newP)
  // }

  // squad.map((player) => {
  //   const newP = document.createElement('p')

  //   newP.innerText = player.player.data.display_name

  //   document.body.append(newP)
  // })

  console.log(teamIdResponse)

  console.log(teamPlayersResponse)
}

squadButton.addEventListener('click', squadData)