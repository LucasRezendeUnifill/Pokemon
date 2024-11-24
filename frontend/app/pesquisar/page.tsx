/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

// Define os tipos para o estado do Pokémon
interface Pokemon {
  nome: string;
  imagem: string;
  tipos: string[];
  habilidades: string[];
  altura: number;
  peso: number;
}

const PesquisarPokemon: React.FC = () => {
  const [search, setSearch] = useState<string>(""); // Nome do Pokémon digitado
  const [pokemon, setPokemon] = useState<Pokemon | null>(null); // Dados do Pokémon
  const [error, setError] = useState<string>(""); // Erro na busca

  const handleSearch = async () => {
    if (!search) {
      setError("Digite o nome de um Pokémon!");
      return;
    }

    try {
      setError(""); // Limpa erros anteriores
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      setPokemon({
        nome: response.data.name,
        imagem: response.data.sprites.front_default,
        tipos: response.data.types.map((t: any) => t.type.name),
        habilidades: response.data.abilities.map((a: any) => a.ability.name),
        altura: response.data.height / 10, // Altura em metros
        peso: response.data.weight / 10, // Peso em quilogramas
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      setPokemon(null); // Limpa o Pokémon anterior, se existir
      setError("Pokémon não encontrado. Tente novamente!");
    }
  };

  return (
    <div className="container mx-auto p-6 text-center bg-blue-300">
      <h1 className="text-3xl font-bold mb-6 text-white">Pesquisar Pokémon</h1>

      {/* Barra de Pesquisa */}
      <div className="flex justify-center items-center mb-6">
        <input
          type="text"
          placeholder="Digite o nome do Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Pesquisar
        </button>
      </div>

      {/* Exibição de Erros */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Exibição de Resultados */}
      {pokemon && (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <Image
            src={pokemon.imagem}
            alt={pokemon.nome}
            className="mx-auto"
            height={128}
            width={128}
          />
          <h2 className="text-2xl font-bold mt-4">
            {pokemon.nome.toUpperCase()}
          </h2>
          <p>
            <strong>Tipos:</strong> {pokemon.tipos.join(", ")}
          </p>
          <p>
            <strong>Altura:</strong> {pokemon.altura}m
          </p>
          <p>
            <strong>Peso:</strong> {pokemon.peso}kg
          </p>
          <p>
            <strong>Habilidades:</strong> {pokemon.habilidades.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default PesquisarPokemon;
