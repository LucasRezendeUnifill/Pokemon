import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed para Pokémons
  const pokemons = await prisma.pokemon.createMany({
    data: [
      { nome: "Pikachu", tipo: "Eletrico", nivel: 5, altura: 0.4, peso: 6 },
      {
        nome: "Charmander",
        tipo: "Fogo",
        nivel: 5,
        altura: 0.6,
        peso: 8.5,
      },
      { nome: "Squirtle", tipo: "Agua", nivel: 5, altura: 0.5, peso: 9 },
      {
        nome: "Bulbasaur",
        tipo: "Planta",
        nivel: 5,
        altura: 0.7,
        peso: 6.9,
      },
    ],
  });

  console.log(`${pokemons.count} Pokémons criados!`);

  // Seed para Treinadores
  const treinadorAsh = await prisma.treinador.create({
    data: {
      nome: "Ash Ketchum",
      idade: 10,
      cidade: "Pallet",
      genero: "Masculino",
      equipe: "Equipe Valor",
      pokemons: {
        connect: [{ id: 1 }, { id: 2 }], // Conectando com os IDs dos Pokémons
      },
    },
  });

  const treinadorMisty = await prisma.treinador.create({
    data: {
      nome: "Misty",
      idade: 12,
      cidade: "Cerulean",
      genero: "Feminino",
      equipe: "Equipe Mystic",
      pokemons: {
        connect: [{ id: 3 }], // Conectando com o ID do Pokémon
      },
    },
  });

  console.log("Treinadores criados:", treinadorAsh, treinadorMisty);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
