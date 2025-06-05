const API_KEY = '<<93eaa6dd762bc810780c57a34e60b6f1>>';
const form = document.getElementById('addForm');
const statusDiv = document.getElementById('admin-status');

form.addEventListener('submit', e => {
  e.preventDefault();
  const tmdbId = document.getElementById('tmdbId').value;
  let stored = JSON.parse(localStorage.getItem('filmesAdd')) || [];
  stored.push(tmdbId);
  localStorage.setItem('filmesAdd', JSON.stringify(stored));
  statusDiv.textContent = `Filme com ID ${tmdbId} adicionado com sucesso.`;
});
