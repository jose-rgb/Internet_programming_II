//tempo de exeçução
let time = 1000;
//imagem com opacidade = 1
let currentImageIndex = 0;
//todas as imgs
let images = document.querySelectorAll("#slider img")
//num de imgs
let max = images.length;

function nextImage(){
    //removendo classe selected do elemento atual
    images[currentImageIndex].classList.remove("selected")

    //incremento no index para trocar de imagem
    currentImageIndex++

    //verificando se atingiu o max de imgs
    if(currentImageIndex >= max) {
        currentImageIndex = 0;
    }

    //adicionando classe selected na imagem 
    images[currentImageIndex].classList.add("selected")
}

function start(){
    setInterval(()=>{
        nextImage()
    }, time)
}

window.addEventListener("load", start())