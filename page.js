const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=e56f6a862f0b776510d60f5fadb2d903&query="'

let titlePage = document.querySelector('title');
// console.log(title)


// pegar o link search
const url = window.location.href;

const mv = url.split('?=');
const search = mv[1];
console.log(search)
movieName(search)


// passar para a funçao e buscar o filme pelo nome
function movieName(search) {
    let mv = SEARCH_API + search;
    getMovie(mv)
}

async function getMovie(mv) {
    const resp = await fetch(SEARCH_API + mv);
    const data = await resp.json()
    
    let container = document.querySelector('.container')
    container.innerHTML = ''

    const { original_title, poster_path, vote_average, overview, release_date } = data.results[0];

    // exibir na tela as infos do filme

    titlePage.innerText = original_title

    let div = document.createElement('div')
    div.classList.add('moviePage')

    div.innerHTML = `
        <div class="title">${original_title}</div>
        <div class="img"><img src="${IMG_PATH + poster_path}"></div>
        <div class="average"><span class="${getAverage(vote_average)}">${vote_average}</span></div>
        <div class="desc">Overview:<p>${overview}</p></div>
        <div class="desc">Realease Date:<p>${release_date}</p></div>
    `;

    container.appendChild(div);
}

function getAverage(va) {
    if(va >= 8) {
        return 'green';
    } else if(va >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}