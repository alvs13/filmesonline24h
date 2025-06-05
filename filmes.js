const filmes = [
  {
    "title": "Nosferatu (1922)",
    "description": "Clássico do terror silencioso. Domínio público.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Nosferatu_poster.jpg/440px-Nosferatu_poster.jpg",
    "video": "https://www.youtube.com/watch?v=FC6jFoYm3xs"
  },
  {
    "title": "A Viagem à Lua (1902)",
    "description": "Um dos primeiros filmes de ficção científica. Domínio público.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Le_Voyage_dans_la_Lune.jpg/440px-Le_Voyage_dans_la_Lune.jpg",
    "video": "https://www.youtube.com/watch?v=7JDaOOw0MEE"
  }
];

const container = document.getElementById('filmes');
filmes.forEach(filme => {
  const card = document.createElement('div');
  card.className = 'bg-gray-800 rounded-xl overflow-hidden shadow-lg';

  card.innerHTML = `
    <img src="${filme.image}" alt="${filme.title}" class="w-full h-64 object-cover">
    <div class="p-4">
      <h3 class="text-lg font-bold mb-1">${filme.title}</h3>
      <p class="text-sm text-gray-300 mb-2">${filme.description}</p>
      <a href="${filme.video}" target="_blank" class="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded">▶ Assistir</a>
    </div>
  `;

  container.appendChild(card);
});