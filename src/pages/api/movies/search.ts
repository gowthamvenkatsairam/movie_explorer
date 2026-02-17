import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchFromTMDB } from '@/backend/tmdbClient';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { query } = req.query;

    if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: 'Missing search query' });
    }

    try {
        const data = await fetchFromTMDB('/search/movie', {
            query,
            language: 'en-US',
            page: '1',
            include_adult: 'false',
        });
        res.status(200).json(data);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
