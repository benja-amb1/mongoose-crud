import express from 'express'
import path from 'path'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 1234;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('connected to mongodb ✅');
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

app.listen(PORT, () => {
  try {
    console.log(`server running in port: ${PORT} 🚀`);
    connection();
  } catch (error) {
    console.log(error);
  }
})