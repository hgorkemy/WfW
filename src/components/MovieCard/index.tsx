import { Link } from 'react-router-dom';
import type { Movie } from '../../services/http/client';
import { tmdbClient } from '../../services/http/client';
import { formatRating } from '../../lib/format';
import './styles.css';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterURL = tmdbClient.getImageURL(movie.poster_path, 'w500');

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-card__poster">
        <img src={posterURL} alt={movie.title} loading="lazy" />
        <div className="movie-card__rating">
          ⭐ {formatRating(movie.vote_average)}
        </div>
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__year">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
      </div>
    </Link>
  );
}
