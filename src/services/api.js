import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lazarusproject.onrender.com/api/products'
});

export const getProducts = () => api.get('/');
export const filterProducts = (params) => api.get('/filter', { params });
export const getCategories = () => api.get('/getCategories');
export const getSizes = () => api.get('/getSizes');
