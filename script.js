const API_KEY = 'YOUR_API_KEY_HERE'; // Troque pela sua API key TMDb
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

let filmes = [];
let filmesFiltrados = [];
let categorias = [
  { id: 28, name: 'Ação' },
  { id: 35, name: 'Comédia' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Terror' },
  { id: 10749, name: 'Romance' },
];

document.addEventListener('DOMContentLoaded', () => {
  carregarCategorias();
  carregarFilmesPopulares();
  carregarDestaques();

  document.getElementById('search').addEventListener('input', e => {
    const termo = e.target.value.toLowerCase();
    if(termo.length < 3) {
      carregarFilmesPopulares();
      return;
    }
    buscarFilmes(termo);
  });
});

function carregarCategorias() {
  const container = document.getElementById('category-buttons');
  categorias.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat.name;
    btn.onclick = () => carregarFilmesCategoria(cat.id, btn);
    container.appendChild(btn);
  });
}

function carregarFilmesPopulares() {
  fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
    .then(res => res.json())
    .then(data => {
      filmes = data.results;
      filmesFiltrados = filmes;
      carregarFilmes(filmesFiltrados);
    });
}

function carregarFilmesCategoria(id, botao) {
  fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}&language=pt-BR&page=1`)
    .then(res => res.json())
    .then(data => {
      filmesFiltrados = data.results;
      carregarFilmes(filmesFiltrados);
      // marcar botão ativo
      document.querySelectorAll('#category-buttons button').forEach(b => b.classList.remove('active'));
      botao.classList.add('active');
    });
}

function buscarFilmes(query) {
  fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR&page=1`)
    .then(res => res.json())
    .then(data => {
      filmesFiltrados = data.results;
      carregarFilmes(filmesFiltrados);
      document.querySelectorAll('#category-buttons button').forEach(b => b.classList.remove('active'));
    });
}

function carregarFilmes(lista) {
  const container = document.getElementById('movies-container');
  container.innerHTML = '';
  if (!lista.length) {
    container.innerHTML = '<p>Nenhum filme encontrado.</p>';
    return;
  }
  lista.forEach(filme => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${filme.poster_path ? IMAGE_BASE_URL + filme.poster_path : ''}" alt="${filme.title}" />
      <div class="movie-info">
        <h3>${filme.title}</h3>
        <p>${filme.overview || 'Sem descrição disponível.'}</p>
      </div>
    `;
    card.onclick = () => {
      const url = \`https://www.themoviedb.org/movie/\${filme.id}\`;
      window.open(url, '_blank');
    };
    container.appendChild(card);
  });
}

function carregarDestaques() {
  fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('carousel-container');
      container.innerHTML = '';
      data.results.slice(0,5).forEach(filme => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.style.minWidth = '300px';
        card.innerHTML = `
          <img src="${filme.poster_path ? IMAGE_BASE_URL + filme.poster_path : ''}" alt="${filme.title}" />
          <div class="movie-info">
            <h3>${filme.title}</h3>
            <p>${filme.overview || 'Sem descrição disponível.'}</p>
          </div>
        `;
        card.onclick = () => {
          const url = \`https://www.themoviedb.org/movie/\${filme.id}\`;
          window.open(url, '_blank');
        };
        container.appendChild(card);
      });
    });
}
