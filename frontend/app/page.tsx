const Home = () => {
  return (
    <div className="bg-blue-300 text-white flex flex-col items-center justify-center p-8">
      {/* Título Principal */}
      <h1 className="text-5xl font-extrabold mb-6 text-center drop-shadow-md">
        Bem-vindo à <span className="text-yellow-200">Pokedex</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-lg mb-10 text-center max-w-2xl drop-shadow-sm">
        Explore o incrível mundo dos Pokémons! Pesquise por seus Pokémons
        favoritos ou conheça a lista de treinadores mais incríveis!
      </p>
    </div>
  );
};

export default Home;
