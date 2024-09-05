const testAPIkey = "test_be09740a7b129c3d865e6677c90675";
const prodAPIkey = "live_dab12fa5cbc0a77918ce519f226975";
const APIkey = testAPIkey;
//não usar produção pois a API se tornou paga.

function createErrorCard() {
  //pegar a div principal dos campeonatos
  const mainLeagues = document.querySelector(".main-leagues");

  let errorLeague = document.createElement(`div`); //criar div para colocar o campeonato
  errorLeague.classList.add("error-league");

  const errorImg = document.createElement("img");
  const errorMsg = document.createElement("p");

  errorImg.src = "../imgs/x.png";
  errorImg.alt = "Icone de erro";
  errorMsg.textContent = "Não foi possível carregar os campeonatos";

  errorLeague.appendChild(errorImg);
  errorLeague.appendChild(errorMsg);

  mainLeagues.appendChild(errorLeague);
}

function createLeagueCard(element) {
  //pegar a div principal dos campeonatos em andamento
  const mainLeagues = document.querySelector(".main-leagues");

  //pegar a div principal dos campeoantos que acabaram
  const pastLeagues = document.querySelector(".past-leagues");

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
  if (element.status != "finalizado") {
    leagueLogo.src = element.logo;
    leagueLogo.alt = "Logo do campeonato";
    leagueName.textContent = element.nome;
    leagueYear.textContent = element.edicao_atual.temporada;
    leaguePhase.textContent = element.fase_atual.nome;
    leagueRound.textContent = element.rodada_atual
      ? element.rodada_atual.nome
      : null;
  } else if (element.status === "finalizado") {
    leagueLogo.src = element.logo;
    leagueLogo.alt = "Logo do campeonato";
    leagueName.textContent = element.nome;
    leagueYear.textContent = element.edicao_atual.temporada;
    leaguePhase.textContent = "Finalizado";
  }

  //colocar os elementos na div
  league.appendChild(leagueLogo);
  league.appendChild(leagueName);
  league.appendChild(leagueYear);
  league.appendChild(leaguePhase);

  //se a liga tiver em qual rodada esta, aparecer na div
  if (leagueRound != null) {
    league.appendChild(leagueRound);
  }

  if (element.status != "finalizado") {
    mainLeagues.appendChild(league);
  } else if (element.status === "finalizado") {
    //informar ao usuario que está finalizado
    //colocar a div na div principal com os campeonatos
    pastLeagues.appendChild(league);
  }
}

function createCards(campeonatos) {
  //para cada campeonato criar seu cartão
  campeonatos.forEach((element) => {
    createLeagueCard(element); // criar cartão de campeonato
  });
}

// ------------------- MAIN -------------------
document.addEventListener("DOMContentLoaded", () => {
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
    })
    .catch((error) => {
      createErrorCard("league");
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
