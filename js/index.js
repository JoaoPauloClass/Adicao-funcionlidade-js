function createLeagueCard(element) {
  //pegar a div principal dos campeonatos
  const mainLeagues = document.querySelector(".main-leagues");

  let league = document.createElement(`div`); //criar div para colocar o campeonato
  league.classList.add("div-leagues");
  league.classList.add(`div-${element.slug}`);

  //criar elementos da div
  const leagueLogo = document.createElement("img");
  const leagueName = document.createElement("h3");
  const leagueYear = document.createElement("p");
  const leaguePhase = document.createElement("p");
  const leagueRound = document.createElement("p");

  //atribuir o conteudo os elementos
  leagueLogo.src = element.logo;
  leagueLogo.alt = "Logo do campeonato";
  leagueName.textContent = element.nome;
  leagueYear.textContent = element.edicao_atual.temporada;
  leaguePhase.textContent = element.fase_atual.nome;
  leagueRound.textContent = element.rodada_atual
    ? element.rodada_atual.nome
    : null;

  //colocar os elementos na div
  league.appendChild(leagueLogo);
  league.appendChild(leagueName);
  league.appendChild(leagueYear);
  league.appendChild(leaguePhase);

  //se a liga tiver em qual rodada esta, aparecer na div
  if (leagueRound != null) {
    league.appendChild(leagueRound);
  }

  //colocar a div na div principal com os campeonatos
  mainLeagues.appendChild(league);
}

function createMatchCard(element) {
  /*
    // ---- CRIAR OS CARTÕES DE PARTIDAS ----
    const todaysMatches = document.querySelector('.todays-matches-div')

    //id dos campeonatos que estão acontecendo
    incommingLeagues.forEach((element) => {
      console.log(incommingLeagues);

      //pegar as partidas que já aconteceram ou vão acontecer usando o id dos campeonatos que estão acontecendo
      fetch(
        `https://api.api-futebol.com.br/v1/campeonatos/${element}/partidas`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${APIkey}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          const fase = data.partidas.partidas["primeira-fase"];

          //acessando as chaves
          for (var key in fase) {
            console.log(key);
            let chave = fase[key];
            console.log(chave);

            const match = document.createElement("div");
            match.classList.add("div-match");

            const matchDiv1 = document.createElement("div");
            const matchDiv2 = document.createElement("div");

            match.appendChild(matchDiv1);
            match.appendChild(matchDiv2);

            //criar elementos da primeira div
            const homeTeamLogo = document.createElement("img");

            const homeTeamName = document.createElement("p");

            const xSpan = document.createElement("span");

            const visitorTeamName = document.createElement("p");

            const visitorTeamLogo = document.createElement("img");

            //criar elementos da segunda div
            const matchDate = document.createElement("p");
            const matchStatus = document.createElement("p");

            homeTeamLogo.src = chave.ida.time_mandante.escudo;
            homeTeamLogo.alt = "Logo do time mandante";

            visitorTeamLogo.src = chave.ida.time_visitante.escudo;
            visitorTeamLogo.alt = "Logo do time visitante";

            leagueLogo.src = element.logo;
            leagueLogo.alt = "Logo do campeonato";

            leagueName.textContent = element.nome;
            leagueYear.textContent = element.edicao_atual.temporada;
            leaguePhase.textContent = element.fase_atual.nome;
            leagueRound.textContent = element.rodada_atual
              ? element.rodada_atual.nome
              : null;

            league.appendChild(leagueLogo);
            league.appendChild(leagueName);
            league.appendChild(leagueYear);
            league.appendChild(leaguePhase);

            todaysMatches.appendChild(match);
          }
        });

      // ---------------------------- FILTRAR PARTIDAS ----------------------------

      fetch("https://api.api-futebol.com.br/v1/ao-vivo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${APIkey}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const liveMatches = data;

          console.log("filtrar");

          console.log(liveMatches.placar);
        });
    });*/
}

function createCards(campeonatos) {
  //array para colocar o id dos campeonatos que estão ocorrendo
  var incommingLeagues = [];

  //verificar quais campeonatos estão ocorrendo
  campeonatos.forEach((element) => {
    if (element.status != "finalizado") {
      createLeagueCard(element); // criar cartão de campeonato
      incommingLeagues.push(element.campeonato_id); // colocar o id do campeonato no array de campeonatos que estão ocorrendo
    }
  });
}

// ------------------- MAIN -------------------
document.addEventListener("DOMContentLoaded", () => {
  const testAPIkey = "test_2f391f89e479a44134ad08f1357035";
  const prodAPIkey = "live_dab12fa5cbc0a77918ce519f226975";
  const APIkey = testAPIkey;

  //consumir API
  fetch("https://api.api-futebol.com.br/v1/campeonatos", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${APIkey}`, //passar na autenticação da API
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const campeonatos = data;

      createCards(campeonatos);
    });
});

// ---------------------------- TEMA ----------------------------

//pegar o botao de trocar tema
const themeSwitch = document.querySelector(
  '.checkbox-wrapper-14 input[type="checkbox"]'
);

//pegar qual o tema que o usuario estava usando
let currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

//se o tema guardado nao for nulo, setar o tema atual para o tema guardado
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    themeSwitch.checked = true; //caso o tema guardado seja escuro, deixar o botao ativo
  }
} else if (currentTheme == null) {
  //caso o tema guardado seja nulo, setar para tema branco (padrão)
  currentTheme = "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
}

//fazer a troca de tema
const changeTheme = (element) => {
  if (element.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
};

//quando o botao sofrer alguma mudança, ele troca o tema
themeSwitch.addEventListener("change", changeTheme);
