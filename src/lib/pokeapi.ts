import type {
  PokemonListItem,
  PokemonListResponse,
  PokemonDetails,
  PokemonStats,
  PokemonAbility,
  PokemonSprites,
  EvolutionChain,
  EvolutionStage,
  RawPokemonListResponse,
  RawPokemon,
  RawPokemonSpecies,
  RawEvolutionChain,
  RawChainLink,
} from './types';

const BASE_URL = 'https://pokeapi.co/api/v2';

const artworkUrl = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

/**
 * Enhanced fetcher for Next.js App Router.
 * Data is cached heavily since Pokemon data rarely changes.
 */
async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    // Cache for 24 hours
    next: { revalidate: 86400 },
  });
  
  if (!response.ok) {
    throw new Error(
      `PokeAPI request failed: ${response.status} ${response.statusText} (${url})`,
    );
  }
  return response.json() as Promise<T>;
}

function idFromUrl(url: string): number {
  const parts = url.replace(/\/$/, '').split('/');
  return Number(parts[parts.length - 1]);
}

function mapStats(raw: RawPokemon['stats']): PokemonStats {
  const get = (name: string) =>
    raw.find((s) => s.stat.name === name)?.base_stat ?? 0;

  return {
    hp: get('hp'),
    attack: get('attack'),
    defense: get('defense'),
    "sp-atk": get('special-attack'),
    "sp-def": get('special-defense'),
    speed: get('speed'),
  };
}

function mapAbilities(raw: RawPokemon['abilities']): PokemonAbility[] {
  return raw.map((a) => ({
    name: a.ability.name,
    isHidden: a.is_hidden,
  }));
}

function mapSprites(raw: RawPokemon['sprites'], id: number): PokemonSprites {
  return {
    officialArtwork:
      raw.other?.['official-artwork']?.front_default ?? artworkUrl(id),
    frontDefault: raw.front_default,
    frontShiny: raw.front_shiny,
    backDefault: raw.back_default,
    backShiny: raw.back_shiny,
  };
}

function flattenChain(link: RawChainLink): EvolutionStage[] {
  const id = idFromUrl(link.species.url);
  const detail = link.evolution_details[0];

  const stage: EvolutionStage = {
    id,
    name: link.species.name,
    image: artworkUrl(id),
    minLevel: detail?.min_level ?? null,
    triggerName: detail?.trigger?.name ?? null,
  };

  const stages: EvolutionStage[] = [stage];

  for (const child of link.evolves_to) {
    stages.push(...flattenChain(child));
  }

  return stages;
}

function findNextEvolution(chain: RawChainLink, currentName: string): { name: string; image: string } | null {
  if (chain.species.name === currentName) {
    if (chain.evolves_to.length > 0) {
      const next = chain.evolves_to[0].species;
      return {
        name: next.name,
        image: artworkUrl(idFromUrl(next.url)),
      };
    }
    return null;
  }
  for (const child of chain.evolves_to) {
    const found = findNextEvolution(child, currentName);
    if (found) return found;
  }
  return null;
}

/**
 * Hydrates basic name/url lists into full `PokemonListItem` shapes.
 * Utilizing Next.js Server Components, these multiple parallel fetches
 * happen instantly on the server without waterfalling to the client.
 */
async function hydratePokemonList(
  entries: { name: string; url: string }[]
): Promise<PokemonListItem[]> {
  return Promise.all(
    entries.map(async (entry) => {
      const id = idFromUrl(entry.url);
      const pokemon = await fetchJson<RawPokemon>(`${BASE_URL}/pokemon/${id}`);

      let nextEvolution: { name: string; image: string } | null = null;
      try {
        const species = await fetchJson<RawPokemonSpecies>(
          `${BASE_URL}/pokemon-species/${id}`,
        );
        if (species.evolution_chain?.url) {
          const evoData = await fetchJson<RawEvolutionChain>(
            species.evolution_chain.url,
          );
          const next = findNextEvolution(evoData.chain, species.name);
          if (next) {
            nextEvolution = next;
          }
        }
      } catch {
        // Ignore species/evolution errors for listing
      }

      return {
        id,
        name: entry.name,
        image: artworkUrl(id),
        types: pokemon.types.map((t) => t.type.name),
        nextEvolution,
      };
    })
  );
}

