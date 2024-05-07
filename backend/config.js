module.exports = {
    dbUri: process.env.DB_URI || 'mongodb://localhost:27017/mydatabase',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  };
  