import express from 'express'
import path from 'path'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import ArticleRoutes from './routes/article'

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 1234;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/articles', ArticleRoutes);
app.use('/uploads', express.static('/images/articles')); //important to send to the frontend and be able to read the files


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