// ─── Public API ──────────────────────────────────────────────────────

export async function getPokemonList(
  limit: number = 20,
  offset: number = 0,
): Promise<PokemonListResponse> {
  try {
    const list = await fetchJson<RawPokemonListResponse>(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
    );

    const results = await hydratePokemonList(list.results);

    return {
      results,
      count: list.count,
      hasNext: list.next !== null,
      hasPrevious: list.previous !== null,
    };
  } catch (error) {
    console.error('[getPokemonList] Error:', error);
    throw error;
  }
}

export async function getPokemonDetails(
  idOrName: string | number,
): Promise<PokemonDetails> {
  try {
    const query = String(idOrName).toLowerCase();
    const raw = await fetchJson<RawPokemon>(`${BASE_URL}/pokemon/${query}`);

    const species = await fetchJson<RawPokemonSpecies>(
      `${BASE_URL}/pokemon-species/${raw.id}`,
    );

    let evolutionChain: EvolutionChain = [];
    try {
      const evoData = await fetchJson<RawEvolutionChain>(
        species.evolution_chain.url,
      );
      evolutionChain = flattenChain(evoData.chain);
    } catch {
      console.warn(`[getPokemonDetails] Could not load evolution chain for ${raw.name}`);
    }

    return {
      id: raw.id,
      name: raw.name,
      types: raw.types.map((t) => t.type.name),
      stats: mapStats(raw.stats),
      abilities: mapAbilities(raw.abilities),
      height: raw.height,
      weight: raw.weight,
      sprites: mapSprites(raw.sprites, raw.id),
      evolutionChain,
    };
  } catch (error) {
    console.error('[getPokemonDetails] Error:', error);
    throw error;
  }
}

export async function getPokemonByCategory(category: string): Promise<PokemonListItem[]> {
  const cat = category.toLowerCase().trim();

  try {
    if (cat === 'ultra-beast' || cat === 'ultrabeast' || cat === 'ultra beasts') {
      const ubIds = [793, 794, 795, 796, 797, 798, 799, 803, 804, 805, 806];
      const ubNames = ['nihilego', 'buzzwole', 'pheromosa', 'xurkitree', 'celesteela', 'kartana', 'guzzlord', 'poipole', 'naganadel', 'stakataka', 'blacephalon'];
      const matches = ubIds.map((id, index) => ({ name: ubNames[index], url: `${BASE_URL}/pokemon/${id}` }));
      return hydratePokemonList(matches);
    }

    if (cat === 'mega' || cat === 'mega evolutions') {
      const all = await fetchJson<RawPokemonListResponse>(
        `${BASE_URL}/pokemon?limit=100000&offset=0`
      );
      const matches = all.results.filter(p => p.name.endsWith('-mega')).slice(0, 24);
      return hydratePokemonList(matches);
    }

    if (cat === 'legendary' || cat === 'mythical') {
      const legendaryIds = [144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 377, 378, 379, 380, 381, 382, 383, 384].slice(0, 24);
      const names = ['articuno', 'zapdos', 'moltres', 'mewtwo', 'mew', 'raikou', 'entei', 'suicune', 'lugia', 'ho-oh', 'regirock', 'regice', 'registeel', 'latias', 'latios', 'kyogre', 'groudon', 'rayquaza'];
      const matches = legendaryIds.map((id, i) => ({ name: names[i], url: `${BASE_URL}/pokemon/${id}` }));
      return hydratePokemonList(matches);
    }

    // specific type
    const typeData = await fetchJson<any>(`${BASE_URL}/type/${cat}`);
    const matches = typeData.pokemon.map((p: any) => p.pokemon).slice(0, 24);
    return hydratePokemonList(matches);
  } catch (error) {
    console.error(`[getPokemonByCategory] Error fetching category ${cat}:`, error);
    throw error;
  }
}
