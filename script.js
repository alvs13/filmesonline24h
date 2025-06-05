
const filmesURL = 'filmes.json';
let filmes = [];
let categorias = ['Todos', 'Lançamentos', 'Em Alta', 'Clássicos', 'Séries'];
let filmesFiltrados = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch(filmesURL)
    .then(res => res.json())
    .then(data => {
      filmes = data;
      filmesFiltrados = filmes;
      carregarCategorias();
      carregarFilmes(filmesFiltrados);
      carregarDestaques();
  });

  document.getElementById('search').addEventListener('input', e => {
    const termo = e.target.value.toLowerCase();
    filmesFiltrados = filmes.filter(f => f.title.toLowerCase().includes(termo));
    carregarFilmes(filmesFiltrados);
  });
});

function carregarCategorias() {
  const container = document.getElementById('category-buttons');
  categorias.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.onclick = () => filtrarCategoria(cat);
    container.appendChild(btn);
  });
}

function filtrarCategoria(categoria) {
  if (categoria === 'Todos') {
    filmesFiltrados = filmes;
  } else {
    filmesFiltrados = filmes.filter(f => f.category === categoria);
  }
  carregarFilmes(filmesFiltrados);
}

function carregarFilmes(lista) {
  const container = document.getElementById('movies-container');
  container.innerHTML = '';
  lista.forEach(filme => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${filme.image}" alt="${filme.title}" />
      <div class="movie-info">
        <h3>${filme.title}</h3>
        <p>${filme.description}</p>
      </div>
    `;
    card.onclick = () => window.open(filme.video, '_blank');
    container.appendChild(card);
  });
}

function carregarDestaques() {
  const container = document.getElementById('carousel-container');
  container.innerHTML = '';
  // Destaques: pegar 5 primeiros filmes da categoria 'Lançamentos' ou 'Em Alta'
  const destaques = filmes.filter(f => f.category === 'Lançamentos' || f.category === 'Em Alta').slice(0,5);
  destaques.forEach(filme => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.style.minWidth = '250px';
    card.innerHTML = `
      <img src="${filme.image}" alt="${filme.title}" />
      <div class="movie-info">
        <h3>${filme.title}</h3>
        <p>${filme.description}</p>
      </div>
    `;
    card.onclick = () => window.open(filme.video, '_blank');
    container.appendChild(card);
  });
}
