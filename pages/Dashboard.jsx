import React, { useState } from "react";
import { addMovie } from "../firebaseFirestore";
import { gerarSinopseCurta } from "../services/gpt";

const API_KEY = "93eaa6dd762bc810780c57a34e60b6f1";

export default function Dashboard() {
  const [query, setQuery] = useState(""); const [results, setResults] = useState([]); const [msg, setMsg] = useState("");

  const buscarFilmes = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`);
    const data = await res.json(); setResults(data.results);
  };

  const adicionarFilme = async (filme) => {
    const sinopseCurta = await gerarSinopseCurta(filme.overview);
    await addMovie({
      tmdbId: filme.id,
      title: filme.title,
      releaseDate: filme.release_date,
      originalOverview: filme.overview,
      shortOverview: sinopseCurta,
      posterPath: filme.poster_path,
      createdAt: new Date()
    });
    setMsg(`Filme "${filme.title}" adicionado!`);
  };

  return (
    <div>
      <h1>Painel de Controle</h1>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Nome do filme" />
      <button onClick={buscarFilmes}>Buscar</button>
      {msg && <p>{msg}</p>}
      {results.map(filme => (
        <div key={filme.id}>
          <h3>{filme.title}</h3>
          <p>{filme.overview}</p>
          <button onClick={() => adicionarFilme(filme)}>Adicionar</button>
        </div>
      ))}
    </div>
  );
}