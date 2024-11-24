-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treinador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "cidade" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "equipe" TEXT NOT NULL,

    CONSTRAINT "Treinador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreinadorOnPokemon" (
    "treinadorId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "TreinadorOnPokemon_pkey" PRIMARY KEY ("treinadorId","pokemonId")
);

-- AddForeignKey
ALTER TABLE "TreinadorOnPokemon" ADD CONSTRAINT "TreinadorOnPokemon_treinadorId_fkey" FOREIGN KEY ("treinadorId") REFERENCES "Treinador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreinadorOnPokemon" ADD CONSTRAINT "TreinadorOnPokemon_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
