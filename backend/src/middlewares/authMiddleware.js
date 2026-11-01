import { verifyToken } from '../utils/jwt.js';
import { memoryDb } from '../utils/memoryDb.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required. No Bearer token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    const user = memoryDb.users.find(u => u.id === decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'User session invalid or account suspended.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
  }
};

