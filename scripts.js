Embaralhar(prompt("Com quantas cartas você quer jogar?"));
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
}
function tiraAnticlick(desse){
    desse.querySelector(".front-face").classList.remove("anti-click")
}
function viraCarta(cartaQvira) {
    cartaQvira.querySelector(".front-face").classList.toggle("giro-front-face");
    cartaQvira.querySelector(".back-face").classList.toggle("giro-back-face");
}
function Embaralhar(quantidade) {
    const listaTipos = ["bobrossparrot.gif","explodyparrot.gif","fiestaparrot.gif","metalparrot.gif","revertitparrot.gif","tripletsparrot.gif","unicornparrot.gif"];
    listaTipos.sort(comparador);
    const listaFinal = [];
    for (var i = 0; i < quantidade/2; i++){
        listaFinal.push(listaTipos[i]);
    }
    for (var i = 0; i < quantidade/2; i++){
        listaFinal.push(listaFinal[i]);
    }

    listaFinal.sort(comparador);

    for (var i = 0; i < quantidade; i++){
        var cards = document.querySelector(".cards");
        cards.innerHTML += `
        <div class="card" onclick="cliqueCarta(this)">
        <div class="front-face face">
            <img src="images/back.png" alt="">
        </div>
        <div class="back-face face">
            <img src="images/${listaFinal[i]}" alt="">
        </div>`;
    }
}
function comparador() {
    return Math.random() - 0.5;
}