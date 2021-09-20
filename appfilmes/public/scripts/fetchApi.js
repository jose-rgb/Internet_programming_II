const createMovieElement = (item) => {
      //template
      const template = document.getElementById('card-template');

      //criando novo card com o template
      const cardElement = document.importNode(template.content, true)

      //campos dos atributos
      const itensFilme = cardElement.querySelectorAll('h3 span');

      //spans
      itensFilme[0].innerText = item.nome
      itensFilme[1].innerText = item.genero
      itensFilme[2].innerText = item.duracao
      itensFilme[3].innerText = item.ano

      return cardElement
}

const getMovies = async () => {
     
    const response = await fetch('http://localhost:3000/filmes')
    const dataJson = await response.json()
    const data = dataJson[0]
    
    //para cada item
    data.forEach(item => {
        //container dos cards
        const containerCards =  document.getElementById('cards');

        //criando card
        const cardElement = createMovieElement(item)

        //adicionando card criado
        containerCards.append(cardElement)
    })
 
}


const newMovie = async () => {
    // html/hbs
    const filmeNomeElement = document.getElementById('filme-nome');
    const filmeGeneroElement = document.getElementById('filme-genero');
    const filmeDuracaoElement = document.getElementById('filme-duracao');
    const filmeAnoElement = document.getElementById('filme-ano');

    //criando obejct filme
    const movie = {
        nome: filmeNomeElement.value,
        genero: filmeGeneroElement.value,
        duracao: Number(filmeDuracaoElement.value),
        ano: Number(filmeAnoElement.value) 
    }

    //request info.
    const init = {
        method: 'POST',
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(movie)
    }

    //api
    const response = await fetch('http://localhost:3000/filmes', init);
    const data= await response.json()
    //const data = dataJson[0]

    //adicionar novo filme a listagem
     //container dos cards
     const containerCards =  document.getElementById('cards');

     //criando card
     const cardElement = createMovieElement(data)

     //adicionando card criado
     containerCards.prepend(cardElement)
}

//iniciar após carregar a página
window.onload = () => {
    getMovies()

    const btnaddNewMovie = document.getElementById('addNewMovie')

    btnaddNewMovie.onclick = newMovie
}