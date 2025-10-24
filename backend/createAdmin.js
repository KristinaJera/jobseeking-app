import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './src/models/adminModel.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await Admin.findOne({ email: 'admin2@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email);
      return;
    }

    const admin = new Admin({
      username: 'admin',
      email: 'admin2@example.com',
      password: '12345678900',  // will be hashed automatically
    });

    await admin.save();
    console.log('Admin created successfully:', admin);

    mongoose.connection.close();
  } catch (err) {
    console.error('Error:', err);
  }
};

createAdmin();
