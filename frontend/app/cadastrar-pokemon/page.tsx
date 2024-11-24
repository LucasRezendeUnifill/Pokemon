"use client";
import React, { useState } from "react";
import axios from "axios";

// Lista de tipos de Pokémon (Enum do banco de dados)
const tipos = [
  "Normal",
  "Fogo",
  "Agua",
  "Planta",
  "Eletrico",
  "Psiquico",
  "Gelo",
  "Lutador",
  "Venenoso",
  "Terrestre",
  "Voador",
  "Inseto",
  "Pedra",
  "Fantasma",
  "Dragao",
  "Noturno",
  "Aco",
  "Fada",
];

const CadastrarPokemon: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    tipo: "",
    nivel: "",
    altura: "",
    peso: "",
  });
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nome ||
      !formData.tipo ||
      !formData.nivel ||
      !formData.altura ||
      !formData.peso
    ) {
      setMessage("Todos os campos são obrigatórios!");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/pokemons", {
        ...formData,
        nivel: parseInt(formData.nivel),
        altura: parseFloat(formData.altura),
        peso: parseFloat(formData.peso),
      });
      setMessage("Pokémon cadastrado com sucesso!");
      setFormData({ nome: "", tipo: "", nivel: "", altura: "", peso: "" }); // Limpa o formulário
    } catch (error) {
      setMessage(`Erro ao cadastrar Pokémon. Tente novamente. ${error}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Cadastrar Pokémon</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg"
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o nome do Pokémon"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="tipo"
            className="block text-gray-700 font-semibold mb-2"
          >
            Tipo de Natureza:
          </label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione um tipo</option>
            {tipos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="nivel"
            className="block text-gray-700 font-semibold mb-2"
          >
            Nível de Poder:
          </label>
          <input
            type="number"
            id="nivel"
            name="nivel"
            value={formData.nivel}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o nível de poder (1-100)"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="altura"
            className="block text-gray-700 font-semibold mb-2"
          >
            Altura (em metros):
          </label>
          <input
            type="number"
            step="0.01"
            id="altura"
            name="altura"
            value={formData.altura}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite a altura (ex: 0.5)"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="peso"
            className="block text-gray-700 font-semibold mb-2"
          >
            Peso (em quilogramas):
          </label>
          <input
            type="number"
            step="0.01"
            id="peso"
            name="peso"
            value={formData.peso}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o peso (ex: 6.0)"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Cadastrar Pokémon
        </button>
      </form>

      {message && <p className="text-center mt-4 text-blue-500">{message}</p>}
    </div>
  );
};

export default CadastrarPokemon;
