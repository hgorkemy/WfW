import { env } from '../../lib/env';

export const API_CONFIG = {
  baseURL: env.TMDB_BASE_URL,
  apiKey: env.TMDB_API_KEY,
  imageBaseURL: 'https://image.tmdb.org/t/p',
};
