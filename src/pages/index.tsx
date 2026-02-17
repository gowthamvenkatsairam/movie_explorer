import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '@/frontend/components/Layout';
import SearchBar from '@/frontend/components/SearchBar';
import MovieCard from '@/frontend/components/MovieCard';
import { Movie, SearchResponse } from '@/types';

const Home: NextPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError('');
    setHasSearched(true);
    setSearchQuery(query);

    try {
      const res = await fetch(`/api/movies/search?query=${encodeURIComponent(query)}`);

      if (!res.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data: SearchResponse = await res.json();
      setMovies(data.results || []);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Movie Explorer</title>
        <meta name="description" content="Search and discover movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="intro">
        <h1>Welcome to <span className="highlight">Movie Explorer</span></h1>
        <p className="subtitle">Discover thousands of movies, create your favorites list.</p>
        <div className="search-container">
          <SearchBar onSearch={handleSearch} isLoading={loading} />
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {hasSearched && movies.length === 0 && !error && (
            <div className="no-results">No movies found for &quot;{searchQuery}&quot;</div>
          )}

          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}

      <style jsx>{`
        .intro {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
          text-align: center;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          font-weight: 800;
        }
        .highlight {
          color: var(--primary-color);
        }
        .subtitle {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }
        .search-container {
          width: 100%;
          max-width: 600px;
        }
        .error {
          color: #ff4d4f;
          text-align: center;
          margin: 1rem 0;
          padding: 1rem;
          background: rgba(255, 77, 79, 0.1);
          border-radius: var(--border-radius);
        }
        .loading {
          display: flex;
          justify-content: center;
          padding: 2rem;
        }
        .spinner {
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-left-color: var(--primary-color);
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .no-results {
          text-align: center;
          margin-top: 2rem;
          font-size: 1.2rem;
          color: var(--text-secondary);
        }
        .movie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
