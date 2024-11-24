import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "POKEDEX APP",
  description: "Pokemon Pokedex Ravache",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className="flex flex-col h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/backgroundimage.jpg')",
        }}
      >
        {/* Navbar */}
        <header className="bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-lg">
          <nav className="container mx-auto flex justify-between items-center py-4 px-6">
            {/* Logo com ícone de Pokébola */}
            <div className="flex items-center space-x-3">
              <Image
                src="/pokeball.png"
                alt="Pokébola"
                width={32}
                height={32}
              />
              <h1 className="text-3xl font-pokemon text-yellow-400">Pokedex</h1>
            </div>

            {/* Links */}
            <ul className="flex space-x-6 text-lg font-bold">
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-yellow-500 transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/pesquisar"
                  className="text-white hover:text-yellow-500 transition-colors"
                >
                  Pesquisar Pokémon
                </Link>
              </li>
              <li>
                <Link
                  href="/treinadores"
                  className="text-white hover:text-yellow-500 transition-colors"
                >
                  Lista de Treinadores
                </Link>
              </li>
              <li>
                <Link
                  href="/registrar-treinador"
                  className="text-white hover:text-yellow-500 transition-colors"
                >
                  Registrar Treinador
                </Link>
              </li>
              <li>
                <Link
                  href="/cadastrar-pokemon"
                  className="text-white hover:text-yellow-500 transition-colors"
                >
                  Cadastrar Pokémon
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto p-6 flex flex-col justify-center">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-lg py-4">
          <div className="container mx-auto text-center text-sm">
            Pokedex para trabalho Ravache - Todos os direitos reservados
          </div>
        </footer>
      </body>
    </html>
  );
}
