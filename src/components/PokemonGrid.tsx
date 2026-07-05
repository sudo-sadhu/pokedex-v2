import PokemonCard from './PokemonCard';
import type { PokemonListItem } from '@/lib/types';

interface PokemonGridProps {
  pokemonList: PokemonListItem[];
  selectedType?: string;
}

export default function PokemonGrid({ pokemonList, selectedType }: PokemonGridProps) {
  if (pokemonList.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-muted">
        <div className="text-6xl mb-4 opacity-50">🔍</div>
        <p className="text-xl font-medium">No Pokémon found for this category.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {pokemonList.map((pokemon) => (
          <PokemonCard 
            key={pokemon.id} 
            pokemon={pokemon} 
            selectedType={selectedType} 
          />
        ))}
      </div>
    </div>
  );
}
