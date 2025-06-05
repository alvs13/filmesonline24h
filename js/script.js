
const API_KEY = '93eaa6dd762bc810780c57a34e60b6f1'; // substitua por sua chave
const grid = document.getElementById('moviesGrid');
const searchInput = document.getElementById('searchInput');

async function fetchMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  displayMovies(data.results);
}

function displayMovies(movies) {
  grid.innerHTML = '';
  movies.forEach(movie => {
    const el = document.createElement('div');
    el.classList.add('movie');
    el.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" />
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <span>${movie.release_date?.split('-')[0] || ''}</span>
      </div>`;
    grid.appendChild(el);
  });
}

function filterGenre(genre) {
  fetchMovies(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}`);
}

searchInput.addEventListener('input', (e) => {
  const q = e.target.value;
  if (q.length > 2) {
    fetchMovies(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${q}`);
  }
});

fetchMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
