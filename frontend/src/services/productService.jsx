import axios from 'axios';
const API_URL = 'http://localhost:3000/api/products';
export const createProduct = async (productData, token) => {
  try { const response = await axios.post(API_URL, productData, { headers: { Authorization: `Bearer ${token}` } }); return response.data; }
  catch (error) { console.error('Product creation failed:', error.response.data); throw error; }
};
export const getPendingProducts = async (token) => {
  try { const response = await axios.get(`${API_URL}/pending`, { headers: { Authorization: `Bearer ${token}` } }); return response.data; }
  catch (error) { console.error('Failed to fetch pending products:', error.response.data); throw error; }
};
export const approveProduct = async (productId, token) => {
  try { const response = await axios.put(`${API_URL}/approve/${productId}`, {}, { headers: { Authorization: `Bearer ${token}` } }); return response.data; }
  catch (error) { console.error('Failed to approve product:', error.response.data); throw error; }
};
export const getApprovedProducts = async () => {
  try { const response = await axios.get(API_URL); return response.data; }
  catch (error) { console.error('Failed to fetch approved products:', error.response.data); throw error; }
};