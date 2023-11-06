
document.addEventListener('DOMContentLoaded', function () { //executar o script apenas depois que a pagina carregar
    const mobileMenu = document.querySelector(".mobile-menu"); //selecionar o elemento com a classe mobile-menu do HTML
    const nav = document.querySelector(".nav-header"); //selecionar o elemento com a classe nav-header do HTML
  
    mobileMenu.addEventListener('click', () => { //a div mobile menu vai executar uma função quando for clicada
      nav.classList.toggle("active"); //essa função tira se tem e coloca se nao tem a função active, que via CSS faz o menu aparecer e sumir
    });

  });
  