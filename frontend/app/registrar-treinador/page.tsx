"use client";
import React, { useState } from "react";
import axios from "axios";

interface Pokemon {
  nome: string;
  id?: number;
}

const RegistrarTreinador: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    cidade: "",
    genero: "",
    equipe: "",
  });
  const [pokemons, setPokemons] = useState<Pokemon[]>([]); // Lista de Pokémons selecionados
  const [pokemonName, setPokemonName] = useState(""); // Nome do Pokémon para buscar
  const [message, setMessage] = useState<string>("");

  // Atualiza os dados do formulário
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Busca Pokémon na PokeAPI ou no backend
  const handleAddPokemon = async () => {
    if (!pokemonName) {
      setMessage("Digite o nome do Pokémon.");
      return;
    }

    if (pokemons.length >= 6) {
      setMessage("Você só pode adicionar até 6 Pokémons.");
      return;
    }

    try {
      // Tenta buscar na PokeAPI
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      const newPokemon: Pokemon = {
        nome: response.data.name,
      };
      setPokemons([...pokemons, newPokemon]);
      setPokemonName("");
      setMessage("");
    } catch (error) {
      try {
        // Se não estiver na PokeAPI, busca no backend
        const backendResponse = await axios.get(
          `http://localhost:3001/api/pokemons/${pokemonName.toLowerCase()}`
        );
        const newPokemon: Pokemon = {
          nome: backendResponse.data.nome,
        };
        setPokemons([...pokemons, newPokemon]);
        setPokemonName("");
        setMessage("");
      } catch (err) {
        setMessage("Pokémon não encontrado.");
      }
    }
  };

  // Remove um Pokémon da lista
  const handleRemovePokemon = (index: number) => {
    const newPokemons = [...pokemons];
    newPokemons.splice(index, 1);
    setPokemons(newPokemons);
  };

  // Envia os dados para o backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nome ||
      !formData.idade ||
      !formData.cidade ||
      !formData.genero ||
      !formData.equipe
    ) {
      setMessage("Preencha todos os campos obrigatórios!");
      return;
    }

    if (pokemons.length === 0) {
      setMessage("Adicione pelo menos um Pokémon.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/treinadores",
        {
          ...formData,
          idade: parseInt(formData.idade),
          pokemons: pokemons.map((p) => ({ nome: p.nome })),
        }
      );
      setMessage("Treinador cadastrado com sucesso!");
      setFormData({ nome: "", idade: "", cidade: "", genero: "", equipe: "" });
      setPokemons([]);
    } catch (error) {
      setMessage("Erro ao cadastrar treinador. Tente novamente.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Registrar Treinador
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="nome"
            className="block text-gray-700 font-semibold mb-2"
          >
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Digite o nome do treinador"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="idade"
            className="block text-gray-700 font-semibold mb-2"
          >
            Idade:
          </label>
          <input
            type="number"
            id="idade"
            name="idade"
            value={formData.idade}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Digite a idade do treinador"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="cidade"
            className="block text-gray-700 font-semibold mb-2"
          >
            Cidade:
          </label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Digite a cidade do treinador"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="genero"
            className="block text-gray-700 font-semibold mb-2"
          >
            Gênero:
          </label>
          <select
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Selecione o gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="equipe"
            className="block text-gray-700 font-semibold mb-2"
          >
            Equipe:
          </label>
          <input
            type="text"
            id="equipe"
            name="equipe"
            value={formData.equipe}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Digite a equipe do treinador"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Adicionar Pokémon:
          </label>
          <div className="flex items-center">
            <input
              type="text"
              value={pokemonName}
              onChange={(e) => setPokemonName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Digite o nome do Pokémon"
            />
            <button
              type="button"
              onClick={handleAddPokemon}
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Adicionar
            </button>
          </div>
        </div>

        <ul className="list-disc pl-5">
          {pokemons.map((pokemon, index) => (
            <li key={index} className="flex justify-between items-center">
              {pokemon.nome}
              <button
                type="button"
                onClick={() => handleRemovePokemon(index)}
                className="text-red-500"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg mt-4"
        >
          Registrar Treinador
        </button>
      </form>

      {message && <p className="text-center mt-4 text-blue-500">{message}</p>}
    </div>
  );
};

export default RegistrarTreinador;
