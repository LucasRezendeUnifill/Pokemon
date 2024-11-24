import express from "express";
import {
  getAllTreinadores,
  getTreinadorById,
  createTreinador,
  updateTreinador,
  deleteTreinador,
} from "../controllers/treinadorController.js";

const router = express.Router();

// Rotas para Treinadores
router.get("/", getAllTreinadores); // Listar todos os Treinadores
router.get("/:id", getTreinadorById); // Obter detalhes de um Treinador pelo ID
router.post("/", createTreinador); // Criar um novo Treinador
router.put("/:id", updateTreinador); // Atualizar um Treinador existente
router.delete("/:id", deleteTreinador); // Deletar um Treinador

export default router;
