export const validarPokemon = (data) => {
  const { nome, tipo, nivel, altura, peso } = data;

  // Validação de Nome
  if (!nome || typeof nome !== "string") {
    throw new Error("Nome é obrigatório e deve ser uma string.");
  }

  // Validação de Tipo (opcionalmente flexível)
  if (!tipo || typeof tipo !== "string") {
    throw new Error("Tipo é obrigatório e deve ser uma string.");
  }

  // Validação de Nível
  if (!Number.isInteger(nivel) || nivel < 1 || nivel > 100) {
    throw new Error("Nível deve ser um número inteiro entre 1 e 100.");
  }

  // Validação de Altura
  if (typeof altura !== "number" || altura <= 0) {
    throw new Error("Altura deve ser um número positivo.");
  }

  // Validação de Peso
  if (typeof peso !== "number" || peso <= 0) {
    throw new Error("Peso deve ser um número positivo.");
  }
};
