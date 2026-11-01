import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'agriconnect_super_secret_jwt_key_2026';

export const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

