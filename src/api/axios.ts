import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL || '';

const ApiClient = axios.create({
  baseURL: `${apiUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default ApiClient;
