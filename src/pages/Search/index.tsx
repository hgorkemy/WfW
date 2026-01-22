import { useState, useCallback } from 'react';
import Navigation from '../../components/Navigation';
import MovieCard from '../../components/MovieCard';
import type { Movie } from '../../services/http/client';
import { tmdbClient } from '../../services/http/client';
import { debounce } from '../../lib/debounce';
import './styles.css';

export default function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchMovies = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setSearched(false);
      return;
    }

    try {
      setLoading(true);
      const response = await tmdbClient.searchMovies(searchQuery);
      setMovies(response.results);
      setSearched(true);
    } catch (err) {
      console.error('Arama hatası:', err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => searchMovies(searchQuery), 500),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="search">
      <Navigation />
      <div className="search__container">
        <div className="search__header">
          <h1 className="search__title">Film Ara</h1>
          <div className="search__input-wrapper">
            <input
              type="text"
              className="search__input"
              placeholder="Film adı yazın..."
              value={query}
              onChange={handleInputChange}
              autoFocus
            />
            <span className="search__icon">🔍</span>
          </div>
        </div>

        {loading && (
          <div className="search__loading">
            <div className="spinner"></div>
            <p>Aranıyor...</p>
          </div>
        )}

        {!loading && searched && movies.length === 0 && (
          <div className="search__no-results">
            <p className="search__no-results-icon">😕</p>
            <p className="search__no-results-text">
              "{query}" için sonuç bulunamadı
            </p>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <>
            <div className="search__results-count">
              {movies.length} sonuç bulundu
            </div>
            <div className="search__grid">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}

        {!loading && !searched && (
          <div className="search__placeholder">
            <p className="search__placeholder-icon">🎬</p>
            <p className="search__placeholder-text">
              Aramak için film adı yazın
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
