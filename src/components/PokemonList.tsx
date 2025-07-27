import { useEffect, useState } from "react";
import { typeColors } from "../utils/typeColors";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data = await response.json();

        const detailedData = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        setPokemonList(detailedData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);
  
  if (loading) return <p className="text-center mt-5 text-xl">Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {pokemonList.map((pokemon) => {
        const mainType = pokemon.types[0]?.type.name;
        const bgColor = typeColors[mainType] || "bg-gray-200";

        return (
          <div
            key={pokemon.id}
            className={`${bgColor} text-white rounded-xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105`}
          >
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-24 h-24" />
            <h2 className="capitalize text-xl font-bold mt-2">{pokemon.name}</h2>

            {/* Type */}
            <p className="mt-1 text-sm font-medium bg-white/20 px-2 py-1 rounded-full capitalize">
              {mainType}
            </p>

            {/* Abilities */}
            <div className="mt-2 text-sm text-center">
              <p className="font-semibold">Abilities:</p>
              {pokemon.abilities.map((a, i) => (
                <p key={i} className="text-white/90 capitalize">
                  {a.ability.name}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonList;
