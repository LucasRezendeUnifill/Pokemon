import express from "express";
import {
  getAllPokemons,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon,
  getPokemonFromAPI,
} from "../controllers/pokemonController.js";

const router = express.Router();

// Rotas para Pokémons
router.get("/", getAllPokemons); // Listar todos os Pokémons
router.get("/:id", getPokemonById); // Obter detalhes de um Pokémon pelo ID
router.get("/search/:name", getPokemonFromAPI); //pesquisar um pokemon na poke API
router.post("/", createPokemon); // Criar um novo Pokémon
router.put("/:id", updatePokemon); // Atualizar um Pokémon existente
router.delete("/:id", deletePokemon); // Deletar um Pokémon

export default router;
