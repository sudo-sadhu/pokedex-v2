import Image from 'next/image';
import Link from 'next/link';

interface PokemonCardProps {
  pokemon: any;
  selectedType?: string;
}

export default function PokemonCard({ pokemon, selectedType }: PokemonCardProps) {
  const mainType = pokemon.types[0] || 'normal';
  
  // Create the link preserving the type query parameter
  const href = selectedType 
    ? `/?type=${selectedType}&pokemon=${pokemon.id}` 
    : `/?pokemon=${pokemon.id}`;

  return (
    <Link href={href} className="block group" aria-label={`View details for ${pokemon.name.replace('-', ' ')}`}>
      <div className="relative overflow-hidden rounded-2xl glass-panel transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer aspect-square sm:aspect-auto sm:h-[300px]">
        {/* Background gradient based on primary type */}
        <div 
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
          style={{ backgroundColor: `var(--color-poke-${mainType})` }}
        />
        
        {/* ID Number */}
        <div className="absolute top-3 right-4 text-foreground/20 font-black text-4xl z-0 pointer-events-none group-hover:text-foreground/30 transition-colors">
          #{String(pokemon.id).padStart(3, '0')}
        </div>

        <div className="relative z-10 p-5 flex flex-col h-full">
          <h2 className="text-xl font-bold capitalize text-foreground mb-2">
            {pokemon.name.replace('-', ' ')}
          </h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {pokemon.types.map((type: string) => (
              <span
                key={type}
                className="type-badge"
                style={{ backgroundColor: `var(--color-poke-${type})` }}
              >
                {type}
              </span>
            ))}
          </div>
          
          <div className="mt-auto relative w-full flex-grow min-h-[120px] flex items-center justify-center">
            {/* Soft glow behind pokemon */}
            <div 
              className="absolute w-24 h-24 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"
              style={{ backgroundColor: `var(--color-poke-${mainType})` }}
            />
            
            <Image
              src={pokemon.artwork || pokemon.sprite || ''}
              alt={pokemon.name}
              fill
              className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
