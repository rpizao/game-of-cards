const url_novas_cartas = "https://deckofcardsapi.com/api/deck/new/draw/?count=11";

window.onload = function(e) {
    sortearNovasCartas().then(
        cards => adicionarCartaAoHtml(cards));
}

async function sortearNovasCartas(){
    let data = await (await fetch(url_novas_cartas)).json();
    return data.cards;
}

function adicionarCartaAoHtml(cards) {
    let mesas = document.getElementsByClassName("player");

    Array.from(mesas).forEach(mesa => esconderMesa(mesa));
    /* let mesaSystem = cards[0];
    let mesaUser = cards[1];

    for (let i = 0; i < 5; i++) {
        adicionarCarta(mesaSystem, cards[i]);
    }

    for (let i = 5; i < 10; i++) {
        adicionarCarta(mesaUser, cards[i]);
    } */

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
    img_card.setAttribute("value", card.value);
    img_card.addEventListener("click", img => clicouNaCarta(img_card));

    /* <img id="codigo" src="a imagem real ou imagem invertida" content="Caso esteja invertida, é a imagem real."> */ 

    if(mesa.classList.contains("system")) {
        img_card.src = "https://deckofcardsapi.com/static/img/back.png";
        img_card.setAttribute("content", card.image);
    } else {
        img_card.src = card.image;
    }
    mesa.appendChild(img_card);
}

function clicouNaCarta(img) {
    //img.style.marginTop = "-1em";
    if(img.classList.contains("destaque")) {
        img.classList.remove("destaque");
    } else {
        img.classList.add("destaque");
    }
}

function exibirMesa(mesa) {
    mesa.classList.add("show");
}

function esconderMesa(mesa) {
    mesa.classList.remove("show");
}

function ehImpar(num) { return num % 2;}
