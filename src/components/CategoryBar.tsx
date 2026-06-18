import Link from 'next/link';

interface CategoryBarProps {
  types: string[];
  selectedType?: string;
}

export default function CategoryBar({ types, selectedType }: CategoryBarProps) {
  return (
    <div className="w-full bg-white/50 backdrop-blur-md border-b border-slate-200 sticky top-16 z-30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-1 items-center">
          <Link
            href="/"
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              !selectedType
                ? 'bg-slate-800 text-white shadow-md transform scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
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
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-md transform scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
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
