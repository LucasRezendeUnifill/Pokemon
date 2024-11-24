import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import apiRoutes from "../routes/index.js";
import errorHandler from "../utils/errorHandler.js";

const prisma = new PrismaClient();

const app = express();
const port = 3001;

// Cors
app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);
// Middleware de erros
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
