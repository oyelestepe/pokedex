// src/components/PokemonList.tsx
import { useEffect, useState } from "react";
import { typeColors } from "../utils/typeColors";

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
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 50;

  const fetchPokemonList = async (page: number) => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const data = await res.json();

      const detailed = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );

      setPokemonList(detailed);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonList(page);
  }, [page]);

  return (
    <div className="p-4">
      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pokemonList.map((pokemon) => {
              const type = pokemon.types[0]?.type.name;
              const bgColor = typeColors[type] || "bg-gray-200";

              return (
                <div
                  key={pokemon.id}
                  className={`${bgColor} text-white rounded-xl shadow-md p-4 text-center transition-transform hover:scale-105`}
                >
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-24 h-24 mx-auto" />
                  <h2 className="capitalize text-lg font-bold mt-2">{pokemon.name}</h2>
                  <p className="bg-white/20 rounded-full inline-block px-3 py-1 mt-1 capitalize">
                    {type}
                  </p>
                  <div className="mt-2">
                    <p className="font-semibold">Abilities:</p>
                    {pokemon.abilities.map((a, i) => (
                      <p key={i} className="capitalize text-white/90">
                        {a.ability.name}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonList;
