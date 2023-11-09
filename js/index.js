const todaysMatches = document.getElementsByClassName('todays-matches')
const mainLeagues = document.querySelector('.main-leagues')

document.addEventListener("DOMContentLoaded", () => {

    const testAPIkey = 'test_2f391f89e479a44134ad08f1357035'
    const APIkey = 'live_dab12fa5cbc0a77918ce519f226975'

// ---------------------------- CAMPEONATOS ---------------------------- 
fetch('https://api.api-futebol.com.br/v1/campeonatos', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${APIkey}`
    }
})
.then((response => response.json()))
.then(data => {
    console.log(data);
    const campeonatos = data;
    let incommingLeagues = [];
 

    let i = 0;
    campeonatos.forEach(element => {
        if (element.status != "finalizado") {
            
        incommingLeagues.push(element.campeonato_id)

        let league = document.createElement(`div`)
        league.classList.add('div-leagues')
        league.classList.add(`div-${element.slug}`)

        const leagueLogo = document.createElement('img')
        const leagueName = document.createElement('h3')
        const leagueYear = document.createElement('p')
        const leaguePhase = document.createElement('p')
        const leagueRound = document.createElement('p')

        leagueLogo.src = element.logo
        leagueLogo.alt = "Logo do campeonato"

        leagueName.textContent = element.nome
        leagueYear.textContent = element.edicao_atual.temporada
        leaguePhase.textContent = element.fase_atual.nome
        leagueRound.textContent = element.rodada_atual ? element.rodada_atual.nome : null

        league.appendChild(leagueLogo)
        league.appendChild(leagueName)
        league.appendChild(leagueYear)
        league.appendChild(leaguePhase)
        if (leagueRound != null) {
            league.appendChild(leagueRound)
        }

        mainLeagues.appendChild(league)

        i++;
        }
    });





})
// ---------------------------- PARTIDAS ---------------------------- 
/*
<div class="div-match">
       <div>
          <img src="https://cdn.api-futebol.com.br/escudos/638d34a851005.svg" alt="logo time mandante">
          <p>River-PI</p>

          <span>X</span>

          <p>Bahia</p>
          <img src="https://cdn.api-futebol.com.br/escudos/638d34a8b6bd8.svg" alt="logo time visitante">
       </div>
        <p>05/02/2020</p>
        <p>Finalizado</p>
      </div>
*/
incommingLeagues.forEach(element => {

    fetch(`https://api.api-futebol.com.br/v1/campeonatos/${element}/partidas`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${testAPIkey}`
    }})
    .then((response => response.json()))
    .then(data => {
    
        const matches = data;









})




















})
});

// ---------------------------- TEMA ---------------------------- 
const themeSwitch = document.querySelector('.checkbox-wrapper-14 input[type="checkbox"]')

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null

if(currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme)
    if (currentTheme === 'dark'){
        themeSwitch.checked = true;
    }
}

const changeTheme = (element) => {
    if(element.target.checked){
        document.documentElement.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
    }else{
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
    }
}

themeSwitch.addEventListener('change', changeTheme)