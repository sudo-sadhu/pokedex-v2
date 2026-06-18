export interface PokemonListItem {
  id: number;
  name: string;
  image: string;
  types: string[];
  nextEvolution?: {
    name: string;
    image: string;
  } | null;
}

export interface PokemonListResponse {
  results: PokemonListItem[];
  count: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  "sp-atk": number;
  "sp-def": number;
  speed: number;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface PokemonSprites {
  officialArtwork: string;
  frontDefault: string | null;
  frontShiny: string | null;
  backDefault: string | null;
  backShiny: string | null;
}

export interface EvolutionStage {
  id: number;
  name: string;
  image: string;
  minLevel: number | null;
  triggerName: string | null;
}

export type EvolutionChain = EvolutionStage[];

export interface PokemonDetails {
  id: number;
  name: string;
  types: string[];
  stats: PokemonStats;
  abilities: PokemonAbility[];
  height: number;
  weight: number;
  sprites: PokemonSprites;
  evolutionChain: EvolutionChain;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  flavorText: string;
  generation: string;
}

export interface RawPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface RawPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { slot: number; type: { name: string; url: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }[];
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    back_default: string | null;
    back_shiny: string | null;
    other: {
      'official-artwork': { front_default: string | null };
    };
  };
}

export interface RawPokemonSpecies {
  id: number;
  name: string;
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }[];
  generation: { name: string; url: string };
  evolution_chain: { url: string };
  is_legendary: boolean;
  is_mythical: boolean;
}

export interface RawType {
  id: number;
  name: string;
  pokemon: {
    pokemon: { name: string; url: string };
  }[];
}

export interface RawChainLink {
  species: { name: string; url: string };
  evolution_details: {
    min_level: number | null;
    trigger: { name: string } | null;
  }[];
  evolves_to: RawChainLink[];
}

export interface RawEvolutionChain {
  id: number;
  chain: RawChainLink;
}
