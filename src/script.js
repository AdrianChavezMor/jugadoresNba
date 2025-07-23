const seasonsToFind = ['1996-97', '1997-98', '1998-99', '1999-00', '2000-01', '2001-02', '2002-03',
                       '2003-04', '2004-05', '2005-06', '2006-07', '2007-08', '2008-09', '2009-10',
                       '2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17',
                       '2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23']

const teams = ['HOU', 'WAS', 'VAN', 'LAL', 'DEN', 'ORL', 'CHH', 'MIL', 'DET', 'POR', 'DAL', 'UTA',
               'SEA', 'BOS', 'IND', 'SAS', 'MIA', 'ATL', 'NJN', 'LAC', 'GSW', 'PHI', 'NYK', 'TOR',
               'PHX', 'MIN', 'CHI', 'SAC', 'CLE', 'MEM', 'NOH', 'CHA', 'NOK', 'OKC', 'BKN', 'NOP']

let data = [];
let playersInSeasonInTeam = []
let teamsInSeason = []
let isSearching = true;

let season = ''
let team = ''
let currentPlayer = 0;

async function loadContent(){

  const inputsDefaultContainer = document.getElementById('inputs-full-container')
  const inputsContainer = document.createElement('div');
  
  const seasonDropdown = document.createElement('select');
  seasonDropdown.id = 'seasons';

  season = seasonsToFind[0]

  for(let i = 0; i < seasonsToFind.length - 1; i++){

    const newOpt = document.createElement('option');
    newOpt.textContent = seasonsToFind[i];
    newOpt.i = seasonsToFind[i];
    seasonDropdown.appendChild(newOpt);

  }

  const teamDropdown = document.createElement('select');
  teamDropdown.id = 'teams';

  const teamsSorted = teams.sort()
  team = teamsSorted[0]


  for(let i = 0; i < teamsSorted.length - 1; i++){

    const newOpt = document.createElement('option');
    newOpt.textContent = teamsSorted[i];
    newOpt.i = teamsSorted[i];
    teamDropdown.appendChild(newOpt);
    
  }

  const filterButton = document.createElement('button')
  filterButton.innerText = 'Find'
  filterButton.id = 'filterButton'

  inputsContainer.appendChild(seasonDropdown)
  inputsContainer.appendChild(teamDropdown)
  inputsContainer.appendChild(filterButton)

  inputsDefaultContainer.appendChild(inputsContainer)
};


async function loadData() {
  const response = await fetch('nba_players_data.json');
  data = await response.json();  // assuming the JSON file is an array of objects
}

loadContent()
loadData();  // call once when the script loads
  
function toggleSeason(value){
  season = value
  filter()
}

function toggleTeam(value){
  team = value
  filter()
}

function goToNextPlayer(){

  if(currentPlayer == playersInSeasonInTeam.length - 1){
    currentPlayer = 0
  } else {
    currentPlayer += 1
  }
  console.log(currentPlayer)

  displayPlayer()
  
}

function goToPreviousPlayer(){

  if(currentPlayer == 0){
    currentPlayer = playersInSeasonInTeam.length - 1;
  } else {
    currentPlayer -= 1;
  }
  console.log(currentPlayer)

  displayPlayer()
  
}

async function filter(){

  console.log("Season: ", season);
  console.log("Team: ", team);

  if (!season && !team) return;

  const playersInSeason = data.filter(player => player.season === season);
  playersInSeasonInTeam = playersInSeason.filter(player => player.team_abbreviation === team) //Aprender filter y map, check for nulls, and data

  currentPlayer = 0
  displayPlayer()

  
  //const fullContainer = document.getElementById('players-full-container')
  //fullContainer.replaceChildren()
  
  //playersInSeasonInTeam.forEach(player => {

    //const newPar = document.createElement('p')
    //newPar.textContent = player.player_name 
    //fullContainer.appendChild(newPar)

  //});
  

}


function displayPlayer(){
  const namePar = document.getElementById('name')
  const teamPar = document.getElementById('team')
  const agePar = document.getElementById('age')
  const heightPar = document.getElementById('height')
  const weightPar = document.getElementById('weight')
  const pointsPar = document.getElementById('points')
  const reboundsPar = document.getElementById('rebounds')
  const assistsPar = document.getElementById('assists')
  let playerDisplayed = playersInSeasonInTeam[currentPlayer];

  namePar.textContent = `Name: ${playerDisplayed.player_name}`;
  teamPar.textContent = `Team: ${playerDisplayed.team_abbreviation}`;
  agePar.textContent = `Age: ${playerDisplayed.age}`;
  heightPar.textContent = `Height: ${playerDisplayed.player_height} ft`;
  weightPar.textContent = `Weight: ${playerDisplayed.player_weight} lbs`;
  pointsPar.textContent = `Points: ${playerDisplayed.pts}`;
  reboundsPar.textContent = `Rebounds: ${playerDisplayed.reb}`;
  assistsPar.textContent = `Assists: ${playerDisplayed.ast}`;
  
}

function updatePlayerInfoVisibility() {
    if (isSearching) {
        document.getElementById('players-full-container').style.display = 'none';
    } else {
        document.getElementById('players-full-container').style.display = 'inline';
    }
}

const teamsSelector = document.getElementById('teams');
const seasonsSelector = document.getElementById('seasons');
const filterButton = document.getElementById('filterButton')

  // Listen for changes
teamsSelector.addEventListener('change', () => {
    let selectorValue = teamsSelector.value;
    team = selectorValue;
    //console.log(selectorValue)
    console.log('Team: ', team, ' Season: ', season)

});

seasonsSelector.addEventListener('change', () => {
    let selectorValue = seasonsSelector.value;
    season = selectorValue;

    const teamsInSeason = data
    .filter(player => player.season === selectorValue)             
    .map(player => player.team_abbreviation);               

    const uniqueTeams = [...new Set(teamsInSeason)].sort();   
    
    //console.log(selectorValue)
    console.log('Team: ', team, ' Season: ', season)
    
    teamsSelector.innerHTML = '';
    
    for(team of uniqueTeams){
        const newOpt = document.createElement('option');
        newOpt.textContent = team;
        newOpt.i = team;
        teamsSelector.appendChild(newOpt);
    }

  teamsSelector.value = uniqueTeams[0];  // Set the new value
  teamsSelector.dispatchEvent(new Event('change', { bubbles: true }));


})

teamsSelector.addEventListener('click', () => {
  isSearching = true
  updatePlayerInfoVisibility()
})

seasonsSelector.addEventListener('click', () => {
  isSearching = true
  updatePlayerInfoVisibility()
})

filterButton.addEventListener('click', () => {
  isSearching = false
  updatePlayerInfoVisibility()
  filter()
})




//Mis datos son jugadores y quiero buscar equipos por temporada.
//Tengo que filtrar las team abbreviations unicas de una temporada









