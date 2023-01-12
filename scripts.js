function cliqueCarta(cartaClicada) {
    const checaSeAchada = cartaClicada.querySelector(".achou");
    let checaSeMesma = document.querySelector(".selecionado");
    if (checaSeMesma != null) {
        checaSeMesma = checaSeMesma.parentNode;
    }
    if (checaSeAchada != null || checaSeMesma === cartaClicada) {//se já achada
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
                    console.log("igual");
                    cartaClicada.querySelector(".front-face").classList.add("achou");
                    seAnterior.querySelector(".front-face").classList.add("achou");
                    viraCarta(cartaClicada);
                    cartaClicada.querySelector(".front-face").classList.remove("selecionado");
                    seAnterior.querySelector(".front-face").classList.remove("anterior");
                } else {
                    console.log("diferente");
                    viraCarta(cartaClicada);
                    setTimeout(viraCarta, 1000, cartaClicada);
                    setTimeout(viraCarta, 1000, seAnterior);
                    cartaClicada.querySelector(".front-face").classList.remove("selecionado");
                    seAnterior.querySelector(".front-face").classList.remove("anterior");
                }
            }
        }
    }
function viraCarta(cartaQvira) {
    cartaQvira.querySelector(".front-face").classList.toggle("giro-front-face");
    cartaQvira.querySelector(".back-face").classList.toggle("giro-back-face");
}