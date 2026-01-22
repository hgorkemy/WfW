import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation';
import MovieCard from '../../components/MovieCard';
import type { Movie } from '../../services/http/client';
import { tmdbClient } from '../../services/http/client';
import './styles.css';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadMovies();
  }, [page]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tmdbClient.getPopularMovies(page);
      setMovies((prev) => (page === 1 ? response.results : [...prev, ...response.results]));
    } catch (err) {
      setError('Filmler yüklenirken bir hata oluştu. API key\'inizi kontrol edin.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="home">
      <Navigation />
      <div className="home__container">
        <div className="home__header">
          <h1 className="home__title">Popüler Filmler</h1>
          <p className="home__subtitle">En çok izlenen ve beğenilen filmler</p>
        </div>

        {error && (
          <div className="home__error">
            <p>{error}</p>
          </div>
        )}

        <div className="home__grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {loading && (
          <div className="home__loading">
            <div className="spinner"></div>
            <p>Filmler yükleniyor...</p>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <div className="home__load-more">
            <button onClick={loadMore} className="home__load-more-btn">
              Daha Fazla Yükle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
