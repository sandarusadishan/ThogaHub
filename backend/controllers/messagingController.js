import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  const { recipientId, content, relatedListing } = req.body;
  try {
    const newMessage = new Message({ sender: req.user.user.id, recipient: recipientId, content, relatedListing });
    await newMessage.save();
    res.json(newMessage);
  } catch (err) { console.error(err.message); res.status(500).send('Server error'); }
};