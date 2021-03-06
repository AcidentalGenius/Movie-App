const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e56f6a862f0b776510d60f5fadb2d903&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=e56f6a862f0b776510d60f5fadb2d903&query="'

const main = document.querySelector('.main')
const form = document.querySelector('.form');
const search = document.querySelector('.search')

//Get initial movies
getMovies(API_URL);

async function getMovies(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data.results)
    showMovies(data.results);
}


function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach(movie=>{
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        

        movieEl.innerHTML = `
            <a href="movie.html?=${title}">
                <img src="${IMG_PATH + poster_path}">

                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>

                <div class="overview">
                    <h3>Overview</h3>
                    ${overview}
                </div>
            </a>
        `;

        main.appendChild(movieEl);
        // movieEl.addEventListener('click', movieEl.hover)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green';
    } else if(vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}


form.addEventListener('submit', e=>{
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);

        search.value = '';
    } else {
        window.location.reload();
    }
})

