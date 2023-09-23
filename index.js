const url_novas_cartas = "https://deckofcardsapi.com/api/deck/new/draw/?count=10";

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

    if(mesa.classList.contains("system")) {
        img_card.src = "https://deckofcardsapi.com/static/img/back.png";
        img_card.setAttribute("content", card.image);
    } else {
        img_card.src = card.image;
    }
    mesa.appendChild(img_card);
}

function exibirMesa(mesa) {
    mesa.classList.add("show");
}

function esconderMesa(mesa) {
    mesa.classList.remove("show");
}

function ehImpar(num) { return num % 2;}
