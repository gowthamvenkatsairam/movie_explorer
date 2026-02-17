import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/frontend/components/Layout';
import MovieCard from '@/frontend/components/MovieCard';
import { useFavorites } from '@/frontend/hooks/useFavorites';

const Favorites: NextPage = () => {
    const { favorites, isLoaded } = useFavorites();

    return (
        <Layout>
            <Head>
                <title>My Favorites - Movie Explorer</title>
            </Head>

            <h1>My Favorites</h1>

            {isLoaded ? (
                <>
                    {favorites.length === 0 ? (
                        <div className="empty-state">
                            <p>You haven&apos;t added any favorites yet.</p>
                            <Link href="/">
                                <a className="btn btn-primary">Discover Movies</a>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid">
                            {favorites.map((fav) => (
                                <div key={fav.id} className="fav-item">
                                    <MovieCard movie={fav.movie} />
                                    <div className="fav-info">
                                        <div className="rating">
                                            Your Rating: {'★'.repeat(fav.rating)}{'☆'.repeat(5 - fav.rating)}
                                        </div>
                                        {fav.comment && <p className="comment">&quot;{fav.comment}&quot;</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="loading">Loading...</div>
            )}

            <style jsx>{`
        h1 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          text-align: center;
        }
        .empty-state {
          text-align: center;
          margin-top: 4rem;
        }
        .empty-state p {
          margin-bottom: 2rem;
          font-size: 1.2rem;
          color: var(--text-secondary);
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }
        .fav-item {
          display: flex;
          flex-direction: column;
          background-color: var(--card-bg);
          border-radius: var(--border-radius);
          overflow: hidden;
        }
        .fav-info {
          padding: 1rem;
          border-top: 1px solid #333;
        }
        .rating {
          color: #ffd700;
          margin-bottom: 0.5rem;
        }
        .comment {
          font-style: italic;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
      `}</style>
        </Layout>
    );
};

export default Favorites;
