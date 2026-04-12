import axios from 'axios';

const api = axios.create({
  // URL de tu API en Render
  baseURL: 'https://lazarusproject.onrender.com/api',
});

export const getProducts = () => api.get('/products');
export const filterProducts = (params) => api.get('/products/filter', { params });
export const createProduct = (product) => api.post('/products', product);

export default api;