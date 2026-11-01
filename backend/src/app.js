import express from 'express';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/authRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import { notFoundHandler, errorHandler } from './middlewares/errorMiddleware.js';

export const createApp = () => {
  const app = express();

  // Middleware
  app.use(cors({ origin: '*' }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static files for document & image uploads
  app.use('/uploads', express.static(path.resolve('uploads')));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'UP',
      app: 'AgriConnect Backend API',
      timestamp: new Date().toISOString()
    });
  });

  // REST API Routes
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/farmer', farmerRoutes);
  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/orders', orderRoutes);
  app.use('/api/v1/community', communityRoutes);
  app.use('/api/v1/messages', messageRoutes);
  app.use('/api/v1/admin', adminRoutes);

  // Error Handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
