import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchFromTMDB } from '@/backend/tmdbClient';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Missing movie ID' });
    }

    try {
        const data = await fetchFromTMDB(`/movie/${id}`, {
            language: 'en-US',
        });
        res.status(200).json(data);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
