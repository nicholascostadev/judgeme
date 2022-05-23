import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://judgeme.vercel.app/' || 'http://localhost:3000/',
});
