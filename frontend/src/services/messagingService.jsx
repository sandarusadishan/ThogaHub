import axios from 'axios';
const API_URL = 'http://localhost:3000/api/messages';
export const sendMessage = async (recipientId, content, relatedListing, token) => {
  try {
    const response = await axios.post(API_URL, { recipientId, content, relatedListing }, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) { console.error('Failed to send message:', error.response.data); throw error; }
};