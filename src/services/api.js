import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lazarusproject.onrender.com/api'
});

export const getProducts = () => api.get('/products'); 
export const filterProducts = (params) => api.get('/products/filter', { params });
export const getCategories = () => api.get('/products/getCategories');
export const getSizes = () => api.get('/products/getSizes');
export const getSizesByCategory = (category) => api.get(`/products/getSizesFromCategory?category=${category}`);
export const getProductById = (productId) => api.get(`/products/${productId}`);
export const getProductComments = (productId) => api.get(`/comments/product/${productId}`);
