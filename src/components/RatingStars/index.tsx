import { useState } from 'react';
import './styles.css';

interface RatingStarsProps {
  movieId: number;
  initialRating?: number;
  onRate?: (rating: number) => void;
}

export default function RatingStars({ movieId, initialRating = 0, onRate }: RatingStarsProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
    onRate?.(value);

    // LocalStorage'a kaydet
    const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
    ratings[movieId] = value;
    localStorage.setItem('movieRatings', JSON.stringify(ratings));
  };

  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`rating-stars__star ${star <= (hover || rating) ? 'active' : ''}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </button>
      ))}
      {rating > 0 && (
        <span className="rating-stars__label">
          {rating}/5
        </span>
      )}
    </div>
  );
}
