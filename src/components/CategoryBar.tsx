import Link from 'next/link';

interface CategoryBarProps {
  types: string[];
  selectedType?: string;
}

export default function CategoryBar({ types, selectedType }: CategoryBarProps) {
  return (
    <div className="w-full bg-surface/80 backdrop-blur-md border-b border-border sticky top-16 z-30">
      <div className="container mx-auto px-4 py-3">
        <div role="navigation" aria-label="Pokémon Types" className="flex overflow-x-auto hide-scrollbar gap-3 pb-1 items-center">
          <Link
            href="/"
            aria-current={!selectedType ? 'page' : undefined}
            aria-label="All Pokémon types"
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              !selectedType
                ? 'bg-foreground text-background shadow-md transform scale-105'
                : 'bg-surface text-muted hover:bg-surface-hover border border-border'
            }`}
          >
            All
          </Link>
          {types.map((type) => {
            const isActive = selectedType === type;
            return (
              <Link
                key={type}
                href={`/?type=${type}`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`${type} type Pokémon`}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
                  isActive
                    ? 'bg-foreground text-background shadow-md transform scale-105'
                    : 'bg-surface text-muted hover:bg-surface-hover border border-border'
                }`}
              >
                {type}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
