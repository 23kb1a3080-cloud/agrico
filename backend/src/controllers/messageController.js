import { memoryDb } from '../utils/memoryDb.js';

export const getMessagesWithUser = (req, res) => {
  const currentUserId = req.user.id;
  const partnerId = Number(req.params.partnerId);

  const thread = memoryDb.messages.filter(m =>
    (m.senderId === currentUserId && m.receiverId === partnerId) ||
    (m.senderId === partnerId && m.receiverId === currentUserId)
  );

  res.json({
    success: true,
    messages: thread
  });
};

export const sendMessage = (req, res) => {
  const { receiverId, receiverName, text } = req.body;
  const user = req.user;

  if (!receiverId || !text) {
    return res.status(400).json({ success: false, message: 'Receiver ID and text message are required.' });
  }

  const newMsg = {
    id: Date.now(),
    senderId: user.id,
    senderName: user.fullName || user.name,
    receiverId: Number(receiverId),
    receiverName: receiverName || 'User',
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  memoryDb.messages.push(newMsg);

  res.status(201).json({
    success: true,
    message: 'Message delivered.',
    sentMessage: newMsg
  });
};
