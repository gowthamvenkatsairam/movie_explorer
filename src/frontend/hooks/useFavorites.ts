import { useState, useEffect } from 'react';
import { Favorite, Movie, MovieDetails } from '@/types';

const STORAGE_KEY = 'movie_explorer_favorites';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load from localStorage on mount
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Failed to load favorites', error);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        // Sync to localStorage
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        }
    }, [favorites, isLoaded]);

    const addFavorite = (movie: Movie | MovieDetails, rating: number, comment: string) => {
        const newFavorite: Favorite = {
            id: movie.id,
            movie: {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                overview: movie.overview,
                vote_average: movie.vote_average,
            },
            rating,
            comment,
            addedAt: Date.now(),
        };

        setFavorites((prev) => {
            // Avoid duplicates
            if (prev.some((f) => f.id === movie.id)) return prev;
            return [...prev, newFavorite];
        });
    };

    const removeFavorite = (id: number) => {
        setFavorites((prev) => prev.filter((f) => f.id !== id));
    };

    const updateFavorite = (id: number, rating: number, comment: string) => {
        setFavorites((prev) => prev.map(f => f.id === id ? { ...f, rating, comment } : f));
    };

    const isFavorite = (id: number) => {
        return favorites.some((f) => f.id === id);
    };

    const getFavorite = (id: number) => {
        return favorites.find((f) => f.id === id);
    }

    return { favorites, addFavorite, removeFavorite, updateFavorite, isFavorite, getFavorite, isLoaded };
};
