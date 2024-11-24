/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_nome_key" ON "Pokemon"("nome");
