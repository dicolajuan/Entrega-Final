import mongoose from 'mongoose';

const URI = 'mongodb://localhost:27017/ecommerce';

export const connectDB = async () =>{
    await mongoose.connect(URI, 
        { 
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 1000
        })
    console.log('Conectado a la base de datos MongoDB...');
}

export const closeDB = async () => {
    await mongoose.connection.close();
}

