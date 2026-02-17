import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/frontend/components/Layout';
import { useFavorites } from '@/frontend/hooks/useFavorites';
import { MovieDetails } from '@/types';
import { TMDB_IMAGE_BASE } from '@/backend/tmdbClient';

export default function MoviePage() {
    const router = useRouter();
    const { id } = router.query;
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const { isFavorite, addFavorite, removeFavorite, updateFavorite, getFavorite, isLoaded } = useFavorites();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const isFav = movie ? isFavorite(movie.id) : false;

    useEffect(() => {
        if (!id) return;

        const fetchMovie = async () => {
            try {
                const res = await fetch(`/api/movies/${id}`);
                if (!res.ok) throw new Error('Failed');
                const data = await res.json();
                setMovie(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    useEffect(() => {
        if (movie && isFav) {
            const fav = getFavorite(movie.id);
            if (fav) {
                setRating(fav.rating);
                setComment(fav.comment || '');
            }
        } else {
            setRating(0);
            setComment('');
        }
    }, [movie, isFav, getFavorite]);

    const handleToggleFavorite = () => {
        if (!movie) return;
        if (isFav) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie, rating || 0, comment);
        }
    };

    const handleRating = (r: number) => {
        setRating(r);
        if (movie && isFav) {
            updateFavorite(movie.id, r, comment);
        }
    };

    const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setComment(val);
        if (movie && isFav) {
            updateFavorite(movie.id, rating, val);
        }
    };

    if (loading) return <Layout><div className="loading">Loading...</div></Layout>;
    if (!movie) return <Layout><div className="error">Movie not found</div></Layout>;

    return (
        <Layout>
            <div className="movie-details">
                <div className="poster-wrapper">
                    {movie.poster_path ? (
                        <Image
                            src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
                            alt={movie.title}
                            layout="fill"
                            objectFit="cover"
                            className="poster-image"
                        />
                    ) : (
                        <div className="no-poster">No Poster</div>
                    )}
                </div>

                <div className="info">
                    <h1>{movie.title} <span className="year">({new Date(movie.release_date).getFullYear()})</span></h1>

                    <div className="meta">
                        {movie.runtime > 0 && <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>}
                        {movie.vote_average > 0 && <span>TMDB Rating: {movie.vote_average.toFixed(1)}</span>}
                    </div>

                    <p className="overview">{movie.overview}</p>

                    <div className="actions">
                        <button
                            className={`btn ${isFav ? 'btn-remove' : 'btn-primary'}`}
                            onClick={handleToggleFavorite}
                        >
                            {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>

                    {isFav && (
                        <div className="personal-notes">
                            <h3>Your Rating & Notes</h3>
                            <div className="rating-select">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        className={`star ${star <= rating ? 'active' : ''}`}
                                        onClick={() => handleRating(star)}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={comment}
                                onChange={handleComment}
                                placeholder="Add a note about this movie..."
                                className="comment-box"
                                rows={3}
                            />
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
        .movie-details {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }
        @media (max-width: 768px) {
          .movie-details {
            grid-template-columns: 1fr;
          }
        }
        .poster-wrapper {
          position: relative;
          width: 100%;
          height: 450px;
          border-radius: var(--border-radius);
          overflow: hidden;
          background-color: #333;
        }
        .no-poster {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #aaa;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .year {
          font-weight: 300;
          color: var(--text-secondary);
        }
        .meta {
          display: flex;
          gap: 1rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        .overview {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .btn-remove {
          background-color: #333;
          color: white; 
          border: 1px solid #555;
        }
        .btn-remove:hover {
          background-color: #444;
        }
        .personal-notes {
          margin-top: 2rem;
          padding: 1.5rem;
          background-color: var(--card-bg);
          border-radius: var(--border-radius);
          border: 1px solid #333;
        }
        .rating-select {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .star {
          font-size: 1.5rem;
          color: #444;
          transition: color 0.2s;
        }
        .star.active, .star:hover {
          color: #ffd700;
        }
        .comment-box {
          width: 100%;
          padding: 0.75rem;
          border-radius: var(--border-radius);
          background-color: #111;
          border: 1px solid #333;
          color: white;
          font-family: inherit;
          resize: vertical;
        }
        .loading, .error {
          text-align: center;
          margin-top: 4rem;
        }
      `}</style>
        </Layout>
    );
}
