import dotenv from 'dotenv';
import { createApp } from './app.js';
import { initDatabase } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Try connecting to MySQL if available
  await initDatabase();

  const app = createApp();

  app.listen(PORT, () => {
    console.log(`🌾 AgriConnect Node.js + Express Backend running on: http://localhost:${PORT}`);
    console.log(`📡 REST API Base URL: http://localhost:${PORT}/api/v1`);
    console.log(`🩺 Health Check: http://localhost:${PORT}/api/health`);
  });
};

startServer();
