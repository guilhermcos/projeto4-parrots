inicioJogo()
var achadas, quant, divTimer, timer, tempo, contaJogadas;
function inicioJogo() {
    divTimer = document.querySelector(".timer");
    contaJogadas = 0;
    var cards = document.querySelector("div.cards");
    cards.innerHTML = "";
    var quantCartas = 0;
    while (quantCartas % 2 !== 0 || quantCartas > 14 || quantCartas < 4) {
        quantCartas = prompt("Com quantas cartas você quer jogar? (qualquer quantidade par de 4 à 14)");
        quantCartas = Number(quantCartas)
    }
    divTimer.innerHTML = 0;
    tempo = setInterval(timer, 1000);
    embaralhar(quantCartas);
}
function cliqueCarta(cartaClicada) {
    const checaSeAchada = cartaClicada.querySelector(".achou");
    let checaSeMesma = document.querySelector(".selecionado");
    impedeClick = document.querySelector(".anti-click")
    if (checaSeMesma != null) {
        checaSeMesma = checaSeMesma.parentNode;
    }
    if (checaSeAchada != null || checaSeMesma === cartaClicada || impedeClick != null) {//se já achada
        //nada aconteca
    } else {//se carta livre para seleção
        contaJogadas += 1;
        const checaSelecionado = document.querySelector(".selecionado");
        if (checaSelecionado != null) {//se já existe alguma carta selecionada
            const anterior = checaSelecionado;
            anterior.classList.remove("selecionado");
            anterior.classList.add("anterior");
        }

        cartaClicada.querySelector(".front-face").classList.add("selecionado");
        let seAnterior = document.querySelector(".anterior");
        if (seAnterior === null) {//se não existe carta anterior
            viraCarta(cartaClicada);
        } else {//se  existe carta anterior
            seAnterior = seAnterior.parentNode
            if (seAnterior.querySelector(".back-face").innerHTML == cartaClicada.querySelector(".back-face").innerHTML) {
                //se front-face da selecionada e anterior são iguais
                cartaClicada.querySelector(".front-face").classList.add("achou");
                seAnterior.querySelector(".front-face").classList.add("achou");
                viraCarta(cartaClicada);
                cartaClicada.querySelector(".front-face").classList.remove("selecionado");
                seAnterior.querySelector(".front-face").classList.remove("anterior");
            } else {
                viraCarta(cartaClicada);
                cartaClicada.querySelector(".front-face").classList.remove("selecionado");
                seAnterior.querySelector(".front-face").classList.remove("anterior");
                cartaClicada.querySelector(".front-face").classList.add("anti-click");
                setTimeout(viraCarta, 1000, cartaClicada);
                setTimeout(viraCarta, 1000, seAnterior);
                setTimeout(tiraAnticlick, 1000, cartaClicada);
            }
        }
    }
    const seGanhou = document.querySelectorAll(".achou");
    if (seGanhou.length === quant) {
        clearInterval(tempo);
        tempoJogo = divTimer.innerHTML;
        setTimeout(alert, 500, `Você ganhou em ${contaJogadas} jogadas! A duração do jogo foi de ${tempoJogo} segundos!`);
        setTimeout(reinicioJogo, 600);
    }
}
function reinicioJogo() {
    var jogarDenovo = "";
    while (jogarDenovo != "sim" && jogarDenovo != "não") {
        jogarDenovo = prompt("Gostaria de reiniciar o jogo? ('sim' ou 'não')");
        if (jogarDenovo === "sim") {
            inicioJogo();
        }
    }
}
function tiraAnticlick(desse) {
    desse.querySelector(".front-face").classList.remove("anti-click")
}
function viraCarta(cartaQvira) {
    cartaQvira.querySelector(".front-face").classList.toggle("giro-front-face");
    cartaQvira.querySelector(".back-face").classList.toggle("giro-back-face");
}
function embaralhar(quantidade) {
    quant = Number(quantidade);
    const listaTipos = ["bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "unicornparrot.gif"];
    listaTipos.sort(comparador);
    const listaFinal = [];
    for (var i = 0; i < quantidade / 2; i++) {
        listaFinal.push(listaTipos[i]);
    }
    for (var i = 0; i < quantidade / 2; i++) {
        listaFinal.push(listaFinal[i]);
    }

    listaFinal.sort(comparador);

    for (var i = 0; i < quantidade; i++) {
        var cards = document.querySelector(".cards");
        cards.innerHTML += `
        <div data-test="card" class="card" onclick="cliqueCarta(this)">
        <div class="front-face face">
            <img data-test="face-down-image" src="images/back.png" alt="">
        </div>
        <div class="back-face face">
            <img data-test="face-up-image" src="images/${listaFinal[i]}" alt="">
        </div>`;
    }
}
function comparador() {
    return Math.random() - 0.5;
}
function timer() {
    divTimer.innerHTML = Number(divTimer.innerHTML) + 1;
}