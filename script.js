
const API_KEY = '<<93eaa6dd762bc810780c57a34e60b6f1>>';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w300';

let currentPage = 1;
let currentQuery = '';
let currentGenre = null;
let currentMode = 'popular';

const genresNav = document.getElementById('genres');
const main = document.getElementById('movies');
const pagination = document.getElementById('pagination');
const searchInput = document.getElementById('search');

async function fetchGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`);
  const data = await res.json();
  genresNav.innerHTML = '';
  data.genres.forEach(genre => {
    const btn = document.createElement('button');
    btn.textContent = genre.name;
    btn.onclick = () => {
      currentGenre = genre.id;
      currentMode = 'genre';
      currentPage = 1;
      loadMovies();
    };
    genresNav.appendChild(btn);
  });
}

async function loadMovies() {
  let url = '';
  if (currentMode === 'popular') {
    url = `${BASE_URL}/discover/movie?sort_by=release_date.desc&api_key=${API_KEY}&language=pt-BR&page=${currentPage}`;
  } else if (currentMode === 'search') {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(currentQuery)}&page=${currentPage}`;
  } else if (currentMode === 'genre') {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${currentGenre}&page=${currentPage}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  displayMovies(data.results);
  setupPagination(data.total_pages);
}

function displayMovies(movies) {
  main.innerHTML = '';
  movies.forEach(movie => {
    const div = document.createElement('div');
    div.className = 'movie-card';
    div.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
    `;
    
    div.onclick = () => window.location.href = `movie.html?id=${movie.id}`;
    main.appendChild(div);
    
  });
}

function setupPagination(totalPages) {
  pagination.innerHTML = '';
  for (let i = 1; i <= Math.min(totalPages, 10); i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.style.background = '#4caf50';
    btn.onclick = () => {
      currentPage = i;
      loadMovies();
    };
    pagination.appendChild(btn);
  }
}

searchInput.addEventListener('keyup', e => {
  if (e.key === 'Enter') {
    currentQuery = searchInput.value;
    currentMode = 'search';
    currentPage = 1;
    loadMovies();
  }
});

fetchGenres();
loadMovies();
