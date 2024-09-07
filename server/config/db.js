import mongoose from 'mongoose';

// Connect to MongoDB

const connectDb = async()=>{
    try {
      const con =  await mongoose.connect(process.env.MONGODB_URI);
      if(con){
        console.log('Connected to the database');
      }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}
export default connectDb;