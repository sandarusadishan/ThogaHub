/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext.jsx';
import { sendMessage } from '../services/messagingService.jsx';
const PrivateMessageModal = ({ onClose, recipientId, listingId }) => {
  const { token } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try { await sendMessage(recipientId, message, listingId, token); setSuccess('Message sent successfully!'); setMessage(''); setTimeout(onClose, 2000); }
    catch (err) { setError('Failed to send message. Please try again.'); }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Send a Private Message</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your inquiry here..." rows="6" required className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"></textarea>
          {success && <p className="text-green-600 text-sm">{success}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
            <button type="submit" className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-700">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PrivateMessageModal;