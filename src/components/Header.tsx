import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-border/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Pokédex Home">
          <div className="relative w-8 h-8 flex items-center justify-center bg-red-500 rounded-full border-2 border-slate-800 overflow-hidden shadow-sm">
            <div className="absolute top-0 w-full h-1/2 bg-red-500"></div>
            <div className="absolute bottom-0 w-full h-1/2 bg-white"></div>
            <div className="absolute w-full h-[2px] bg-slate-800"></div>
            <div className="absolute w-3 h-3 bg-white border-2 border-slate-800 rounded-full z-10"></div>
          </div>
          <span className="text-xl font-black tracking-tight text-foreground">
            Pokédex<span className="text-red-500">V2</span>
          </span>
        </Link>
        <nav className="hidden md:flex gap-6" aria-label="Main Navigation">
          <Link href="/" className="text-sm font-semibold text-muted hover:text-red-500 transition-colors">
            Home
          </Link>
          <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-muted hover:text-red-500 transition-colors">
            About API
          </a>
        </nav>
      </div>
    </header>
  );
}
