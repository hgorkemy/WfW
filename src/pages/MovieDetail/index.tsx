import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import RatingStars from '../../components/RatingStars';
import type { MovieDetail as MovieDetailType } from '../../services/http/client';
import { tmdbClient } from '../../services/http/client';
import { formatDate, formatRuntime, formatMoney, formatRating } from '../../lib/format';
import './styles.css';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    if (!id) return;

    const loadMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await tmdbClient.getMovieDetail(Number(id));
        setMovie(data);

        // LocalStorage'dan kullanıcı puanını yükle
        const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
        setUserRating(ratings[id] || 0);
      } catch (err) {
        setError('Film detayları yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-detail">
        <Navigation />
        <div className="movie-detail__loading">
          <div className="spinner"></div>
          <p>Film yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-detail">
        <Navigation />
        <div className="movie-detail__error">
          <p>{error || 'Film bulunamadı'}</p>
          <Link to="/" className="movie-detail__back-link">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const backdropURL = tmdbClient.getImageURL(movie.backdrop_path, 'original');
  const posterURL = tmdbClient.getImageURL(movie.poster_path, 'w500');

  return (
    <div className="movie-detail">
      <Navigation />

      <div
        className="movie-detail__backdrop"
        style={{ backgroundImage: `url(${backdropURL})` }}
      >
        <div className="movie-detail__backdrop-overlay"></div>
      </div>

      <div className="movie-detail__container">
        <Link to="/" className="movie-detail__back">
          ← Geri
        </Link>

        <div className="movie-detail__content">
          <div className="movie-detail__poster">
            <img src={posterURL} alt={movie.title} />
          </div>

          <div className="movie-detail__info">
            <h1 className="movie-detail__title">{movie.title}</h1>

            {movie.tagline && (
              <p className="movie-detail__tagline">"{movie.tagline}"</p>
            )}

            <div className="movie-detail__meta">
              <span className="movie-detail__meta-item">
                📅 {formatDate(movie.release_date)}
              </span>
              <span className="movie-detail__meta-item">
                ⏱️ {formatRuntime(movie.runtime)}
              </span>
              <span className="movie-detail__meta-item">
                ⭐ {formatRating(movie.vote_average)} ({movie.vote_count} oy)
              </span>
            </div>

            <div className="movie-detail__genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="movie-detail__genre">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="movie-detail__rating-section">
              <h3 className="movie-detail__rating-title">Puanınız</h3>
              <RatingStars
                movieId={movie.id}
                initialRating={userRating}
                onRate={(rating) => setUserRating(rating)}
              />
            </div>

            <div className="movie-detail__overview">
              <h2 className="movie-detail__section-title">Özet</h2>
              <p className="movie-detail__overview-text">
                {movie.overview || 'Özet bilgisi bulunmuyor.'}
              </p>
            </div>

            <div className="movie-detail__stats">
              <div className="movie-detail__stat">
                <span className="movie-detail__stat-label">Durum</span>
                <span className="movie-detail__stat-value">{movie.status}</span>
              </div>
              {movie.budget > 0 && (
                <div className="movie-detail__stat">
                  <span className="movie-detail__stat-label">Bütçe</span>
                  <span className="movie-detail__stat-value">
                    {formatMoney(movie.budget)}
                  </span>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="movie-detail__stat">
                  <span className="movie-detail__stat-label">Hasılat</span>
                  <span className="movie-detail__stat-value">
                    {formatMoney(movie.revenue)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
