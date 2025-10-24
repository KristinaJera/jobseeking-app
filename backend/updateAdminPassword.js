import 'dotenv/config';
import mongoose from 'mongoose';
import Admin from './src/models/adminModel.js';

async function updatePassword() {
    await mongoose.connect(process.env.MONGO_URI);
    const admin = await Admin.findOne({ email: 'admin@example.com' }).select('+password');
    if (!admin) return console.log('Admin not found!');
    admin.password = '1234567890';
    await admin.save();
    console.log('Admin password updated!');
    process.exit();
}

updatePassword();
