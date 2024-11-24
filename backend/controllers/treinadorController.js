import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { validarTreinador } from "../utils/treinadorValidator.js";

const prisma = new PrismaClient();

/**
 * Busca um Pokémon no banco de dados ou o cria a partir da PokeAPI.
 * @param {string} nome Nome do Pokémon.
 * @returns {object} Pokémon encontrado ou criado.
 */
async function fetchOrCreatePokemon(nome) {
  // Tenta encontrar o Pokémon no banco de dados
  let foundPokemon = await prisma.pokemon.findFirst({
    where: { nome },
  });

  if (!foundPokemon) {
    // Se não encontrado, consulta a PokeAPI e cria no banco
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`
    );
    const data = response.data;

    foundPokemon = await prisma.pokemon.create({
      data: {
        nome: data.name,
        tipo: data.types[0].type.name, // Assume o primeiro tipo como principal
        nivel: 1, // Nível inicial padrão
        altura: data.height / 10, // Altura em metros
        peso: data.weight / 10, // Peso em quilogramas
      },
    });
  }

  return foundPokemon;
}

export const getAllTreinadores = async (req, res) => {
  try {
    const treinadores = await prisma.treinador.findMany({
      include: { pokemons: true },
    });
    res.json(treinadores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar Treinadores" });
  }
};

export const getTreinadorById = async (req, res) => {
  try {
    const { id } = req.params;
    const treinador = await prisma.treinador.findUnique({
      where: { id: parseInt(id) },
      include: { pokemons: true },
    });
    if (!treinador)
      return res.status(404).json({ error: "Treinador não encontrado" });
    res.json(treinador);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar Treinador" });
  }
};

export const createTreinador = async (req, res) => {
  try {
    const data = req.body;

    // Validação
    validarTreinador(data);

    // Buscar ou criar os Pokémons
    const pokemonIds = await Promise.all(
      data.pokemons.map(async (pokemon) => {
        const foundPokemon = await fetchOrCreatePokemon(pokemon.nome);
        return { id: foundPokemon.id };
      })
    );

    // Criar treinador com os IDs dos Pokémons
    const novoTreinador = await prisma.treinador.create({
      data: {
        nome: data.nome,
        idade: data.idade,
        cidade: data.cidade,
        genero: data.genero,
        equipe: data.equipe,
        pokemons: {
          connect: pokemonIds,
        },
      },
    });
    res.status(201).json(novoTreinador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTreinador = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Validação
    validarTreinador(data);

    // Buscar ou criar os Pokémons
    const pokemonIds = await Promise.all(
      data.pokemons.map(async (pokemon) => {
        const foundPokemon = await fetchOrCreatePokemon(pokemon.nome);
        return { id: foundPokemon.id };
      })
    );

    // Atualizar treinador com os IDs dos Pokémons
    const treinadorAtualizado = await prisma.treinador.update({
      where: { id: parseInt(id) },
      data: {
        nome: data.nome,
        idade: data.idade,
        cidade: data.cidade,
        genero: data.genero,
        equipe: data.equipe,
        pokemons: {
          set: pokemonIds, // Atualiza a lista de Pokémons associados
        },
      },
    });
    res.json(treinadorAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTreinador = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.treinador.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Treinador deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar Treinador" });
  }
};
