import { useEffect, useState } from "react";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data: PokemonListResponse = await response.json();
        setPokemonList(data.results);
        console.log("Fetched Pokémon list:", data.results);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  if (loading) return <p className="text-center text-xl mt-5">Loading...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 bg-amber-300 rounded-2xl hover:transition-colors duration-300">
      {pokemonList.map((pokemon, index) => {
        const pokemonId = index + 1;
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

        return (
          <div
            key={pokemon.name}
            className="bg-white rounded-lg shadow-md p-4 text-center hover:scale-105 transition-transform duration-200"
          >
            <img src={imageUrl} alt={pokemon.name} className="w-20 mx-auto" />
            <p className="capitalize font-semibold mt-2">{pokemon.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonList;
