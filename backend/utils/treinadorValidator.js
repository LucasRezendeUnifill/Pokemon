export const validarTreinador = (data) => {
  const { nome, idade, cidade, genero, equipe, pokemons } = data;

  if (!nome || typeof nome !== "string") {
    throw new Error("Nome é obrigatório e deve ser uma string.");
  }

  if (!Number.isInteger(idade) || idade < 1) {
    throw new Error("Idade deve ser um número inteiro maior que zero.");
  }

  if (!cidade || typeof cidade !== "string") {
    throw new Error("Cidade é obrigatória e deve ser uma string.");
  }

  const generosValidos = ["Masculino", "Feminino", "Outro"];
  if (!generosValidos.includes(genero)) {
    throw new Error(
      `Gênero inválido. Gêneros válidos: ${generosValidos.join(", ")}`
    );
  }

  if (!equipe || typeof equipe !== "string") {
    throw new Error("Equipe é obrigatória e deve ser uma string.");
  }

  if (pokemons && pokemons.length > 6) {
    throw new Error("Um treinador não pode ter mais de 6 Pokémons.");
  }
};
