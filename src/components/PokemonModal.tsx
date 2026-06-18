'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PokemonModal({ pokemon }: { pokemon: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mainType = pokemon.types[0] || 'normal';

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const close = () => {
    const type = searchParams.get('type');
    if (type) {
      router.push(`/?type=${type}`, { scroll: false });
    } else {
      router.push('/', { scroll: false });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={close}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        
        {/* Left side: Image and color background */}
        <div 
          className="relative w-full md:w-2/5 p-8 flex flex-col items-center justify-center min-h-[300px]"
          style={{ backgroundColor: `var(--color-poke-${mainType})` }}
        >
          <div className="absolute top-4 left-4">
            <button 
              onClick={close}
              className="md:hidden w-8 h-8 flex items-center justify-center bg-white/30 rounded-full text-white hover:bg-white/50 transition"
            >
              ✕
            </button>
          </div>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]" />
          
          <h2 className="text-white/80 font-black text-6xl absolute -top-4 -left-4 pointer-events-none select-none z-0">
            #{String(pokemon.id).padStart(3, '0')}
          </h2>
          
          <div className="relative z-10 w-full aspect-square max-w-[250px]">
            <Image
              src={pokemon.artwork || pokemon.sprite || ''}
              alt={pokemon.name}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
            />
          </div>
        </div>

        {/* Right side: Details */}
        <div className="w-full md:w-3/5 p-6 sm:p-8 bg-white relative">
          <button 
            onClick={close}
            className="hidden md:flex absolute top-4 right-4 w-8 h-8 items-center justify-center text-slate-400 hover:bg-slate-100 rounded-full transition"
          >
            ✕
          </button>
          
          <h1 className="text-3xl font-black capitalize text-slate-800 mb-4">
            {pokemon.name.replace('-', ' ')}
          </h1>
          
          <div className="flex gap-2 mb-6">
            {pokemon.types.map((type: string) => (
              <span
                key={type}
                className="type-badge px-4 py-1.5 text-sm"
                style={{ backgroundColor: `var(--color-poke-${type})` }}
              >
                {type}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
              <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Height</span>
              <span className="text-lg font-semibold text-slate-700">
                {pokemon.height ? `${pokemon.height / 10} m` : '???'}
              </span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
              <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Weight</span>
              <span className="text-lg font-semibold text-slate-700">
                {pokemon.weight ? `${pokemon.weight / 10} kg` : '???'}
              </span>
            </div>
          </div>

          {pokemon.stats && pokemon.stats.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase mb-3">Base Stats</h3>
              <div className="space-y-3">
                {pokemon.stats.map((stat: any) => {
                  const statPercentage = Math.min(100, (stat.value / 255) * 100);
                  return (
                    <div key={stat.name} className="flex items-center gap-3">
                      <span className="w-24 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {stat.name.replace('-', ' ')}
                      </span>
                      <span className="w-8 text-sm font-bold text-slate-700 text-right">
                        {stat.value}
                      </span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${statPercentage}%`,
                            backgroundColor: `var(--color-poke-${mainType})`
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
