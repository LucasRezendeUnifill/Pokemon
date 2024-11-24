/*
  Warnings:

  - You are about to drop the `TreinadorOnPokemon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TreinadorOnPokemon" DROP CONSTRAINT "TreinadorOnPokemon_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "TreinadorOnPokemon" DROP CONSTRAINT "TreinadorOnPokemon_treinadorId_fkey";

-- DropTable
DROP TABLE "TreinadorOnPokemon";

-- CreateTable
CREATE TABLE "_TreinadoresPokemons" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TreinadoresPokemons_AB_unique" ON "_TreinadoresPokemons"("A", "B");

-- CreateIndex
CREATE INDEX "_TreinadoresPokemons_B_index" ON "_TreinadoresPokemons"("B");

-- AddForeignKey
ALTER TABLE "_TreinadoresPokemons" ADD CONSTRAINT "_TreinadoresPokemons_A_fkey" FOREIGN KEY ("A") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TreinadoresPokemons" ADD CONSTRAINT "_TreinadoresPokemons_B_fkey" FOREIGN KEY ("B") REFERENCES "Treinador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
