/*
  Warnings:

  - Changed the type of `tipo` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('Normal', 'Fogo', 'Agua', 'Planta', 'Eletrico', 'Psiquico', 'Gelo', 'Lutador', 'Venenoso', 'Terrestre', 'Voador', 'Inseto', 'Pedra', 'Fantasma', 'Dragao', 'Noturno', 'Aco', 'Fada');

-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "Tipo" NOT NULL;

-- DropEnum
DROP TYPE "Natureza";
