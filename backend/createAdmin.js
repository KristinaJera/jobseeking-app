import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './src/models/adminModel.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // These options are now defaults in Mongoose 7+, you can remove them
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error('Connection Error:', err);
    process.exit(1);
  }
};

const createAdmin = async () => {
  try {
    await connectDB();

    const plainTextPassword = '1234567890';
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

    const admin = new Admin({
      username: 'superadmin',      // <-- required
      email: 'admin@example.com',
      password: hashedPassword
    });

    await admin.save();
    console.log('Admin created successfully:', admin);
    
    mongoose.connection.close();
  } catch (err) {
    console.error('Error:', err);
  }
};

createAdmin();
