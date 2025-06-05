
async function carregarFilmes() {
    const res = await fetch('filmes.json');
    const filmes = await res.json();
    const container = document.getElementById('filmes-container');
    container.innerHTML = '';

    const busca = document.getElementById('search').value.toLowerCase();

    filmes.forEach(filme => {
        if (filme.title.toLowerCase().includes(busca)) {
            const div = document.createElement('div');
            div.className = 'filme';
            div.innerHTML = `
                <img src="${filme.image}" alt="${filme.title}">
                <div class="filme-info">
                    <h3>${filme.title}</h3>
                    <p>${filme.description}</p>
                    <a href="${filme.video}" target="_blank">Assistir</a>
                </div>
            `;
            container.appendChild(div);
        }
    });
}

document.getElementById('search').addEventListener('input', carregarFilmes);
carregarFilmes();
