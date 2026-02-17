import { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies..."
                className="search-input"
                disabled={isLoading}
            />
            <button type="submit" className="btn btn-primary search-button" disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>
            <style jsx>{`
        .search-form {
          display: flex;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          gap: 1rem;
        }
        .search-input {
          flex: 1;
          padding: 1rem;
          border-radius: var(--border-radius);
          border: 1px solid #333;
          background-color: var(--card-bg);
          color: white;
          font-size: 1rem;
        }
        .search-input:focus {
          outline: none;
          border-color: var(--primary-color);
        }
        .search-button {
          min-width: 120px;
        }
      `}</style>
        </form>
    );
}
