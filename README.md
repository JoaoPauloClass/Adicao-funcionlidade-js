# Projeto DashBoard futebol


## Contexto
Este projeto é um dashboard que exibe informações sobre as competições de futebol que estão acontecendo, aconteceram e irão acontecer. As informações são obtidas de uma API privada. Este projeto esta sendo desenvolvido por [João Paulo Class](https://github.com/JoaoPauloClass) e tem como objetivo expandir meu conhecimento em JavaScript.

## Features 
 - Trocar temas (dark, light)
	 - Trocar o tema via JavaScript.
	 - Salvar o ultimo tema que foi marcado.
- Consumir uma API
	- Consumir os dados dos campeonatos e partidas deles.
	- Tratar e utilizar esses dados para mostrar informações relevantes ao usuário.
- Criar elementos dinamicamente
	- Através dos dados passados pela API e feita a criação de elementos a partir da quantidade de dados obtidos.

## Configuração

O site foi construído utilizando **HTML, CSS e JavaScript**, sem o uso de frameworks adicionais.

## Funcionamento

### Requisição de Dados

A API é consumida da seguinte forma:

```javascript
    document.addEventListener("DOMContentLoaded", () => {
    // Consumir API
    fetch("https://api.api-futebol.com.br/v1/campeonatos", {
        method: "GET",
        headers: {
        Authorization: `Bearer ${APIkey}`, // Passar na autenticação da API
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
```

### Geração de Cards

Os campeonatos são exibidos como cards:

```javascript
function createLeagueCard(element) {
  const mainLeagues = document.querySelector(".main-leagues");
  const pastLeagues = document.querySelector(".past-leagues");

  let league = document.createElement("div");
  league.classList.add("div-leagues", `div-${element.slug}`);

  const leagueLogo = document.createElement("img");
  const leagueName = document.createElement("h3");
  const leagueYear = document.createElement("p");
  const leaguePhase = document.createElement("p");
  const leagueRound = document.createElement("p");

  if (element.status != "finalizado") {
    leagueLogo.src = element.logo;
    leagueName.textContent = element.nome;
    leagueYear.textContent = element.edicao_atual.temporada;
    leaguePhase.textContent = element.fase_atual.nome;
    leagueRound.textContent = element.rodada_atual ? element.rodada_atual.nome : null;
  } else {
    leagueLogo.src = element.logo;
    leagueName.textContent = element.nome;
    leagueYear.textContent = element.edicao_atual.temporada;
    leaguePhase.textContent = "Finalizado";
  }

  league.append(leagueLogo, leagueName, leagueYear, leaguePhase);
  if (leagueRound != null) league.appendChild(leagueRound);

  (element.status != "finalizado" ? mainLeagues : pastLeagues).appendChild(league);
}

function createCards(campeonatos) {
  campeonatos.forEach((element) => {
    createLeagueCard(element);
  });
}
```

### Tratamento de Erros

Caso haja um erro na requisição, um card de erro é gerado:

```javascript
function createErrorCard() {
  const mainLeagues = document.querySelector(".main-leagues");

  let errorLeague = document.createElement("div");
  errorLeague.classList.add("error-league");

  const errorImg = document.createElement("img");
  const errorMsg = document.createElement("p");

  errorImg.src = "../imgs/x.png";
  errorImg.alt = "Ícone de erro";
  errorMsg.textContent = "Não foi possível carregar os campeonatos";

  errorLeague.append(errorImg, errorMsg);
  mainLeagues.appendChild(errorLeague);
}
```

### Tema Escuro e Claro

O dashboard possui uma funcionalidade de troca entre tema claro e escuro, que é salvo na memória local do usuário:

```javascript
const themeSwitch = document.querySelector(
  '.checkbox-wrapper-14 input[type="checkbox"]'
);

let currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);
if (currentTheme === "dark") themeSwitch.checked = true;

const changeTheme = (element) => {
  const newTheme = element.target.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};

themeSwitch.addEventListener("change", changeTheme);
```



