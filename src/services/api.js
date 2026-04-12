import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/products' // O tu URL de Render
});

export const getProducts = () => api.get('/');
export const filterProducts = (params) => api.get('/filter', { params });
export const getCategories = () => api.get('/getCategories'); // <--- NUEVO
export const getSizes = () => api.get('/getSizes');           // <--- NUEVO