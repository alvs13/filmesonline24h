
async function adicionarFilme() {
  const id = document.getElementById('movieId').value.trim();
  const buttonText = document.getElementById('buttonText').value.trim();
  const buttonLink = document.getElementById('buttonLink').value.trim();
  const message = document.getElementById('successMessage');

  if (!id || !buttonText || !buttonLink) {
    message.textContent = "Preencha todos os campos!";
    return;
  }

  const apiKey = "93eaa6dd762bc810780c57a34e60b6f1"; // Sua API TMDb
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`);
  if (!res.ok) {
    message.textContent = "Filme não encontrado.";
    return;
  }

  const filme = await res.json();
  filme.customButton = {
    text: buttonText,
    link: buttonLink
  };

  localStorage.setItem(`filme-${id}`, JSON.stringify(filme));
  message.textContent = `🎉 Filme "${filme.title}" adicionado com botão personalizado!`;
}
