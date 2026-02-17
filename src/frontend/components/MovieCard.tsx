import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types';
import { TMDB_IMAGE_BASE } from '@/backend/tmdbClient';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const imageUrl = movie.poster_path
        ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
        : '/no-poster.png';

    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

    return (
        <Link href={`/movie/${movie.id}`} passHref>
            <a className="card">
                <div className="card-image-wrapper">
                    {movie.poster_path ? (
                        <Image
                            src={imageUrl}
                            alt={movie.title}
                            layout="fill"
                            objectFit="cover"
                            draggable={false}
                        />
                    ) : (
                        <div className="no-poster">
                            <span>No Poster</span>
                        </div>
                    )}
                </div>
                <div className="card-content">
                    <h3 className="card-title">{movie.title}</h3>
                    <p className="card-year">{year}</p>
                    {movie.overview && (
                        <p className="card-overview">
                            {movie.overview.slice(0, 100)}{movie.overview.length > 100 ? '...' : ''}
                        </p>
                    )}
                </div>

                <style jsx>{`
          .card {
            display: flex;
            flex-direction: column;
            border-radius: var(--border-radius);
            overflow: hidden;
            background-color: var(--card-bg);
            transition: transform 0.2s, box-shadow 0.2s;
            position: relative;
            text-decoration: none;
            color: inherit;
            height: 100%;
          }
          .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            z-index: 10;
          }
          .card-image-wrapper {
            position: relative;
            width: 100%;
            padding-bottom: 150%; /* Aspect ratio 2:3 */
            background-color: #333;
            flex-shrink: 0;
          }
          .no-poster {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #aaa;
          }
          .card-content {
            padding: 1rem;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }
          .card-title {
            font-size: 1rem;
            margin-bottom: 0.25rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #fff;
          }
          .card-year {
            font-size: 0.875rem;
            color: var(--text-secondary);
          }
          .card-overview {
            font-size: 0.8rem;
            color: #ccc;
            margin-top: 0.5rem;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
            </a>
        </Link>
    );
};

export default MovieCard;
