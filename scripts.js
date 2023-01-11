function cliqueCarta(cartaClicada) {
    const checaSeAchada = cartaClicada.querySelector(".achou");
    if (checaSeAchada != null) {//se já achada
        //nada aconteca
    } else {//se carta livre para seleção
        const checaSelecionado = document.querySelector(".selecionado");
        
        if (checaSelecionado != null){//se já existe alguma carta selecionada
            const anterior = checaSelecionado;
            anterior.classList.remove("selecionado");
            anterior.classList.add("anterior");
        }

        cartaClicada.classList.add("selecionado")
        const 

        if (document.querySelector(".selecionado .front-face").innerHTML === document.querySelector(".anterior .front-face").innerHTML){
            console.log("igual")
        } else {console.log("diferente")}
    }
}
