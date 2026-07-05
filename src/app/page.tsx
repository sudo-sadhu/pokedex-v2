import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import PokemonGrid from '@/components/PokemonGrid';
import PokemonModal from '@/components/PokemonModal';
import { Suspense } from 'react';

export const unstable_instant = true;

// We must import these functions from the backend engineer's files
import { 
  getPokemonList, 
  getPokemonByCategory, 
  getPokemonDetails 
} from '@/lib/pokeapi';
import type { PokemonListItem } from '@/lib/types';

interface PageProps {
  searchParams: Promise<{ type?: string; pokemon?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  // Await the searchParams promise for Next.js 15+ compatibility
  const params = await searchParams;
  const selectedType = params?.type;
  const selectedPokemonId = params?.pokemon;

  // Fetch types for the CategoryBar
  const types = [
    'All', 'Mega', 'Legendary', 'Ultra-Beast',
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 
    'fighting', 'poison', 'ground', 'flying', 'psychic', 
    'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  // Fetch pokemon list based on the selected type
  let pokemonList: PokemonListItem[] = [];
  try {
    if (selectedType) {
      pokemonList = await getPokemonByCategory(selectedType);
    } else {
      const response = await getPokemonList(50); // initial load limit
      // Handle either array (frontend expectation) or object (backend expectation)
      pokemonList = Array.isArray(response) ? response : response.results || [];
    }
  } catch (error) {
    console.error('Failed to fetch pokemon list:', error);
    // graceful degradation
    pokemonList = [];
  }

  // Fetch detailed info if a pokemon is selected
  let selectedPokemon = null;
  if (selectedPokemonId) {
    try {
      selectedPokemon = await getPokemonDetails(selectedPokemonId);
    } catch (error) {
      console.error('Failed to fetch pokemon details:', error);
    }
  }

  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col relative z-10">
        <CategoryBar types={types} selectedType={selectedType} />
        
        {/* Main Grid Content */}
        <div className="flex-grow">
          <Suspense fallback={<div className="flex justify-center items-center h-64"><p className="text-xl text-gray-500">Loading Pokémon...</p></div>}>
            <PokemonGrid pokemonList={pokemonList} selectedType={selectedType} />
          </Suspense>
        </div>
      </main>

      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      {/* Modal overlay if a pokemon is selected */}
      {selectedPokemon && <PokemonModal pokemon={selectedPokemon} />}
    </div>
  );
}
