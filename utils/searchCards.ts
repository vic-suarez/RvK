import axios from 'axios';
import Constants from 'expo-constants';

interface PokemonCard {
  id: string;
  name: string;
  set?: {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    releaseDate: string;
  };
  images: {
    small: string;
    large: string;
  };
  cardmarket?: {
    prices: {
      averageSellPrice: number;
    lowPrice: number;
      trendPrice: number;
      germanProLow: number | null;
      suggestedPrice: number | null;
    };
  };
}

/**
 * Searches for Pokémon cards using the Pokémon TCG API
 * @param query - Search query (can be card name or number/total format like "25/185")
 * @returns Promise<PokemonCard[]> - Array of matching cards sorted by release date (newest first)
 */
const searchCards = async (query: string): Promise<PokemonCard[]> => {
  const API_KEY = Constants.expoConfig?.extra?.pokemonApiKey || process.env.POKEMON_API_KEY;
  const BASE_URL = 'https://api.pokemontcg.io/v2/cards';
  
  try {
    // Trim and lowercase the query to reduce errors
    const trimmedQuery = query.trim().toLowerCase();
    
    // Check if query matches number/total pattern (e.g., "25/185")
    const numberMatch = trimmedQuery.match(/^(\d+)\/(\d+)$/);
    
    let apiQuery: string;
    let cards: PokemonCard[] = [];
    
    if (numberMatch) {
      // Extract number and total from the query
      const [, number, total] = numberMatch;
      
      // Search by card number
      apiQuery = `number:${number}`;
      const response = await axios.get(`${BASE_URL}?q=${apiQuery}`, {
        headers: {
          'X-Api-Key': API_KEY
        }
      });
      
      // Filter cards by printed total and sort by release date
      cards = response.data.data
        .filter((card: PokemonCard) => 
          card.set?.printedTotal === parseInt(total)
        )
        .sort((a: PokemonCard, b: PokemonCard) => 
          new Date(b.set?.releaseDate || '').getTime() - 
          new Date(a.set?.releaseDate || '').getTime()
        );
    } else {
      // Search by card name using the name:"query" format
      apiQuery = `name:"${encodeURIComponent(trimmedQuery)}"`;
      const response = await axios.get(`${BASE_URL}?q=${apiQuery}`, {
        headers: {
          'X-Api-Key': API_KEY
        }
      });
      
      // Sort results by release date (newest first)
      cards = response.data.data.sort((a: PokemonCard, b: PokemonCard) => 
        new Date(b.set?.releaseDate || '').getTime() - 
        new Date(a.set?.releaseDate || '').getTime()
      );
    }
    
    return cards;
  } catch (error) {
    console.error('Error searching cards:', error);
    return [];
  }
};

export default searchCards; 