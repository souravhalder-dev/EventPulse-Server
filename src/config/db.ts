import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    let uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eventpulse_db';
    
    // Ensure Atlas SRV connection strings have retryWrites & w=majority
    if (uri.startsWith('mongodb+srv://') && !uri.includes('retryWrites=')) {
      uri = uri.includes('?')
        ? `${uri}&retryWrites=true&w=majority`
        : `${uri.endsWith('/') ? uri : uri + '/'}?retryWrites=true&w=majority`;
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host} (Database: ${conn.connection.name})`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${(error as Error).message}`);
    process.exit(1);
  }
};
