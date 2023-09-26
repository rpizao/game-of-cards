/* 
    PENDÊNCIAS FUNCIONAIS
    - O jogo só terminar quando todas as cartas tiverem sido comparadas, ou seja, será uma melhor de 5 jogadas.
    - O sorteio da carta da máquina ser feito de forma automática (use o método random!)
    - Exibir o placar
    - Trocar a mensagem de vitória do console.log para algum ponto local em destaque no HTML.

    PENDÊNCIAS EXTRAS
    - A carta jogada poderia "executar" um efeito ao ser movida para o centro da mesa.
*/

const url_novas_cartas = "https://deckofcardsapi.com/api/deck/new/draw/?count=11";
let resultadoSistema;
let resultadoUsuario;

window.onload = function(e) {
    sortearNovasCartas();
}

function sortearNovasCartas() {
    limparMesa();

    sortearCartas().then(
        cards => adicionarCartaAoHtml(cards));
}

function limparMesa(){
    resultadoSistema = null;
    resultadoUsuario = null;

    let mesas = document.getElementsByClassName("player");
    Array.from(mesas).forEach(mesa => {
        Array.from(mesa.children).forEach(child => mesa.removeChild(child));
    });
}

async function sortearCartas(){
    let data = await (await fetch(url_novas_cartas)).json();
    return data.cards;
}

function adicionarCartaAoHtml(cards) {
    let mesas = document.getElementsByClassName("player");

    Array.from(mesas).forEach(mesa => esconderMesa(mesa));

    if(ehImpar(Array.from(cards).length)){
        console.log("Retiramos a carta " + cards[cards.length - 1].code);
        cards = Array.from(cards).slice(0, Array.from(cards).length - 1);
    }

    for (let i = 0; i < cards.length; i++) {
        const mesa = ehImpar(i) ? mesas[0] : mesas[1];
        adicionarCarta(mesa, cards[i]);
    }

    Array.from(mesas).forEach(mesa => exibirMesa(mesa));
}

function adicionarCarta(mesa, card){
    let img_card = document.createElement("img");
    img_card.id = card.code;
    img_card.setAttribute("value", atribuirPesoCarta(card.value)); // QUEEN, JACK, KING, ACE
    
    if(mesa.classList.contains("system")) {
        // Cartas do sistema
        img_card.src = "https://deckofcardsapi.com/static/img/back.png";
        img_card.setAttribute("content", card.image);
        img_card.setAttribute("escondida", "true");
        img_card.addEventListener("click", img => resultadoSistema = recuperarResultado(img_card));
        img_card.addEventListener("click", img => clicarCartaMesaSistema(img_card));
    } else {
        // Cartas do usuário
        img_card.src = card.image;
        img_card.addEventListener("click", img => resultadoUsuario = recuperarResultado(img_card));
        img_card.addEventListener("click", img => clicarCartaMesaUsuario(img_card));
    }
    mesa.appendChild(img_card);
}

function atribuirPesoCarta(valor){
    if(valor == "ACE"){
        return 14;
    }
    if(valor == "KING"){
        return 13;
    }
    if(valor == "JACK") {
        return 12;
    }
    if(valor == "QUEEN") {
        return 11;
    }
    return valor;
}

function selecionarCarta(img) {
    // Centralizou a carta selecionada
    img.classList.add("selecionada");
}

function clicarCartaMesaUsuario(img) {
    // Centralizou a carta selecionada
    selecionarCarta(img);

    // Finaliza o jogo, se ambas as cartas já foram jogadas.
    finalizarOJogoSePossivel();
}

function clicarCartaMesaSistema(img) {
    // Centralizou a carta selecionada
    selecionarCarta(img);
    // Exibiu a carta selecionada, se ela estiver escondida
    revelarCartaEscondida(img);

    // Finaliza o jogo, se ambas as cartas já foram jogadas.
    finalizarOJogoSePossivel();
}

function revelarCartaEscondida(img){
    if(img.hasAttribute("escondida")) {
        img.src = img.getAttribute("content");
    }
}

function recuperarResultado(img) {
    return Number.parseInt(img.getAttribute("value"));
}

function exibirMesa(mesa) {
    mesa.classList.add("show");
}

function esconderMesa(mesa) {
    mesa.classList.remove("show");
}

function ehImpar(num) { return num % 2;}

function finalizarOJogoSePossivel() {
    // TODO: Incluir random para selecionar uma carta na mesa do sistema
    /* resultadoSistema = recuperarResultado(img_card);
    clicarCartaMesaSistema(img_card); */

    if(resultadoUsuario == null || resultadoSistema == null){
        return;
    }

    if(resultadoUsuario > resultadoSistema) {
        console.log("Usuário ganhou!!");
    }
    else if(resultadoUsuario < resultadoSistema) {
        console.log("Usuário perdeu!!");
    } 
    else {
        console.log("Empate!");
    }

    setTimeout(() => sortearNovasCartas(), 8000);
}