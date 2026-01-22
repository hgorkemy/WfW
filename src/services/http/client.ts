import { API_CONFIG } from './config';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
}

export interface MovieDetail extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
}

export interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

class TMDBClient {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.apiKey = API_CONFIG.apiKey;
  }

  private async fetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    url.searchParams.append('api_key', this.apiKey);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.statusText}`);
    }

    return response.json();
  }

  async searchMovies(query: string, page: number = 1): Promise<SearchResponse> {
    return this.fetch<SearchResponse>('/search/movie', {
      query,
      page: page.toString(),
      language: 'tr-TR',
    });
  }

  async getPopularMovies(page: number = 1): Promise<SearchResponse> {
    return this.fetch<SearchResponse>('/movie/popular', {
      page: page.toString(),
      language: 'tr-TR',
    });
  }

  async getMovieDetail(id: number): Promise<MovieDetail> {
    return this.fetch<MovieDetail>(`/movie/${id}`, {
      language: 'tr-TR',
    });
  }

  getImageURL(path: string | null, size: 'w200' | 'w500' | 'original' = 'w500'): string {
    if (!path) return '/placeholder-movie.png';
    return `${API_CONFIG.imageBaseURL}/${size}${path}`;
  }
}

export const tmdbClient = new TMDBClient();
