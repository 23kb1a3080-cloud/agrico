import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let pool = null;
let isConnected = false;

export const initDatabase = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'agriconnect_db',
      port: Number(process.env.DB_PORT) || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database successfully');
    connection.release();
    isConnected = true;
    return pool;
  } catch (error) {
    console.warn(`⚠️ MySQL Connection note: ${error.message}. Running with integrated in-memory data store.`);
    isConnected = false;
    return null;
  }
};

export const getDb = () => pool;
export const isDbConnected = () => isConnected;

