export const TMDB_API_BASE = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

if (!process.env.TMDB_API_KEY) {
    console.warn('TMDB_API_KEY is not set in environment variables.');
}

export const fetchFromTMDB = async (endpoint: string, params: Record<string, string> = {}) => {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
        throw new Error('API Key is missing');
    }

    const query = new URLSearchParams({
        api_key: apiKey,
        ...params,
    });

    const url = `${TMDB_API_BASE}${endpoint}?${query.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.statusText}`);
    }

    return response.json();
};
