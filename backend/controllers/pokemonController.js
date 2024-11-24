import { PrismaClient } from "@prisma/client";
import { validarPokemon } from "../utils/pokemonValidator.js";
import fetch from "node-fetch";

const prisma = new PrismaClient();

export const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await prisma.pokemon.findMany();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar Pokémons" });
  }
};

export const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await prisma.pokemon.findUnique({
      where: { id: parseInt(id) },
    });
    if (!pokemon)
      return res.status(404).json({ error: "Pokémon não encontrado" });
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar Pokémon" });
  }
};

export const createPokemon = async (req, res) => {
  try {
    const data = req.body;

    // Validação
    validarPokemon(data);

    const novoPokemon = await prisma.pokemon.create({ data });
    res.status(201).json(novoPokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Validação
    validarPokemon(data);

    const pokemonAtualizado = await prisma.pokemon.update({
      where: { id: parseInt(id) },
      data,
    });
    res.json(pokemonAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.pokemon.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Pokémon deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar Pokémon" });
  }
};

export const getPokemonFromAPI = async (req, res) => {
  const { name } = req.params;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );

    if (!response.ok) {
      return res.status(404).json({ error: "Pokémon não encontrado." });
    }

    const data = await response.json();

    // Formatar a resposta
    const formattedData = {
      nome: data.name,
      tipo: data.types.map((t) => t.type.name).join(", "), // Tipo como string
      altura: data.height / 10, // Converter para metros
      peso: data.weight / 10, // Converter para quilogramas
      habilidades: data.abilities.map((a) => a.ability.name).join(", "),
    };

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar Pokémon na PokeAPI." });
  }
};
