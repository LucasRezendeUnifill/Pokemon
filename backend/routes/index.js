import express from "express";
import pokemonRoutes from "./pokemonRoutes.js";
import treinadorRoutes from "./treinadorRoutes.js";

const router = express.Router();

// Definindo as rotas principais
router.use("/pokemons", pokemonRoutes);
router.use("/treinadores", treinadorRoutes);

export default router;
