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

  for(let i = 0; i < teamIdArr.length; i++) {
    const teamPlayersResponse = await axios.get(`https://soccer.sportmonks.com/api/v2.0/teams/${teamIdArr[i]}${apiToken}&include=squad.player`)

    const currentTeam = teamPlayersResponse.data.data

    console.log(currentTeam)

    const newH1 = document.createElement('h1')
    
    newH1.textContent = teamPlayersResponse.data.data.name
    
    document.body.append(newH1)
    
    for(let x = 0; x < currentTeam.squad.data.length; x++) {
      const newP = document.createElement('p')
      newP.textContent = currentTeam.squad.data[x].player.data.display_name
      document.body.append(newP)
    }
  }

  console.log(teamIdResponse)

  console.log(teamPlayersResponse)
}

squadButton.addEventListener('click', squadData)