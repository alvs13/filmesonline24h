
const API_KEY = '<<93eaa6dd762bc810780c57a34e60b6f1';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const movieId = new URLSearchParams(window.location.search).get('id');

fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('movie-details').innerHTML = `
      <h1>${data.title}</h1>
      <img src="${IMG_URL + data.poster_path}" />
      <p><strong>Sinopse:</strong> ${data.overview}</p>
      <p><strong>Nota:</strong> ${data.vote_average}</p>
      <p><strong>Data de Lançamento:</strong> ${data.release_date}</p>
    `;
  });
